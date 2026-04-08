# TASKS.md

## P0 (Current Epic: The ZTM Paradigm Shift)

- [x] Pivot architecture towards Zero To Mastery gamification and monetizable tracks.
- [x] Refactor missing backend logic (Redis rate limits, dynamic tutor supervisor, gamification hooks).
- [x] Scaffold Phase 1 curriculum MDX and hybrid asset clusters (`nano_claw_organizer.mdx`, `nemoclaw_simulation.mdx`).
- [ ] Build the 3rd Free Entry Lesson (`ZeroClaw Hello World` or `First Claude Code Task`).
- [ ] Connect Authentication profiles (Supabase) to persist gamification streaks natively instead of mocks.
- [ ] Scaffold the "Alumni Command Center" (UI Dashboard).
- [ ] Build Out the "Agent Lounge" UI components for viral infotainment conversion.

## P1 (System Standardization)

- [x] create migration branch for repo normalization
- [x] move `app/` to `apps/web/`
- [x] move `backend/` to `apps/api/`
- [x] rename `infrastructure/` to `infra/`
- [x] move `scripts/` to `tooling/scripts/`
- [x] consolidate hidden agent folders into `.claude/`
- [ ] verify CI/CD, deployment, and env references after the `apps/` migration
- [ ] add package boundaries under `packages/`
- [ ] move reusable lesson/tutor logic out of app-specific code when justified
- [ ] create `docs/architecture/` migration notes
- [ ] clean obsolete `paths_old/` handling strategy

## P2 (Observability & Validation)

- [ ] add lint/validation rules for repo structure
- [ ] add content manifest validation
- [ ] add docs freshness checks for root operating files
