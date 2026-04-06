# Product Requirements Document

Project: CLI Academy
Version: 2.0
Status: canonical planning summary
Deep reference: `docs/CLI_ACADEMY_RECOVERY_REFRAME_AND_REBUILD.md`

## 1. Product Overview

CLI Academy is a beginner-friendly SaaS learning platform focused on helping people successfully set up, troubleshoot, understand, and start using Claude Code, Claude CoWork, and related agentic tools on real devices and environments.

It is not a generic AI course marketplace. It is a trust-first setup and troubleshooting academy with guided learning paths, visual instruction, downloadable assets, a built-in tutor, and later advanced tracks for MCP, automation, and the OpenClaw ecosystem.

## 2. Goals

- get learners to a real working setup fast
- reduce fear and confusion through step-by-step guidance
- make troubleshooting a first-class product feature
- establish trust through freshness, tested-on, and safety metadata
- monetize honestly through deeper practical content and support

## 3. Non-Goals for Phase 1

- broad enterprise platform features
- marketplace
- managed runtime
- full certificate system
- community as a core pillar
- overly broad role catalog before foundations are excellent

## 4. Primary Users

- complete beginner
- practical builder
- working professional
- advanced self-hosting learner

## 5. Core Jobs To Be Done

- "Help me get this working on my machine."
- "Help me understand what to install and in what order."
- "Help me know what to do if this step fails."
- "Help me get my first useful success without breaking anything."
- "Give me guides, checklists, and references I can keep using."

## 6. Phase 1 Scope

### Included Product Surfaces

- marketing pages
- pricing
- auth
- onboarding
- dashboard
- setup-first path catalog
- path detail
- lesson player with visual/media-ready blocks
- floating tutor
- troubleshooting center
- compatibility matrix
- downloads center
- progress tracking
- Stripe checkout
- free/pro gating
- trust surfaces

### Included Content

- Claude Code Setup for Absolute Beginners
- Claude CoWork Introduction and Setup for Beginners
- Claude Code + CoWork Troubleshooting Basics
- First Useful Things to Do with Claude Code
- Safe Use, Files, Commands, and Project Structure Basics
- Windows setup branch
- macOS setup branch
- Linux setup branch

## 7. Core Functional Requirements

### FR-01 Auth

Users can sign up and log in without payment.

### FR-02 Onboarding

Users complete an onboarding flow capturing:

- operating system
- device/environment
- technical confidence
- role
- primary goal

### FR-03 Setup-First Discovery

Users can browse paths by beginner level, operating system, environment, and goal before enrollment.

### FR-04 Lesson Experience

Users can complete structured lessons with:

- step-by-step lesson blocks
- screenshots, diagrams, and media references
- code and command callouts
- warnings and safety notes
- recap and verification steps

### FR-05 Troubleshooting

Users can access troubleshooting guidance through:

- lesson callouts
- troubleshooting center
- compatibility matrix
- tutor escalation

### FR-06 Tutor

Users can open a floating tutor scoped to lesson, environment, and troubleshooting context.

### FR-07 Downloads

Users can access versioned, tier-appropriate downloads in PDF and Markdown first, with structured exports later.

### FR-08 Progress

Users can track lesson and path progress.

### FR-09 Payments

Users can upgrade to Pro through Stripe and receive correct entitlements.

### FR-10 Trust Surfaces

Each lesson should show:

- last reviewed date
- tested-on metadata
- warnings when relevant
- content freshness state

## 8. Tutor Policy

- Free: 10/day
- Pro: 100/day

## 9. Monetization Requirements

- the free beginner foundation must be genuinely useful
- Pro must unlock obvious practical depth, richer downloads, and deeper tutor value
- annual pricing is allowed in Phase 1
- team is later, not marketed as a real product yet
- no paid promise ships before the underlying content and UX are ready

## 10. Launch Quality Bar

Before launch:

- the first setup paths are excellent
- troubleshooting support is strong
- the downloads are real and polished
- the tutor is grounded and rate-limited
- the compatibility and trust surfaces are visible
- marketing copy matches actual product state

## 11. Success Metrics

### Activation

- onboarding completion rate
- setup path start rate
- setup path completion rate
- time to first verified success
- first tutor interaction rate

### Monetization

- free to pro conversion
- annual plan adoption
- MRR

### Retention

- weekly active learners
- path completion rate
- tutor-assisted resolution rate
- download reuse rate

## 12. Phase Expansion Rules

All major long-term ideas may remain in the roadmap, but Phase 1 and Phase 2 must remain centered on the setup-and-troubleshooting wedge. Advanced ecosystem, role-based expansion, automation, and team features should stack on top of that core rather than compete with it.
