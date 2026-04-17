import contextlib
import logging
import os

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Load environment variables from .env before anything else reads them.
load_dotenv()

from routers import health

# ---------------------------------------------------------------------------
# Structured Observability / Logging
# ---------------------------------------------------------------------------

from pythonjsonlogger import jsonlogger

logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter(
    "%(asctime)s %(levelname)s %(name)s %(module)s %(funcName)s %(message)s"
)
logHandler.setFormatter(formatter)

logging.basicConfig(level=logging.INFO, handlers=[logHandler])
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# CORS origins
# ---------------------------------------------------------------------------


def _parse_allowed_origins() -> list[str]:
    raw = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
    return [origin.strip() for origin in raw.split(",") if origin.strip()]


# ---------------------------------------------------------------------------
# Lifespan (replaces deprecated @app.on_event)
# ---------------------------------------------------------------------------


@contextlib.asynccontextmanager
async def lifespan(app: FastAPI):  # noqa: ARG001
    origins = _parse_allowed_origins()
    logger.info("CLI Academy backend starting. Allowed origins: %s", origins)
    yield
    logger.info("CLI Academy backend shutting down.")


# ---------------------------------------------------------------------------
# Application
# ---------------------------------------------------------------------------

_is_production = os.getenv("ENV", "development").lower() == "production"

app = FastAPI(
    title="CLI Academy Backend",
    description="API server for the CLI Academy learning platform.",
    version="0.1.0",
    docs_url=None if _is_production else "/docs",
    redoc_url=None if _is_production else "/redoc",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=_parse_allowed_origins(),
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------

app.include_router(health.router)
# Streak, daily limit, and tutor calls all go through the Next.js API routes directly on Supabase.


# ---------------------------------------------------------------------------
# Global exception handler — never leak stack traces to clients
# ---------------------------------------------------------------------------

@app.exception_handler(Exception)
async def _global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.exception("Unhandled exception on %s %s", request.method, request.url.path)
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal error occurred. Please try again later."},
    )
