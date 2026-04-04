# DECISIONS.md

This file records the key product and architecture decisions for Zero to Claude.

## D-001: Independent Repo

Status: accepted

Decision:
Zero to Claude lives in its own repo and its own product home.

Reason:
The product needs clear ownership, cleaner architecture, brand independence, and a simpler build story than an embedded sub-app inside Citadel.

## D-002: Brand Direction

Status: accepted

Decision:
Use `Zero to Claude` as the working public brand and `Zero to Claude Academy` as the product descriptor.

Reason:
It is clear, memorable, learner-oriented, and strong for acquisition.

Risk:
It is Claude-specific. If the product later broadens beyond Claude, we may introduce an umbrella company brand while keeping Zero to Claude as the flagship learning product.

## D-003: Core Wedge

Status: accepted

Decision:
The wedge is not "AI education" in general.

The wedge is:

> The safest, most beginner-friendly way to go from zero to productive with Claude Code and secure AI agent workflows.

Reason:
This is sharper, more monetizable, and easier to defend than broad AI education.

## D-004: Product Shape

Status: accepted

Decision:
Build one learner-facing app with a swarm of internal agents powering it.

Reason:
This gives us one clear sellable product while preserving the internal leverage of a multi-agent operating system.

## D-005: Launch Scope

Status: accepted

Decision:
Launch with a narrow but premium Phase 1:

- one free flagship foundation path
- one paid practical path
- one paid secure deployment path
- tutor
- verified labs
- downloads
- Stripe
- trust surfaces

Reason:
This is enough to prove value and monetize without collapsing under scope.

## D-006: Tutor Policy

Status: accepted

Decision:
Standardize tutor limits at:

- Free: 10/day
- Pro: 100/day

Reason:
Free users need enough value to reach a real first win.
Pro needs a clear practical upgrade advantage.

## D-007: Tech Stack

Status: accepted

Decision:
Use:

- Next.js for frontend
- FastAPI for backend
- Supabase for auth/database/storage
- Stripe for payments
- MDX for content
- Python services for tutor and internal agents

Reason:
Fast to ship, understandable, scalable enough, and proven by the prior work.

## D-008: Trust Over Hype

Status: accepted

Decision:
Do not sell unfinished paid content, unsafe deployment guidance, or fake agent magic.

Reason:
This category is trust-sensitive. One bad security lesson or overstated promise can permanently damage the brand.

## D-009: Phase Discipline

Status: accepted

Decision:
Keep all long-term ideas in the roadmap, but explicitly phase them.

Reason:
We want ambition without self-sabotage.

## D-010: Best-in-Class Product Influences

Status: accepted

Decision:
Borrow high-quality product patterns from leading products:

- Duolingo for daily commitment and habit logic
- DataCamp for interactive, validated practice
- Replit for fast time-to-first-win
- Superhuman for guided onboarding and expectation-setting
- Linear for speed, polish, and clarity
- Notion for templates, reusable assets, and community-led expansion

Reason:
We do not need to invent every good product habit from scratch.

## D-011: Design System Direction

Status: accepted

Decision:
Use a token-driven design system with:

- light-first reading surfaces
- dark mode as a secondary supported theme
- neutral-heavy UI chrome
- deep teal as the primary brand action color
- restrained amber for learning emphasis
- semantic status colors for success, warning, danger, and info

Reason:
This gives the product a premium, trustworthy, modern look without falling into generic AI aesthetics or sacrificing readability.

## D-012: Swarm Architecture Pattern

Status: accepted

Decision:
Prefer one orchestrated system of specialized internal agents over one public-facing agent that constantly role-switches.

Reason:
Specialized agents are easier to evaluate, improve, and constrain.
An orchestration layer keeps the product coherent while allowing each agent to own a narrower job.
