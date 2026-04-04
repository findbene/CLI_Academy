# CLI Academy Brand System

Last updated: 2026-04-03
Status: accepted working brand foundation

## 1. Brand Decision

Public brand:
`CLI Academy`

Product descriptor:
`CLI Academy`

Short answer on the name:
Yes, `CLI Academy` is a strong product name for this launch.

Why it works:

- it makes the transformation promise obvious
- it is easy to remember
- it is friendly to beginners without sounding childish
- it is specific enough to convert high-intent traffic
- it pairs naturally with the domain `cliacademy.app`

What to watch:

- the name is Claude-specific, which is good for focus now
- before public scale, run a trademark and brand-risk review because `Claude` is another company's product name

Recommendation:

- keep `CLI Academy` as the launch brand
- use `CLI Academy` consistently across all marketing pages and documents
- do not invent a broader umbrella brand yet

## 2. Brand Promise

CLI Academy is the safest, clearest path from curiosity to confident use of Claude-powered workflows.

This is not a hype brand.
It is a trust brand with momentum.

## 3. Positioning

Category:
practical AI learning SaaS

Wedge:

> The safest, most beginner-friendly way to go from zero to productive with Claude Code and secure AI agent workflows.

Positioning principles:

- teach practical outcomes, not passive theory
- make trust visible
- make progress obvious
- feel premium without feeling exclusive
- feel technical without intimidating learners

## 4. Brand Personality

The brand should feel like:

- calm
- capable
- modern
- precise
- encouraging

The brand should not feel like:

- neon AI theater
- crypto-adjacent hype
- enterprise consulting jargon
- playful edutainment
- anonymous template SaaS

## 5. Emotional Target

Users should feel:

- "I can do this."
- "This product knows what it is doing."
- "I am not going to break something by following this."
- "The next step is obvious."

## 6. Visual Direction

Working visual theme:
`Editorial software for serious learners`

This means:

- light-first reading surfaces
- restrained use of color
- strong hierarchy
- clean spacing
- premium typography
- subtle motion
- terminal-adjacent precision without terminal-only aesthetics

We are intentionally avoiding:

- purple-on-black AI styling
- overloaded dashboards
- bright gradients everywhere
- decorative color with no meaning

## 7. Color System

### Core Palette

Primary brand:
- deep teal for trust, clarity, and product distinctiveness
- use for primary actions, focused highlights, and key progress moments

Supporting accent:
- warm amber for milestones, guided highlights, and learning emphasis
- use sparingly so it stays valuable

Neutral system:
- ink, slate, mist, canvas, and paper
- most of the app should live here

Semantic system:
- success
- warning
- danger
- info

### Color Roles

Use color by meaning, not decoration.

- `brand` = primary action and branded emphasis
- `neutral` = default text, layout, chrome, containers
- `information` = guidance, in-progress states, tips
- `success` = verified lab passes, completion, healthy states
- `warning` = risky configs, partial completion, caution
- `danger` = exposed secrets, unsafe actions, errors
- `accent` = non-semantic visual lift only where meaning does not change

### Working Launch Palette

- Brand ink: `#0C1324`
- Slate text: `#36506B`
- Paper: `#FFFCF7`
- Canvas: `#F7F3EA`
- Cloud: `#EAF1F7`
- Primary teal: `#0E8C85`
- Primary teal bright: `#16B0A8`
- Accent amber: `#C98612`
- Success moss: `#2E8B57`
- Danger coral: `#D65A46`

### Rules

- the interface should be mostly neutral
- primary color should carry decisions, not decoration
- amber should highlight learning moments, not every callout
- do not use color alone to convey meaning
- every text/background pairing must meet accessibility requirements

## 8. Typography

### Font Direction

Display:
- `Sora`

Body:
- `Instrument Sans`

Mono:
- `IBM Plex Mono`

Why this mix:

- `Sora` gives the brand an intentional, modern identity
- `Instrument Sans` stays readable in long-form lesson content and product UI
- `IBM Plex Mono` gives technical content precision without looking dated

### Usage Rules

- display font for hero headlines, page headers, section titles
- body font for lesson text, product UI, pricing, dashboards
- mono font for code, commands, terminal output, technical labels

### Typographic Personality

- headlines should feel decisive
- body copy should feel calm and easy to scan
- code should feel exact

## 9. Motion

Motion should support clarity, not entertainment.

Use motion for:

- page entry polish
- step transitions
- focus changes
- drawer and tutor reveal
- verification feedback

Avoid:

- looping decorative animation
- high-energy hover motion
- long easing curves
- motion that competes with lesson content

Default motion rules:

- keep transitions short
- keep movement small
- honor reduced motion preferences

## 10. Imagery and Graphics

Preferred imagery:

- annotated screenshots
- cropped product UI
- terminal and setup visuals
- diagrams with clear labels
- workflow cards and progress visuals

Avoid:

- generic AI robot art
- abstract neural-network backgrounds
- glossy stock-photo teams
- random 3D blobs with no instructional value

## 11. Iconography and Illustration

Icon style:

- simple
- slightly rounded
- clean strokes
- product-functional first

Illustration style:

- minimal
- diagram-led
- used sparingly

## 12. Voice and Messaging

Tone:

- clear
- practical
- reassuring
- credible

Preferred language:

- safe
- guided
- verified
- practical
- step-by-step
- trusted
- productive

Avoid language like:

- revolutionary
- fully autonomous magic
- AI transformation
- 10x your life instantly
- unstoppable agent workforce

## 13. Marketing vs Product Expression

Marketing pages may be:

- a little bolder
- more emotional
- more contrast-driven

The app should be:

- calmer
- more neutral
- more information-dense
- built for repeated use

The same brand should span both.
The app must never feel like it belongs to a different company than the website.

## 14. Distinctive Brand Motifs

Use a few recurring motifs:

- progress lines
- checkpoints
- route markers
- subtle grid and path structures
- layered cards that imply guided progression

These motifs support the "zero to productive" transformation story without becoming gimmicks.

## 15. Build Notes

The starter implementation lives in:

- `app/design/tokens.css`
- `app/design/tokens.json`
- `app/design/brand-tokens.css` (temporary compatibility alias)
- `app/design/README.md`

This is the buildable base for:

- landing page design
- pricing page design
- dashboard shell
- lesson player
- tutor panel
- lab verification states

## 16. External Guidance Used

This system is aligned with current respected practice:

- token-based design systems over ad hoc values
- semantic color roles over one-off colors
- accessibility-first contrast rules
- light and dark themes driven by the same semantic tokens
- restrained interaction feedback over decorative motion

