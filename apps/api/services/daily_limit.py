"""
Server-side enforcement of the per-user daily tutor message limits.

  Free  →  10 messages / day
  Pro   → 100 messages / day

These must mirror the canonical tutor policy in CLAUDE.md. When the policy
changes, update these constants AND all of the other places listed in CLAUDE.md.

Implementation note
-------------------
We use a read-then-write pattern (GET current count → check limit → PATCH/POST).
A concurrent request from the same user could slip through on the same counter
value, causing a slight overage. This is an acceptable trade-off for an
educational platform at Phase 1 scale; swap for a Supabase RPC that uses
PostgreSQL's atomic UPDATE … RETURNING when finer enforcement is needed.
"""

import logging
import os
from datetime import date

import httpx
from fastapi import Depends, HTTPException

from core.auth import verify_supabase_jwt

logger = logging.getLogger(__name__)

# ── Canonical policy (mirrors CLAUDE.md) ─────────────────────────────────────
_FREE_DAILY_LIMIT = 10
_PRO_DAILY_LIMIT = 100


# ── Internal helpers ──────────────────────────────────────────────────────────

def _headers(service_key: str) -> dict[str, str]:
    """Build Supabase REST auth headers using the service-role key."""
    return {
        "apikey": service_key,
        "Authorization": f"Bearer {service_key}",
        "Content-Type": "application/json",
    }


# ── FastAPI dependency ────────────────────────────────────────────────────────

async def enforce_daily_tutor_limit(
    user_id: str = Depends(verify_supabase_jwt),
) -> None:
    """FastAPI dependency — checks and increments the daily message counter.

    Silently passes when Supabase is not configured so local development
    without a full Supabase setup is unaffected.

    Raises:
        HTTP 429  if the user has reached their daily limit.
        HTTP 500  (logged, not raised) on transient Supabase errors — we allow
                  the request rather than blocking users due to infra issues.
    """
    supabase_url = os.getenv("SUPABASE_URL")
    service_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_SERVICE_KEY")

    if not supabase_url or not service_key:
        logger.debug(
            "Supabase not configured; skipping daily limit check for user=%s", user_id
        )
        return

    today = date.today().isoformat()
    base = supabase_url.rstrip("/") + "/rest/v1"
    h = _headers(service_key)

    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            # ── 1. Fetch user tier ────────────────────────────────────────────
            tier_resp = await client.get(
                f"{base}/profiles",
                headers=h,
                params={"id": f"eq.{user_id}", "select": "tier", "limit": "1"},
            )
            tier = "free"
            if tier_resp.is_success and tier_resp.json():
                tier = tier_resp.json()[0].get("tier") or "free"

            daily_limit = _PRO_DAILY_LIMIT if tier == "pro" else _FREE_DAILY_LIMIT

            # ── 2. Fetch today's usage ────────────────────────────────────────
            usage_resp = await client.get(
                f"{base}/tutor_usage",
                headers=h,
                params={
                    "user_id": f"eq.{user_id}",
                    "used_at": f"eq.{today}",
                    "select": "message_count",
                    "limit": "1",
                },
            )
            rows = usage_resp.json() if usage_resp.is_success else []
            current_count: int = rows[0]["message_count"] if rows else 0
            row_exists = bool(rows)

            # ── 3. Enforce limit ──────────────────────────────────────────────
            if current_count >= daily_limit:
                raise HTTPException(
                    status_code=429,
                    detail=(
                        f"Daily message limit of {daily_limit} reached "
                        f"({tier} plan). Resets at midnight UTC."
                    ),
                )

            # ── 4. Increment counter ──────────────────────────────────────────
            if row_exists:
                await client.patch(
                    f"{base}/tutor_usage",
                    headers=h,
                    params={"user_id": f"eq.{user_id}", "used_at": f"eq.{today}"},
                    json={"message_count": current_count + 1},
                )
            else:
                await client.post(
                    f"{base}/tutor_usage",
                    headers={**h, "Prefer": "return=minimal"},
                    json={
                        "user_id": user_id,
                        "used_at": today,
                        "message_count": 1,
                    },
                )

    except HTTPException:
        raise  # Re-raise limit errors directly.

    except Exception as exc:  # noqa: BLE001
        # Allow the request on transient Supabase errors — don't inflict
        # infra issues on learners.
        logger.warning(
            "Daily limit check failed for user=%s; allowing request. Error: %s",
            user_id,
            exc,
        )
