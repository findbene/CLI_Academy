# PROGRESS.md

## Current phase

Post-normalization verification and documentation alignment.

## Completed

- Defined the normalized top-level scaffold and operating-document set
- Moved the frontend from `app/` to `apps/web/`
- Moved the backend from `backend/` to `apps/api/`
- Renamed `infrastructure/` to `infra/`
- Moved scripts into `tooling/scripts/`
- Consolidating active agent-control material into `.claude/`
- Architecting the complete `Content Swarm Pipeline` multi-agent automation using `.agents/` workflows
- Launching "The Terminal Tavern" (Agent Lounge) via a dedicated Next.js `/lounge` route with isolated MDX parsing
- Resolving visibility and contrast bugs on the Floating Tutor Mode dropdown
- Upgrading the homepage WebGL aurora background to a mathematical, multi-chromatic (Purple/Blue/Pink) luxury gradient
- Stabilizing the Auth flow with a server-side logout route that forcibly clears caching

## In progress

- Verifying CI/CD paths, deployment references, and env assumptions after the `apps/` migration
- Identifying shared lesson, tutor, and content-loading logic that should move into `packages/`
- Auditing legacy path references and leftover compatibility risks from the old layout

## Next

1. Update any remaining CI, deployment, or automation references that still assume the old root layout.
2. Add package boundaries under `packages/` where reuse is already real.
3. Create `docs/architecture/` migration notes for the normalized repo.
4. Decide the long-term strategy for `content/paths_old/`.
