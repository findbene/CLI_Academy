# CLI Academy

CLI Academy is an independent SaaS learning platform built to help ordinary people successfully set up, troubleshoot, understand, and start using Claude Code, Claude CoWork, and related agentic tools on real machines and environments.

This repo is the new home for the product. It is intentionally separate from `C:\Citadel_AI_Automation`. We can borrow what was strong from Citadel, but this codebase is designed to stand on its own.

## Product Thesis

CLI Academy is not a generic course site.

It is a guided product for setup, configuration, troubleshooting, first useful wins, and practical growth with Claude-based tools through:

- Structured setup-first learning paths
- OS-specific and environment-specific guidance
- Contextual troubleshooting
- Downloadable and printable assets
- Visual teaching support
- Guided setup wizards
- A built-in tutor
- A coordinated internal agent system that improves support and content behind the scenes

The core wedge:

> The safest, most beginner-friendly place to set up, troubleshoot, understand, and start using Claude Code, Claude CoWork, and related agentic tools on real machines and real environments.

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

- Strong product and curriculum planning documents
- A real Supabase schema baseline
- A thin FastAPI backend scaffold
- Strong beginner/setup lesson content plus advanced content drafts
- AI-builder operating rules
- Starter repository structure
- Small validation scripts

It does not yet contain the rebuilt learner frontend, mature trust/download systems, or the full production product implementation. The next build step is to rebuild the learner app around the setup-and-troubleshooting core documented in `docs/`.

## Repo Map

- `docs/` - blueprint and supporting product/technical/brand docs
- `.agents/` - product marketing context for future marketing work
- `app/` - planned Next.js frontend home; currently needs rebuilding
- `backend/` - thin FastAPI backend scaffold
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
- `docs/CLI_ACADEMY_RECOVERY_REFRAME_AND_REBUILD.md`

## Operating Principles

- Build the independent product first, not a Citadel dependency chain
- Make beginner setup and troubleshooting the core product area
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
