# TASKS.md

This file tracks the build plan for CLI Academy.

## Phase 0 - Repo Foundation

- [x] Create independent product blueprint
- [x] Create operating docs: `README.md`, `CLAUDE.md`, `TASKS.md`, `DECISIONS.md`
- [x] Create product docs: blueprint, PRD, TRD, launch plan, swarm architecture
- [x] Create product marketing context
- [x] Create starter repo health scripts
- [x] Create brand system documentation
- [x] Create UI system documentation
- [x] Create starter design token package
- [ ] Remove or archive temporary blueprint extraction scratch files
- [x] Initialize git for this repo
- [x] Add baseline `.env.example` (`app/.env.example`)
- [x] Add CI workflow (`.github/workflows/ci.yml`)

## Phase 1 - Core Buildable Product

- [x] Scaffold Next.js frontend in `app/` (19 routes, build passing)
- [x] Scaffold FastAPI backend in `backend/`
- [x] Add app font loading and map production fonts to the design tokens
- [x] Build the first shared UI primitives from the token system
- [x] Set up Supabase project structure and migration plan
- [x] Define Phase 1 database schema (`infrastructure/schema.sql` — 871 lines, full RLS)
- [x] Implement auth (Supabase SSR + OAuth callback route)
- [x] Implement onboarding wizard (3-step, saves to Supabase profiles)
- [x] Implement dashboard (server component, real Supabase queries)
- [x] Implement path catalog (`/paths`, `/paths/[slug]`)
- [x] Implement path detail pages (`/learn/[pathSlug]`)
- [x] Implement lesson player (`LessonPlayer` client + `LessonContent` server)
- [x] Implement floating tutor (SSE streaming via `/api/tutor`, Anthropic SDK)
- [x] Implement progress tracking (`/api/progress` GET/POST)
- [x] Implement download center (`/downloads` — tiered asset list)
- [x] Implement Stripe checkout and webhooks (`/api/stripe/checkout`, `/api/stripe/webhook`)
- [x] Implement telemetry events (`/api/events`)
- [x] Ship first free flagship path (beginners: 8 lessons, windows: 6 lessons, macos: 5 lessons)
- [x] Ship Claude Code Setup/Config/Troubleshoot path (8 lessons — config, errors, hooks, MCP)
- [x] Ship Claude CoWork: Agentic Knowledge Work path (7 lessons — research preview product)
- [x] Define full 6-section curriculum architecture (17 paths, PathMeta status field, section grouping)
- [x] Rewrite paths catalog page with section-grouped display and coming-soon handling
- [x] Scaffold OpenClaw Ecosystem paths (openclaw-deployment, nemoclaw-runtime, zeroclaw-quickstart, autoclaw-automation)
- [x] Scaffold Professional Track paths (marketers, founders, sales, analysts, students)
- [x] Configure and deploy (Supabase credentials, Stripe products, Vercel, Railway)
- [ ] Write full content for MCP Server Mastery (9 lessons)
- [ ] Write full content for VPS Deployment (10 lessons)
- [ ] Write full content for OpenClaw Deployment (8 lessons)
- [ ] Write full content for NemoClaw Runtime (6 lessons)
- [ ] Write full content for ZeroClaw Quickstart (5 lessons)
- [ ] Write full content for AutoClaw Automation (7 lessons)
- [ ] Write full content for Workflow Automation (7 lessons)

## Phase 2 - Monetization and Trust Depth

- [ ] Add annual plan as default upgrade emphasis
- [ ] Replace all placeholder downloadable assets with polished real assets
- [ ] Add release notes center
- [ ] Add known issues center
- [ ] Add stale-content detection and visible freshness warnings
- [ ] Expand tutor context quality
- [ ] Add email onboarding and upgrade lifecycle
- [ ] Add video snippet support to lessons

## Phase 3 - Retention and Role Expansion

- [x] Define Professional Tracks section in curriculum architecture (5 paths scaffolded)
- [ ] Write full content for Claude Code for Marketers (7 lessons)
- [ ] Write full content for Claude Code for Founders (7 lessons)
- [ ] Write full content for Claude Code for Sales (7 lessons)
- [ ] Write full content for Claude Code for Analysts (7 lessons)
- [ ] Write full content for Claude Code for Students (6 lessons)
- [ ] Add badges and completion status
- [ ] Add certificate system
- [ ] Add community layer
- [ ] Add richer assessment system
- [ ] Add internal content ops agents beyond tutor support

## Phase 4 - Team Product

- [ ] Add org accounts
- [ ] Add seat management
- [ ] Add manager dashboard
- [ ] Add team billing
- [ ] Add private/custom paths
- [ ] Add team onboarding workflows

## Phase 5 - Expansion

- [ ] Launch template/blueprint marketplace
- [ ] Launch integration hub
- [ ] Launch ROI reporting
- [ ] Launch managed runtime offering
- [ ] Add enterprise SSO/SAML

## Immediate Next Build Sequence

1. Initialize git and baseline project config
2. Scaffold the app/backend directories
3. Load the production fonts and wire the token system into global styles
4. Write Phase 1 schema contract
5. Build the learner journey from landing page to first lesson completion
6. Build the tutor and verified lab loop
7. Add payment and entitlement infrastructure
8. Prepare launch assets and soft-launch plan
