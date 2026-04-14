"""Tests for POST /gamification/streak."""

from datetime import date, timedelta
from unittest.mock import patch, AsyncMock

from tests.conftest import TEST_USER_ID, make_supabase_mock

TODAY = date.today().isoformat()
YESTERDAY = (date.today() - timedelta(days=1)).isoformat()
OLD_DATE = "2020-01-01"


def post_streak(client, auth_override):
    """Helper: POST /gamification/streak with auth wired."""
    return client.post("/gamification/streak")


# ---------------------------------------------------------------------------
# Auth guard
# ---------------------------------------------------------------------------

def test_streak_requires_auth(client):
    """Unauthenticated requests are rejected."""
    resp = client.post("/gamification/streak")
    assert resp.status_code in (401, 403, 422)


# ---------------------------------------------------------------------------
# New user — no existing progress
# ---------------------------------------------------------------------------

def test_streak_new_user_creates_streak(client, auth_override):
    mock_sb = make_supabase_mock(progress_data=None, alumni_data=None)
    with patch("routers.gamification._get_supabase", AsyncMock(return_value=mock_sb)):
        resp = post_streak(client, auth_override)

    assert resp.status_code == 200
    body = resp.json()
    assert body["current_streak"] == 1
    assert body["clearance_level"] == "Initiate"
    assert body["qualified_alumni"] is False
    assert body["user_id"] == TEST_USER_ID


# ---------------------------------------------------------------------------
# Same-day call — idempotent
# ---------------------------------------------------------------------------

def test_streak_today_is_idempotent(client, auth_override):
    progress = {
        "user_id": TEST_USER_ID,
        "current_streak": 3,
        "longest_streak": 5,
        "last_activity": TODAY,
    }
    mock_sb = make_supabase_mock(progress_data=progress, alumni_data=None)
    with patch("routers.gamification._get_supabase", AsyncMock(return_value=mock_sb)):
        resp = post_streak(client, auth_override)

    assert resp.status_code == 200
    assert resp.json()["current_streak"] == 3


# ---------------------------------------------------------------------------
# Yesterday — increment
# ---------------------------------------------------------------------------

def test_streak_yesterday_increments(client, auth_override):
    progress = {
        "user_id": TEST_USER_ID,
        "current_streak": 4,
        "longest_streak": 4,
        "last_activity": YESTERDAY,
    }
    mock_sb = make_supabase_mock(progress_data=progress, alumni_data=None)
    with patch("routers.gamification._get_supabase", AsyncMock(return_value=mock_sb)):
        resp = post_streak(client, auth_override)

    assert resp.status_code == 200
    assert resp.json()["current_streak"] == 5


# ---------------------------------------------------------------------------
# Old activity — resets to 1
# ---------------------------------------------------------------------------

def test_streak_old_activity_resets(client, auth_override):
    progress = {
        "user_id": TEST_USER_ID,
        "current_streak": 10,
        "longest_streak": 10,
        "last_activity": OLD_DATE,
    }
    mock_sb = make_supabase_mock(progress_data=progress, alumni_data=None)
    with patch("routers.gamification._get_supabase", AsyncMock(return_value=mock_sb)):
        resp = post_streak(client, auth_override)

    assert resp.status_code == 200
    assert resp.json()["current_streak"] == 1
    assert resp.json()["clearance_level"] == "Initiate"


# ---------------------------------------------------------------------------
# Clearance thresholds
# ---------------------------------------------------------------------------

def test_streak_7_days_awards_operative(client, auth_override):
    progress = {
        "user_id": TEST_USER_ID,
        "current_streak": 6,
        "longest_streak": 6,
        "last_activity": YESTERDAY,
    }
    mock_sb = make_supabase_mock(progress_data=progress, alumni_data=None)
    with patch("routers.gamification._get_supabase", AsyncMock(return_value=mock_sb)):
        resp = post_streak(client, auth_override)

    assert resp.status_code == 200
    body = resp.json()
    assert body["current_streak"] == 7
    assert body["clearance_level"] == "Operative"
    assert body["qualified_alumni"] is True


def test_streak_14_days_awards_agent(client, auth_override):
    progress = {
        "user_id": TEST_USER_ID,
        "current_streak": 13,
        "longest_streak": 13,
        "last_activity": YESTERDAY,
    }
    alumni = {"user_id": TEST_USER_ID, "clearance_level": "Operative"}
    mock_sb = make_supabase_mock(progress_data=progress, alumni_data=alumni)
    with patch("routers.gamification._get_supabase", AsyncMock(return_value=mock_sb)):
        resp = post_streak(client, auth_override)

    assert resp.json()["clearance_level"] == "Agent"


def test_streak_30_days_awards_commander(client, auth_override):
    progress = {
        "user_id": TEST_USER_ID,
        "current_streak": 29,
        "longest_streak": 29,
        "last_activity": YESTERDAY,
    }
    alumni = {"user_id": TEST_USER_ID, "clearance_level": "Agent"}
    mock_sb = make_supabase_mock(progress_data=progress, alumni_data=alumni)
    with patch("routers.gamification._get_supabase", AsyncMock(return_value=mock_sb)):
        resp = post_streak(client, auth_override)

    assert resp.json()["clearance_level"] == "Commander"


# ---------------------------------------------------------------------------
# Alumni qualification
# ---------------------------------------------------------------------------

def test_qualified_alumni_true_when_alumni_record_exists(client, auth_override):
    progress = {
        "user_id": TEST_USER_ID,
        "current_streak": 10,
        "longest_streak": 10,
        "last_activity": TODAY,
    }
    alumni = {"user_id": TEST_USER_ID, "clearance_level": "Operative"}
    mock_sb = make_supabase_mock(progress_data=progress, alumni_data=alumni)
    with patch("routers.gamification._get_supabase", AsyncMock(return_value=mock_sb)):
        resp = post_streak(client, auth_override)

    assert resp.json()["qualified_alumni"] is True


def test_qualified_alumni_false_below_7_days(client, auth_override):
    progress = {
        "user_id": TEST_USER_ID,
        "current_streak": 5,
        "longest_streak": 5,
        "last_activity": TODAY,
    }
    mock_sb = make_supabase_mock(progress_data=progress, alumni_data=None)
    with patch("routers.gamification._get_supabase", AsyncMock(return_value=mock_sb)):
        resp = post_streak(client, auth_override)

    assert resp.json()["qualified_alumni"] is False
