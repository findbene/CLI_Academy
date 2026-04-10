# DECISIONS.md

## ADR-001 — Keep the root small

**Decision:** Root should contain only major ownership domains and a small set of operating documents.

**Why:** The existing flat structure increases ambiguity and context cost.

## ADR-002 — Use `.claude/` as the agent control plane

**Decision:** Consolidate active agent rules, command templates, memory helpers, and context loaders under `.claude/`.

**Why:** The existing `.agentic`, `.agents`, and `.antigravity` split is redundant.

## ADR-003 — Use `apps/` for deployable software

**Decision:** Put the learner-facing app under `apps/web/` and the backend under `apps/api/`.

**Why:** This scales better and makes product boundaries obvious.

## ADR-004 — Archive, do not intermingle

**Decision:** Put historical communication and design backup material under `docs/archive/`.

**Why:** Backups and one-off coordination docs should not compete with production code.

## ADR-005 — Root status docs must reflect the live repo

**Decision:** Treat `README.md`, `PROGRESS.md`, and `SESSION_HANDOFF.md` as canonical descriptions of the current repository state, not as aspirational migration notes.

**Why:** After structural moves, stale root docs create bad assumptions for both humans and agents and increase the risk of edits landing against the wrong paths.

## ADR-006 — Hosted learner progress must self-heal from the live curriculum catalog

**Decision:** Resolve hosted lesson progress against the live curriculum metadata and MDX lesson catalog by syncing `paths`, `modules`, and `lessons` into Supabase on demand instead of trusting the original seeded rows.

**Why:** The published learner surface now moves faster than the legacy seed data, and stale hosted lesson rows caused authenticated progress saves to fail against otherwise valid published lessons.

## ADR-007 — Browser-local learner progress is a scoped fallback, not a shared identity layer

**Decision:** Keep browser-local lesson progress as a resilience layer, but scope it per authenticated user and only merge legacy anonymous entries when no competing signed-in scopes exist.

**Why:** Local progress can later be reconciled into hosted rows. Treating that state as browser-global risks cross-account leakage and incorrect backfill on shared machines.

## ADR-008 — Reframe the academy around an install-to-production shell without replacing the lesson engine

**Decision:** Keep the existing lesson runtime, MDX content contract, progress plumbing, and tutor integration intact, then layer the new academy shell on top through shared product metadata for fast-path weeks, spine milestones, setup tracks, and asset-vault taxonomy.

**Why:** The repo already has a capable guided-learning engine and live curriculum corpus. The larger problem was positioning and organization, not lesson rendering. Reframing around Setup Academy, the 8-week fast path, and the Personal AI Workforce spine delivers the new product promise with less migration risk than rebuilding core delivery infrastructure.
