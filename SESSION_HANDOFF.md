# SESSION_HANDOFF.md

## Last known objective

Finish the curriculum remediation pass, make the rewritten lessons the actual live learner experience, and harden the learner-facing frontend flows that sit on top of that content.

## What is now true

- `/lounge` is public again and now serves the real published Lounge content instead of an auth-gated app route.
- The stale tracked Lounge backup page has been removed, and broken placeholder media references were replaced with local SVG assets under `apps/web/public/assets/placeholders/`.
- `apps/web/components/lounge/LoungeContent.tsx` now renders the custom `Screenshot` and `TerminalSimulation` blocks already used in published content.
- Auth surfaces expose proper accessible names/labels, and the Playwright smoke suite now validates runtime behavior without assuming env state from the test runner.
- Backend startup now loads `.env` before importing routers, gamification admin paths no longer fall back to anon credentials, and `/health/ready` returns `503` when critical dependencies are missing.
- Validation is green: frontend `lint`, frontend production `build`, Playwright smoke suite (`16/16`), and backend `python -m compileall apps/api` all passed.
- The active curriculum under `content/paths/` is normalized back to the canonical live slugs for Paths 01-19. Stale duplicate trees/files were archived, and the rewritten Path 11, 12, 14, 15, and 16 content now lives under the stable learner-facing directories.
- `apps/web/lib/mdx.ts` now only loads lesson-pattern MDX files, which stops stray non-lesson files from appearing in the learner experience.
- Path metadata for migrated curriculum was updated in `apps/web/lib/data/paths.ts` without changing the public slugs.
- Onboarding completion now routes learners to a real first lesson, dashboard recommendations use current path slugs, and the dashboard exposes a real "Continue learning" target based on lesson progress.
- `AppSidebar` now has mobile navigation, `LessonPlayer` now tracks section progress from in-page headings, and lesson verification now uses the server-backed `apps/web/app/api/lesson-verification/route.ts` endpoint instead of a fake timeout.
- Validation is green for the new learner-flow changes: frontend `lint`, `typecheck`, production `build`, and Playwright smoke suite (`16/16`) all passed after the loader and UX changes.
- Path 18 (Real-World Agent Builds for Everyday Productivity) lesson bodies were fully rewritten across all 7 MDX files to use real agent workflows with `CLAUDE.md` contracts, dual-platform terminal commands, troubleshooting tables, and activity-accurate verification checks.
- Path 19 (Capstones, Portfolio Proof, and Job-Ready Evidence) lesson bodies were fully rewritten across all 9 MDX files to replace template drills with real capstone workflows, portfolio artifacts, dual-platform commands, failure-mode coverage, and deliverable-accurate verification blocks.
- Paths 04-09 now have replacement chapter trees staged in the live curriculum with deeper practical lessons for repo mapping, controlled edits, debugging/testing/refactoring, Git/GitHub workflows, environment switching, Cowork session management, and research/document work. The older chapter trees for those paths are removed from the working tree.
- The same replacement pattern is staged for later curriculum surfaces that still had older chapter structures, with new chapter directories present and stale ones removed for Paths 10-16.
- `tooling/scripts/validate_content.py` now validates the live curriculum structure instead of the obsolete flat schema: it recurses through chapter folders, counts only `lesson-*.mdx`, checks the current numbering fields, and flags ignored non-lesson MDX files.
- `content/README.md` now documents the current lesson path shape and frontmatter baseline used by the live loader.
- Seven malformed Path 17 lesson files were repaired by restoring their closing frontmatter delimiter, which cleared the only real validation errors surfaced by the modernized validator.
- The obsolete `nano_claw_organizer.mdx` lab was archived out of the live Path 13 tree into `content/paths_old/2026-04-curriculum-rewrite/...`, so the learner-visible curriculum no longer carries stray historical MDX artifacts.
- Curriculum validation is now fully clean: 139 live lessons across 19 paths, 0 errors, 0 warnings.

## Continue from here

1. Continue editorial QA on the migrated live curriculum, especially Paths 11, 12, 14, 15, 16, 18, and 19, with shell-by-shell command checks and learner-outcome review, now that the content validator reflects the real live structure.
2. Confirm the larger Path 04-16 chapter replacements with validation/build gates and spot-check that the new live chapter directories resolve through the loader as intended.
3. Do authenticated browser QA for the newly changed app-only surfaces: onboarding completion, dashboard continue-learning card, mobile app navigation, lesson progress, and verification UX.
4. Revisit gamification writes for concurrency safety and stricter database edge-case handling.
5. Continue the Pro-tier lesson/module scoping for `mcp-mastery` and `workflow-automation`.
6. If another audit pass is requested, focus on curriculum quality, backend persistence semantics, and authenticated product completeness rather than route stability.

## Risks to watch

- Gamification still needs a stronger concurrency story; the credential path is fixed, but the update/write flow is not yet fully race-proof.
- Local developers still need a `redis` instance running, otherwise `rate_limit.py` dynamically falls back to an in-memory dictionary.
- Lounge content rendering now supports the currently used custom blocks, but future MDX-like components should be added deliberately rather than relying on raw HTML fallback.
- The live lesson loader now assumes lesson files follow the `lesson-*.mdx` naming convention. Any future curriculum file that should be learner-visible must follow that pattern or it will be ignored.
- Historical curriculum artifacts still exist under `content/paths_old/`; if a non-lesson MDX appears under `content/paths/`, archive or normalize it instead of leaving it beside live lessons.
- The large staged replacement across Paths 04-16 changes chapter directory names as well as lesson bodies. Future curriculum edits should work against the new live directories, not the deleted legacy chapter trees.
- The latest validation covers static checks and unauthenticated smoke routes. The newly changed authenticated learner flows still need explicit browser QA with a signed-in user.
- Path 18 now has stronger operational safety guidance, but command examples should still be periodically re-verified against actual shell/tool availability in learner environments.
- Path 19 now has stronger capstone structure and safer failure-mode guidance, but the example commands should still be editorially spot-checked against actual learner shell behavior and the intended repo-relative working directory.
