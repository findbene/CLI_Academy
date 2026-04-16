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
- The active frontend lives in `apps/web/`. The active backend lives in `apps/api/`.
- Curriculum and downloadable assets live in `content/`.
- **Curriculum: 30 paths, 194 lessons** across a 7-group taxonomy (Group 0 Orientation → Group 6 Career Pathways) plus an OpenClaw Ecosystem section. Paths 01-27 are the original and redesigned live paths; Paths 28-30 are new OpenClaw deep-dive paths added in April 2026. Path 11 was fully rewritten to actually cover OpenClaw (its slug always promised OpenClaw but previously taught Docker sandboxing).
- **v2 content standard**: all 194 lessons meet the v2 content standard — `## What you will build`, `## Why this matters`, `## Before you start`, 3-criteria rubric criteria, and verifyType diversity (code_submission 45%, terminal_output 25%, quiz 23%, screenshot 7%).
- **Deployment hardening complete**: Sentry error tracking, PostHog analytics, Playwright e2e in CI, atomic tutor rate limit (PostgreSQL RPC), Dockerfile non-root with HEALTHCHECK, Vercel config, and deployment runbook.
- 5 manual launch-gate items remain — secret rotation, migration deploy, Sentry/PostHog env vars, Stripe config. See TASKS.md P0 Ops.
- Learner-flow support includes onboarding start-route recommendations, dashboard resume targets, section-progress tracking, server-backed lesson verification, browser-local progress fallback/backfill, and password recovery.
- Supabase-backed lesson progress resolves against the live curriculum catalog through `apps/web/lib/supabase/curriculum-sync.ts`, with user-scoped local fallback protecting learners during sync gaps.
- Python backend now has a pytest suite covering health probes, gamification streak logic, and daily tutor limit enforcement. Run with `cd apps/api && python -m pytest tests/ -v`.
- Shared extraction work is expected to move gradually into `packages/` when duplication justifies it.

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

1. Complete the 5 manual launch-gate ops tasks (secret rotation, migration deploy, Sentry/PostHog/Stripe env vars).
2. Run editorial QA on paths 11-19 and verify lesson content against learner outcomes.
3. Add regression coverage for local-progress fallback/backfill, dashboard hydration reconciliation, and tutor mode gating.
4. Run load test against the tutor endpoint before public launch (k6 or Locust, target p99 < 2s at 50 concurrent users).

## Project-level operating files

- `apps/web/CLAUDE.md` — frontend-specific rules
- `apps/api/CLAUDE.md` — backend-specific rules

These local files override or narrow the global operating contract only for work in that subtree.
