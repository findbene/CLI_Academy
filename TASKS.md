# TASKS.md

## P0 — Ops (manual, launch-gate)

- [ ] Rotate `ANTHROPIC_API_KEY` at console.anthropic.com — **pending manual rotation**
- [ ] Rotate `SUPABASE_SERVICE_ROLE_KEY` at Supabase dashboard — **pending manual rotation**
- [ ] Rotate `GOOGLE_API_KEY` at Google Cloud Console — **pending manual rotation**
- [ ] Deploy `infra/migrations/02_atomic_tutor_limit.sql` to production Supabase — **pending manual deploy** (migration + RPC now folded into schema.sql)
- [ ] Set `NEXT_PUBLIC_SENTRY_DSN` in Vercel environment variables — **Sentry SDK wired in code; env var name fixed (BUG-1); still needs value set in Vercel dashboard**
- [ ] Set `NEXT_PUBLIC_POSTHOG_KEY` in Vercel environment variables — **PostHog SDK wired in code; env var name fixed (BUG-1); still needs value set in Vercel dashboard**
- [ ] Configure Stripe price IDs and webhook secret (billing path, pre-launch) — **pending manual config**

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

## Done (this pass)

- [x] **BUG-1** — PostHog env var name fixed in code (`NEXT_PUBLIC_POSTHOG_KEY`); Sentry env var name correct. Both SDKs wired and activating on env var presence. Manual: set values in Vercel dashboard.
- [x] **BUG-3** — Search error handling fixed.
- [x] **BUG-4** — PROGRESS.md consolidated: lesson count corrected to 194, duplicate "## In progress" and "## Next" sections removed.
- [x] **SEC-3** — Admin email secured.
- [x] **FEAT-6** — Labs page gated.
- [x] **FEAT-7** — Vitest setup complete.
- [x] **FEAT-8** — pytest suite in CI (health, gamification streak, daily tutor limit).
- [x] **FEAT-9** — k6 load test script created (`tests/load/`). Script exists but the test has not been RUN yet — must be executed against a live/staging endpoint before launch. See P2 LOAD-01.
- [x] **DEBT-1 + DEBT-2** — schema.sql now includes gamification tables (`user_progress`, `alumni_status`, `achievements`) and the `increment_tutor_usage` RPC. Stale 6-path seed data removed; replaced with comment pointing to `curriculum-sync.ts`.
- [x] **DEBT-3** — (previously done)
- [x] **DEBT-4** — (previously done)
- [x] **DEBT-5** — Deleted duplicate `docs/cli_academy_curriculum_blueprint (1).md` (browser download artifact).
- [x] **DEBT-6** — Created `docs/ARCHITECTURE.md` (was referenced in docs/CLAUDE.md but did not exist).
- [x] **DEBT-7** — (previously done)
- [x] **DEBT-8** — Created `docker-compose.yml` at repo root for local API development.
- [x] **DEBT-9** — (previously done)
- [x] **DEBT-10** — README.md updated: stale "175 lessons" reference replaced with "194 lessons meet the v2 content standard".

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
- [x] OpenClaw curriculum restoration: rewrite path 11 (OpenClaw foundations, 7 lessons), add path 28 (configuration and skills, 7 lessons), add path 29 (security and production, 7 lessons), add path 30 (ZeroClaw and variants, 5 lessons). 194 total lessons, 30 paths. All registered in paths.ts under "OpenClaw Ecosystem" section.
- [x] Reference center: 8 printable single-page reference cards (Claude Code setup, slash commands, quick ref, OpenClaw setup, Claw variants, Skills/SKILL.md, MCPs, Cowork setup) with print-optimized CSS, `/reference` hub page, sidebar nav link, and callouts from paths catalog and downloads pages.
