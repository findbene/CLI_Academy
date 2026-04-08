# IMPLEMENT.md

## Implementation protocol

1. Create a dedicated branch.
2. Move folders without changing behavior first.
3. Fix imports, scripts, CI paths, and references.
4. Run validation and smoke checks.
5. Update docs only after the moves are true.
6. Record the migration in `PROGRESS.md` and `SESSION_HANDOFF.md`.

## Change style

- prefer small, verifiable moves
- avoid mixing refactors with behavior changes
- commit by concern, not by mood
