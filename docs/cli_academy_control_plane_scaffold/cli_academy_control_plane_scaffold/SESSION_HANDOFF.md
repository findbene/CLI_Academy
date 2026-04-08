# SESSION_HANDOFF.md

## Last known objective

Restructure CLI Academy into a cleaner top-level scaffold with a durable agent control plane.

## What was established

- target repo structure
- root control docs
- local `CLAUDE.md` strategy for `apps/web` and `apps/api`

## Continue from here

1. compare current repo tree against target structure
2. execute moves in a branch-safe order
3. update imports, docs, and CI paths as needed
4. verify web and api boot successfully

## Risks to watch

- stale path references after moving `app/` and `backend/`
- orphaned hidden agent memory folders
- archived files accidentally left in active runtime paths
