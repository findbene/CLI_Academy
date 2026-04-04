# CLI Academy — Implementation Progress

Last updated: 2026-04-04

## Current Status: Phase 1 — In Progress (~85% complete)

---

## Phase A — Foundation ✅ COMPLETE

- [x] `.env.example` — `app/.env.example`
- [x] Supabase schema — `infrastructure/schema.sql` (written by schema-agent)
- [x] FastAPI backend scaffold — `backend/` (written by backend-agent)
- [x] MDX content — `content/paths/` (3 paths, written by content-agent)
- [x] GitHub Actions CI — `.github/workflows/ci.yml`

## Phase B — Next.js API Routes ✅ COMPLETE

- [x] `/api/auth/callback` — OAuth redirect handler
- [x] `/api/events` — telemetry sink
- [x] `/api/progress` — lesson progress CRUD
- [x] `/api/tutor` — SSE streaming Claude API
- [x] `/api/stripe/webhook` — Stripe webhook handler
- [x] `/api/stripe/checkout` — create checkout session
- [x] `/api/stripe/portal` — customer billing portal

## Phase C — App Pages ✅ COMPLETE

- [x] `app/(app)/layout.tsx` — authenticated app layout with sidebar
- [x] `app/components/layout/AppSidebar.tsx` — nav sidebar
- [x] `app/(app)/dashboard/page.tsx` — real Supabase data
- [x] `app/onboarding/page.tsx` — 3-step wizard, saves to Supabase
- [x] `app/(app)/learn/[pathSlug]/page.tsx` — lesson list with progress
- [x] `app/(app)/learn/[pathSlug]/[lessonSlug]/page.tsx` — lesson page
- [x] `app/components/lesson/LessonPlayer.tsx` — client lesson player
- [x] `app/components/lesson/LessonContent.tsx` — server MDX renderer
- [x] `app/(app)/downloads/page.tsx` — tiered asset catalog
- [x] `app/(app)/settings/page.tsx` — account + billing
- [x] `app/components/settings/BillingPortalButton.tsx`

## Build Status

- [x] `npm run build` — **PASSING** (19 routes, zero errors)
- [x] `npm run lint` — **PASSING** (0 errors, 0 warnings)
- [x] `npx tsc --noEmit` — runs as part of build (passing)

## Key Decisions Made

- Removed conflicting flat routes (`app/dashboard/`, `app/learn/`, etc.) — kept route groups `(app)/` and `(marketing)/`
- `LessonContent` is a server component that reads MDX from filesystem; passed as children to client `LessonPlayer`
- Stripe and Anthropic clients lazy-initialized inside request handlers (not at module level) to allow build without env vars
- App layout: marketing routes use `(marketing)/layout.tsx` with public nav; auth routes use `(app)/layout.tsx` with sidebar
- Root `app/layout.tsx` no longer wraps in `AppShell` — each route group owns its own shell

## Outstanding Blockers (need user input)

1. **Supabase credentials** — create project at supabase.com, then run `infrastructure/schema.sql` in SQL editor
2. **Stripe** — create products/prices, copy keys to `.env.local`
3. **Anthropic API key** — copy to `.env.local` for tutor
4. **Google OAuth** — enable in Supabase dashboard (Auth > Providers)
5. **Apply schema** — run `infrastructure/schema.sql` in Supabase SQL editor to create tables and RLS policies

## What Runs Without Credentials

- All marketing pages (`/`, `/paths`, `/pricing`, `/login`, `/signup`)
- Middleware (redirects work correctly)
- Build and type-check

## What Requires Credentials to Run

- Dashboard, dashboard data queries (Supabase)
- Auth flow (Supabase)
- Tutor (Anthropic API key)
- Stripe checkout/webhook (Stripe keys)

## Remaining Phase 1 Work

- [x] Run lint and fix all warnings (0 errors, 0 warnings achieved)
- [x] Add missing `path-and-permissions.mdx` (Windows path now has all 6 lessons)
- [x] Commit all changes to git
- [ ] Deploy frontend to Vercel (needs user: Supabase + Stripe + Anthropic keys)
- [ ] Deploy backend to Railway/Fly.io
- [ ] Register Stripe webhook endpoint
- [ ] Ship first lesson content review

## Phase 2 Queue (future)

- Email lifecycle (onboarding/upgrade sequences)
- Release notes center
- Known issues center
- Video snippet support
- Stale content detection
