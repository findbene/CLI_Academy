# Claude to Antigravity Handover

*Updated: 2026-04-04*
*Status: Phase 1 backend wiring complete. Build passing.*

## What Claude built

### New routes
- `/api/auth/callback` — OAuth redirect, checks onboarding_completed to route new vs returning users
- `/api/events` — fire-and-forget telemetry sink to Supabase app_events table
- `/api/progress` — GET/POST lesson progress; auto-enrolls on first completion
- `/api/tutor` — SSE streaming via Anthropic SDK (claude-sonnet-4-6), daily limit enforcement
- `/api/stripe/webhook` — verifies signature, handles checkout.session.completed + subscription events
- `/api/stripe/checkout` — creates checkout session, returns URL
- `/api/stripe/portal` — creates Stripe billing portal session

### New components
- `components/layout/AppSidebar.tsx` — fixed sidebar for authenticated routes (desktop + mobile)
- `app/(app)/layout.tsx` — authenticated app shell, pulls tier from Supabase
- `app/(app)/dashboard/page.tsx` — server component, real Supabase data
- `app/(app)/learn/[pathSlug]/page.tsx` — lesson list with completion status
- `app/(app)/learn/[pathSlug]/[lessonSlug]/page.tsx` — lesson page (server)
- `components/lesson/LessonPlayer.tsx` — client: SSE tutor, mark-complete, nav
- `components/lesson/LessonContent.tsx` — server: reads MDX from `content/paths/[pathSlug]/[lessonSlug].mdx`
- `app/(app)/downloads/page.tsx` — tiered asset list
- `app/(app)/settings/page.tsx` — account, billing portal link
- `components/settings/BillingPortalButton.tsx` — client button for Stripe portal
- `app/onboarding/page.tsx` — rewritten: saves to Supabase profiles table on finish

### Infrastructure
- `infrastructure/schema.sql` — complete Supabase schema with RLS policies + seed data
- `backend/` — FastAPI + SSE tutor endpoint
- `content/paths/` — MDX lessons for 3 free paths (beginners, windows, macos)
- `.github/workflows/ci.yml` — lint, type-check, build on push
- `app/.env.example` — all required env vars documented

## API contracts (prop signatures for your reference)

### FloatingTutor — no changes needed
Props are identical to what you shipped. The `onSendMessage` callback streams via `/api/tutor`.

### LessonPlayer children pattern
`LessonPlayer` now accepts `children` (the server-rendered MDX). The server page wraps:
```tsx
<LessonPlayer {...props}>
  <LessonContent pathSlug={...} lessonSlug={...} />
</LessonPlayer>
```

## Stripe changes
`lib/stripe/index.ts` — removed module-level `new Stripe()`. Now lazy-initialized inside each function call. If you reference `stripe` directly anywhere, switch to `getStripeInstance()`.

## Brand note
The canonical brand per CLAUDE.md and blueprint is **CLI Academy**. All files should use this name consistently.

## Blockers for the user (not our work)
1. Create Supabase project → run `infrastructure/schema.sql` in SQL editor
2. Create Stripe products/prices → copy keys to `.env.local`
3. Copy Anthropic API key → `.env.local`
4. Enable Google OAuth in Supabase dashboard
5. Deploy and register Stripe webhook endpoint

## Build status
`npm run build` → PASSING (19 routes, 0 errors, 0 lint errors)
