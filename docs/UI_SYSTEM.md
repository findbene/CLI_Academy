# CLI Academy UI System

Last updated: 2026-04-03
Status: launch-ready design system plan

## 1. Goal

Build a UI system that can support:

- a high-conversion marketing site
- a premium learner dashboard
- a long-form lesson reader
- a troubleshooting tutor interface
- verification-heavy labs

The system must feel cohesive across all of them.

## 2. System Structure

We will build the interface in layers:

1. raw palette
2. semantic tokens
3. layout primitives
4. component primitives
5. page templates

Do not build pages from raw hex values or one-off spacing choices.

## 3. Token Model

Use three token types:

### Base tokens

Foundational values such as:

- raw color ramps
- font families
- spacing scale
- radius scale
- shadow scale
- duration and easing

### Semantic tokens

Meaning-based values such as:

- `--color-bg-page`
- `--color-bg-panel`
- `--color-fg-default`
- `--color-accent-primary`
- `--color-accent-warning`
- `--color-status-danger`

### Component tokens

Optional component-scoped aliases later, such as:

- `--card-bg`
- `--lesson-sidebar-bg`
- `--tutor-panel-bg`
- `--pricing-featured-ring`

## 4. Theme Strategy

Primary theme:
light mode

Secondary theme:
dark mode

Reason:

- lessons and docs are reading-heavy, so light mode should be the default
- dark mode should feel focused and technical, not theatrical

Implementation rule:

- the same semantic tokens drive both themes
- component APIs should never need different hardcoded colors per theme

## 5. Layout Principles

### Principle 1: Software, not brochure

The app should feel like product software, not a content website wearing app clothes.

### Principle 2: Reading first

Lesson content gets generous reading width, spacing, and calm contrast.

### Principle 3: Clear hierarchy

Use size, weight, contrast, and space before using borders.

### Principle 4: Dense where useful

Dashboards and catalogs can be more compact than lessons.

### Principle 5: Repetition builds trust

The same card, badge, button, and callout language should recur across the product.

## 6. Page Archetypes

### Marketing pages

Needs:

- stronger hero contrast
- bold copy hierarchy
- richer visual rhythm
- obvious CTA flow

### Dashboard

Needs:

- quick orientation
- progress visibility
- next-best action
- low-friction scanning

### Path catalog

Needs:

- clean filtering later
- card comparability
- trust metadata
- easy free vs pro distinction

### Lesson player

Needs:

- comfortable reading measure
- sticky progression and navigation
- embedded callouts
- code and checklist support
- visible trust metadata

### Tutor panel

Needs:

- calm visual container
- fast scan of conversation
- strong input affordance
- obvious upgrade/limit messaging

### Lab verification

Needs:

- status-first design
- precise instructions
- obvious pass/fail state
- warning states that stand out without panic

## 7. Core Component Set

Build these first:

- app shell
- top navigation
- mobile navigation drawer
- primary and secondary buttons
- text field and textarea
- select and segmented choice group
- card
- badge
- callout
- path card
- lesson block primitives
- code block
- checklist block
- quiz block
- trust metadata bar
- tutor drawer
- progress bar
- pricing card
- stat card
- lab verification panel
- empty state

## 8. Lesson Block Language

Lesson content needs structured visual grammar:

- explanation block
- warning block
- tip block
- checklist block
- command/code block
- recap block
- quiz block
- verification block

Rules:

- warnings use icon + heading + color + explicit action
- tips feel lighter than warnings
- code blocks must be copy-friendly
- verification blocks should feel consequential and satisfying

## 9. Interaction Rules

Interaction feedback should be:

- subtle
- immediate
- consistent

Rules:

- hover should refine, not transform
- pressed states should feel firmer, not darker for its own sake
- loading states should preserve layout stability
- disabled states must remain legible
- focus states must be clearly visible on keyboard navigation

## 10. Accessibility Guardrails

Non-negotiables:

- meet WCAG AA contrast for normal text
- never use color alone to convey meaning
- support keyboard navigation across all key flows
- preserve visible focus rings
- respect reduced motion preferences
- use semantic HTML landmarks in app shell and lessons

## 11. Data Density Rules

Marketing:
- medium density

Dashboard:
- medium to high density

Lesson player:
- low to medium density

Tutor:
- medium density

Admin and internal tools later:
- higher density allowed

## 12. Visual Hierarchy Rules

Use this order of operations:

1. space
2. type size
3. type weight
4. contrast
5. surface
6. border
7. shadow
8. color

This prevents the UI from looking overdesigned.

## 13. Brand-to-Component Mapping

Primary teal should appear in:

- primary actions
- focused highlights
- active states
- progress accents

Amber should appear in:

- milestones
- learning highlights
- selected promotional emphasis

Red, yellow, and green stay semantic.
Do not reuse them as decorative brand colors.

## 14. Implementation Files

Current starter files and token sources:

- `app/design/tokens.css`
- `app/design/tokens.json`
- `app/design/brand-tokens.css` (temporary compatibility alias)
- `app/design/README.md`

Recommended next UI files once the app scaffold exists:

- `app/styles/globals.css`
- `app/components/ui/Button.tsx`
- `app/components/ui/Card.tsx`
- `app/components/ui/Callout.tsx`
- `app/components/ui/Badge.tsx`
- `app/components/ui/TextField.tsx`
- `app/components/layout/AppShell.tsx`
- `app/components/lesson/*`
- `app/components/tutor/*`

## 15. Build Sequence

1. lock tokens
2. build layout primitives
3. build component primitives
4. build lesson-player shell
5. build dashboard shell
6. build pricing and marketing sections
7. run accessibility and contrast review

## 16. Success Test

The UI system is working when:

- the landing page and app feel like one brand
- the lesson player is easy to read for long sessions
- trust and warnings are visually obvious
- the product feels premium without flashy excess
- designers and builders can add new screens without inventing new visual rules

