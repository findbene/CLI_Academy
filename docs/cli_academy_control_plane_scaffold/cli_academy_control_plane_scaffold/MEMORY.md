# MEMORY.md

## Stable repo memory

- CLI Academy is learner-first and beginner-friendly.
- Project-first learning is a core product principle.
- Safety, verification, and troubleshooting are part of the product, not optional extras.
- The repo should stay easy for agents to navigate with minimal context.
- The root must remain small and intentional.

## Structural invariants

- Root docs define the operating model.
- `apps/` holds deployable software.
- `content/` holds the curriculum source of truth.
- `.claude/` holds agent control-plane materials.
- historical material belongs in `docs/archive/`.

## Things not to regress

- do not reintroduce overlapping root folders for the same concern
- do not scatter memory notes across hidden directories
- do not mix backup/design/history material with active product code
