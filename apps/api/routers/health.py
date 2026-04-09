import logging
import os

from fastapi import APIRouter
from fastapi.responses import JSONResponse

logger = logging.getLogger(__name__)

router = APIRouter(tags=["health"])


@router.get("/health")
async def health_check() -> dict[str, str]:
    """Return service liveness status."""
    logger.debug("Health check requested")
    return {"status": "ok", "service": "cli-academy-backend"}


@router.get("/ready")
async def readiness_check() -> JSONResponse:
    """
    Readiness probe — verifies that required environment variables are
    present so the service can actually handle requests.
    """
    checks: dict[str, bool] = {
        "anthropic_key": bool(os.getenv("ANTHROPIC_API_KEY")),
        "supabase_url": bool(os.getenv("SUPABASE_URL")),
        "supabase_service_role_key": bool(
            os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_SERVICE_KEY")
        ),
        "supabase_jwt_secret": bool(os.getenv("SUPABASE_JWT_SECRET")),
    }
    all_ok = all(checks.values())

    return JSONResponse(
        status_code=200 if all_ok else 503,
        content={
            "status": "ready" if all_ok else "degraded",
            "service": "cli-academy-backend",
            "checks": checks,
        },
    )
