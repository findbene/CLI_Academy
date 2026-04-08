# CLI Academy

CLI Academy is a learner-first SaaS platform for helping normal people go from zero to productive with Claude Code, Claude Cowork, OpenClaw-style runtimes, and safe agentic workflows on real machines.

This repository is organized to stay readable for humans and cheap for agents to reason about.

## Repo goals

- Keep the root small and obvious.
- Separate deployable apps from shared code, content, infrastructure, and process docs.
- Make agent context loading narrow and intentional.
- Preserve decision history, progress, and handoff state without polluting implementation files.
- Treat curriculum content as a first-class product surface.

## Target structure

```text
CLI_Academy/
├── .claude/                  # control plane for Claude Code and compatible agents
├── .github/                  # CI/CD and repo automation
├── apps/
│   ├── web/                  # learner-facing frontend
│   └── api/                  # backend/API services
├── packages/                 # shared libraries and future extracted modules
├── content/                  # paths, lessons, assets, manifests
├── docs/                     # architecture, product, curriculum, ops, archive
├── infra/                    # schema, deployment, environments, ops infra
├── tooling/                  # scripts, generators, maintenance tools
├── tests/                    # cross-app integration/e2e/system tests
├── README.md
├── CLAUDE.md
├── PRIMER.md
├── MEMORY.md
├── PROGRESS.md
├── TASKS.md
├── SESSION_HANDOFF.md
├── DECISIONS.md
├── PLAN.md
├── IMPLEMENT.md
├── DISCOVER.md
└── RULES.md
```

## Why this is the right correction

The current repo has overlapping root responsibilities such as `.agentic`, `.agents`, `.antigravity`, `agents`, `app`, `backend`, `_communication`, and `_design_backup`. That flat shape makes ownership blurry and increases context noise for both humans and agents.

This target structure fixes that by:

- moving the product runtime under `apps/`
- keeping agent policy and memory under `.claude/`
- keeping shared code under `packages/`
- keeping curriculum under `content/`
- moving historical or one-off material under `docs/archive/`
- moving scripts under `tooling/`

## First migration moves

1. Move `app/` to `apps/web/`
2. Move `backend/` to `apps/api/`
3. Move `scripts/` to `tooling/scripts/`
4. Rename `infrastructure/` to `infra/`
5. Merge `.agentic`, `.agents`, and `.antigravity` into `.claude/` where still active
6. Move `_communication/` and `_design_backup/` into `docs/archive/`
7. Keep only stable control docs at root

## Root operating docs

- `CLAUDE.md` — repo operating contract for agents
- `PRIMER.md` — fastest way for a new human or agent to understand the repo
- `MEMORY.md` — stable repo memory and invariants
- `PROGRESS.md` — current state snapshot
- `TASKS.md` — prioritized work queue
- `SESSION_HANDOFF.md` — latest handoff notes for the next session
- `DECISIONS.md` — architecture and product decisions log
- `PLAN.md` — approved near-term plan
- `IMPLEMENT.md` — implementation protocol
- `DISCOVER.md` — discoveries, audits, findings, unknowns
- `RULES.md` — human-readable index of the `.claude/rules/` system

## Agent workflow

1. Read `README.md`
2. Read `CLAUDE.md`
3. Read `PRIMER.md`
4. Read only the additional files needed for the current task
5. Update `PROGRESS.md`, `TASKS.md`, and `SESSION_HANDOFF.md` when material work is completed

## Project-level operating files

- `apps/web/CLAUDE.md` — frontend-specific rules
- `apps/api/CLAUDE.md` — backend-specific rules

These local files override or narrow the global operating contract only for work in that subtree.
