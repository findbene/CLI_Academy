# PLAN.md

## Objective

Harden the learner-facing web product while reframing CLI Academy around the new beginner-first install-to-production academy shell.

## Approved sequence

1. keep hosted lesson progress aligned with the live curriculum catalog
2. preserve learner continuity with user-scoped browser-local fallback and deliberate backfill into hosted progress
3. continue editorial QA on rewritten live paths with command realism and learner-outcome review
4. add regression coverage around learner-flow surfaces, tutor modes, and lesson rendering edge cases
5. revisit gamification persistence and other backend write semantics after learner-flow behavior is stable
6. layer in the academy-shell architecture: fast-path framing, Setup Academy, spine-project progress, and Asset Vault unification without replacing the lesson engine

## Success criteria

- signed-in lesson progress survives across devices via hosted Supabase rows
- browser-local fallback never leaks across users and can be backfilled safely
- learner-facing dashboard, lesson page, and resume state stay consistent enough for real use
- root docs accurately describe the live learner-flow architecture and current priorities
- validation remains green on the current frontend tree
- the public shell clearly communicates the install-to-production moat and the 8-week Personal AI Workforce progression
