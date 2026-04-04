# Zero to Claude Master Blueprint

Version: 1.0
Status: execution-ready foundation
Owner: Zero to Claude
Purpose: the canonical blueprint for building the product from scratch in this repo

## 1. Executive Summary

Zero to Claude is a premium SaaS learning product that helps people go from zero to productive with Claude-based tools and secure agent workflows.

It is designed to win on:

- clarity
- safety
- first-win speed
- practical outcomes
- trust
- retention through real progress

This is not just an education app.
It is a learner product, a content system, a troubleshooting system, and an internal multi-agent operating engine packaged as one sellable SaaS product.

## 2. What We Are Building

We are building one app with a swarm inside.

### User-Facing App

This is what customers buy and use:

- web app
- mobile-friendly lesson system
- guided onboarding
- dashboards
- path catalog
- lesson player
- verified labs
- progress tracking
- downloadable PDFs and checklists
- short video snippets
- interactive troubleshooting chat
- guided setup wizards
- upgrade flows
- certificates later

### Internal Agent System

This is what powers the product behind the scenes:

- Curriculum Architect Agent
- Platform Detection Agent
- Setup Coach Agent
- Update Agent
- Safety Agent
- Lab Generator Agent
- Troubleshooting Agent
- Role Path Agent
- Assessment Agent
- PDF/Artifact Agent
- Video Script Agent
- Marketing Agent
- Customer Success Agent

The learner sees one polished product.
Internally, the product operates like a coordinated swarm.

## 3. Core Wedge

The wedge is not "AI education."

The wedge is:

> The safest, most beginner-friendly way to go from zero to productive with Claude Code and secure AI agent workflows.

This wedge matters because:

- it is more specific than generic AI education
- it has stronger monetization potential
- it allows us to win on trust, not just novelty
- it creates a natural path from individual learning to paid depth and team enablement

## 4. Brand and Naming

### Recommendation

Use `Zero to Claude` publicly.
Use `Zero to Claude Academy` where a more descriptive product label helps.

### Why the Name Works

- instantly communicates transformation
- memorable and marketable
- strong domain fit
- excellent for beginner acquisition

### Risks

- brand is Claude-specific
- expansion into non-Claude territory may later require a parent brand

### Resolution

Keep the product architecture open enough to expand later, but do not dilute the current brand.
Use the clarity of `Zero to Claude` while it is an advantage.

## 5. Target Users

### Primary ICP

The ambitious learner who wants a fast, practical, safe path into Claude-powered productivity.

### Phase 1 Priority Personas

#### 1. Motivated beginner

- has heard of Claude Code
- wants working setup, not theory
- willing to pay for clarity

#### 2. Practical operator

- wants reliable use in daily workflows
- cares about security and stability
- values checklists, troubleshooting, and repeatable setups

#### 3. Self-hosting learner

- wants secure deployment guidance
- values trust and technical rigor
- will churn fast if the guidance is sloppy

### Phase 2 and 3 Personas

- marketer
- analyst
- founder
- sales operator
- student
- team lead

These stay in the plan, but they do not all define Phase 1.

## 6. Product Principles

### P-01: First win fast

The product should get a serious learner to a real success quickly.
Time to first meaningful success should feel short and obvious.

### P-02: Trust is product

Freshness, tested-on labels, safety warnings, and known issues are not extras.
They are part of the product itself.

### P-03: Active learning over passive consumption

Lessons should require action, verification, and understanding.

### P-04: Monetization honesty

We do not charge for content or capabilities that are not genuinely ready.

### P-05: The swarm supports the product

Internal agents improve content, support, growth, and retention.
They should reduce operational friction without making the product feel confusing or unstable.

## 7. The Best Product Ideas We Are Intentionally Borrowing

### Duolingo

We borrow:

- lightweight habit loops
- progress visibility
- streak logic later
- "small win today" framing

We do not borrow:

- shallow gamification without real capability

### DataCamp

We borrow:

- interactive, validated exercises
- practical application in the flow of learning
- obvious feedback loops

### Replit

We borrow:

- fast time-to-first-win
- real output quickly
- product that feels alive immediately

### Superhuman

We borrow:

- deliberate onboarding
- expectation-setting
- guided path to activation

### Linear

We borrow:

- speed
- clean UX
- sharp hierarchy
- product restraint

### Notion

We borrow:

- reusable templates and downloadable artifacts
- ecosystem thinking
- content-to-product-to-community loops

## 8. Product Architecture

## 8.1 User-Facing Product Surfaces

### Marketing

- homepage
- pricing page
- path catalog
- path detail pages
- comparison/SEO pages later

### Auth and onboarding

- email/password
- OAuth
- onboarding wizard
- role/platform/goals capture

### Learning

- dashboard
- lessons
- labs
- quizzes
- progress
- downloads
- tutor

### Retention and proof

- badges
- certificates later
- release notes
- known issues
- progress recap
- upgrade prompts

### Support

- in-product tutor
- troubleshooting flows
- docs and known-issues center
- support channel later

## 8.2 Internal Swarm Architecture

The product should eventually run as an orchestrated internal agent system.

### Phase 1 agents

- Setup Coach Agent
- Troubleshooting Agent
- Safety Agent
- Platform Detection Agent

### Phase 2 agents

- Curriculum Architect Agent
- Assessment Agent
- PDF/Artifact Agent
- Update Agent
- Role Path Agent

### Phase 3 agents

- Video Script Agent
- Marketing Agent
- Customer Success Agent
- Lab Generator Agent

### Event Model

Internal agents communicate through app events and queued jobs such as:

- lesson_published
- tool_release_detected
- learner_stuck_signal
- quiz_failure_pattern_detected
- new_path_requested
- upgrade_prompt_triggered
- churn_risk_detected

### Control Pattern

- one canonical orchestration layer
- shared prompt and policy standards
- explicit tool allowlists
- auditability for content-changing actions

## 9. Phase 1 Product Scope

Phase 1 is the version we can confidently build next.

### Included

- polished landing page
- pricing page
- auth
- onboarding wizard
- dashboard
- path catalog
- path detail pages
- lesson player
- custom lesson blocks
- floating tutor
- verified labs for flagship content
- quizzes
- progress tracking
- downloads center
- free/pro gating
- Stripe subscriptions
- annual plan
- core telemetry
- trust surfaces

### Excluded from Phase 1 implementation

- team workspaces
- manager dashboards
- certificate system
- marketplace
- hosted runtime
- SSO/SAML
- mature community layer
- broad multi-role content breadth

## 10. Phase 1 Core Paths

### Path 1: Zero to Claude Foundations

Free.
The hero acquisition path.

Purpose:

- explain what Claude Code is
- get the learner set up
- create the first successful workflow
- teach safe defaults

### Path 2: Claude Setup and Workflow Mastery

Paid.

Purpose:

- Windows
- macOS
- shell configuration
- workflow patterns
- common troubleshooting depth

### Path 3: Secure Agent Deployment

Paid.

Purpose:

- Docker-safe setup
- secrets hygiene
- port exposure warnings
- reverse proxy and hardening patterns
- update and rollback guidance

This path may teach secure self-hosted Claude-adjacent workflows first, with specialized runtimes expanded later.

## 11. Learning Design

Every lesson follows:

1. See
2. Explain
3. Do
4. Check
5. Apply
6. Troubleshoot
7. Recap
8. Prove

The lesson system must support:

- warnings
- tips
- code
- checklists
- labs
- quizzes
- recap
- proof/verification

## 12. Tutor Policy

Canonical policy:

- Free: 10/day
- Pro: 100/day

Design goals:

- enough free value to create activation
- enough pro capacity to feel truly premium
- clear upgrade moments without making the product feel stingy

## 13. Pricing and Monetization

### Phase 1

- Free: $0
- Pro Monthly: $29/month
- Pro Annual: $229/year
- Team: contact us only, not sold in self-serve

### Included in Free

- core foundation path
- limited tutor
- selected downloads
- progress tracking

### Included in Pro

- all published paid paths
- full tutor allocation
- all downloads
- advanced labs
- release notes and deep-dive assets
- priority access to new paths

### Monetization Expansion by Phase

#### Phase 2

- one-time starter packs
- live workshops
- better upgrade sequences

#### Phase 3

- certificates
- role packs
- cohort products

#### Phase 4

- team onboarding packages
- seat-based plans
- custom/private paths

#### Phase 5

- marketplace
- enterprise enablement
- managed runtime offerings

## 14. Technical Architecture

### Stack

- frontend: Next.js App Router + TypeScript
- backend: FastAPI + Python
- database/auth/storage: Supabase
- payments: Stripe
- content: MDX
- internal agents: Python services with shared LLM client
- analytics: PostHog later, minimal event log first
- monitoring: Sentry later, baseline logs first

### Deployment

- frontend: Vercel
- backend: Railway or Fly.io
- database/auth/storage: Supabase managed

### Guiding Rule

Use the simplest architecture that can support:

- fast shipping
- trust
- clear ownership
- future agent expansion

## 15. Data Model Direction

### Phase 1 must support

- users
- profiles/onboarding
- paths
- modules
- lessons
- enrollments
- lesson progress
- quiz attempts or summary
- lab verifications
- downloads/assets
- tutor usage
- app events

### Phase 2 and beyond

- certificates
- release notes
- known issues
- role recommendations
- orgs and org members

Keep the schema simple in Phase 1, but name it cleanly enough to extend.

## 16. Repository Architecture

This repo should grow into:

```text
app/                  Next.js frontend
backend/              FastAPI API and service layer
agents/               internal agent services and orchestration
content/              paths, lessons, assets, metadata
infrastructure/       schema, env, deploy, CI, infra docs
docs/                 blueprint and product docs
scripts/              local health and helper scripts
.agents/              product marketing context and internal context files
```

## 17. Feature Phasing

### Phase 1 - Launchable core

- learner app
- three flagship paths
- floating tutor
- verified labs
- Stripe
- trust surfaces

### Phase 2 - Trust and monetization depth

- release notes
- known issues
- richer tutor memory
- email lifecycle
- better download library
- short video snippets

### Phase 3 - Role breadth and retention

- role-based path routing
- badges
- certificates
- community layer
- content ops agents
- marketing/content repurposing agents

### Phase 4 - Team product

- org accounts
- seat management
- manager dashboards
- custom private paths

### Phase 5 - Expansion platform

- integration hub
- ROI reporting
- marketplace
- managed runtime
- enterprise features

Every major point from the wider long-term blueprint survives.
Not every major point belongs in the first shipping build.

## 18. Launch Strategy

### Launch order

1. private alpha
2. small beta
3. soft public launch
4. monetized rollout

### Primary channels

- YouTube
- X
- LinkedIn
- email
- SEO

### Messaging

Lead with:

- safety
- clarity
- speed to first win
- beginner-friendliness
- real outcomes

Do not lead with:

- raw model sophistication
- jargon-heavy architecture
- generic "AI transformation" claims

## 19. Success Metrics

### Activation

- signup to onboarding completion
- onboarding to first lesson start
- first lesson start to first lesson completion
- first tutor use rate
- time to first successful lab

### Monetization

- free to pro conversion
- annual plan adoption
- upgrade trigger conversion
- MRR

### Retention

- weekly active learners
- path completion rate
- tutor resolution rate
- 30-day retention

## 20. What Makes This Blueprint Buildable

This blueprint is intentionally ambitious and executable at the same time.

It does that by:

- keeping the wedge narrow
- making the repo independent
- preserving the long-term vision in phases
- defining one product with a swarm inside
- choosing a practical stack
- protecting trust with explicit boundaries

## 21. Immediate Build Sequence

1. scaffold frontend and backend
2. define Phase 1 schema contract
3. implement landing page, auth, and onboarding
4. implement path catalog and lesson player
5. implement tutor
6. implement verified labs
7. implement downloads and payments
8. prepare launch assets and soft-launch funnel

## 22. Final Recommendation

Build Zero to Claude now as an independent learner product with a hidden internal swarm.

Use the best ideas from the original larger blueprint.
Use the discipline and implementation realism learned from Citadel.
Phase everything else with intent.
