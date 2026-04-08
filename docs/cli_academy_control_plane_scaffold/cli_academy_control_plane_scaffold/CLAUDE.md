# CLAUDE.md

This file is the global operating contract for any agent working in the CLI Academy repository.

## Mission

Build and maintain CLI Academy as a beginner-friendly, project-first learning platform for Claude Code, Claude Cowork, OpenClaw-style runtimes, and secure agentic workflows.

Optimize for:

- clarity over cleverness
- safe defaults over risky speed
- narrow context loading over broad scanning
- stable architecture over improvisation
- production-ready content and code over placeholders

## Read order

Always read these files in order before making meaningful changes:

1. `README.md`
2. `CLAUDE.md`
3. `PRIMER.md`
4. `TASKS.md`
5. `PROGRESS.md`
6. `SESSION_HANDOFF.md`

Then read only the minimum local files required for the task.

## Hard rules

1. Do not invent architecture that contradicts the root docs.
2. Do not create new top-level folders unless explicitly approved.
3. Do not duplicate responsibilities across `.claude/`, `apps/`, `packages/`, `content/`, `docs/`, `infra/`, `tooling/`, and `tests/`.
4. Do not keep scratch files in the repo root.
5. Do not leave historical experiments in active product folders; archive them.
6. Do not modify more files than the task requires.
7. Do not silently change naming conventions, route structure, content schema, or API contracts.
8. Do not write placeholder copy in learner-facing surfaces unless clearly marked.
9. Do not bury safety-critical instructions for learners.
10. Do not let generated content drift from the beginner-friendly, calm, plain-English tone.

## Context loading policy

Use the smallest useful context.

### For frontend work

Read:
- `apps/web/CLAUDE.md`
- relevant files under `apps/web/`
- only the relevant content or package files

### For backend work

Read:
- `apps/api/CLAUDE.md`
- relevant files under `apps/api/`
- only the relevant shared package files

### For curriculum/content work

Read:
- `content/README.md`
- relevant path/lesson files
- any referenced docs in `docs/curriculum/`

### For architecture/refactor work

Read:
- `ARCHITECTURE.md`
- `DECISIONS.md`
- `PLAN.md`
- affected local `CLAUDE.md` files

## Required outputs by task type

### Code change

Update:
- relevant implementation files
- `PROGRESS.md` if status materially changes
- `SESSION_HANDOFF.md` if another session must continue

### Architecture or workflow change

Update:
- `DECISIONS.md`
- `PLAN.md`
- `PROGRESS.md`
- `SESSION_HANDOFF.md`

### Content/curriculum change

Update:
- relevant content files
- `content/README.md` if conventions change
- `PROGRESS.md`
- `SESSION_HANDOFF.md`

## Directory contract

- `.claude/` = agent operating system, rules, templates, context helpers
- `apps/` = deployable product applications
- `packages/` = extracted shared code and schemas
- `content/` = curriculum source of truth
- `docs/` = durable docs and archived materials
- `infra/` = infrastructure and deployment assets
- `tooling/` = scripts and generators
- `tests/` = cross-cutting tests

## Naming conventions

- Use plain folder names for product domains.
- Use dot folders only for control/config folders.
- Use kebab-case for content folders and markdown artifacts.
- Keep file names descriptive and stable.

## Editing protocol

Before editing:
- identify the owning folder
- identify the smallest necessary scope
- identify whether docs must be updated

After editing:
- verify the change works
- record material changes in `PROGRESS.md`
- leave a concise continuation note in `SESSION_HANDOFF.md`

## Escalation triggers

Stop and ask for approval if the task would:
- create a new top-level folder
- delete or archive a large subtree
- change schema or public API shape
- merge multiple agent systems into one without a migration plan
- remove old content paths without a redirect/archive strategy

## Preferred behavior

- Think in systems, not isolated files.
- Prefer consolidation over proliferation.
- Prefer one obvious home for each concern.
- Prefer explicit migration plans over ad hoc moves.
