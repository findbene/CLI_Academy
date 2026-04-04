import logging
from fastapi import APIRouter

logger = logging.getLogger(__name__)

router = APIRouter(tags=["health"])


@router.get("/health")
async def health_check() -> dict[str, str]:
    """Return service liveness status."""
    logger.debug("Health check requested")
    return {"status": "ok", "service": "cli-academy-backend"}
