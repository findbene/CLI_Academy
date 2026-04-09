# TASKS.md

## P0 (Current Epic: Curriculum QA + Learner Flow)

- [x] Normalize the live curriculum back to canonical `content/paths/` slugs for Paths 01-19 and archive stale duplicate trees under `content/paths_old/`.
- [x] Modernize the live lesson loader and content validator around chapterized `lesson-*.mdx` files and the current frontmatter contract.
- [x] Replace legacy capstone and productivity lesson packs in Paths 18 and 19 with real bounded workflow and portfolio artifacts.
- [x] Replace the older chapter trees across Paths 04-09 with deeper practical lessons for repo navigation, debugging, Git/GitHub, surface switching, Cowork, and research workflows.
- [x] Add learner-flow support in the web app for onboarding start routes, dashboard resume targets, section progress tracking, and server-backed lesson verification.
- [ ] Run editorial QA across the rewritten live paths, prioritizing Paths 11, 12, 14, 15, 16, 18, and 19.
- [ ] Run authenticated browser QA for onboarding completion, dashboard continue-learning, mobile app navigation, lesson progress, and verification UX.

## P1 (Product Hardening)

- [ ] Revisit gamification persistence and concurrency semantics.
- [ ] Verify CI/CD, deployment, and env references after the recent app and curriculum changes.
- [ ] Add stronger regression coverage around learner-flow surfaces and verification behavior.
- [ ] Continue Pro-tier scoping for `mcp-mastery` and `workflow-automation`.

## P2 (Structure + Operations)

- [ ] Finalize the long-term handling strategy for `content/paths_old/` and historical lesson artifacts.
- [ ] Add docs freshness checks for root operating files.
- [ ] Add package boundaries under `packages/` when duplication justifies extraction.
- [ ] Create durable architecture notes for the curriculum and learner-flow migration decisions.
