# progress.md

Last updated: 2026-04-15

## Current phase

Post-hardening. Build is clean. All major engineering work complete. Blocked on 7 manual ops tasks before public launch.

## Status by area

| Area | Status | Notes |
|------|--------|-------|
| Curriculum | Complete | 30 paths, 194 lessons, v2 content standard |
| Frontend build | Clean | `npm run build` passes, zero errors |
| Backend | Clean | pytest suite green, atomic tutor limit wired |
| Deployment hardening | Complete | Sentry, PostHog, Playwright CI, Dockerfile, Vercel config, runbook |
| Learner flow | Complete | Onboarding, dashboard resume, progress sync, verification |
| Reference center | Complete | 8 printable cards, /reference hub, sidebar nav |
| Secret rotation | BLOCKED — manual | ANTHROPIC_API_KEY, SUPABASE_SERVICE_ROLE_KEY, GOOGLE_API_KEY all exposed in git history |
| Prod migration | BLOCKED — manual | `infra/migrations/02_atomic_tutor_limit.sql` not yet deployed to prod Supabase |
| Sentry | BLOCKED — manual | `NEXT_PUBLIC_SENTRY_DSN` not set in Vercel |
| PostHog | BLOCKED — manual | `NEXT_PUBLIC_POSTHOG_KEY` not set in Vercel |
| Stripe | BLOCKED — manual | Price IDs and webhook secret not configured |
| Editorial QA | Pending | Paths 11, 12, 14, 15, 16, 18, 19 need content review |
| Regression tests | Pending | Local-progress fallback/backfill, dashboard hydration, tutor mode gating |
| Visual QA | Pending | `/` and `/lounge` desktop + mobile pass not run |
| Companion resources | Pending | 194 lessons have empty companion folders — start with Paths 01, 02, 03 |

## Key decisions made

- `paths_old/` retained until October 2026 review — do not delete early
- Python tutor router removed from `main.py`; all LLM calls go through Next.js `/api/tutor`
- Browser-local progress is user-scoped (not browser-global) to prevent cross-user leakage on shared machines
- OpenClaw curriculum: Path 11 rewritten, Paths 28/29/30 added — registered under "OpenClaw Ecosystem" in `paths.ts`

## Next task

Resolve P0 manual ops tasks (secret rotation, migration deploy, Sentry/PostHog/Stripe). These cannot be automated — they require dashboard access at each provider.

After that: editorial QA pass on Paths 11–19 and regression hardening.

## Active blockers

None on the engineering side. All current blockers are manual ops requiring external dashboard access.
