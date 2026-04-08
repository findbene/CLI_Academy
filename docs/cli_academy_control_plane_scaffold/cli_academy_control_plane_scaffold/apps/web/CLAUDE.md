# apps/web/CLAUDE.md

This file narrows the global contract for frontend work.

## Read before editing

1. root `CLAUDE.md`
2. this file
3. local files relevant to the route or component

## Frontend priorities

- make learner flows obvious
- keep guided learning UI calm and legible
- preserve predictable lesson rendering
- favor reusable components over duplicated route-local logic

## Folder expectations

- `app/` or route segments = routing and screens
- `components/` = reusable UI pieces
- `lib/` = frontend utilities, content loaders, integration helpers
- `public/` = static assets
- `e2e/` = frontend end-to-end tests

## Do not

- put backend-only logic here
- hide business rules inside UI components
- create duplicate tutor logic in multiple places
- couple route layout to one-off content hacks

## Update docs when

- route conventions change
- content loading strategy changes
- lesson/tutor rendering contracts change
