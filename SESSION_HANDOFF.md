# SESSION_HANDOFF.md

## Status

| Component | State | Notes |
|-----------|-------|-------|
| Dashboard mastery gap label | FIXED | Shows path title, not raw slug |
| Daily tutor limit (race condition) | FIXED | Atomic PostgreSQL RPC; migration in `infra/migrations/02_atomic_tutor_limit.sql` — deploy to Supabase |
| Gamification streak trigger | FIXED | LessonPlayer fires POST /api/gamification/streak on every hosted save |
| Clearance level progression | FIXED | Backend awards Initiate → Operative → Agent → Commander; never demotes |
| Path overview local fallback | FIXED | PathLessonListHydration merges local completions into lesson list |
| Python tutor duplicate | FIXED | Removed from main.py includes; Next.js /api/tutor is the single LLM route |
| Sentry error tracking | WIRED | Activates when NEXT_PUBLIC_SENTRY_DSN is set |
| PostHog analytics | WIRED | Activates when NEXT_PUBLIC_POSTHOG_KEY is set |
| Playwright in CI | FIXED | e2e job added to .github/workflows/ci.yml |
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

## Next Action (Optional Enhancements)

- Add actual video URLs to VideoBlock instances when recording is done
- Populate DiagramBlock in Group 1 mental model lessons (SVGs are in public/assets/diagrams/)
- Add full-text lesson search (SEARCH-01 — Supabase FTS post-launch)
- Backend pytest suite (TEST-01 — zero test coverage on Python backend)
- Run load test against tutor endpoint before public launch (LOAD-01)
