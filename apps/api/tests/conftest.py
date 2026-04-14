"""
Shared fixtures for CLI Academy backend tests.

All Supabase calls and JWT verification are mocked — no network required.
"""

import pytest
from unittest.mock import AsyncMock, MagicMock
from fastapi.testclient import TestClient

from main import app
from core.auth import verify_supabase_jwt

TEST_USER_ID = "test-user-00000000-0000-0000-0000-000000000001"


@pytest.fixture
def client():
    """Synchronous TestClient wrapping the FastAPI app."""
    with TestClient(app) as c:
        yield c


@pytest.fixture
def auth_override():
    """Override JWT auth dependency to return a fixed test user_id."""
    app.dependency_overrides[verify_supabase_jwt] = lambda: TEST_USER_ID
    yield TEST_USER_ID
    app.dependency_overrides.clear()


def make_supabase_mock(progress_data=None, alumni_data=None):
    """
    Build a mock Supabase AsyncClient that returns controlled data.

    Both progress_data and alumni_data are the value surfaced via `.data`
    on the execute() result. Write operations (update/insert) do not check
    their execute() result so the same mock object is safe to return.
    """
    mock_client = AsyncMock()

    def _make_chain(execute_data):
        """Return a fluent mock chain whose execute() yields execute_data."""
        result = MagicMock()
        result.data = execute_data

        chain = MagicMock()
        chain.execute = AsyncMock(return_value=result)
        # Every chained call returns the same chain so .select().eq()... works.
        chain.select = MagicMock(return_value=chain)
        chain.eq = MagicMock(return_value=chain)
        chain.maybe_single = MagicMock(return_value=chain)
        chain.update = MagicMock(return_value=chain)
        chain.insert = MagicMock(return_value=chain)
        return chain

    progress_chain = _make_chain(progress_data)
    alumni_chain = _make_chain(alumni_data)

    def _table(name: str):
        if name == "user_progress":
            return progress_chain
        if name == "alumni_status":
            return alumni_chain
        return _make_chain(None)

    mock_client.table = MagicMock(side_effect=_table)
    return mock_client
