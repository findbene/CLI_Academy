"""
Server-side enforcement of the per-user daily tutor message limits.

  Free  →  10 messages / day
  Pro   → 100 messages / day

These constants mirror the canonical tutor policy in tutor-config.ts. When the
policy changes, update these constants AND the frontend tutor-config.ts.

Implementation
--------------
Uses the PostgreSQL RPC function ``increment_tutor_usage`` (defined in
infra/migrations/02_atomic_tutor_limit.sql) to atomically increment the counter.
The function raises a P0001 exception when the limit is already reached, making
concurrent requests from the same user fully safe — no overage possible.
"""

import logging
import os
from datetime import date

import httpx
from fastapi import Depends, HTTPException

from core.auth import verify_supabase_jwt

logger = logging.getLogger(__name__)

_FREE_DAILY_LIMIT = 10
_PRO_DAILY_LIMIT = 100


def _headers(service_key: str) -> dict[str, str]:
    return {
        "apikey": service_key,
        "Authorization": f"Bearer {service_key}",
        "Content-Type": "application/json",
    }


async def enforce_daily_tutor_limit(
    user_id: str = Depends(verify_supabase_jwt),
) -> None:
    """FastAPI dependency — atomically checks and increments the daily counter.

    Falls back gracefully (allows the request) when Supabase is not configured
    or on transient errors, so local development is unaffected.

    Raises:
        HTTP 429  if the daily limit is reached.
    """
    supabase_url = os.getenv("SUPABASE_URL")
    service_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_SERVICE_KEY")

    if not supabase_url or not service_key:
        logger.debug("Supabase not configured; skipping daily limit check for user=%s", user_id)
        return

    base = supabase_url.rstrip("/") + "/rest/v1"
    h = _headers(service_key)

    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            # ── Fetch user tier ───────────────────────────────────────────────
            tier_resp = await client.get(
                f"{base}/profiles",
                headers=h,
                params={"id": f"eq.{user_id}", "select": "tier", "limit": "1"},
            )
            tier = "free"
            if tier_resp.is_success and tier_resp.json():
                tier = tier_resp.json()[0].get("tier") or "free"

            daily_limit = _PRO_DAILY_LIMIT if tier == "pro" else _FREE_DAILY_LIMIT

            # ── Atomic increment via RPC ──────────────────────────────────────
            rpc_resp = await client.post(
                f"{base}/rpc/increment_tutor_usage",
                headers=h,
                json={"p_user_id": user_id, "p_limit": daily_limit},
            )

            if rpc_resp.status_code == 500:
                # PostgreSQL P0001 exception = limit already reached
                detail_text = rpc_resp.text or ""
                if "daily_limit_reached" in detail_text or "P0001" in detail_text:
                    raise HTTPException(
                        status_code=429,
                        detail=(
                            f"Daily message limit of {daily_limit} reached "
                            f"({tier} plan). Resets at midnight UTC."
                        ),
                    )
                # Other 500 — log and allow request (infra degradation)
                logger.warning(
                    "RPC increment_tutor_usage returned 500 for user=%s; allowing request. Body: %s",
                    user_id,
                    detail_text[:200],
                )

            elif not rpc_resp.is_success:
                logger.warning(
                    "RPC increment_tutor_usage returned %s for user=%s; allowing request.",
                    rpc_resp.status_code,
                    user_id,
                )

    except HTTPException:
        raise

    except Exception as exc:  # noqa: BLE001
        logger.warning(
            "Daily limit check failed for user=%s; allowing request. Error: %s",
            user_id,
            exc,
        )
