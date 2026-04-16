# SESSION_HANDOFF.md

## Status

| Component | State | Notes |
|-----------|-------|-------|
| Dashboard mastery gap label | FIXED | Shows path title, not raw slug |
| Daily tutor limit (race condition) | FIXED | Atomic PostgreSQL RPC; migration in `infra/migrations/02_atomic_tutor_limit.sql` — **deploy to Supabase (manual)** |
| Gamification streak trigger | FIXED | LessonPlayer fires POST /api/gamification/streak on every hosted save |
| Clearance level progression | FIXED | Backend awards Initiate → Operative → Agent → Commander; never demotes |
| Path overview local fallback | FIXED | PathLessonListHydration merges local completions into lesson list |
| Python tutor dead code | DELETED | `routers/tutor.py` and `services/tutor_service.py` removed. Next.js /api/tutor is the single LLM route. |
| Sentry error tracking | WIRED | Activates when NEXT_PUBLIC_SENTRY_DSN is set — **add to Vercel env (manual)** |
| PostHog analytics | WIRED + BUG FIXED | Env var name fixed (`NEXT_PUBLIC_POSTHOG_KEY`). Activates when value is set — **add to Vercel env (manual)** |
| Playwright in CI | FIXED | e2e job in .github/workflows/ci.yml |
| **Backend pytest in CI** | **FIXED** | pytest + pytest-asyncio added to CI api job and requirements.txt. 21/21 tests pass. |
| **Admin email comparison** | **FIXED** | `api/assets/[slug]/route.ts:71` normalized to `.toLowerCase().trim()` |
| **Search error isolation** | **FIXED** | `/api/search` try/catch per path — one bad path no longer crashes the index |
| **Path 20 v2 sections** | **FIXED** | All 5 lessons now have ## What you will build / ## Why this matters / ## Before you start |
| **Labs page** | **FIXED** | Replaced Unsplash prototype with "Coming Soon" server component |
| **Vitest** | **ADDED** | vitest.config.ts, 10 passing unit tests in lib/__tests__/learning.test.ts |
| **Pre-commit hooks** | **ADDED** | Husky + lint-staged + Prettier in apps/web/ |
| **k6 load test** | **CREATED** | Script at tooling/load-tests/tutor-load-test.js — not yet run against production |
| **Schema consolidation** | **DONE** | infra/schema.sql now includes gamification tables + tutor RPC from migrations. Stale seeds removed. |
| **Dead backend code** | **DELETED** | routers/tutor.py, services/tutor_service.py |
| **Unused .env vars** | **REMOVED** | NEXT_PUBLIC_API_BASE_URL and GOOGLE_API_KEY removed from apps/web/.env |
| **ARCHITECTURE.md** | **CREATED** | docs/ARCHITECTURE.md — system overview, all 14 DB tables, auth, deployment, ADR summaries |
| **docker-compose.yml** | **CREATED** | Repo root — starts Python API on port 8000 for local development |
| **apps/web/.env.example** | **CREATED** | Full documentation of all env vars with required/optional markers |

## Manual actions still required

1. **Rotate secrets** — `ANTHROPIC_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_API_KEY` were previously committed to git history. Rotate at each provider's dashboard.
2. **Deploy migration** — Run `infra/migrations/02_atomic_tutor_limit.sql` on production Supabase.
3. **Configure Sentry** — Set `NEXT_PUBLIC_SENTRY_DSN` in Vercel env vars.
4. **Configure PostHog** — Set `NEXT_PUBLIC_POSTHOG_KEY` in Vercel env vars.
5. **Configure Stripe** — Set price IDs and webhook secret when billing is ready.
6. **Run load test** — `k6 run tooling/load-tests/tutor-load-test.js` against staging/production after keys are rotated.
7. **Record path overview videos** — VideoBlock is wired; content TBD per group.

## Validation state (2026-04-16)

- `npm run lint` — clean (1 pre-existing warning in DiffBlock.tsx, 0 errors)
- `npm run typecheck` — clean
- `npm run build` — clean, all 115 pages generated
- `npm run test:unit` — 10/10 passing
- `python -m pytest tests/ -v` — 21/21 passing
- `python tooling/scripts/validate_content.py` — 194/194 lessons valid
| Dockerfile | FIXED | Non-root user, HEALTHCHECK, graceful shutdown |
| Vercel config | ADDED | apps/web/vercel.json |
| Deployment runbook | ADDED | docs/deployment-runbook.md |
| Three.js bundle | OPTIMISED | Lazy-loaded in AuthCard via next/dynamic |
| ESLint errors | FIXED | SavedResourcesClient, VerificationBlock, QuizBlock all clean |
| **Curriculum redesign** | **COMPLETE** | Full 7-group taxonomy, 27 paths, 175 lessons — see below |
| **OpenClaw restoration** | **COMPLETE** | 4 paths (11 rewrite + 28, 29, 30), 26 new lessons, 193 total lessons across 30 paths |
| **Tutor conversation history** | **WIRED** | localStorage persistence per lesson, last 20 turns passed to API |
| **Tutor rubric-aware prompts** | **WIRED** | rubricCriteria + deliverable passed in system prompt |
| **New content components** | **ADDED** | DiagramBlock, VideoBlock, DiffBlock, ModelNote in components/content/ |
| **Claw ecosystem tier map** | **ADDED** | ClawEcosystemTierMap component wired into /lounge |
| **FreeTierShowcase** | **REBUILT** | Real content replacing placeholder; Group 0/1/2 cards + Pro CTA |
| **SVG diagrams** | **ADDED** | 4 diagrams in public/assets/diagrams/ |
| **Companion resources** | **PLANNED** | 5 target assets defined in `infra/seeds/companion_resources.sql` — physical files and DB rows not yet created |
| **rubricCriteria** | **COMPLETE** | All 175 VerificationBlocks now have 3 rubric criteria |
| **v2 lesson sections** | **COMPLETE** | All 175 lessons have ## What you will build, ## Why this matters, ## Before you start |
| **verifyType diversity** | **COMPLETE** | 45% code_submission, 25% terminal_output, 23% quiz, 7% screenshot |
| **paths_old/README.md** | **ADDED** | Documents the April 2026 curriculum rewrite |

## Curriculum Redesign Summary (This Session)

### New 7-Group Taxonomy
- Group 0 (Path 01): Orientation — First Win
- Group 1 (Paths 02, 03 + new 20): Foundations
- Group 2 (new Paths 21, 22): Setup Studio
- Group 3 (Paths 04-09 + new 23, 24): Tool Mastery Tracks
- Group 4 (Paths 10-13, 16, 18): Project Studio
- Group 5 (Paths 14, 15, 17 + new 25, 26): Production & Advanced
- Group 6 (Path 19 + new 27): Career Pathways

### New Paths Added (8 total)
| Path | Title | Lessons |
|------|-------|---------|
| 20 | Agentic Mental Models | 5 |
| 21 | MCP Server Setup | 6 |
| 22 | Dev Environment Hardening | 4 |
| 23 | Debug-First Thinking | 5 |
| 24 | Test-Driven Agentic Development | 5 |
| 25 | Agent Safety in Production | 4 |
| 26 | Observability for Agent Developers | 4 |
| 27 | Job-Ready Brief | 3 |

### Content Infrastructure
- `inject_v2_depth.py` — script that upgraded all 139 existing lessons; rerunnable
- All 175 lessons have `groupId`, `clawClassification`, `estimatedMinutes`, `prerequisiteLesson` frontmatter
- `validate_content.py` now reports verifyType distribution and warns if terminal_output > 60%

## Manual Actions Still Required (cannot be automated)

1. **Rotate secrets** — `ANTHROPIC_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_API_KEY` were previously committed to git. Rotate at each provider's dashboard.
2. **Deploy migration** — Run `infra/migrations/02_atomic_tutor_limit.sql` on production Supabase.
3. **Configure Sentry** — Set `NEXT_PUBLIC_SENTRY_DSN` in Vercel env vars.
4. **Configure PostHog** — Set `NEXT_PUBLIC_POSTHOG_KEY` in Vercel env vars.
5. **Stripe configuration** — Set price IDs and webhook secret when billing is ready.
6. **Record path overview videos** — Video component is wired (VideoBlock), content TBD per group.

## OpenClaw Restoration Summary (This Session)

### What was done
- **Path 11 rewritten** — "OpenClaw: Self-Hosted Agent Infrastructure" (7 lessons). Old Docker/sandbox lessons archived to `content/paths_old/2026-04-curriculum-rewrite/sandbox-foundations/`.
- **Path 28 added** — "OpenClaw Configuration and Skills" (7 lessons): model routing, messaging channels, SKILL.md format, skill deployment, memory system, heartbeat, mini-project.
- **Path 29 added** — "OpenClaw Security and Production Operations" (7 lessons): YES gate, PII scrubbing, hardening checklist, real incidents, monitoring, updates/rollback.
- **Path 30 added** — "ZeroClaw and the Claw Variant Ecosystem" (5 lessons): ZeroClaw architecture, 10-min setup, limitations/migration, NanoClaw, variant selection.
- **paths.ts updated** — all 4 paths registered under `"OpenClaw Ecosystem"` section.
- **Content validator** — 193 lessons, 30 paths, all valid.
- **Web build** — clean.

### State after this session
- `content/paths/11-openclaw-and-claw-runtime-foundations/` — 3 new chapters, 7 new lessons
- `content/paths/28-openclaw-configuration-and-skills/` — 3 chapters, 7 lessons
- `content/paths/29-openclaw-security-and-production-operations/` — 3 chapters, 7 lessons (29.1.1–29.1.3, 29.2.1–29.2.2, 29.3.1–29.3.2)
- `content/paths/30-zeroclaw-and-the-claw-variant-ecosystem/` — 2 chapters, 5 lessons
- Content validator: 194 lessons across 30 paths, all valid
- Web build: clean

## Reference Center (This Session)

### What was built
- **`/reference` hub** — authenticated route listing all 8 reference cards by tier (free/pro) with category icons and topic tags
- **`/reference/[slug]`** — individual printable reference pages with a full print-optimized CSS layer (`@media print` block in `globals.css`)
- **8 reference cards** authored at full depth:
  - Free: Claude Code Setup Guide, Slash Commands Reference, Claude Code Quick Reference, MCP Server Reference, Claude Cowork Setup
  - Pro: OpenClaw Setup Guide, Claw Variant Selection Guide, Skills & SKILL.md Reference
- **Sidebar nav updated** — "Reference" link added between Resources and Downloads
- **Paths catalog** — reference center callout added above the path grid
- **Downloads page** — reference center callout added
- **`lib/data/references.ts`** — typed data layer for all reference card metadata
- **`components/reference/PrintButton.tsx`** — client "Print / Save as PDF" button (hidden on print)
- **`components/reference/cards/`** — 8 card content components + index barrel

### Print quality
- CSS `@media print` in `globals.css` collapses colors to light mode, converts code backgrounds to white, sets font sizes to 7-9pt, and uses `break-inside: avoid` on sections so each section stays on the page
- Pro card access gated: unauthenticated or free-tier users are redirected from pro reference slugs back to `/reference`

## Next Action (Optional Enhancements)

- Add actual video URLs to VideoBlock instances when recording is done
- Populate DiagramBlock in Group 1 mental model lessons (SVGs are in public/assets/diagrams/)
- Add full-text lesson search (SEARCH-01 — Supabase FTS post-launch)
- Backend pytest suite (TEST-01 — zero test coverage on Python backend)
- Run load test against tutor endpoint before public launch (LOAD-01)
