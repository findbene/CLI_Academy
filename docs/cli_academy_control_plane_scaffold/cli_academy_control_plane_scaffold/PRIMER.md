# PRIMER.md

## What this repo is

CLI Academy is a product repo with five major concerns:

1. learner-facing web app
2. backend/tutor APIs
3. curriculum content
4. agent operating/control docs
5. infrastructure and tooling

## What to look at first

- Product shell: `apps/web/`
- APIs and tutor services: `apps/api/`
- Learning content: `content/`
- Decisions and direction: `DECISIONS.md`, `PLAN.md`, `PROGRESS.md`
- Agent rules: `.claude/` and `CLAUDE.md`

## Current repo correction objective

Reduce the flat, overlapping root structure and establish a durable control plane with clean ownership boundaries.

## Quick mental model

- Humans start with `README.md`
- Agents start with `CLAUDE.md`
- Current truth lives in `PROGRESS.md` and `TASKS.md`
- Durable rationale lives in `DECISIONS.md`
- Current plan lives in `PLAN.md`
