# TASKS.md

## P0 — Ops (manual, launch-gate)

- [ ] Rotate `ANTHROPIC_API_KEY` at console.anthropic.com (was committed to git history)
- [ ] Rotate `SUPABASE_SERVICE_ROLE_KEY` at Supabase dashboard (was committed to git history)
- [ ] Rotate `GOOGLE_API_KEY` at Google Cloud Console (was committed to git history)
- [ ] Deploy `infra/migrations/02_atomic_tutor_limit.sql` to production Supabase
- [ ] Set `NEXT_PUBLIC_SENTRY_DSN` in Vercel environment variables
- [ ] Set `NEXT_PUBLIC_POSTHOG_KEY` in Vercel environment variables
- [ ] Configure Stripe price IDs and webhook secret (billing path, pre-launch)

## P0 — Engineering

- [ ] Run editorial QA across the rewritten live paths, prioritizing Paths 11, 12, 14, 15, 16, 18, and 19.
- [ ] Add targeted regression coverage for local-progress fallback/backfill, dashboard hydration reconciliation, lesson rendering edge cases, and tutor mode gating.
- [ ] Run the remaining visual browser pass on `/` and `/lounge` across desktop and mobile breakpoints.

## P1 (Product Hardening)

- [ ] Revisit gamification persistence and concurrency semantics.
- [ ] Verify CI/CD, deployment, and env references after the recent app and curriculum changes.
- [ ] Reconcile path-overview completion state with browser-local fallback so `/learn/[pathSlug]` does not lag behind the lesson page/dashboard after local-only saves.
- [ ] Continue Pro-tier scoping for `mcp-mastery` and `workflow-automation`.

## P2 (Structure + Operations)

- [ ] `paths_old/` deprecation: review in September 2026, delete in October 2026 unless recovery needed (policy in `content/paths_old/README.md`).
- [ ] `SEARCH-01`: Full-text lesson search via Supabase FTS — defer to post-launch. Implement when DAU > 500 or learner feedback identifies lesson discovery as a friction point.
- [ ] `LOAD-01`: Load test tutor endpoint before public launch — use k6 or Locust, target 50 concurrent users at p99 < 2s. Blocker for public launch announcement.
- [ ] Add docs freshness checks for root operating files.
- [ ] Add package boundaries under `packages/` when duplication justifies extraction.
- [ ] Create durable architecture notes for the curriculum and learner-flow migration decisions.

## Done (this sprint)

- [x] Normalize the live curriculum back to canonical `content/paths/` slugs for Paths 01-19 and archive stale duplicate trees under `content/paths_old/`.
- [x] Modernize the live lesson loader and content validator around chapterized `lesson-*.mdx` files and the current frontmatter contract.
- [x] Replace legacy capstone and productivity lesson packs in Paths 18 and 19 with real bounded workflow and portfolio artifacts.
- [x] Replace the older chapter trees across Paths 04-09 with deeper practical lessons for repo navigation, debugging, Git/GitHub, surface switching, Cowork, and research workflows.
- [x] Add learner-flow support in the web app for onboarding start routes, dashboard resume targets, section progress tracking, and server-backed lesson verification.
- [x] Repair hosted lesson progress so signed-in saves resolve against the live curriculum catalog instead of stale seed rows.
- [x] Add browser-local learner-progress fallback plus authenticated local-to-hosted backfill for legacy completions.
- [x] Run authenticated browser QA for onboarding completion, dashboard continue-learning, lesson progress, and verification UX.
- [x] Full curriculum redesign: 27 paths, 175 lessons, 7-group taxonomy, v2 content standard across all lessons.
- [x] Deployment hardening: Sentry, PostHog, Playwright CI, atomic tutor rate limit, Dockerfile hardening, Vercel config, deployment runbook.
- [x] Register paths 20-27 in `apps/web/lib/data/paths.ts` so new curriculum paths are routable and visible.
- [x] Fix missing frontmatter (groupId, clawClassification, prerequisiteLesson) in all path 20 and 21 lesson files.
- [x] Wire DiagramBlock into 3 path 20 lessons using existing SVG assets.
- [x] Create Python pytest suite covering health, gamification streak, and daily tutor limit.
