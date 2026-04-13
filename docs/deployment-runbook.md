# CLI Academy Deployment Runbook

## Pre-flight checklist

Before any deployment:

- [ ] All secrets rotated if previously exposed in git
- [ ] `.env` is in `.gitignore` (already set — verify with `git check-ignore .env`)
- [ ] `npm run lint && npm run typecheck && npm run build` passes in `apps/web`
- [ ] `python -m ruff check . && python -c "import main"` passes in `apps/api`
- [ ] Playwright smoke tests pass: `npx playwright test e2e/smoke.spec.ts`
- [ ] Database schema deployed to production Supabase (see Database section below)

---

## Environment variables

All required variables are documented in `.env.example` at the repo root.

Set them in your deployment platform (Vercel env vars, GitHub Secrets, Cloud Run
secret manager, etc.). **Never hardcode secrets in source files.**

### Required for core functionality

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Frontend | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Frontend | Browser-safe Supabase key |
| `SUPABASE_SERVICE_ROLE_KEY` | Frontend (server) | Server-side Supabase writes |
| `SUPABASE_JWT_SECRET` | Backend API | JWT verification |
| `ANTHROPIC_API_KEY` | Frontend (server) | AI tutor + lesson verification |

### Required for billing

| Variable | Where | Purpose |
|---|---|---|
| `STRIPE_SECRET_KEY` | Frontend (server) | Stripe API |
| `STRIPE_WEBHOOK_SECRET` | Frontend (server) | Webhook signature verification |
| `STRIPE_PRO_MONTHLY_PRICE_ID` | Frontend (server) | Monthly Pro price |
| `STRIPE_PRO_ANNUAL_PRICE_ID` | Frontend (server) | Annual Pro price |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Frontend | Browser Stripe key |

### Optional (app works without these)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SENTRY_DSN` | Client-side error tracking |
| `SENTRY_DSN` | Server-side error tracking |
| `NEXT_PUBLIC_POSTHOG_KEY` | Product analytics |
| `RESEND_API_KEY` | Transactional email |

---

## Database

### Deploy schema to production Supabase

```bash
# Option A — Supabase dashboard SQL editor
# Paste contents of infra/schema.sql and run.

# Option B — Supabase CLI
cd infra
supabase db push --db-url "postgresql://postgres:PASSWORD@db.PROJECT.supabase.co:5432/postgres"
```

### Apply migrations

Run each file in `infra/migrations/` in numeric order:

```bash
# 01_gamification_dashboard.sql
# 02_atomic_tutor_limit.sql
```

### Verify RLS policies

After deploying schema, test that user A cannot read user B's data:

```sql
-- Run as user A's JWT — should return empty
SELECT * FROM lesson_progress WHERE user_id = '<user_b_id>';
SELECT * FROM profiles WHERE id = '<user_b_id>';
```

---

## Frontend (Next.js) — Vercel

```bash
# From apps/web/
vercel --prod

# Or push to main and let CI/CD handle it
```

The `apps/web/vercel.json` configures the build. Set all env vars in the
Vercel project dashboard → Settings → Environment Variables.

---

## Backend (FastAPI) — Cloud Run

```bash
# Build and push the container
cd apps/api
docker build -t gcr.io/YOUR_PROJECT/cli-academy-api:latest .
docker push gcr.io/YOUR_PROJECT/cli-academy-api:latest

# Deploy to Cloud Run
gcloud run deploy cli-academy-api \
  --image gcr.io/YOUR_PROJECT/cli-academy-api:latest \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars "ENV=production,ALLOWED_ORIGINS=https://yourdomain.com" \
  --set-secrets "ANTHROPIC_API_KEY=anthropic-api-key:latest,SUPABASE_SERVICE_ROLE_KEY=supabase-service-key:latest,SUPABASE_JWT_SECRET=supabase-jwt-secret:latest"
```

The `PORT` environment variable is set automatically by Cloud Run.

---

## Post-deployment smoke test

```bash
# 1. Public page loads
curl -I https://yourdomain.com

# 2. API health check
curl https://api.yourdomain.com/health

# 3. API readiness check (verifies Anthropic + Supabase connectivity)
curl https://api.yourdomain.com/ready

# 4. Run Playwright smoke suite against production
PLAYWRIGHT_BASE_URL=https://yourdomain.com npx playwright test e2e/smoke.spec.ts
```

---

## Incident response

### Tutor service down

1. Check `GET /ready` — if it returns 503, check Anthropic API key and Supabase credentials.
2. Check Cloud Run logs: `gcloud logging read "resource.type=cloud_run_revision"`
3. The frontend Next.js tutor route (`/api/tutor`) calls Anthropic directly — it is independent of the Python backend and will continue working.

### Database unavailable

1. Check Supabase dashboard status at `https://status.supabase.com`.
2. The app degrades gracefully — lesson progress falls back to browser-local storage.
3. The lesson player shows "Progress saved on this device while sync is temporarily unavailable."

### High Anthropic API costs

1. Check `tutor_usage` table for unusual message volumes.
2. Reduce `_PRO_DAILY_LIMIT` / `_FREE_DAILY_LIMIT` in `apps/api/services/daily_limit.py` and `apps/web/lib/tutor-config.ts`.
3. Consider rate-limiting by IP in addition to per-user limits.

---

## Secret rotation procedure

If a secret is suspected to be compromised:

1. **Immediately** generate a new key at the provider dashboard.
2. Update the secret in your deployment platform before updating the app.
3. Deploy with the new secret.
4. Revoke the old key only after confirming the new deployment is healthy.
5. If the key was ever in git history, use BFG Repo-Cleaner:
   ```bash
   bfg --replace-text secrets.txt
   git reflog expire --expire=now --all && git gc --prune=now --aggressive
   git push --force-with-lease
   ```
