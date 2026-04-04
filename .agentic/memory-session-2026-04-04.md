# Session Memory — 2026-04-04

## Completed This Session

- Built all Phase A infrastructure: `.env.example`, `infrastructure/schema.sql` (871 lines, full RLS), FastAPI backend scaffold, MDX content for 3 paths (18 lesson files), CI workflow
- Built all Phase B API routes: `/api/auth/callback`, `/api/events`, `/api/progress`, `/api/tutor` (SSE streaming), `/api/stripe/webhook`, `/api/stripe/checkout`, `/api/stripe/portal`
- Built all Phase C app pages: dashboard (Supabase server component), onboarding wizard (DB-wired), lesson path listing, lesson player, downloads, settings
- Built supporting components: `AppSidebar`, `LessonPlayer` (client), `LessonContent` (server), `BillingPortalButton`
- Wrote `.agentic/progress.md` and `_communication/CLAUDE_TO_ANTIGRAVITY.md`
- Fixed route conflicts (removed Antigravity flat stubs, kept route groups)
- Fixed module-level SDK initialization (Stripe + Anthropic lazy-init for build safety)
- Fixed lint errors (0 errors, 10 warnings all acceptable)
- Build passing: `npm run build` ✅ — 19 routes, zero errors
- Committed: `feat(phase-1): complete backend wiring...` (2ff60f9)

## Key Decisions

- **Route group architecture**: `(marketing)` for public, `(app)` for authenticated. Removed Antigravity's flat stub routes that conflicted.
- **Server/client split for MDX**: `LessonContent` is a server component (reads fs), passed as `children` to client `LessonPlayer`. This avoids bundling `fs`/`path` into the client.
- **Lazy SDK init**: Both `Stripe` and `Anthropic` clients are now initialized inside request handlers, not at module level. Build works without env vars set.
- **Root layout**: Removed `AppShell` wrapper from root layout — each route group owns its shell. Marketing uses `(marketing)/layout.tsx`, app uses `(app)/layout.tsx`.
- **Tutor fallback**: `/api/tutor` route has an upsert fallback if `increment_tutor_usage` RPC isn't deployed yet — stays functional during incremental migration.

## Current Blockers (user must act)

1. **Supabase project** — user needs to create project, copy 3 keys to `app/.env.local`, run `infrastructure/schema.sql` in SQL editor
2. **Stripe** — user needs Pro Monthly + Pro Annual products created, copy 4 keys to `.env.local`
3. **Anthropic API key** — `ANTHROPIC_API_KEY` in `app/.env.local`
4. **Google OAuth** — enable in Supabase dashboard (Auth → Providers)
5. **Deploy** — Vercel for frontend, Railway/Fly.io for FastAPI backend

## Unfinished Work

- **Brand**: Canonical name is "CLI Academy". All files updated to reflect this.
- **Windows path in lesson content**: `claude-code-windows/` has 5 files (missing `first-run-on-windows.mdx`). Content agent created 5 of 6 planned.
- **macOS path**: 5 of planned 5 done (matches).
- **Beginners path**: All 8 lessons present ✅
- **Lint warnings** (10): Unused vars in some Antigravity components, img instead of Image. Non-blocking.
- **Backend not deployed** — FastAPI exists but not running anywhere yet.
- **Schema not applied** — `infrastructure/schema.sql` written but not run in Supabase yet.

## Next Session Should

1. Brand confirmed as "CLI Academy" — all files updated
2. User to set up Supabase + apply schema → then test auth flow end-to-end
3. User to configure Stripe + add keys → test checkout flow
4. Add `first-run-on-windows.mdx` (missing 6th lesson for windows path)
5. Deploy frontend to Vercel (add env vars as Vercel secrets)
6. Deploy backend to Railway/Fly.io
7. Register Stripe webhook endpoint in dashboard
8. Run end-to-end: signup → onboarding → dashboard → lesson → tutor → mark complete
9. Phase 2 planning: release notes, email lifecycle, video snippets

## Important Technical Context

- Git is initialized inside `app/` only. Repo root (`C:\AgentOps-Academy`) is NOT a git repo. Backend, content, docs, infrastructure all live outside git.
- `next-mdx-remote/rsc` used for MDX (not `@next/mdx`). MDX files at `content/paths/[pathSlug]/[lessonSlug].mdx`.
- `LessonContent` resolves paths relative to `process.cwd()` which is `app/` — so `../content/paths/` points correctly.
- `proxy.ts` (middleware) handles Supabase session refresh + protected route redirects. Already complete.
- `STRIPE_PLANS` object no longer has module-level initialization — keys may be empty string at build time.
