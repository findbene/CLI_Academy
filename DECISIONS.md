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

> The safest, most beginner-friendly place to set up, troubleshoot, understand, and start using Claude Code, Claude CoWork, and related agentic tools on real machines and real environments.

Reason:
This is sharper, more monetizable, more trust-building, and easier to defend than broad AI education or generic "agent workflows" positioning.

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

- one excellent free beginner setup foundation
- one excellent free troubleshooting foundation
- one strong free first-success path
- one paid practical depth path
- tutor
- downloads
- compatibility matrix
- troubleshooting center
- Stripe
- trust surfaces

Reason:
This is enough to prove the true wedge and monetize without collapsing under scope.

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
Keep the curriculum organized as a 6-section ladder, but treat the setup-and-troubleshooting foundations as the most polished and most important part of the product:

- **Foundations** (free): Claude Code beginners, Claude CoWork beginners, troubleshooting basics, first useful wins, safe files/commands/project structure, Windows, macOS, Linux
- **Agent Infrastructure** (pro): MCP Server Mastery
- **Self-Hosting** (pro): Claude Code on a VPS
- **OpenClaw Ecosystem** (pro): OpenClaw Deployment, NemoClaw Runtime, ZeroClaw Quickstart, AutoClaw Automation
- **Workflows** (pro): AI Workflow Automation
- **Professional Tracks** (pro/free): Marketers, Founders, Sales, Analysts, Students

Paths may be marked `status: "available"` or `"coming-soon"`, but placeholder tracks should not be marketed as mature offerings. The public product should lead with the strongest beginner paths, then open into deeper practical and advanced content.

Reason:
The product needs breadth in the roadmap, but coherence in the learner journey. The setup-and-troubleshooting core must anchor the public promise before role tracks, automation, or advanced self-hosting become the headline.

Source: AgentOps-Academy codebase audit (2026-04-05) + owner direction.

## D-017: PathMeta `status` Field

Status: accepted

Decision:
`PathMeta` carries an optional `status?: "available" | "coming-soon"` field. Omitting it is treated as "available" (backwards compatible). Content writers set this to "available" when all lesson MDX files are written and reviewed.

Reason:
Prevents sending learners to empty lesson pages while still surfacing the full curriculum scope on the paths page and dashboard.

## D-018: Setup and Troubleshooting Are the Core Product Area

Status: accepted

Decision:
Treat setup, configuration, verification, troubleshooting, and beginner-first first success as the core product area of CLI Academy.

This must be reflected in:

- product positioning
- onboarding
- path catalog order
- lesson system
- downloads
- tutor design
- compatibility and known-issues surfaces

Reason:
This is the clearest painkiller problem in the category and the strongest differentiator available to the product.

## D-019: Current Repo Snapshot Requires Frontend Rebuild

Status: accepted

Decision:
Treat the current repository snapshot as documentation-forward with partial backend/content assets, not as a near-launch frontend product.

Reason:
The current snapshot contains an empty `app/` directory, a thin backend scaffold, a real schema baseline, and strong content drafts. Planning and task documents must reflect that truth so execution starts from reality instead of drift.

## D-015: Route Group Architecture

Status: accepted

Decision:
- `(marketing)/layout.tsx` — public nav + footer for all marketing pages
- `(app)/layout.tsx` — sidebar nav, Supabase session required for all app pages
- Root `layout.tsx` — fonts, ThemeProvider, Toaster only. No AppShell.

Reason:
Prevents double-wrapping (marketing nav + app sidebar). Each route group owns its own shell, keeping the root layout minimal.

## D-020: Phase E UX Features — Global Search, Code Copy, Auto-Advance, Settings Editor

Status: accepted
Date: 2025-07-14

Decision:
1. **Global search** — Server-side search index at `/api/search` with 1-minute TTL cache. Client-side `SearchDialog` with Cmd+K / Ctrl+K, fuzzy subsequence matching with tiered scoring (prefix > contains > fuzzy). Mounted in root layout, trigger button in AppSidebar.
2. **Code copy** — Dedicated `CodeBlock` component with `navigator.clipboard.writeText()`, language badge, and group-hover reveal. Replaces inline `<pre>/<code>` in `LessonContent`.
3. **Auto-advance** — After marking a lesson complete, show a celebration toast for 2 seconds then `router.push()` to `nextLessonHref`. If last lesson in path, toast says "You finished this path!" with no navigation.
4. **Settings editor** — `ProfileEditor` component with display/edit toggle for goal and OS. PATCH `/api/profile` with allowlisted keys merged into `profiles.onboarding_answers` JSONB. Server-side auth + string validation (max 200 chars).

Reason:
These features close the most visible UX gaps for a learner-facing product: discoverability (search), code utility (copy), momentum (auto-advance), and personalization (settings). All are lightweight, stateless, and require no schema changes.
