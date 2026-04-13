FROM python:3.11-slim

# Create a non-root user so the process does not run as root in production
RUN useradd -m -u 1000 apiuser

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY --chown=apiuser:apiuser . .

USER apiuser

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')" || exit 1

# exec form so uvicorn receives SIGTERM and can shut down gracefully
CMD ["sh", "-c", "exec uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
