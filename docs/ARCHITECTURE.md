# ARCHITECTURE.md

Reference document for the CLI Academy system. For full decision history see `DECISIONS.md`.

---

## 1. System overview

CLI Academy is a learner-first web platform teaching Claude Code, Claude Cowork, OpenClaw runtimes, and safe agentic workflows. It has two deployable applications:

- **apps/web** — Next.js 16 frontend (Vercel). Serves all learner-facing surfaces: catalog, lesson player, dashboard, onboarding, auth, tutor, and reference center.
- **apps/api** — FastAPI Python backend (Docker / Cloud Run). Exposes `/health` for readiness probes only. Gamification streak logic, tutor rate limiting, and all LLM calls run in Next.js API routes directly on Supabase (ARCH-01, 2026-04).

---

## 2. Frontend — apps/web/

**Runtime:** Next.js 16, App Router, TypeScript strict mode.

**Key libraries:**
- `@supabase/ssr` — server-side auth and database queries
- `@anthropic-ai/sdk` — tutor LLM calls (all LLM traffic goes through Next.js, not Python)
- `stripe` — checkout and webhook handling
- `@sentry/nextjs` — error tracking (activates when `NEXT_PUBLIC_SENTRY_DSN` is set)
- `posthog-js` — analytics (activates when `NEXT_PUBLIC_POSTHOG_KEY` is set)
- `next-mdx-remote` — MDX lesson rendering
- `framer-motion` — UI animations

**Auth flow:**
1. User hits `/login` → Supabase email or Google OAuth
2. OAuth callback lands at `/api/auth/callback` → exchanges code for session → redirects to `next` param or `/dashboard`
3. Edge proxy (`proxy.ts`) protects `/dashboard`, `/downloads`, `/settings`, `/onboarding` — unauthenticated requests redirect to `/login?next=<path>`
4. Layout-level gating is avoided: auth decisions happen at the proxy layer (`proxy.ts`) or server component level

**Content loading:**
- MDX files live under `content/paths/<path-slug>/chapter-<n>/lesson-<n>.mdx`
- `apps/web/lib/mdx.ts` discovers and loads lesson MDX; filters to `lesson-*.mdx` only
- `apps/web/lib/data/paths.ts` is the TypeScript registry of all 30 paths
- `apps/web/lib/supabase/curriculum-sync.ts` upserts live path/module/lesson catalog into Supabase on demand (ADR-006)

**Learner progress:**
- Hosted progress stored in `lesson_progress` table, resolved against live curriculum catalog
- Browser-local fallback (user-scoped) for resilience during sync gaps (ADR-007)
- Authenticated backfill: legacy anonymous local completions are promoted to hosted rows on sign-in

---

## 3. Backend — apps/api/

**Runtime:** Python 3.11+, FastAPI, uvicorn.

**Registered routes:**
- `GET /health` — readiness probe; returns 503 if Supabase admin credentials are missing

**Runtime ownership (ARCH-01, 2026-04):** Gamification streak, daily tutor limit, and all LLM calls consolidated into Next.js API routes (`/api/gamification/streak`, `/api/tutor`). The Python backend exists for health checks and future infra extensions; it holds no business logic.

---

## 4. Database — Supabase (PostgreSQL 15+)

Full schema: `infra/schema.sql` (authoritative, includes all migration content).

**14 tables:**

| Table | Purpose |
|---|---|
| `profiles` | One row per auth user; tier, Stripe IDs, onboarding state |
| `paths` | Learning path catalog |
| `modules` | Ordered sections within a path |
| `lessons` | Individual lesson units |
| `enrollments` | User-to-path enrollment records |
| `lesson_progress` | Per-lesson completion per user (upsertable) |
| `quiz_attempts` | Full history of quiz submissions |
| `lab_verifications` | Lab verification outcomes |
| `assets` | Downloadable files (PDFs, runbooks, configs) |
| `tutor_usage` | Daily tutor message counter per user |
| `app_events` | Append-only telemetry log |
| `user_progress` | Daily streak tracking (gamification) |
| `alumni_status` | Clearance level: Initiate → Operative → Agent → Commander |
| `achievements` | Discrete badges unlocked via lesson verification |

**RLS:** Enabled on all tables. Users read/write only their own rows. Content tables (`paths`, `modules`, `lessons`, `assets`) are public-read for published rows. `alumni_status` and `achievements` are read-only for end-users; writes go through service role to prevent client-side cheating.

**Migrations:** `infra/migrations/` — all migration content has been folded back into `schema.sql`. Running `schema.sql` from scratch gives a complete database.

---

## 5. Content system

- Source files: `content/paths/<path-slug>/chapter-<n>/lesson-<n>.mdx`
- Frontmatter fields: `title`, `lessonNumber`, `chapterNumber`, `pathNumber`
- Path registry: `apps/web/lib/data/paths.ts` — 30 paths, 194 lessons, 7-group taxonomy + OpenClaw Ecosystem
- Validator: `tooling/scripts/validate_content.py` — recursive chapter discovery, frontmatter validation, non-lesson file warnings
- `verifyType` values used across lessons: `code_submission` (45%), `terminal_output` (25%), `quiz` (23%), `screenshot` (7%)
- Archived/deprecated lesson trees: `content/paths_old/` — review policy September 2026, delete October 2026

---

## 6. Auth

- Provider: Supabase Auth — email/password and Google OAuth
- Callback route: `apps/web/app/api/auth/callback/route.ts`
- Proxy: `apps/web/proxy.ts` — route-level protection, preserves `next` param on redirect
- Password recovery: `/forgot-password` → `/reset-password` flow (added 2026-04)
- Layout-level gating decision: auth checks are colocated at the proxy layer (`proxy.ts`) or server component level, not scattered across layouts (reduces double-render and redirect loops)

---

## 7. Deployment

**Frontend:**
- Platform: Vercel
- Config: `vercel.json` at repo root
- Build: `npm run build` in `apps/web/`
- Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY`, `NEXT_PUBLIC_SENTRY_DSN`, `NEXT_PUBLIC_POSTHOG_KEY`, Stripe vars

**Backend:**
- Platform: Docker / Google Cloud Run
- Dockerfile: `apps/api/Dockerfile` — non-root `apiuser`, `HEALTHCHECK`, `.dockerignore`
- Local multi-service dev: `docker-compose.yml` at repo root starts the API; Next.js runs separately with `npm run dev`
- Runbook: `docs/deployment-runbook.md`

---

## 8. Key decisions

Full ADR log: `DECISIONS.md`. Summary:

- **ADR-001** — Keep root small; one concern, one home
- **ADR-002** — `.claude/` is the agent control plane (consolidated from `.agentic`, `.agents`, `.antigravity`)
- **ADR-003** — `apps/web/` and `apps/api/` as the two deployable surfaces
- **ADR-004** — Archive historical material under `docs/archive/` rather than leaving it in active folders
- **ADR-005** — Root status docs (`README.md`, `PROGRESS.md`, `SESSION_HANDOFF.md`) must reflect live repo state, not aspirational notes
- **ADR-006** — Hosted lesson progress self-heals from the live curriculum catalog via `curriculum-sync.ts` on demand
- **ADR-007** — Browser-local progress is a user-scoped fallback layer; anonymous legacy entries merge only when no competing signed-in scope exists
