"""Tests for the enforce_daily_tutor_limit FastAPI dependency."""

import pytest
from unittest.mock import AsyncMock, MagicMock, patch
from fastapi import HTTPException

from services.daily_limit import enforce_daily_tutor_limit, _FREE_DAILY_LIMIT, _PRO_DAILY_LIMIT


TEST_USER_ID = "test-user-daily-limit-00000001"


def _make_httpx_response(status_code: int, body: str = "") -> MagicMock:
    resp = MagicMock()
    resp.status_code = status_code
    resp.text = body
    resp.is_success = 200 <= status_code < 300
    resp.json = MagicMock(return_value=[{"tier": "free"}])
    return resp


def _make_httpx_client(tier_resp, rpc_resp) -> AsyncMock:
    client = AsyncMock()
    client.get = AsyncMock(return_value=tier_resp)
    client.post = AsyncMock(return_value=rpc_resp)
    client.__aenter__ = AsyncMock(return_value=client)
    client.__aexit__ = AsyncMock(return_value=None)
    return client


# ---------------------------------------------------------------------------
# Graceful fallback when Supabase is not configured
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_passes_through_when_supabase_not_configured(monkeypatch):
    monkeypatch.delenv("SUPABASE_URL", raising=False)
    monkeypatch.delenv("SUPABASE_SERVICE_ROLE_KEY", raising=False)
    monkeypatch.delenv("SUPABASE_SERVICE_KEY", raising=False)

    # Should not raise
    await enforce_daily_tutor_limit(user_id=TEST_USER_ID)


# ---------------------------------------------------------------------------
# Free tier: under limit → passes through
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_free_tier_under_limit_passes(monkeypatch):
    monkeypatch.setenv("SUPABASE_URL", "https://test.supabase.co")
    monkeypatch.setenv("SUPABASE_SERVICE_ROLE_KEY", "service-key")

    tier_resp = _make_httpx_response(200)
    tier_resp.json = MagicMock(return_value=[{"tier": "free"}])
    rpc_resp = _make_httpx_response(200)  # success = limit not reached

    mock_client = _make_httpx_client(tier_resp, rpc_resp)

    with patch("services.daily_limit.httpx.AsyncClient", return_value=mock_client):
        await enforce_daily_tutor_limit(user_id=TEST_USER_ID)  # should not raise


# ---------------------------------------------------------------------------
# Free tier: at limit → raises 429
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_free_tier_at_limit_raises_429(monkeypatch):
    monkeypatch.setenv("SUPABASE_URL", "https://test.supabase.co")
    monkeypatch.setenv("SUPABASE_SERVICE_ROLE_KEY", "service-key")

    tier_resp = _make_httpx_response(200)
    tier_resp.json = MagicMock(return_value=[{"tier": "free"}])
    rpc_resp = _make_httpx_response(500, body='{"message":"daily_limit_reached","code":"P0001"}')

    mock_client = _make_httpx_client(tier_resp, rpc_resp)

    with patch("services.daily_limit.httpx.AsyncClient", return_value=mock_client):
        with pytest.raises(HTTPException) as exc_info:
            await enforce_daily_tutor_limit(user_id=TEST_USER_ID)

    assert exc_info.value.status_code == 429
    assert str(_FREE_DAILY_LIMIT) in exc_info.value.detail


# ---------------------------------------------------------------------------
# Pro tier: at limit → raises 429 with pro limit
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_pro_tier_at_limit_raises_429(monkeypatch):
    monkeypatch.setenv("SUPABASE_URL", "https://test.supabase.co")
    monkeypatch.setenv("SUPABASE_SERVICE_ROLE_KEY", "service-key")

    tier_resp = _make_httpx_response(200)
    tier_resp.json = MagicMock(return_value=[{"tier": "pro"}])
    rpc_resp = _make_httpx_response(500, body='{"message":"daily_limit_reached","code":"P0001"}')

    mock_client = _make_httpx_client(tier_resp, rpc_resp)

    with patch("services.daily_limit.httpx.AsyncClient", return_value=mock_client):
        with pytest.raises(HTTPException) as exc_info:
            await enforce_daily_tutor_limit(user_id=TEST_USER_ID)

    assert exc_info.value.status_code == 429
    assert str(_PRO_DAILY_LIMIT) in exc_info.value.detail


# ---------------------------------------------------------------------------
# RPC 500 but not a limit error → passes through (infra degradation fallback)
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_non_limit_500_passes_through(monkeypatch):
    monkeypatch.setenv("SUPABASE_URL", "https://test.supabase.co")
    monkeypatch.setenv("SUPABASE_SERVICE_ROLE_KEY", "service-key")

    tier_resp = _make_httpx_response(200)
    tier_resp.json = MagicMock(return_value=[{"tier": "free"}])
    rpc_resp = _make_httpx_response(500, body="Internal server error — database unavailable")

    mock_client = _make_httpx_client(tier_resp, rpc_resp)

    with patch("services.daily_limit.httpx.AsyncClient", return_value=mock_client):
        await enforce_daily_tutor_limit(user_id=TEST_USER_ID)  # should not raise


# ---------------------------------------------------------------------------
# Network exception → passes through (infra degradation fallback)
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_network_exception_passes_through(monkeypatch):
    monkeypatch.setenv("SUPABASE_URL", "https://test.supabase.co")
    monkeypatch.setenv("SUPABASE_SERVICE_ROLE_KEY", "service-key")

    mock_client = AsyncMock()
    mock_client.__aenter__ = AsyncMock(side_effect=Exception("Connection refused"))
    mock_client.__aexit__ = AsyncMock(return_value=None)

    with patch("services.daily_limit.httpx.AsyncClient", return_value=mock_client):
        await enforce_daily_tutor_limit(user_id=TEST_USER_ID)  # should not raise
