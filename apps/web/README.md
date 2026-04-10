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

Authenticated learner-flow and tutor regression coverage can run through Playwright with either a real learner account or a saved learner storage state:

```powershell
$env:E2E_USER_EMAIL="confirmed-learner@example.com"
$env:E2E_USER_PASSWORD="your-password"
npx playwright test e2e/tutor.spec.ts e2e/learner-flow.spec.ts
```

If you already have a signed-in learner browser session, save a Playwright storage state to the gitignored default path `apps/web/e2e/.auth/learner.json` or point `E2E_AUTH_STORAGE_STATE` at another file, then run the same command without plaintext credentials.

If the saved storage state no longer opens protected routes, the auth session has gone stale. Refresh `apps/web/e2e/.auth/learner.json` from a current signed-in learner session or set `E2E_USER_EMAIL` and `E2E_USER_PASSWORD` before treating the authenticated spec failures as product regressions.

Smoke coverage in `e2e/smoke.spec.ts` relies on the app-local Playwright config in `apps/web/playwright.config.ts`, especially its `baseURL`. Run smoke tests from `apps/web` or pass that config explicitly, otherwise relative `page.goto("/...")` calls fail with `Cannot navigate to invalid URL` noise even when the routes themselves are healthy.

One render-boundary nuance to keep in mind while working on lessons and tutor UI: Next App Router can still server-render client component trees during initial page generation. If a leaf lesson component reads tutor runtime context before the lesson bridge hydrates, use an SSR-safe optional context path and guard side effects instead of assuming `"use client"` means browser-only execution.

```powershell
cd apps/web
npx playwright test e2e/smoke.spec.ts
```

Equivalent explicit-config form from the repo root:

```powershell
npx playwright test --config apps/web/playwright.config.ts apps/web/e2e/smoke.spec.ts
```

## Env Setup

The frontend runs from `apps/web`.

Public browser-exposed env vars must live in `apps/web/.env.local` so Next can bundle them correctly.

Server-only tutor secrets can also fall back to the repo root `.env` for local monorepo workflows, but `apps/web/.env.local` is still the preferred single place to keep frontend runtime config when you want one app-scoped file.

Minimum auth vars:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Tutor runtime secret:

- `ANTHROPIC_API_KEY`

Google OAuth also requires Supabase provider configuration with callback URLs that include:

- `http://localhost:3000/api/auth/callback`
- your production callback URL once deployed

Current protected-route behavior is conditional by configuration:

- If frontend Supabase public keys are present, unauthenticated visits to protected app pages redirect to `/login?next=...`
- If frontend Supabase public keys are absent, the app serves safe fallback content and disables auth actions with explicit setup guidance
- The authenticated regressions in `e2e/tutor.spec.ts` and `e2e/learner-flow.spec.ts` accept either `E2E_USER_EMAIL` / `E2E_USER_PASSWORD` or a saved Playwright storage state, because fresh Playwright browsers still cannot reach protected routes without a confirmed learner session

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
