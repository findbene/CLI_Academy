"""Tests for /health and /ready endpoints."""

import os


def test_health_returns_ok(client):
    resp = client.get("/health")
    assert resp.status_code == 200


def test_health_response_shape(client):
    resp = client.get("/health")
    body = resp.json()
    assert body["status"] == "ok"
    assert body["service"] == "cli-academy-backend"


def test_health_content_type(client):
    resp = client.get("/health")
    assert "application/json" in resp.headers["content-type"]


def test_ready_returns_503_when_env_missing(client, monkeypatch):
    """Readiness probe returns 503 when required env vars are absent."""
    for var in ("ANTHROPIC_API_KEY", "SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_JWT_SECRET"):
        monkeypatch.delenv(var, raising=False)

    resp = client.get("/ready")
    assert resp.status_code == 503
    assert resp.json()["status"] == "degraded"


def test_ready_returns_200_when_env_present(client, monkeypatch):
    """Readiness probe returns 200 when all required env vars are set."""
    monkeypatch.setenv("ANTHROPIC_API_KEY", "test-key")
    monkeypatch.setenv("SUPABASE_URL", "https://test.supabase.co")
    monkeypatch.setenv("SUPABASE_SERVICE_ROLE_KEY", "test-service-key")
    monkeypatch.setenv("SUPABASE_JWT_SECRET", "test-jwt-secret")

    resp = client.get("/ready")
    assert resp.status_code == 200
    assert resp.json()["status"] == "ready"
