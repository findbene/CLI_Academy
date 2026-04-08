import os

import jwt
from fastapi import Header, HTTPException

# ---------------------------------------------------------------------------
# JWT Configuration
# ---------------------------------------------------------------------------

_JWT_ALGORITHM = "HS256"
_JWT_AUDIENCE = "authenticated"


def verify_supabase_jwt(authorization: str | None = Header(None)) -> str:
    """FastAPI dependency — verifies a Supabase JWT and returns the user_id (sub claim).

    Raises HTTP 401 for missing, malformed, or expired tokens.
    Raises HTTP 500 if SUPABASE_JWT_SECRET is not configured.
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")

    token = authorization[7:]

    secret = os.environ.get("SUPABASE_JWT_SECRET")
    if not secret:
        raise HTTPException(status_code=500, detail="Server misconfigured: missing JWT secret")

    try:
        payload = jwt.decode(
            token,
            secret,
            algorithms=[_JWT_ALGORITHM],
            audience=_JWT_AUDIENCE,
        )
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Unauthorized")

    user_id: str | None = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    return user_id
