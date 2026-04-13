# SESSION_HANDOFF.md

## Status

| Component | State | Notes |
|-----------|-------|-------|
| Dashboard mastery gap label | FIXED | Now shows path title, not raw slug |
| Daily tutor limit (race condition) | FIXED | Atomic PostgreSQL RPC; migration in `infra/migrations/02_atomic_tutor_limit.sql` — deploy to Supabase |
| Gamification streak trigger | FIXED | LessonPlayer fires POST /api/gamification/streak on every hosted save |
| Clearance level progression | FIXED | Backend awards Initiate → Operative (7d) → Agent (14d) → Commander (30d); never demotes |
| Path overview local fallback | FIXED | PathLessonListHydration merges local completions into lesson list |
| Python tutor duplicate | FIXED | Removed from main.py includes; Next.js /api/tutor is the single LLM route |
| Sentry error tracking | WIRED | Activates when NEXT_PUBLIC_SENTRY_DSN is set |
| PostHog analytics | WIRED | Activates when NEXT_PUBLIC_POSTHOG_KEY is set |
| Playwright in CI | FIXED | e2e job added to .github/workflows/ci.yml |
| Dockerfile | FIXED | Non-root user, HEALTHCHECK, graceful shutdown |
| Vercel config | ADDED | apps/web/vercel.json |
| Deployment runbook | ADDED | docs/deployment-runbook.md |
| Three.js bundle | OPTIMISED | Lazy-loaded in AuthCard via next/dynamic |
| ESLint errors | FIXED | SavedResourcesClient, VerificationBlock, QuizBlock all clean |

## Completed This Session

Full deployment-readiness audit + fix pass. See PROGRESS.md for the complete list of 15 issues resolved.

## Manual Actions Still Required (cannot be automated)

1. **Rotate secrets** — `ANTHROPIC_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_API_KEY` were previously committed to git. Rotate at each provider's dashboard. If repo was ever public, scrub git history with BFG.
2. **Deploy migration** — Run `infra/migrations/02_atomic_tutor_limit.sql` on the production Supabase instance (SQL editor or Supabase CLI).
3. **Configure Sentry** — Set `NEXT_PUBLIC_SENTRY_DSN` in Vercel env vars.
4. **Configure PostHog** — Set `NEXT_PUBLIC_POSTHOG_KEY` in Vercel env vars.
5. **Stripe configuration** — Set price IDs and webhook secret when billing is ready to launch.

## Next Action

Course and content improvements — user deferred these and asked to be reminded:
- CONTENT-01: Populate lesson companions for paths 01, 02, 03
- CONTENT-02: Add variety to verifyType across lessons  
- CONTENT-03: Add paths_old/README.md explaining the 2026-04 rewrite

## Risks To Watch

- `alumni_status` table schema assumed to have a `clearance_level` column — verify this matches `infra/schema.sql` / `infra/migrations/01_gamification_dashboard.sql` before enabling streak endpoint in production.
- Playwright e2e job in CI requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as placeholder env vars — already set in ci.yml but verify they don't cause build failures.
