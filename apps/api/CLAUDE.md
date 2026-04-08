# apps/api/CLAUDE.md

This file narrows the global contract for backend work.

## Read before editing

1. root `CLAUDE.md`
2. this file
3. local router/service files relevant to the task

## Backend priorities

- explicit contracts
- small, testable modules
- clear auth and rate-limit behavior
- safe defaults and predictable error handling

## Folder expectations

- `routers/` = route definitions only
- service logic should stay out of route handlers when it grows
- env and secret usage must remain explicit

## Do not

- mix transport concerns with core logic when avoidable
- hide limits or auth behavior
- duplicate request validation across files without reason
