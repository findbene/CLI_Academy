# PROGRESS.md

## Current phase

Repository normalization and control-plane hardening.

## Completed

- Defined target top-level scaffold
- Defined root operating documents
- Defined global and project-level `CLAUDE.md` contracts
- Mapped existing folders to target structure
- Migrated root-level experiments and archives
- Separated active product code from historical scaffolding
- Moved `app/` to `apps/web/`
- Moved `backend/` to `apps/api/`
- Moved scripts into `tooling/scripts/`
- Consolidated `.agentic`, `.agents`, `.antigravity` into `.claude/`
- Archived `_communication/` and `_design_backup/`

## In progress

- Verify the new paths and update deployment configs / pipelines if necessary.

## Next

1. Add package boundaries under `packages/`
2. Move reusable lesson/tutor logic out of app-specific code
3. Create `docs/architecture/` migration notes
