# paths_old — Archived Curriculum

This directory contains the original CLI Academy curriculum, archived during the April 2026 curriculum rewrite.

## Why These Were Archived

The original curriculum (71 lessons across an earlier path structure) was replaced in April 2026 for three reasons:

1. **Project-first structure**: The original curriculum was theory-heavy in the early paths. The rewrite leads with hands-on projects and moves conceptual grounding to Group 1 (Agentic Mental Models).

2. **Ecosystem coherence**: The original paths did not express the Claw ecosystem tier model. The rewritten curriculum explicitly classifies each path as Core, Elective, or Advanced, and teaches tools in the context of the ecosystem they belong to.

3. **verifyType diversity**: The original curriculum used terminal_output verification universally. The rewritten curriculum varies verification type by lesson purpose (quiz for concepts, code_submission for implementations, screenshot for UI steps).

## What Is Here

| Subdirectory | Content | Why Archived |
|---|---|---|
| 2026-04-curriculum-rewrite/ | Original paths 01-19 MDX files (pre-rewrite) | Superseded by the restructured Group 0-6 taxonomy |

## Retention Policy

These files are retained for:
- Historical reference and migration auditing
- Recovery if a rewritten lesson needs to reference the original approach
- Compliance with the repo's "archive rather than delete" convention

Do not use these files in the live learner routes. The live curriculum is in `content/paths/`.

## Migration Date

April 2026. See `PROGRESS.md` at the repo root for full migration notes.

## Deprecation Schedule

- **Archive date**: April 2026
- **Review date**: September 2026 — assess whether any archived lesson has been referenced for migration recovery since the archive date.
- **Delete date**: October 2026 — remove this directory entirely unless an active recovery need is identified at the September review.
- **Owner**: Project maintainer. No automated deletion; requires deliberate review before removal.

If any lesson from `paths_old/` is needed for content migration or reference before October 2026, copy the relevant file to `docs/archive/` with a brief migration note rather than restoring it to `content/paths/`.
