# CLAUDE.md

This file defines the operating rules for AI builders working inside the CLI Academy repo.

## Mission

Build an independent, premium SaaS app that helps learners go from zero to productive with Claude-based tools and secure agent workflows.

The product is:

- learner-facing
- premium but practical
- safety-first
- commercially serious
- phased for real execution

## Repo Rule

This repo is the canonical home for CLI Academy.

Do not re-embed the product inside `C:\Citadel_AI_Automation`.
Borrow ideas and patterns from Citadel when useful, but keep this project independent in architecture, documentation, and implementation.

## Current Product Strategy

The working public brand is `CLI Academy`.
The working descriptor is `CLI Academy`.

The primary wedge is:

> The safest, most beginner-friendly way to go from zero to productive with Claude Code and secure AI agent workflows.

## Product Guardrails

Always optimize for:

1. First real learner success
2. Trust and safety
3. Content freshness
4. Monetization honesty
5. Retention through real progress, not gimmicks

Do not optimize for:

- breadth before usefulness
- enterprise features before individual PMF
- flashy AI behavior over reliable outcomes
- selling unfinished paid content

## Phase Discipline

All major ideas from the long-term vision stay in the plan.
They do not all ship in Phase 1.

Use these phases:

- Phase 1: core learner app, first flagship paths, tutor, verified labs, downloads, launch-ready conversion flow
- Phase 2: paid depth, better trust surfaces, release notes, retention loops, richer tutor memory
- Phase 3: role-based paths, more agent-powered content ops, certificates, video system, community
- Phase 4: team workspace, manager dashboards, custom paths, org features
- Phase 5: template marketplace, integration hub, managed runtime, enterprise expansion

## Canonical Tutor Policy

Use one tutor policy everywhere until intentionally changed:

- Free: 10 tutor messages per day
- Pro: 100 tutor messages per day
- Team: pooled limits later, not in Phase 1

If this policy changes, update all of the following together:

- `README.md`
- `DECISIONS.md`
- `docs/PRD.md`
- `docs/TRD.md`
- pricing copy
- backend enforcement
- frontend upgrade messaging

## MVP Boundaries

Phase 1 must ship:

- landing page
- auth
- onboarding
- dashboard
- path catalog
- path detail pages
- lesson player
- floating tutor
- verified labs
- progress tracking
- downloads center
- free/pro gating
- Stripe checkout
- core telemetry
- trust surfaces

Phase 1 must not try to fully ship:

- team workspaces
- certificates
- community layer
- template marketplace
- hosted runtime
- enterprise SSO
- full mobile app

## Technical Defaults

- Frontend: Next.js App Router + TypeScript
- Backend: FastAPI + Python
- Database/Auth/Storage: Supabase
- Payments: Stripe
- Tutor and internal agents: Python agent services with a shared LLM client
- Content: MDX plus structured metadata

## Architecture Rules

- Keep the frontend and backend independently deployable
- Keep internal agents as a system behind the product, not as public confusion
- Keep data models simple in Phase 1 and expandable later
- Keep lesson content Git-native and reviewable
- Keep verification, safety warnings, and freshness metadata first-class

## Safety Rules

- Never ship risky setup/deployment lessons without visible warnings
- Never expose secrets in docs, assets, or examples
- Never imply secure self-hosting without explicit hardening steps
- Never market a feature that is materially unfinished

## Documentation Rules

Every meaningful product or architecture change should update the relevant docs.

At minimum, consider:

- `DECISIONS.md`
- `TASKS.md`
- `docs/PRD.md`
- `docs/TRD.md`
- `docs/ZERO_TO_CLAUDE_MASTER_BLUEPRINT.md`

## Content Authoring Rules

When replacing `*TBD*` blocks inside newly generated MDX files, follow these guidelines:
- **Tone**: Hugely encouraging, direct, and zero-jargon. Optimize for removing fear.
- **Tutor Teaming**: Explicitly instruct the user to ask the Floating Tutor if they get stuck.
- **Verification Alignment**: The walkthrough must result in the exact technical state demanded by the `<VerificationBlock>`.
- Use the provided `tutorPreload` to inform what concepts to teach vs. what concepts the Tutor should handle dynamically.

## Definition of Done

A change is done when:

- it matches current phase scope
- docs are updated
- naming is consistent
- no trust-breaking copy remains
- technical assumptions are explicit
- launch implications are understood
