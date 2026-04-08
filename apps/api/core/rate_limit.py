"""
Redis-backed rate limiter for the CLI Academy backend.
Uses a sliding-window counter in Redis for horizontal scalability.
Falls back to in-memory dictionary if Redis is unavailable.
"""

import time
import os
import logging
from collections import defaultdict
import redis

from fastapi import Depends, HTTPException, Request
from core.auth import verify_supabase_jwt

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Storage Configuration
# ---------------------------------------------------------------------------

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
try:
    redis_client = redis.from_url(REDIS_URL, decode_responses=True)
    redis_client.ping()
    _use_redis = True
except redis.ConnectionError:
    logger.warning("Redis not available. Falling back to in-memory rate limiting.")
    _use_redis = False

# Fallback in-memory storage
_counters: dict[str, list[float]] = defaultdict(list)

def _check_and_increment(key: str, now: float, window: int, limit: int) -> bool:
    """Returns True if request is allowed, False if rate limited."""
    if _use_redis:
        try:
            cutoff = now - window
            pipeline = redis_client.pipeline()
            pipeline.zremrangebyscore(key, 0, cutoff)
            pipeline.zadd(key, {str(now): now})
            pipeline.zcard(key)
            pipeline.expire(key, window)
            _, _, count, _ = pipeline.execute()
            return count <= limit
        except Exception as e:
            logger.error("Redis rate limiting error: %s", e)
            # Fall through to memory logic if redis fails mid-flight
            pass

    # In-memory fallback logic
    cutoff = now - window
    _counters[key] = [t for t in _counters[key] if t > cutoff]
    if len(_counters[key]) >= limit:
        return False
    _counters[key].append(now)
    return True

# ---------------------------------------------------------------------------
# Dependency factories
# ---------------------------------------------------------------------------

def rate_limit(requests_per_window: int = 20, window_seconds: int = 60):
    async def _limiter(
        request: Request,
        user_id: str = Depends(verify_supabase_jwt),
    ) -> None:
        key = f"rate_limit:user:{user_id}"
        now = time.time()

        allowed = _check_and_increment(key, now, window_seconds, requests_per_window)
        if not allowed:
            raise HTTPException(
                status_code=429,
                detail="Rate limit exceeded. Please wait before sending another request.",
            )

    return _limiter

def ip_rate_limit(requests_per_window: int = 60, window_seconds: int = 60):
    async def _limiter(request: Request) -> None:
        client_ip = request.client.host if request.client else "unknown"
        key = f"rate_limit:ip:{client_ip}"
        now = time.time()

        allowed = _check_and_increment(key, now, window_seconds, requests_per_window)
        if not allowed:
            raise HTTPException(
                status_code=429,
                detail="Too many requests. Please slow down.",
            )

    return _limiter
