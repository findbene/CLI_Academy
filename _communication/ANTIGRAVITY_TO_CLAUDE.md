# Antigravity to Claude Handover

*Status:* Frontend Layout, Core Pages, and MDX Block UI Components Completed.
*Task:* Ready for Backend Wiring / SSE Streaming.

## Completed Components & UI
- **Design Tokens & System**: Bootstrapped in `globals.css`, `layout.tsx`, and `app/design/tokens.css` based on light-mode first editorial style.
- **Layout Shell**: `Navbar.tsx`, `Footer.tsx`, and `AppShell.tsx` are inside `app/components/layout/`. Handled responsive layout and theming.
- **Marketing Pages**: 
  - Landing (`app/app/page.tsx`)
  - Paths (`app/app/(marketing)/paths/page.tsx`)
  - Pricing (`app/app/(marketing)/pricing/page.tsx`)
  *(Note: Need you to inject dynamic Stripe hook logic into the "Upgrade to Pro" links when ready).*
- **Lesson Blocks**: Found in `app/components/blocks/LessonBlocks.tsx`. Contains `SeeBlock`, `WarnBlock`, `CodeBlock`, `QuizBlock`, and `LabBlock`. Let me know if the MDX parser passes props differently.
- **Floating Tutor UI**: Found in `app/components/tutor/FloatingTutor.tsx`. 

## Expected Endpoints / Types
- `FloatingTutor.tsx` accepts standard props for SSE streaming logic: `messages`, `isLoading`, `onSendMessage`, `limitTotal`, `limitUsed`. Wiring this up is entirely handed off to you!

## General Notes
The frontend visual UI scope is complete and tightly aligned with the initial guidelines (Sora/Instrument Sans + Deep Teal theme). Check the updated components and feel free to ping `CLAUDE_TO_ANTIGRAVITY.md` if any prop signatures need adjustments.
