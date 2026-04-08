# CLI Academy Frontend

This directory contains the active Next.js frontend for CLI Academy.

## Current State

The app is no longer just a recovery scaffold. It now ships the main learner surfaces, the auth flow shell, resource hub, protected app routes, tutor UI, and the current API route surface used by the product.

Implemented here:

- route groups for `(marketing)` and `(app)`
- marketing pages, legal/support pages, and resource hub
- login and signup pages with email/password and Google OAuth entry points
- onboarding route
- dashboard, downloads, settings
- path catalog, path detail pages, learner path and lesson routes
- tutor shell and tutor API integration
- progress/profile/search/checkout portal route surface
- design tokens and global styling

Still dependent on runtime configuration:

- Supabase auth/session data and Google provider setup
- Stripe checkout and portal live credentials
- Anthropic-backed tutor runtime keys

## Commands

```powershell
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Auth Setup

The frontend runs from `apps/web`. Put public and server-side frontend env vars in `apps/web/.env.local`, not in the repo root.

Minimum auth vars:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Google OAuth also requires Supabase provider configuration with callback URLs that include:

- `http://localhost:3000/api/auth/callback`
- your production callback URL once deployed

Current protected-route behavior is conditional by configuration:

- If frontend Supabase public keys are present, unauthenticated visits to protected app pages redirect to `/login?next=...`
- If frontend Supabase public keys are absent, the app serves safe fallback content and disables auth actions with explicit setup guidance

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
