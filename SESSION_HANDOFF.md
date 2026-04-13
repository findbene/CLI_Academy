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
| **Tutor conversation history** | **WIRED** | localStorage persistence per lesson, last 20 turns passed to API |
| **Tutor rubric-aware prompts** | **WIRED** | rubricCriteria + deliverable passed in system prompt |
| **New content components** | **ADDED** | DiagramBlock, VideoBlock, DiffBlock, ModelNote in components/content/ |
| **Claw ecosystem tier map** | **ADDED** | ClawEcosystemTierMap component wired into /lounge |
| **FreeTierShowcase** | **REBUILT** | Real content replacing placeholder; Group 0/1/2 cards + Pro CTA |
| **SVG diagrams** | **ADDED** | 4 diagrams in public/assets/diagrams/ |
| **Companion resources** | **POPULATED** | 5 new assets, 43 relationships in academy metadata |
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

## Next Action (Optional Enhancements)

- Add actual video URLs to VideoBlock instances when recording is done
- Populate DiagramBlock in Group 1 mental model lessons (SVGs are in public/assets/diagrams/)
- Add full-text lesson search (SEARCH-01 — Supabase FTS post-launch)
- Backend pytest suite (TEST-01 — zero test coverage on Python backend)
- Run load test against tutor endpoint before public launch (LOAD-01)
