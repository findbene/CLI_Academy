# MIGRATION_MAP.md

## Current -> target

- `app/` -> `apps/web/`
- `backend/` -> `apps/api/`
- `scripts/` -> `tooling/scripts/`
- `infrastructure/` -> `infra/`
- `.agentic/`, `.agents/`, `.antigravity/` -> `.claude/`
- `_communication/` -> `docs/archive/communication/`
- `_design_backup/` -> `docs/archive/design-backup/`

## Special handling

- keep historical materials, but move them out of the active root
- only extract shared code into `packages/` after identifying real reuse
