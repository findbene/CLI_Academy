"""
Lightweight in-process rate limiter for the CLI Academy backend.

Uses a sliding-window counter stored in memory. Fine for a single-process
deployment; swap for Redis-backed storage when scaling horizontally.
"""

import time
from collections import defaultdict
from typing import Annotated

from fastapi import Depends, HTTPException, Request

from core.auth import verify_supabase_jwt

# ---------------------------------------------------------------------------
# Storage
# ---------------------------------------------------------------------------

# Keyed by (user_id, window_start_minute) → request count
_counters: dict[str, list[float]] = defaultdict(list)

# Evict entries older than this many seconds to prevent unbounded growth.
_EVICT_AFTER = 300  # 5 minutes


def _prune(key: str, now: float, window: int) -> None:
    """Remove timestamps older than the window from the counter list."""
    cutoff = now - window
    _counters[key] = [t for t in _counters[key] if t > cutoff]
    # If the list is empty, clean up the key entirely.
    if not _counters[key]:
        _counters.pop(key, None)


# ---------------------------------------------------------------------------
# Dependency factories
# ---------------------------------------------------------------------------


def rate_limit(
    requests_per_window: int = 20,
    window_seconds: int = 60,
):
    """
    Return a FastAPI dependency that enforces a per-user sliding-window
    rate limit.

    Usage::

        @router.post("/stream")
        async def tutor_stream(
            ...,
            _rl: None = Depends(rate_limit(requests_per_window=20, window_seconds=60)),
        ):
    """

    async def _limiter(
        request: Request,
        user_id: str = Depends(verify_supabase_jwt),
    ) -> None:
        now = time.monotonic()
        key = f"user:{user_id}"

        _prune(key, now, window_seconds)

        if len(_counters[key]) >= requests_per_window:
            raise HTTPException(
                status_code=429,
                detail="Rate limit exceeded. Please wait before sending another request.",
            )

        _counters[key].append(now)

    return _limiter


def ip_rate_limit(
    requests_per_window: int = 60,
    window_seconds: int = 60,
):
    """
    Return a FastAPI dependency that enforces a per-IP sliding-window
    rate limit for unauthenticated endpoints (e.g. health).
    """

    async def _limiter(request: Request) -> None:
        now = time.monotonic()
        client_ip = request.client.host if request.client else "unknown"
        key = f"ip:{client_ip}"

        _prune(key, now, window_seconds)

        if len(_counters[key]) >= requests_per_window:
            raise HTTPException(
                status_code=429,
                detail="Too many requests. Please slow down.",
            )

        _counters[key].append(now)

    return _limiter
