# Product Requirements Document

Project: CLI Academy
Version: 1.0
Status: Phase 1 planning

## 1. Product Overview

CLI Academy is a premium SaaS learning platform that helps people become productive with Claude-based tools and secure agent workflows through guided content, verified labs, downloadable assets, and contextual troubleshooting.

## 2. Goals

- help users achieve a real first win fast
- establish trust through safety and freshness
- monetize depth without overpromising
- create a product that can expand into role-based and team-based learning later

## 3. Non-Goals for Phase 1

- broad enterprise platform features
- marketplace
- managed runtime
- full certificate system
- full team workspace
- community as a core product pillar

## 4. Primary Users

- motivated beginner
- practical operator
- secure self-hosting learner

## 5. Core Jobs to Be Done

- "Help me get set up correctly without wasting time."
- "Help me understand what to do next."
- "Help me troubleshoot what broke."
- "Help me use this safely."
- "Give me assets I can use while I work."

## 6. Phase 1 Scope

### Included

- marketing pages
- pricing
- auth
- onboarding
- dashboard
- path catalog
- path detail
- lesson player
- custom lesson blocks
- tutor
- verified labs
- progress tracking
- downloads
- Stripe checkout
- free/pro gating
- telemetry
- trust surfaces

### Content Included

- one free foundation path
- one paid setup/workflow path
- one paid secure deployment path

## 7. Core Functional Requirements

### FR-01 Auth

Users can sign up and log in without payment.

### FR-02 Onboarding

Users complete an onboarding flow capturing:

- OS/platform
- target environment
- role
- skill level
- primary goal

### FR-03 Path Discovery

Users can browse and inspect learning paths before enrollment.

### FR-04 Lesson Experience

Users can complete structured lessons with:

- content blocks
- code snippets
- warnings
- quizzes
- labs
- recap and proof steps

### FR-05 Progress

Users can track lesson and path progress.

### FR-06 Tutor

Users can open a floating tutor scoped to the lesson context.

### FR-07 Lab Verification

Users can validate lab outcomes through a guided verification interface.

### FR-08 Downloads

Users can access versioned, tier-appropriate downloads.

### FR-09 Payments

Users can upgrade to Pro through Stripe and receive correct entitlements.

### FR-10 Trust Surfaces

Each lesson shows:

- last reviewed date
- tested-on metadata
- warnings when relevant

## 8. Tutor Policy

- Free: 10/day
- Pro: 100/day

## 9. Monetization Requirements

- Free path remains meaningfully useful
- Pro offers obvious depth and support value
- Annual pricing is available in Phase 1
- Team is contact-us only until team product is real
- No paid promise ships before the underlying feature/content is ready

## 10. Launch Quality Bar

Before launch:

- first free path is excellent
- paid paths are real and complete
- downloads are real and polished
- tutor policy is consistent
- pricing copy matches reality
- trust surfaces are visible

## 11. Success Metrics

### Activation

- onboarding completion rate
- first lesson started
- first lesson completed
- first tutor interaction
- time to first verified success

### Monetization

- free to pro conversion
- annual plan adoption
- MRR

### Retention

- weekly active learners
- path completion rate
- tutor resolution rate

## 12. Phase Expansion Rules

All major long-term ideas are allowed in the roadmap.
They must be explicitly assigned to a later phase if not launch-critical.
