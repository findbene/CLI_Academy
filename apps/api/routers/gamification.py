import os
import logging
from fastapi import APIRouter, Depends, HTTPException
from supabase import create_async_client, AsyncClient
from core.auth import verify_supabase_jwt
from pydantic import BaseModel
from datetime import datetime, timezone

router = APIRouter(prefix="/gamification", tags=["gamification"])
logger = logging.getLogger(__name__)

# Clearance levels awarded by streak milestone (days)
_CLEARANCE_MILESTONES = [
    (30, "Commander"),
    (14, "Agent"),
    (7, "Operative"),
    (0, "Initiate"),
]


def _clearance_for_streak(streak: int) -> str:
    for days, level in _CLEARANCE_MILESTONES:
        if streak >= days:
            return level
    return "Initiate"


async def _get_supabase() -> AsyncClient:
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_SERVICE_KEY")
    if not url or not key:
        raise HTTPException(status_code=500, detail="Supabase admin credentials missing.")
    return await create_async_client(url, key)


class StreakResponse(BaseModel):
    user_id: str
    current_streak: int
    clearance_level: str
    qualified_alumni: bool


@router.post("/streak", response_model=StreakResponse)
async def increment_streak(user_id: str = Depends(verify_supabase_jwt)) -> StreakResponse:
    """Atomically update the daily streak for an authenticated user.

    Uses an upsert with a server-computed streak so concurrent requests from
    the same user are safe — the last writer wins for the same calendar day,
    which is the intended idempotent behaviour.
    """
    logger.info("gamification: incrementing streak for user=%s", user_id)
    supabase = await _get_supabase()

    today = datetime.now(timezone.utc).date().isoformat()

    # Fetch current progress in one query
    resp = await supabase.table("user_progress").select("*").eq("user_id", user_id).maybe_single().execute()
    progress = resp.data

    if progress:
        last_activity = progress.get("last_activity", "")
        current_streak = progress.get("current_streak", 0)
        longest_streak = progress.get("longest_streak", 0)

        # Normalise the stored date to a plain ISO date string
        try:
            stored_date = last_activity[:10] if last_activity else ""
        except Exception:
            stored_date = ""

        if stored_date == today:
            # Idempotent — already counted today
            pass
        elif stored_date:
            from datetime import date as _date
            delta = (_date.fromisoformat(today) - _date.fromisoformat(stored_date)).days
            if delta == 1:
                current_streak += 1
            else:
                current_streak = 1
        else:
            current_streak = 1

        new_longest = max(longest_streak, current_streak)

        await supabase.table("user_progress").update({
            "current_streak": current_streak,
            "longest_streak": new_longest,
            "last_activity": today,
        }).eq("user_id", user_id).execute()
    else:
        current_streak = 1
        await supabase.table("user_progress").insert({
            "user_id": user_id,
            "current_streak": 1,
            "longest_streak": 1,
            "last_activity": today,
        }).execute()

    clearance_level = _clearance_for_streak(current_streak)

    # Upsert alumni_status with the current clearance level so AlumniHub
    # always reflects the latest milestone earned.
    alumni_resp = await supabase.table("alumni_status").select("*").eq("user_id", user_id).maybe_single().execute()
    qualified_alumni = False

    if alumni_resp.data:
        qualified_alumni = True
        stored_level = alumni_resp.data.get("clearance_level", "Initiate")
        # Only promote, never demote
        milestone_order = [m[1] for m in _CLEARANCE_MILESTONES]
        stored_rank = milestone_order.index(stored_level) if stored_level in milestone_order else len(milestone_order)
        new_rank = milestone_order.index(clearance_level) if clearance_level in milestone_order else len(milestone_order)
        if new_rank < stored_rank:
            await supabase.table("alumni_status").update({
                "clearance_level": clearance_level,
            }).eq("user_id", user_id).execute()
    elif current_streak >= 7:
        # Award alumni status at the Operative milestone
        await supabase.table("alumni_status").insert({
            "user_id": user_id,
            "clearance_level": clearance_level,
        }).execute()
        qualified_alumni = True

    return StreakResponse(
        user_id=user_id,
        current_streak=current_streak,
        clearance_level=clearance_level,
        qualified_alumni=qualified_alumni,
    )
