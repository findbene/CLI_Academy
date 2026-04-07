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
- [x] Remove or archive temporary blueprint extraction scratch files

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
- [x] Build lesson player with support for warnings, screenshots, diagrams, and recap blocks
- [x] Build troubleshooting center
- [x] Build compatibility matrix UI
- [x] Replace recovery-mode stubs with real Supabase, Stripe, and Anthropic integrations

### Backend

- [x] Keep the current FastAPI scaffold in `backend/`
- [x] Add tutor rate-limit enforcement to match policy
- [x] Add progress endpoints
- [ ] Add enrollment and entitlement endpoints
- [ ] Add downloads endpoints
- [ ] Add compatibility and troubleshooting endpoints
- [x] Add telemetry/event ingestion endpoints

### Data Model

- [x] Keep the current schema as a baseline
- [ ] Design schema v2 for tracks, courses, lesson steps, downloads, tutor contexts, compatibility, troubleshooting, versions, and freshness
- [ ] Add migration plan from the current schema to schema v2

## Phase 2 - Flagship Beginner Content and Trust Surfaces

- [x] Polish Claude Code Setup for Absolute Beginners
- [x] Polish Claude CoWork Introduction and Setup for Beginners
- [x] Polish Claude Code + CoWork Troubleshooting Basics
- [x] Build First Useful Things to Do with Claude Code path
- [x] Build Safe Use, Files, Commands, and Project Structure Basics path
- [ ] Add Linux setup path
- [x] Add screenshots to major setup lessons
- [x] Add diagrams to major setup lessons
- [ ] Add short video metadata/support for major setup lessons
- [x] Create real PDF checklists for flagship paths
- [x] Create real Markdown guides for flagship paths
- [ ] Add tested-on metadata system
- [ ] Add content freshness review workflow
- [x] Add known issues center
- [ ] Add release radar

## Phase 3 - Productive Use and Role Expansion

- [x] Build CLAUDE.md / MEMORY.md path
- [x] Build Skills, Slash Commands, Plugins, and Hooks path
- [x] Build beginner MCP path
- [x] Rewrite marketer track from placeholder to real curriculum
- [x] Rewrite founder track from placeholder to real curriculum
- [x] Rewrite analyst track from placeholder to real curriculum
- [x] Rewrite student track from placeholder to real curriculum
- [ ] Add junior developer track
- [ ] Add designer track
- [ ] Merge sales into a broader sales and ops track
- [ ] Add richer downloadable use-case packs

## Phase 4 - Automation and Advanced Infrastructure

- [x] Build agent workflow foundations path
- [x] Build subagents and agent teams path
- [ ] Build n8n / Make / Zapier path
- [x] Expand Claude Code on a VPS path
- [ ] Add Mac mini / dedicated box deployment path
- [x] Add OpenClaw foundations path
- [x] Add OpenClaw deployment and troubleshooting path
- [ ] Add OpenClaw variants comparison path
- [x] Expand NemoClaw, ZeroClaw, and AutoClaw content as advanced tracks

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

All five rebuild phases (A–E) are complete as of 2025-07-14:

- **Phase A** — Foundation: Aurora hero, footer, middleware merge, recovery copy purge
- **Phase B** — Visual polish: framer-motion transitions, dashboard/lesson/downloads/pricing/trust pages
- **Phase C** — Content: 128 lessons delivered across all 17 paths
- **Phase D** — Backend hardening: real streaming, rate limiting, SDK updates, readiness probe
- **Phase E** — UX features: code-copy blocks, Cmd+K global search, settings editing, auto-advance

Next priorities:
1. Deploy and verify production environment
2. Build onboarding flow
3. Schema v2 migration (tracks, courses, lesson steps, downloads)
4. Content freshness review workflow + tested-on metadata
5. Linux setup path and remaining Phase 2 gaps
7. Only then expand deeper Pro content
