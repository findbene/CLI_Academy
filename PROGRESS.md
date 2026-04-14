# PROGRESS.md

## Current phase

OpenClaw curriculum restoration complete. 30 paths, 193 lessons across the 7-group taxonomy plus OpenClaw Ecosystem. Build is clean and all content validates.

## Deployment audit fixes (2026-04-13)

- **UX-01 fixed:** Mastery gap label on dashboard now shows the path title (e.g. "Start Here") instead of the raw slug (`"01-start-here"`). Fixed in `lib/roadmap.ts` `buildMasteryGapSummary`.
- **BUG-01 fixed:** Race condition in daily tutor limit replaced with atomic PostgreSQL RPC (`infra/migrations/02_atomic_tutor_limit.sql`). `services/daily_limit.py` updated to call `increment_tutor_usage` RPC instead of read-then-write.
- **GAMIF-01 fixed:** Backend `gamification.py` now writes `clearance_level` to `alumni_status` based on streak milestones (Initiate → Operative → Agent → Commander). Never demotes — only promotes.
- **GAMIF-02 fixed:** Lesson completion in `LessonPlayer.tsx` now fires a fire-and-forget `POST /api/gamification/streak` after each successful hosted save. New Next.js route at `app/api/gamification/streak/route.ts`.
- **UX-03 fixed:** Path overview lesson list now merges browser-local fallback completions via `PathLessonListHydration` client component so learners see correct "Completed" badges even before server sync.
- **ARCH-01 fixed:** Python tutor router removed from `main.py` includes. All LLM calls go through the Next.js `/api/tutor` route. Python tutor files retained for reference.
- **OPS-01 added:** Sentry SDK (`@sentry/nextjs`) installed and configured in `sentry.client.config.ts`, `sentry.server.config.ts`, `instrumentation.ts`. Activates only when `NEXT_PUBLIC_SENTRY_DSN` is set.
- **OPS-02 added:** PostHog SDK (`posthog-js`) installed and wired via `PostHogProvider` in the root layout. Activates only when `NEXT_PUBLIC_POSTHOG_KEY` is set. Auto-captures pageviews.
- **TEST-02 fixed:** Playwright e2e tests added to CI pipeline (`e2e` job in `.github/workflows/ci.yml`). Reports artifact on failure.
- **INFRA-01 fixed:** Dockerfile hardened — non-root `apiuser`, `HEALTHCHECK`, `.dockerignore`, proper `exec` CMD for graceful shutdown.
- **INFRA-02 added:** `apps/web/vercel.json` deployment config added.
- **INFRA-03 added:** `docs/deployment-runbook.md` written — env vars, schema deploy, Cloud Run steps, smoke tests, incident response, secret rotation.
- **SEC-01 partially fixed:** `.env.example` rewritten with full documentation, rotation warnings, and all required variables. Note: actual key rotation must be done manually at provider dashboards.
- **PERF-01 fixed:** Three.js lazy-loaded in `AuthCard.tsx` via `next/dynamic` with `ssr: false`.
- **Lint fixed:** Pre-existing ESLint errors in `SavedResourcesClient.tsx`, `VerificationBlock.tsx`, `QuizBlock.tsx` resolved. Build is clean.

## In progress

Nothing currently in progress.

## Next

1. Rotate exposed API keys (Anthropic, Supabase, Google) — must be done manually at each provider.
2. Deploy `infra/migrations/02_atomic_tutor_limit.sql` to production Supabase.
3. Configure Sentry DSN and PostHog key in deployment environment.
4. Run load test against tutor endpoint before public launch.
5. Editorial QA on paths 11–19 and 28–30.

## OpenClaw Curriculum Restoration (2026-04-14)

- **Path 11 rewritten:** "OpenClaw: Self-Hosted Agent Infrastructure" — 7 lessons covering what OpenClaw is, the Claw ecosystem, the self-host/API decision, install on macOS/Windows/VPS, and gateway verification. Old sandbox content archived to `content/paths_old/2026-04-curriculum-rewrite/sandbox-foundations/`.
- **Path 28 added:** "OpenClaw Configuration and Skills" — 7 lessons covering model routing, messaging channels, SKILL.md format, skill deployment, .learnings memory system, heartbeat configuration, and the self-improving agent loop mini-project.
- **Path 29 added:** "OpenClaw Security and Production Operations" — 7 lessons covering tool approvals/YES gate, PII scrubbing, security hardening checklist, three real community incidents case study, monitoring and health checks, and safe update/rollback procedure.
- **Path 30 added:** "ZeroClaw and the Claw Variant Ecosystem" — 5 lessons covering ZeroClaw architecture, 10-minute setup, limitations and migration signals, NanoClaw on edge hardware, and the variant selection framework.
- **paths.ts updated:** Paths 11, 28, 29, 30 now registered in the web app under `"OpenClaw Ecosystem"` section.
- **Content validator:** 193 lessons across 30 paths — all valid.
- **Build:** `npm run build` in `apps/web/` — clean, zero errors.

## Completed

- **The ZTM Strategic Pivot:** Overhauled marketing pages and value propositions to highlight *Agentic Alumni Networks*, *Gamified Milestones*, and *Case Studies* (like NVIDIA NemoClaw).
- **Backend Architecture Re-write:**
  - Scaled up the rate limiter (`rate_limit.py`) using Redis caching and sliding windows to prevent horizontal bottlenecks.
  - Injected `python-json-logger` to format API telemetry automatically for Datadog/ELK parsing.
  - Enhanced the AI Tutor Agent with a dynamic "NemoClaw-Style" Orchestrator that intercepts system prompts and adapts its personality based on user conversation history (e.g., "Patient Mentor" vs "Infra Engineer").
  - Built the `gamification.py` backend endpoint to validate user JWT constraints before awarding daily streaks.
- **Curriculum Authoring (Phase 1):**
  - Fully authored the MDX payloads for `nano_claw_organizer.mdx` (Free Tier) and `nemoclaw_simulation.mdx` (Pro Capstone).
  - Drafted the `ZeroClaw Hello World` MDX lesson to complete the 3 Free Entry points block.
  - Adopted the Hybrid Model: Integrated code snippets directly in the MDX text *alongside* fully executable Python/JS starter/solution files packed in `public/assets/labs/`.
- **Lounge & Gamification Sub-systems:**
  - Prototyped the premium "Agent Lounge" UI with mock data using Framer Motion liquid glassmorphism.
  - Formally connected the Authentication Database endpoints for Gamification (`alumni_status`, `user_progress`, `achievements`).
  - Rapidly prototyped the secure "Alumni Command Center" (UI Dashboard).

- **ZTM Stabilization & Bug Fixes:**
  - Hardened the `uvicorn` and FastAPI deployment by ensuring `supabase` and `python-json-logger` dependencies are fully mapped and running in the background.
  - Cleared corrupted Next.js build cache (`.next/`) to resolve `[slug]` router collisions in the `app/(marketing)/` layout.
  - Successfully validated End-to-End frontend/backend synchronization and Agent Lounge dynamic MDX rendering via comprehensive Browser Subagent testing.
  - Restored the high-conversion "One-Liner" marketing punchline to the `HomePage` hero section UI.
- **Audit Remediation Pass (2026-04-09):**
  - Restored the Lounge as a public surface by moving the published-content implementation onto `/lounge` and deleting the stale tracked backup route artifact.
  - Replaced broken Lounge placeholder references with real local SVG assets and added rendering support for custom `Screenshot` and `TerminalSimulation` content blocks.
  - Tightened backend startup/config handling by loading `.env` before router import, requiring admin Supabase credentials for gamification paths, and upgrading readiness checks to return `503` when critical dependencies are missing.
  - Hardened auth accessibility and smoke coverage by wiring explicit input labels, adding accessible provider button names, and updating Playwright to assert against actual runtime behavior instead of test-runner env guesses.
  - Verified the remediation with clean frontend `lint`, clean production `build`, green Playwright smoke suite (`16/16`), and backend `compileall` success.

## In progress

- Editorial QA on the rewritten live curriculum, especially command realism and learner outcomes in the newer Paths 11-19 rewrites.
- Regression hardening for learner-flow surfaces around hosted progress, browser-local fallback/backfill, tutor modes, and path-level consistency.

## Next

1. Add focused regression coverage for local-progress fallback/backfill, dashboard hydration reconciliation, lesson rendering edge cases, and tutor mode gating.
2. Run the remaining visual browser pass on `/` and `/lounge` across desktop and mobile breakpoints.
3. Draft the Capstone MDX payloads for the `mcp-mastery` paths.
4. Harden the gamification service further around concurrency and malformed database edge cases.

## Latest update

- Implemented authenticated local-to-hosted backfill for legacy browser-only lesson completions: authenticated app surfaces now POST old local completions into `/api/progress`, preserve original completion timestamps, remove successfully synced local keys, and refresh the signed-in dashboard state after successful backfill.
- Tightened browser-local lesson progress so it is now user-scoped instead of browser-global, which prevents one learner's local fallback progress from being surfaced or backfilled into another learner's account on a shared machine. Legacy anonymous local progress is still readable and backfillable when no competing user scopes exist.
- Fixed the remaining console-noise issues in the learner flow: `app/layout.tsx` now suppresses root hydration warnings caused by external `<html>` attribute injection, `LessonContent.tsx` now preserves fenced code blocks when splitting lesson bodies, and `LessonPlayer.tsx` now reads only direct lesson-body headings with stable section keys.
- Revalidated the learner-flow changes end to end in the authenticated browser session: the lesson page reload is now clean, dashboard hydration remains correct, a seeded legacy local completion for `lesson-1-2-1-make-a-personal-safety-checklist` backfilled into hosted progress successfully, and the dashboard completed count advanced from `2` to `3` with the local key removed afterward.
- Reworked the tutor runtime so the floating tutor now uses a shared runtime provider, mode-aware gating, richer signed-in state, and `/api/tutor` capability/usage responses that distinguish free and Pro tutor modes.
- Final validation on the current tree is green: frontend `npm run typecheck` passes, production `npm run build` passes, and the final review pass found no remaining blocking issues in the progress-sync diff.
- Verified the hosted cross-device lesson-sync repair end to end in the signed-in browser session for `findbene+cliacademy-d01a1a04@gmail.com`: authenticated `GET /api/progress` for lesson `1.1.2` returned `200` with `completed: false`, authenticated `POST /api/progress` returned `200` with `Progress saved.`, and a second `GET` returned a real Supabase-backed `lesson_id`, `completed_at`, and stored `completion_data`.
- Fixed the last blocker inside the new hosted curriculum sync: live MDX frontmatter stores dotted lesson labels like `1.1.1`, so `apps/web/lib/mdx.ts` now preserves those labels for learner-facing UI while deriving stable integer sort order values for sorting and Supabase `lessons.sort_order` writes.
- Reconciled the dashboard hydration path so completed-lesson totals now merge hosted progress keys with browser-local fallback keys without double counting. In the verified browser session the dashboard now renders `2` completed lessons and advances the continue-learning card to `Make a personal safety checklist` with `2 of 7 lessons completed`.
- Confirmed the local environment is no longer the blocker: `apps/web/.env` now carries the required service-role key, the hosted self-heal runs locally, and the repaired Supabase project schema plus explicit `public` schema client configuration are working together.
- Repaired the stale hosted lesson-progress mapping in code by adding a server-side curriculum sync that upserts the live `PATHS` plus MDX lesson catalog into Supabase `paths`, `modules`, and `lessons`, then retries `/api/progress` lesson resolution against the refreshed hosted rows.
- Wired the same hosted-catalog self-heal into the signed-in dashboard and learner path page so server-rendered completion state can resolve the current live curriculum instead of the stale seeded catalog.
- Revalidated the hosted-sync repair with clean frontend `npm run lint`, clean `npm run typecheck`, clean production `npm run build`, and green Playwright smoke coverage (`18/18`) in `apps/web`.
- Completed the final authenticated browser revalidation with the newly confirmed QA alias `findbene+cliacademy-d01a1a04@gmail.com`: sign-in succeeded, onboarding completed cleanly, `Mark complete` on the first Start Here lesson switched to the local-fallback success state, and the dashboard updated to `1` completed lesson while advancing the continue-learning card to the next lesson.
- Confirmed the user-facing fix is effective even though hosted sync still misses the published lesson mapping in the background: the lesson page reports `Progress saved on this device while lesson sync catches up.`, the lesson is marked complete, and the dashboard reflects completion immediately in the same browser.
- Implemented a learner-facing resilience fix for the published-path mismatch in hosted progress sync: lesson completion now persists locally in the browser, and the dashboard hydrates its completed-count plus continue-learning card from merged server and local progress data.
- Revalidated that lesson-progress fallback change with clean frontend `npm run lint`, clean `npm run typecheck`, green Playwright smoke coverage, and a clean production `npm run build` in `apps/web`.
- Completed the authenticated browser pass with a confirmed Supabase-backed user: login succeeded, `/onboarding` redirected completed users back to `/dashboard`, the dashboard resume card opened the expected lesson, lesson verification required learner evidence and returned real feedback, and sign-out returned cleanly to `/login`.
- Found a real learner-facing regression in authenticated progress persistence: clicking `Mark complete` on `/learn/01-start-here/lesson-1-1-1-create-the-cli-academy-workspace` surfaces `The requested lesson could not be matched to a published path.`, emits a 404-backed failure in the sidebar flow, and leaves dashboard progress unchanged at `0 of 7 lessons completed`.
- Attempted the full authenticated browser pass with the supplied QA credentials and confirmed the active auth environment still requires confirmed email accounts: signing in with `test.learner+qa@yourdomain.com` failed, and signing up the same address created a brand-new unconfirmed user.
- Confirmed the local web app is pointed at a hosted Supabase project and `apps/web/.env` has no service-role key, so the repo cannot self-confirm disposable QA users without inbox access or an externally confirmed seeded account.
- Refreshed the two highest-traffic public hero surfaces: `/` now uses a Spline-powered 3D hero card via `apps/web/components/ui/splite.tsx`, while `/lounge` reuses the former front-page shader animation inside `HeroPick` after making `ShaderBackground` container-aware.
- Revalidated that marketing-surface refresh with clean `npm run lint` and clean production `npm run build` in `apps/web`.
- Re-ran a focused editorial QA pass on the rewritten live Paths 10-16 and confirmed the live lesson corpus already satisfies the structural learner contract, so no curriculum edits were needed from that pass.
- Resumed browser verification on the real local app, confirmed unauthenticated protected-route redirects and callback `next` preservation, and isolated the remaining learner-flow gap to lack of a sanctioned signed-in test account rather than a route/runtime failure.
- Fixed a real auth regression by replacing the dead `Forgot password?` CTA on `/login` with a working recovery flow: added `/forgot-password` and `/reset-password` routes, request/update password cards, and smoke coverage for the new pages plus the login CTA target.
- Revalidated the frontend after the auth recovery fix with clean `npm run lint`, clean `npm run typecheck`, clean `npm run build`, and green Playwright smoke coverage (`18/18`).
- Normalized the live curriculum structure back to the canonical `content/paths/` slugs for Paths 01-19 by archiving stale duplicate trees/files and moving the rewritten Path 11, 12, 14, 15, and 16 content into the stable live directories.
- Hardened `apps/web/lib/mdx.ts` so live lesson loading only includes lesson-pattern MDX files, preventing orphan or duplicate content files from leaking into learner routes.
- Rebuilt `tooling/scripts/validate_content.py` to match the live learner contract: recursive chapter discovery, `lesson-*.mdx` filtering, current frontmatter fields (`title`, `lessonNumber`, `chapterNumber`, `pathNumber`), and ignored-file warnings for non-lesson MDX.
- Updated `content/README.md` so the documented lesson path shape and frontmatter baseline match the live chapterized curriculum instead of the older flat structure.
- Fixed malformed frontmatter in seven Path 17 lesson files and archived the obsolete `nano_claw_organizer.mdx` lab out of the live Path 13 tree into `content/paths_old/2026-04-curriculum-rewrite/...`.
- Revalidated the curriculum after those repairs: the validator now reports 139 live lessons across 19 paths with 0 errors and 0 warnings.
- Added `apps/web/lib/learning.ts` and rewired onboarding completion plus dashboard recommendations/resume behavior to the current live path slugs and first-lesson routes.
- Added mobile app navigation in `AppSidebar`, lesson section progress tracking in `LessonPlayer`, and a real API-backed verification flow through `apps/web/app/api/lesson-verification/route.ts`.
- Updated path metadata for migrated curriculum and added the DOM marker needed for lesson-progress tracking without changing route contracts.
- Revalidated the frontend after these changes with clean `npm run lint`, clean `npm run typecheck`, clean `npm run build`, and green Playwright smoke coverage (`16/16`).
- Rewrote all seven Path 18 MDX lessons under `content/paths/18-real-world-agent-builds-for-everyday-productivity/` to remove template-only `touch`/`nano` loops and replace them with real Claude Code + `CLAUDE.md` assistant workflows.
- Added dual command paths (macOS/Linux and Windows PowerShell) in every lesson walkthrough.
- Added "What can go wrong" troubleshooting tables in every lesson with real risks: runaway loops, over-permission, and avoidable cost overruns.
- Realigned each `VerificationBlock` so deliverables and checks match the actual hands-on activities performed by learners.
- Replaced the older Path 04-09 chapter trees with new practical lesson packs covering codebase mapping, controlled repo operations, debugging/testing/refactoring, Git/GitHub workflows, cross-surface Claude usage, Cowork session discipline, and research/document workflows.
- The working tree also includes the same replacement pattern for later paths that had stale chapter structures (notably Paths 10-16), with old directories removed and new chapter directories staged for the live curriculum surface.
- Rewrote all nine Path 19 MDX lessons under `content/paths/19-capstones-portfolio-proof-and-job-ready-evidence/` around portfolio-grade capstones instead of file-creation drills.
- Standardized Capstone 1 as a bounded daily git digest, Capstone 2 as a real TODO extraction workflow, and Capstone 3 as an integrated git-plus-content curriculum brief pilot.
- Added dual command paths, real troubleshooting tables, and verification checks that match the actual capstone artifacts: scope docs, run logs, reports, case studies, and final portfolio pack.
