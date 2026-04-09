# MEMORY.md

## Stable repo memory

- CLI Academy is learner-first and beginner-friendly.
- Project-first learning is a core product principle.
- Safety, verification, and troubleshooting are part of the product, not optional extras.
- The repo should stay easy for agents to navigate with minimal context.
- The root must remain small and intentional.
- The live lesson contract is the chapterized `content/paths/**/lesson-*.mdx` tree; anything outside that pattern is historical or support material and should not leak into learner routes.
- Durable learner progress depends on syncing the live curriculum catalog into Supabase `paths`, `modules`, and `lessons`; stale seed rows are not sufficient for hosted lesson progress.
- Browser-local lesson progress is a resilience layer, not the source of truth. It must be scoped per learner and only backfilled into hosted progress deliberately.
- Lesson rendering logic must respect fenced code blocks; naive blank-line splitting leaks example headings out of markdown samples and breaks section tracking.

## Structural invariants

- Root docs define the operating model.
- `apps/web/` and `apps/api/` are the canonical runtime locations.
- `apps/` holds deployable software.
- `content/` holds the curriculum source of truth.
- `content/lounge_published/` acts as the separate, fast-paced stream for Swarm generation.
- `.claude/` holds agent control-plane materials.
- `agents/` holds repo-level agent scaffolding and related helpers.
- historical material belongs in `docs/archive/`.
- `README.md`, `MEMORY.md`, `PROGRESS.md`, `TASKS.md`, and `SESSION_HANDOFF.md` should describe the live repo state, not an outdated migration plan.

## Things not to regress

- do not reintroduce overlapping root folders for the same concern
- do not scatter memory notes across hidden directories
- do not break frontend Light/Dark mode contrasts by hardcoding tailwind text/bg colors (always use `var(--color-bg-panel)`, etc.)
- do not let structural migrations land without also updating root status docs and handoff notes
- do not overlook Next.js's sticky router cache in `.next/`; always nuke the folder when executing heavy structural route renames to avoid 500 crashes.
- do not pipe content blindly into raw text files (e.g. `requirements.txt`) in Windows PowerShell without explicitly handling UTF-16 encodings/BOMs, which cause critical packaging failures.
- always aggressively verify environments before determining an app is broken; terminal sessions cache old path references that hide newly installed libraries.
- do not treat browser-local learner state as browser-global when it can later be reconciled into authenticated backend data; scope it to the user before backfill.
