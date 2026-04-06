# CLI Academy Frontend

This directory contains the rebuilt Next.js frontend recovery scaffold for CLI Academy.

## Current State

The original frontend source was lost when `app/` existed as a nested git repository that was never pushed remotely. This scaffold restores the route tree, core layouts, lesson surfaces, tutor shell, and API route surface so the product can be rebuilt on top of real structure again.

What is restored:

- route groups for `(marketing)` and `(app)`
- marketing pages
- onboarding route
- dashboard, downloads, settings
- path catalog and path detail pages
- learner path and lesson routes
- tutor shell
- recovery-mode API routes
- design tokens and global styling

What still needs rewiring:

- Supabase auth and data
- Stripe checkout and portal wiring
- Anthropic-backed tutor orchestration
- richer MDX rendering
- progress persistence

## Commands

```powershell
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Important Files

- `app/layout.tsx`
- `app/(marketing)/`
- `app/(app)/`
- `app/api/`
- `components/lesson/`
- `components/tutor/`
- `lib/data/paths.ts`
- `lib/mdx.ts`
- `design/tokens.css`

## Notes

- The route architecture is based on recovered implementation notes and session memory.
- The source of truth for overall rebuild priorities is `../TASKS.md`.
- The deeper recovery/product strategy document is `../docs/CLI_ACADEMY_RECOVERY_REFRAME_AND_REBUILD.md`.
