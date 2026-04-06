# TASKS.md

This file tracks the canonical rebuild plan for CLI Academy.

## Reality Reset

After the repo audit on 2026-04-06, this is the current truth:

- the repo has strong product and curriculum planning docs
- the repo has a real schema baseline in `infrastructure/schema.sql`
- the repo has a thin FastAPI backend scaffold
- the repo has a rebuilt Next.js recovery scaffold in `app/`
- the repo has strong beginner/setup lesson content
- the frontend route architecture is restored, but the real auth/data/billing logic still needs rewiring
- the repo should still be treated as a selective salvage plus rebuild, not as a near-launch product

Use this file as the source of truth going forward.

## Phase 0 - Truth Alignment and Recovery

- [x] Audit the repo and identify actual strengths, gaps, and contradictions
- [x] Create `docs/CLI_ACADEMY_RECOVERY_REFRAME_AND_REBUILD.md`
- [x] Recenter product strategy on beginner setup and troubleshooting
- [x] Update `README.md` to reflect the true core product and repo state
- [x] Update `docs/PRD.md` to reflect the setup-first MVP
- [x] Replace stale task assumptions with this recovery plan
- [x] Update `.agents/product-marketing-context.md` to match the new canonical positioning
- [x] Update `DECISIONS.md` to reflect the stronger core wedge and reality reset
- [x] Update `docs/TRD.md` to reflect frontend rebuild, schema v2, and trust surfaces
- [ ] Remove or archive temporary blueprint extraction scratch files

## Phase 1 - Rebuild the Core Learner Product

### Frontend

- [x] Scaffold and commit the new Next.js frontend in `app/`
- [x] Build public marketing shell
- [x] Restore route-group architecture and core page skeletons
- [x] Restore recovered API route surface in `app/api`
- [x] Restore lesson route shell and filesystem-backed content loading
- [x] Build dashboard shell
- [x] Build setup-first path catalog
- [x] Build path detail pages
- [x] Build downloads center shell
- [x] Build floating tutor shell
- [ ] Build onboarding flow
- [ ] Build lesson player with support for warnings, screenshots, diagrams, and recap blocks
- [x] Build troubleshooting center
- [x] Build compatibility matrix UI
- [ ] Replace recovery-mode stubs with real Supabase, Stripe, and Anthropic integrations

### Backend

- [x] Keep the current FastAPI scaffold in `backend/`
- [ ] Add tutor rate-limit enforcement to match policy
- [ ] Add progress endpoints
- [ ] Add enrollment and entitlement endpoints
- [ ] Add downloads endpoints
- [ ] Add compatibility and troubleshooting endpoints
- [ ] Add telemetry/event ingestion endpoints

### Data Model

- [x] Keep the current schema as a baseline
- [ ] Design schema v2 for tracks, courses, lesson steps, downloads, tutor contexts, compatibility, troubleshooting, versions, and freshness
- [ ] Add migration plan from the current schema to schema v2

## Phase 2 - Flagship Beginner Content and Trust Surfaces

- [ ] Polish Claude Code Setup for Absolute Beginners
- [ ] Polish Claude CoWork Introduction and Setup for Beginners
- [ ] Polish Claude Code + CoWork Troubleshooting Basics
- [ ] Build First Useful Things to Do with Claude Code path
- [ ] Build Safe Use, Files, Commands, and Project Structure Basics path
- [ ] Add Linux setup path
- [ ] Add screenshots to major setup lessons
- [ ] Add diagrams to major setup lessons
- [ ] Add short video metadata/support for major setup lessons
- [ ] Create real PDF checklists for flagship paths
- [ ] Create real Markdown guides for flagship paths
- [ ] Add tested-on metadata system
- [ ] Add content freshness review workflow
- [ ] Add known issues center
- [ ] Add release radar

## Phase 3 - Productive Use and Role Expansion

- [ ] Build CLAUDE.md / MEMORY.md path
- [ ] Build Skills, Slash Commands, Plugins, and Hooks path
- [ ] Build beginner MCP path
- [ ] Rewrite marketer track from placeholder to real curriculum
- [ ] Rewrite founder track from placeholder to real curriculum
- [ ] Rewrite analyst track from placeholder to real curriculum
- [ ] Rewrite student track from placeholder to real curriculum
- [ ] Add junior developer track
- [ ] Add designer track
- [ ] Merge sales into a broader sales and ops track
- [ ] Add richer downloadable use-case packs

## Phase 4 - Automation and Advanced Infrastructure

- [ ] Build agent workflow foundations path
- [ ] Build subagents and agent teams path
- [ ] Build n8n / Make / Zapier path
- [ ] Expand Claude Code on a VPS path
- [ ] Add Mac mini / dedicated box deployment path
- [ ] Add OpenClaw foundations path
- [ ] Add OpenClaw deployment and troubleshooting path
- [ ] Add OpenClaw variants comparison path
- [ ] Expand NemoClaw, ZeroClaw, and AutoClaw content as advanced tracks

## Phase 5 - Business and Team Expansion

- [ ] Add recommendations engine
- [ ] Add badges and certificates
- [ ] Add team account foundations
- [ ] Add manager views
- [ ] Add team billing
- [ ] Add internal content freshness agents

## What Not To Build Yet

- [ ] Do not build a marketplace yet
- [ ] Do not build a broad community layer yet
- [ ] Do not build enterprise SSO yet
- [ ] Do not build a managed runtime yet
- [ ] Do not ship shallow placeholder tracks as if they are real products

## Immediate Next Build Sequence

1. Finish doc alignment in `DECISIONS.md`, `TRD.md`, and `.agents/product-marketing-context.md`
2. Rebuild the frontend shell in `app/`
3. Add tutor rate limiting and core learner APIs to `backend/`
4. Design and implement schema v2
5. Ship the flagship beginner setup-and-troubleshooting experience
6. Add the downloads center, compatibility matrix, and trust surfaces
7. Only then expand deeper Pro content
