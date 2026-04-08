import logging

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse

from core.auth import verify_supabase_jwt
from services.daily_limit import enforce_daily_tutor_limit
from core.rate_limit import rate_limit
from services.tutor_service import TutorStreamRequest, stream_tutor

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/tutor", tags=["tutor"])


# ---------------------------------------------------------------------------
# Endpoint
# ---------------------------------------------------------------------------


@router.post("/stream")
async def tutor_stream(
    request: TutorStreamRequest,
    user_id: str = Depends(verify_supabase_jwt),
    _rl: None = Depends(rate_limit(requests_per_window=20, window_seconds=60)),
    _dl: None = Depends(enforce_daily_tutor_limit),
) -> StreamingResponse:
    """
    Stream a tutor response as Server-Sent Events.

    Requires a valid Supabase JWT in the Authorization header. Each SSE event
    is a JSON object with a `type` field: `delta` (partial text), `done`
    (stream finished), or `error`.
    """
    logger.info(
        "Tutor stream requested by user=%s lesson=%s",
        user_id,
        request.context.lesson_slug or "general",
    )

    return StreamingResponse(
        stream_tutor(request, user_id),
        media_type="text/event-stream",
        headers={
            # Prevent buffering in proxies / nginx.
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Connection": "keep-alive",
        },
    )
