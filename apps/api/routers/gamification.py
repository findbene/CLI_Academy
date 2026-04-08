import os
import logging
from typing import Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from supabase import create_async_client, AsyncClient
from core.auth import verify_supabase_jwt
from pydantic import BaseModel
from datetime import datetime, timezone

router = APIRouter(prefix="/gamification", tags=["gamification"])
logger = logging.getLogger(__name__)

async def get_supabase() -> AsyncClient:
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_ANON_KEY")
    if not url or not key:
        raise HTTPException(status_code=500, detail="Supabase credentials missing.")
    return await create_async_client(url, key)

class StreakResponse(BaseModel):
    user_id: str
    current_streak: int
    qualified_alumni: bool

@router.post("/streak", response_model=StreakResponse)
async def increment_streak(user_id: str = Depends(verify_supabase_jwt)) -> Dict[str, Any]:
    """
    Increments the daily streak for an authenticated user.
    Uses the ZTM methodology to encourage daily engagement securely.
    """
    logger.info(f"gamification: Incrementing daily streak for User {user_id}")
    
    supabase = await get_supabase()
    
    # 1. Fetch current progress
    response = await supabase.table("user_progress").select("*").eq("user_id", user_id).maybe_single().execute()
    progress = response.data
    
    today = datetime.now(timezone.utc).date()
    
    if progress:
        last_activity = progress.get("last_activity")
        last_activity_date = datetime.fromisoformat(last_activity.replace('Z', '+00:00')).date() if last_activity else None
        current_streak = progress.get("current_streak", 0)
        
        if last_activity_date == today:
            pass # Already incremented today
        elif last_activity_date and (today - last_activity_date).days == 1:
            current_streak += 1
        else:
            current_streak = 1 # Reset or start fresh
            
        update_data = {
            "current_streak": current_streak,
            "last_activity": today.isoformat()
        }
        if current_streak > progress.get("longest_streak", 0):
            update_data["longest_streak"] = current_streak
            
        await supabase.table("user_progress").update(update_data).eq("user_id", user_id).execute()
    else:
        current_streak = 1
        await supabase.table("user_progress").insert({
            "user_id": user_id,
            "current_streak": current_streak,
            "longest_streak": current_streak,
            "last_activity": today.isoformat()
        }).execute()
        
    alumni_check = await supabase.table("alumni_status").select("*").eq("user_id", user_id).maybe_single().execute()
        
    return {
        "user_id": user_id,
        "current_streak": current_streak,
        "qualified_alumni": bool(alumni_check.data)
    }
