# PROGRESS.md

## Current phase

Zero-To-Mastery (ZTM) Infrastructure & Pedagogy Implementation.

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

- Foundational scoping for the Pro-Tier `mcp-mastery` and `workflow-automation` modules.
- Editorial QA pass across the rewritten and migrated live curriculum, especially Paths 04-19 and most urgently Paths 11, 12, 14, 15, 16, 18, and 19.
- Learner-flow QA on the recently hardened onboarding, dashboard resume, lesson progress, and verification surfaces.

## Next

1. Run editorial QA on the migrated live paths and spot-check command validity on macOS/Linux and Windows PowerShell.
2. Draft the Capstone MDX payloads for the `mcp-mastery` paths.
3. Harden the gamification service further around concurrency and malformed database edge cases.
4. Expand browser-backed QA beyond smoke coverage to authenticated onboarding/dashboard/lesson flows.

## Latest update

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
