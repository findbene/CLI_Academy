# DECISIONS.md

This file records the key product and architecture decisions for CLI Academy.

## D-001: Independent Repo

Status: accepted

Decision:
CLI Academy lives in its own repo and its own product home.

Reason:
The product needs clear ownership, cleaner architecture, brand independence, and a simpler build story than an embedded sub-app inside Citadel.

## D-002: Brand Direction

Status: accepted

Decision:
Use `CLI Academy` as the working public brand and product name.

Reason:
It is clear, memorable, learner-oriented, and strong for acquisition.

Risk:
It is Claude-specific. If the product later broadens beyond Claude, we may introduce an umbrella company brand while keeping CLI Academy as the flagship learning product.

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

## D-013: Server/Client MDX Split

Status: accepted

Decision:
`LessonContent` is a React Server Component that reads MDX from the filesystem.
`LessonPlayer` is a Client Component that handles SSE streaming, mark-complete, and nav.
They connect via the `children` prop — server page renders `<LessonContent>` and passes it as `children` to `<LessonPlayer>`.

Reason:
`fs` and `path` modules crash the client bundle. Server components cannot be imported by client components. The children pattern avoids this while keeping the lesson page architecture clean.

## D-014: Lazy SDK Initialization

Status: accepted

Decision:
Stripe and Anthropic SDK clients are initialized inside request handlers, not at module level.

Reason:
Module-level `new Stripe(key)` and `new Anthropic({apiKey})` throw at build time when environment variables are not set. Lazy initialization allows the build to succeed without credentials configured.

## D-016: Full Curriculum Architecture — 6-Section Ladder

Status: accepted

Decision:
Expand the curriculum from 3 free paths to a full 6-section, 17-path ladder:

- **Foundations** (free): Beginners, Windows, macOS, Setup/Config/Troubleshoot, Claude CoWork
- **Agent Infrastructure** (pro): MCP Server Mastery
- **Self-Hosting** (pro): Claude Code on a VPS
- **OpenClaw Ecosystem** (pro): OpenClaw Deployment, NemoClaw Runtime, ZeroClaw Quickstart, AutoClaw Automation
- **Workflows** (pro): AI Workflow Automation
- **Professional Tracks** (pro/free): Marketers, Founders, Sales, Analysts, Students

Paths are marked `status: "available"` or `"coming-soon"` in PathMeta. The paths catalog renders all sections with grouped path cards and clear coming-soon states. The dashboard dims coming-soon cards and disables their links.

Reason:
The original AgentOps-Academy foundation included OpenClaw, NemoClaw, ZeroClaw, AutoClaw, and Claude CoWork as first-class product areas. The product also needed role-based professional tracks from the start. This architecture defines the full ladder so every page and navigation element reflects the intended scope.

Source: AgentOps-Academy codebase audit (2026-04-05) + owner direction.

## D-017: PathMeta `status` Field

Status: accepted

Decision:
`PathMeta` carries an optional `status?: "available" | "coming-soon"` field. Omitting it is treated as "available" (backwards compatible). Content writers set this to "available" when all lesson MDX files are written and reviewed.

Reason:
Prevents sending learners to empty lesson pages while still surfacing the full curriculum scope on the paths page and dashboard.

## D-015: Route Group Architecture

Status: accepted

Decision:
- `(marketing)/layout.tsx` — public nav + footer for all marketing pages
- `(app)/layout.tsx` — sidebar nav, Supabase session required for all app pages
- Root `layout.tsx` — fonts, ThemeProvider, Toaster only. No AppShell.

Reason:
Prevents double-wrapping (marketing nav + app sidebar). Each route group owns its own shell, keeping the root layout minimal.
