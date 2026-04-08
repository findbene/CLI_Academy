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
