# MEMORY.md

## Stable repo memory

- CLI Academy is learner-first and beginner-friendly.
- Project-first learning is a core product principle.
- Safety, verification, and troubleshooting are part of the product, not optional extras.
- The repo should stay easy for agents to navigate with minimal context.
- The root must remain small and intentional.

## Structural invariants

- Root docs define the operating model.
- `apps/web/` and `apps/api/` are the canonical runtime locations.
- `apps/` holds deployable software.
- `content/` holds the curriculum source of truth.
- `content/lounge_published/` acts as the separate, fast-paced stream for Swarm generation.
- `.claude/` holds agent control-plane materials.
- `.agents/` holds the strictly enforced Antigravity workflows and skills for Swarm Automation.
- historical material belongs in `docs/archive/`.
- `README.md`, `PROGRESS.md`, and `SESSION_HANDOFF.md` should describe the live repo state, not an outdated migration plan.

## Things not to regress

- do not reintroduce overlapping root folders for the same concern
- do not scatter memory notes across hidden directories
- do not break frontend Light/Dark mode contrasts by hardcoding tailwind text/bg colors (always use `var(--color-bg-panel)`, etc.)
- do not let structural migrations land without also updating root status docs and handoff notes
- do not overlook Next.js's sticky router cache in `.next/`; always nuke the folder when executing heavy structural route renames to avoid 500 crashes.
- do not pipe content blindly into raw text files (e.g. `requirements.txt`) in Windows PowerShell without explicitly handling UTF-16 encodings/BOMs, which cause critical packaging failures.
- always aggressively verify environments before determining an app is broken; terminal sessions cache old path references that hide newly installed libraries.
