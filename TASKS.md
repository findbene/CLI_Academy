# TASKS.md

## P0

- [x] create migration branch for repo normalization
- [x] move `app/` to `apps/web/`
- [x] move `backend/` to `apps/api/`
- [x] rename `infrastructure/` to `infra/`
- [x] move `scripts/` to `tooling/scripts/`
- [x] consolidate hidden agent folders into `.claude/`
- [x] move `_communication/` to `docs/archive/communication/`
- [x] move `_design_backup/` to `docs/archive/design-backup/`

## P1

- [ ] verify CI/CD, deployment, and env references after the `apps/` migration
- [ ] add package boundaries under `packages/`
- [ ] move reusable lesson/tutor logic out of app-specific code when justified
- [ ] create `docs/architecture/` migration notes
- [ ] clean obsolete `paths_old/` handling strategy

## P2

- [ ] add lint/validation rules for repo structure
- [ ] add content manifest validation
- [ ] add docs freshness checks for root operating files
