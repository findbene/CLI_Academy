---
description: The main orchestrator workflow for generating Lounge content.
---

# Run Lounge Pipeline

This workflow coordinates the multi-agent swarm to produce a fully formatted MDX article for The Terminal Tavern (Agent Lounge).

1. Execute the `scout_daily` workflow or gather explicit user topic requests.
2. Delegate to **Researcher Agent**: Pull facts, documentation, and specific commands for the topic.
3. Delegate to **Ideation Agent**: Generate 3-5 potential "fun" titles and article angles.
4. **[HUMAN IN THE LOOP]** Stop and ask the User to approve the best title/angle. Do NOT proceed until the user approves.
5. Delegate to **Outline Agent**: Create a structured outline including visual/media placeholders.
6. Delegate to **Writer Agent**: Using the `lounge_tone` skill, draft the full content block by block.
7. Delegate to **Editor Agent**: Proofread, remove any marketing hype, and ensure formatting uses `mdx_publisher` skill.
8. Delegate to **Publisher Agent**: Write the final MDX file to `apps/web/content/lounge_drafts/`.
9. **[HUMAN IN THE LOOP]** Ask the user to review the draft. If approved, explicitly move it to `apps/web/content/lounge_published/`.
