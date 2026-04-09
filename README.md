# CLI Academy

CLI Academy is a learner-first product for helping people get from zero to productive with Claude Code, Claude Cowork, OpenClaw-style runtimes, and safe agentic workflows on real machines.

This repository has already been normalized into a small-root, multi-surface layout so humans and agents can work in it without broad context loading.

## Repo goals

- Keep the root small and obvious.
- Separate deployable apps from shared code, content, infrastructure, and process docs.
- Make agent context loading narrow and intentional.
- Preserve decision history, progress, and handoff state without polluting implementation files.
- Treat curriculum content as a first-class product surface.

## Current structure

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

## Why this structure exists

The repo previously had overlapping root responsibilities and historical runtime folders that made ownership blurry and increased context noise for both humans and agents.

The current structure fixes that by:

- keeping the product runtime under `apps/`
- keeping agent policy and memory under `.claude/`
- keeping shared code under `packages/`
- keeping curriculum under `content/`
- keeping historical or one-off material under `docs/archive/`
- keeping scripts under `tooling/`

## Current repo state

- Repo normalization is complete.
- The active frontend lives in `apps/web/`.
- The active backend lives in `apps/api/`.
- Curriculum and downloadable assets live in `content/`.
- The live curriculum is normalized back to the canonical `content/paths/` slugs for Paths 01-19, with stale duplicate trees archived under `content/paths_old/`.
- The curriculum rewrite now extends well beyond normalization: live Paths 04-19 are being replaced with deeper practical chapter trees, and older chapter directories are being retired from the learner-facing surface.
- Learner-flow support in `apps/web/` now includes onboarding start-route recommendations, dashboard resume targets, section-progress tracking, server-backed lesson verification, hosted lesson-progress self-healing, browser-local progress fallback/backfill, and password recovery.
- Supabase-backed lesson progress now resolves against the live curriculum catalog through `apps/web/lib/supabase/curriculum-sync.ts`, with user-scoped local fallback/backfill protecting learners during sync gaps.
- The floating tutor runtime has been expanded with mode-aware gating, signed-in usage checks, and richer learner-facing context through `apps/web/components/tutor/TutorRuntimeProvider.tsx` and `/api/tutor`.
- Shared extraction work is expected to move gradually into `packages/` when duplication justifies it.
- The current workstream is curriculum QA and learner-flow hardening: keeping live lesson content, hosted progress semantics, tutor behavior, and app UX aligned.

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

## Near-term priorities

1. Add regression coverage around hosted lesson progress, browser-local fallback/backfill, dashboard hydration reconciliation, and tutor mode gating.
2. Continue editorial QA on the rewritten and migrated live paths, especially Paths 11-19.
3. Revisit backend persistence and gamification concurrency semantics.
4. Decide the long-term handling strategy for legacy `paths_old/` content and historical lesson artifacts.

## Project-level operating files

- `apps/web/CLAUDE.md` — frontend-specific rules
- `apps/api/CLAUDE.md` — backend-specific rules

These local files override or narrow the global operating contract only for work in that subtree.
