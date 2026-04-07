import logging
import os

from fastapi import APIRouter

logger = logging.getLogger(__name__)

router = APIRouter(tags=["health"])


@router.get("/health")
async def health_check() -> dict[str, str]:
    """Return service liveness status."""
    logger.debug("Health check requested")
    return {"status": "ok", "service": "cli-academy-backend"}


@router.get("/ready")
async def readiness_check() -> dict:
    """
    Readiness probe — verifies that required environment variables are
    present so the service can actually handle requests.
    """
    checks: dict[str, bool] = {
        "anthropic_key": bool(os.getenv("ANTHROPIC_API_KEY")),
        "supabase_jwt_secret": bool(os.getenv("SUPABASE_JWT_SECRET")),
    }
    all_ok = all(checks.values())

    return {
        "status": "ready" if all_ok else "degraded",
        "service": "cli-academy-backend",
        "checks": checks,
    }
