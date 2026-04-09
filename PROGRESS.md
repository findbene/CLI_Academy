# PROGRESS.md

## Current phase

Zero-To-Mastery (ZTM) Infrastructure & Pedagogy Implementation.

## Completed

- **The ZTM Strategic Pivot:** Overhauled marketing pages and value propositions to highlight *Agentic Alumni Networks*, *Gamified Milestones*, and *Case Studies* (like NVIDIA NemoClaw).
- **Backend Architecture Re-write:**
  - Scaled up the rate limiter (`rate_limit.py`) using Redis caching and sliding windows to prevent horizontal bottlenecks.
  - Injected `python-json-logger` to format API telemetry automatically for Datadog/ELK parsing.
  - Enhanced the AI Tutor Agent with a dynamic "NemoClaw-Style" Orchestrator that intercepts system prompts and adapts its personality based on user conversation history (e.g., "Patient Mentor" vs "Infra Engineer").
  - Built the `gamification.py` backend endpoint to validate user JWT constraints before awarding daily streaks.
- **Curriculum Authoring (Phase 1):**
  - Fully authored the MDX payloads for `nano_claw_organizer.mdx` (Free Tier) and `nemoclaw_simulation.mdx` (Pro Capstone).
  - Drafted the `ZeroClaw Hello World` MDX lesson to complete the 3 Free Entry points block.
  - Adopted the Hybrid Model: Integrated code snippets directly in the MDX text *alongside* fully executable Python/JS starter/solution files packed in `public/assets/labs/`.
- **Lounge & Gamification Sub-systems:**
  - Prototyped the premium "Agent Lounge" UI with mock data using Framer Motion liquid glassmorphism.
  - Formally connected the Authentication Database endpoints for Gamification (`alumni_status`, `user_progress`, `achievements`).
  - Rapidly prototyped the secure "Alumni Command Center" (UI Dashboard).

- **ZTM Stabilization & Bug Fixes:**
  - Hardened the `uvicorn` and FastAPI deployment by ensuring `supabase` and `python-json-logger` dependencies are fully mapped and running in the background.
  - Cleared corrupted Next.js build cache (`.next/`) to resolve `[slug]` router collisions in the `app/(marketing)/` layout.
  - Successfully validated End-to-End frontend/backend synchronization and Agent Lounge dynamic MDX rendering via comprehensive Browser Subagent testing.
  - Restored the high-conversion "One-Liner" marketing punchline to the `HomePage` hero section UI.
- **Audit Remediation Pass (2026-04-09):**
  - Restored the Lounge as a public surface by moving the published-content implementation onto `/lounge` and deleting the stale tracked backup route artifact.
  - Replaced broken Lounge placeholder references with real local SVG assets and added rendering support for custom `Screenshot` and `TerminalSimulation` content blocks.
  - Tightened backend startup/config handling by loading `.env` before router import, requiring admin Supabase credentials for gamification paths, and upgrading readiness checks to return `503` when critical dependencies are missing.
  - Hardened auth accessibility and smoke coverage by wiring explicit input labels, adding accessible provider button names, and updating Playwright to assert against actual runtime behavior instead of test-runner env guesses.
  - Verified the remediation with clean frontend `lint`, clean production `build`, green Playwright smoke suite (`16/16`), and backend `compileall` success.

## In progress

- Initiating the foundational scoping for the Pro-Tier `mcp-mastery` and `workflow-automation` modules.

## Next

1. Kick off the next batch of Lounge/editorial content now that the public route and renderer are stable.
2. Draft the Capstone MDX payloads for the `mcp-mastery` paths.
3. Harden the gamification service further around concurrency and malformed database edge cases.
