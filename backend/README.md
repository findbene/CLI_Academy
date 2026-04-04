# CLI Academy — Backend

FastAPI service that powers the CLI Academy learning platform.

## What it does

- Serves a health check endpoint consumed by load balancers and uptime monitors.
- Streams AI tutor responses to the frontend over Server-Sent Events (SSE) using the Anthropic API.
- Enforces per-user daily message limits before opening the stream.
- Exposes interactive API docs at `/docs` (Swagger UI) and `/redoc`.

## Running locally

### Prerequisites

- Python 3.11+
- An Anthropic API key

### Steps

```bash
cd backend

# Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate          # macOS/Linux
# .venv\Scripts\activate           # Windows PowerShell

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and set ANTHROPIC_API_KEY

# Start the dev server with auto-reload
uvicorn main:app --reload
```

The API is now available at `http://localhost:8000`.

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | — | Your Anthropic API key |
| `ANTHROPIC_MODEL` | No | `claude-sonnet-4-6` | Anthropic model to use for the tutor |
| `ALLOWED_ORIGINS` | No | `http://localhost:3000` | Comma-separated list of allowed CORS origins |
| `PORT` | No | `8000` | Port for the uvicorn server (used in Docker / PaaS deployments) |

## API endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Liveness check |
| `POST` | `/tutor/stream` | Stream a tutor response (SSE) |
| `GET` | `/docs` | Swagger UI |
| `GET` | `/redoc` | ReDoc UI |

## Docker

```bash
docker build -t cli-academy-backend .
docker run -p 8000:8000 --env-file .env cli-academy-backend
```

## SSE event format

The `/tutor/stream` endpoint emits newline-delimited SSE events:

```
data: {"type": "delta", "text": "Hello"}

data: {"type": "delta", "text": ", world!"}

data: {"type": "done"}

data: [DONE]
```

On error:

```
data: {"type": "error", "message": "..."}
```
