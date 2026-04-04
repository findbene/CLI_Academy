# CLI Academy

CLI Academy is an independent SaaS learning platform built to take people from curiosity to confident, productive use of Claude-powered tools.

This repo is the new home for the product. It is intentionally separate from `C:\Citadel_AI_Automation`. We can borrow what was strong from Citadel, but this codebase is designed to stand on its own.

## Product Thesis

CLI Academy is not a generic course site.

It is a guided product for learning, applying, troubleshooting, and safely operating Claude-based workflows and secure agent systems through:

- Structured learning paths
- Verified labs
- Contextual troubleshooting
- Downloadable assets
- Lightweight video snippets
- Guided setup wizards
- A multi-agent internal system that keeps the content, support, and growth loops sharp

The core wedge:

> The safest, most beginner-friendly way to go from zero to productive with Claude Code and secure AI agent workflows.

## Brand Direction

`cliacademy.app` is a strong domain for this product.

Why it works:

- Clear promise
- Great top-of-funnel memorability
- Strong learner framing
- Good for search, social, and word of mouth

Its risk:

- It is Claude-specific, so if we later broaden beyond Claude we may want an umbrella company brand above it

Current recommendation:

- Public brand: `CLI Academy`
- Product descriptor: `CLI Academy`
- Future umbrella company: decide later only if expansion truly demands it

## Current Status

This repo currently contains:

- A new execution-ready blueprint
- Product, technical, launch, brand, and UI documentation
- AI-builder operating rules
- Starter repository structure
- Starter design tokens
- Small validation scripts

It does not yet contain the production app implementation. The next build step is to scaffold the app and backend from the documents in `docs/`.

## Repo Map

- `docs/` - blueprint and supporting product/technical/brand docs
- `.agents/` - product marketing context for future marketing work
- `app/` - planned Next.js frontend home
- `backend/` - planned FastAPI backend home
- `agents/` - planned internal agent system home
- `content/` - planned curriculum, assets, and lesson source
- `infrastructure/` - planned database, deploy, and environment infrastructure
- `scripts/` - simple repo health helpers

## Core Docs

- `docs/ZERO_TO_CLAUDE_MASTER_BLUEPRINT.md`
- `docs/PRD.md`
- `docs/TRD.md`
- `docs/AGENT_SWARM.md`
- `docs/LAUNCH_PLAN.md`
- `docs/BRAND_SYSTEM.md`
- `docs/UI_SYSTEM.md`
- `CLAUDE.md`
- `TASKS.md`
- `DECISIONS.md`

## Operating Principles

- Build the independent product first, not a Citadel dependency chain
- Keep every idea from the broader vision, but phase it deliberately
- Launch a narrow, excellent v1 before expanding breadth
- Treat trust, safety, and freshness as product features
- Keep monetization honest: do not sell what is not truly ready
- Build one clear product outside, with a coordinated specialist swarm inside

## Initial Commands

From PowerShell:

```powershell
./scripts/repo-health.ps1
./scripts/todo-report.ps1
```

These scripts are lightweight checks for documentation completeness and repo TODO drift.
