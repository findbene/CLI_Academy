# Agent Swarm Architecture

This document defines the internal agent system for CLI Academy.

The public product is one learner-facing app.
Internally, it is powered by a swarm of specialized agents.

## 1. Design Principle

The swarm exists to improve:

- learner outcomes
- product trust
- content freshness
- monetization
- retention
- operational leverage

It should not make the external product feel chaotic.

## 2. Public vs Internal Boundary

### Public-facing agents

These directly affect learner experience:

- Setup Coach Agent
- Troubleshooting Agent
- Safety Agent
- Assessment Agent

### Internal-only agents

These improve the system behind the scenes:

- Curriculum Architect Agent
- Platform Detection Agent
- Update Agent
- Lab Generator Agent
- Role Path Agent
- PDF/Artifact Agent
- Video Script Agent
- Marketing Agent
- Customer Success Agent

## 3. Agent Catalog

## 3.1 Curriculum Architect Agent

Purpose:
Suggests path structure, lesson sequencing, and content gaps.

Phase:
2

## 3.2 Platform Detection Agent

Purpose:
Maps the learner to the right path and troubleshooting logic based on environment.

Phase:
1 lightweight, 2 deeper

## 3.3 Setup Coach Agent

Purpose:
Guides installation and environment setup step by step.

Phase:
1

## 3.4 Update Agent

Purpose:
Tracks product/tool changes and proposes updates, release notes, and migration advice.

Phase:
2

## 3.5 Safety Agent

Purpose:
Flags risky instructions, leaked token patterns, unsafe port exposure, and dangerous shortcuts.

Phase:
1

## 3.6 Lab Generator Agent

Purpose:
Creates hands-on lab ideas and validation logic.

Phase:
3

## 3.7 Troubleshooting Agent

Purpose:
Diagnoses install and runtime issues in context.

Phase:
1

## 3.8 Role Path Agent

Purpose:
Maps content and upgrades to persona-specific flows.

Phase:
2

## 3.9 Assessment Agent

Purpose:
Creates and scores lightweight checks for understanding and capability.

Phase:
2

## 3.10 PDF/Artifact Agent

Purpose:
Generates polished checklists, guides, cheatsheets, and templates.

Phase:
2

## 3.11 Video Script Agent

Purpose:
Generates scripts for short video snippets, demos, and explainers.

Phase:
3

## 3.12 Marketing Agent

Purpose:
Repurposes lessons into launch assets, SEO content, social posts, and lead magnets.

Phase:
3

## 3.13 Customer Success Agent

Purpose:
Detects stagnation, drop-off, churn risk, and upgrade readiness.

Phase:
3

## 4. Swarm Communication Model

Internal agents should communicate through explicit events and jobs rather than ad hoc hidden coupling.

Examples:

- learner_completed_path
- learner_failed_lab
- repeated_tutor_confusion
- lesson_marked_stale
- tool_release_detected
- upgrade_prompt_viewed
- churn_risk_high

## 5. Control Rules

- every agent has a narrow responsibility
- no broad autonomous write power in early phases
- safety and content publication require review in early phases
- learner-facing agents must be predictable and bounded
- internal agents must leave logs and proposed actions

## 6. Why This Matters

This swarm model lets CLI Academy become more than a static course app.

It becomes:

- a learner product
- a living content system
- a support engine
- a growth engine
- an operational intelligence layer

All without confusing the customer about what they are buying.
