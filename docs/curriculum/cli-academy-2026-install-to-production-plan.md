# CLI Academy 2026 Install-to-Production Plan

This document turns the current CLI Academy repo into a clearer product and curriculum plan without replacing the live guided-learning engine.

## 1. Current Repo/App Diagnosis

### What already exists and should be preserved

- Monorepo split is healthy: learner frontend in `apps/web`, APIs in `apps/api`, curriculum source in `content/`, durable docs in `docs/`.
- The lesson engine is strong:
  - live curriculum already ships as structured MDX under `content/paths/`
  - lessons support Guided, Hint-based, and Independent modes
  - lesson pages already have verification, progress, tutor preload, and recommended downloads
  - dashboard, onboarding, and learner progress plumbing already work
- Live curriculum breadth is real:
  - 19 canonical path slugs
  - 139 validated live lessons
  - clear practical material around Claude Code, Cowork, runtime safety, skills, multi-agent patterns, secure integrations, and capstones

### What is currently misaligned with the new positioning

- Product shell still reads like a broad “agentic era” academy rather than the promised beginner-first install-to-production academy.
- The catalog model is still “flat path library” oriented.
- There is no first-class 8-week fast path object in the product model.
- Setup Academy is implied across multiple paths but not presented as a dedicated front-door surface.
- Asset Vault exists as downloads plus resources, but the system is not yet unified around builder assets, field manuals, playbooks, prompt packs, MCP packs, and starter kits.
- Several future-forward surfaces are conceptually present but not yet explicitly framed:
  - Prompt & Context Studio
  - Runtime Lab
  - Workflow Studio
  - Live Labs / Terminal Sandbox
  - Capstone Studio
  - Progress & Portfolio

### Diagnosis summary

The repo is not greenfield. It already has the right instructional engine and a meaningful curriculum corpus. The correct move is not “rewrite the platform.” The correct move is “reframe and reorganize the academy around a clearer install-to-production spine, then seed the most important missing surfaces.”

## 2. Final Product Architecture and Information Architecture

### Product promise

CLI Academy is the beginner-first install-to-production academy for Claude Code, Claude Cowork, OpenClaw, and the Claw-verse, with guided setup, deep troubleshooting, downloadable builder assets, live sandboxes, and one evolving project that turns a learner’s first local assistant into a portfolio-grade autonomous AI workforce.

### Top-level navigation

- Home
- Learn
- Setup Academy
- Prompt & Context Studio
- Projects
- Runtime Lab
- Workflow Studio
- Live Labs
- Asset Vault
- Capstone Studio
- Docs / Field Manuals
- Progress & Portfolio
- Community
- Pricing

### IA principle

The academy should feel like one connected operating system:

- public discovery explains the promise and the 8-week transformation
- Setup Academy removes beginner friction
- Learn organizes the curriculum and fast path
- Labs, assets, and field manuals provide working support
- dashboard and portfolio surfaces prove momentum and outcomes

### Recommended IA layers

#### Layer 1. Public discovery

- `/`
- `/paths`
- `/paths/[slug]`
- `/setup-academy`
- `/pricing`
- `/trust`
- `/compatibility`
- `/troubleshooting`

#### Layer 2. Learner execution

- `/dashboard`
- `/learn/[pathSlug]`
- `/learn/[pathSlug]/[lessonSlug]`
- `/downloads`
- `/labs`
- `/settings`

#### Layer 3. Future-forward academy studios

- Prompt & Context Studio
- Runtime Lab
- Workflow Studio
- Live Labs
- Capstone Studio
- Progress & Portfolio

These can launch progressively, but they need to be visible in the architecture now.

## 3. Full Detailed Curriculum

### Curriculum shape

- Delivery philosophy:
  - demo first
  - worked example
  - guided build
  - practice lab
  - boss fight
  - reflection
- Every course includes:
  - why this matters
  - main project
  - labs used
  - downloadables
  - quiz/exercise/boss-fight pattern
  - Guided / Hint-based / Independent mode support
  - Core / Boost / Mastery depth

### Pillar A. Zero-to-Run

#### Course 1. Setup Claude Code, config, troubleshoot, test, evaluate

- Main project:
  - First Working Claude Code Builder Session
- Chapters:
  - What Claude Code is and where it lives
  - Install and authenticate by OS
  - Core commands, project context, and safe approvals
  - Config, doctor, settings, logs, and recovery
  - First useful build and evaluation
- Downloadables:
  - install checklist
  - auth recovery playbook
  - first-session printable
  - CLAUDE.md starter

#### Course 2. Setup Claude Cowork, config, troubleshoot, test, evaluate

- Main project:
  - Research Folder to Briefing Pack
- Chapters:
  - What Cowork is good at
  - Folder access and safe file boundaries
  - Outcome-focused task briefs
  - Review loops and troubleshooting
  - End-to-end briefing workflow
- Downloadables:
  - session brief template
  - source hygiene checklist
  - deliverable QA sheet

#### Course 3. Setup OpenClaw, config, troubleshoot, test, evaluate

- Main project:
  - Personal Assistant in a Sandbox
- Chapters:
  - Runtime mental model
  - Environment prep and install shape
  - Configuration and first boot
  - Safe boundaries and first bounded action
  - Troubleshooting and validation

#### Course 4. Setup Claw-verse variants

- Main project:
  - One Task, Multiple Runtimes
- Chapters:
  - Why variants exist
  - Choosing the right runtime as a beginner
  - Shared config patterns across runtimes
  - Troubleshooting patterns across variants
  - Decision memo and recommendation
  - 2026 Update micro-module

#### Course 5. Setup Hermes Agent

- Main project:
  - Persistent Study and Ops Assistant
- Chapters:
  - What persistence changes
  - Install and basic config
  - Memory classes and continuity tests
  - Troubleshooting persistence drift
  - Cross-session validation

#### Course 6. CLI Mastery for AI Agents

- Main project:
  - Agent Operator Toolkit
- Chapters:
  - Absolute-beginner shell orientation
  - Navigation, files, and paths
  - Processes, logs, env vars, and Git basics
  - Small scripts and helper commands
  - Operator toolkit mini-project

#### Course 7. Claude Code for Absolute Beginners

- Main project:
  - My First Useful App
- Chapters:
  - Talking to Claude Code effectively
  - Reading diffs and iterating safely
  - Step-by-step app build
  - Debugging with Claude
  - Polish and reflection

### Pillar B. Prompt & Context Studio

#### Course 8. Prompting fundamentals for beginners

- Main project:
  - Prompt Makeover Pack
- Chapters:
  - Prompt anatomy
  - clarity and specificity
  - examples and constraints
  - rewriting workshop

#### Course 9. User/system prompting, templates, variables

- Main project:
  - Reusable Prompt Kit
- Chapters:
  - system vs user prompt roles
  - reusable templates
  - variables and placeholders
  - prompt libraries for Code, Cowork, and runtime workflows

#### Course 10. Context engineering, tokens, model controls

- Main project:
  - Context Optimization Lab
- Chapters:
  - what context really is
  - token budgets
  - context windows and truncation
  - model controls and extended thinking
  - overload diagnosis

#### Course 11. Harness engineering, prompt evaluation, debugging

- Main project:
  - Prompt Harness and Eval Kit
- Chapters:
  - evaluation-first prompting
  - side-by-side prompt tests
  - failure analysis
  - Prompt Doctor patterns

### Pillar C. Zero-to-Build

#### Course 12. Claude Cowork for knowledge-work automation

- Main project:
  - Analyst-in-a-Box
- Chapters:
  - document workflows
  - research workflows
  - extraction pipelines
  - delivery QA

#### Course 13. MCP, skills, slash commands, hooks, subagents

- Main project:
  - Builder Extension Pack
- Chapters:
  - MCP mental model
  - skills and slash commands
  - hooks and subagents
  - security and review
  - packaging into reusable builder assets

#### Course 14. First single-agent workflows and automation

- Main project:
  - Personal Automation Assistant
- Chapters:
  - workflow scoping
  - single-agent loops
  - retries and stop conditions
  - evidence and logging

### Pillar D. Zero-to-Ground

#### Course 15. RAG foundations

- Main project:
  - Courseware Q&A Assistant
- Chapters:
  - retrieval mental model
  - ingestion and chunking basics
  - citations and grounded answers
  - evaluation and failure cases

#### Course 16. Agentic RAG and document pipelines

- Main project:
  - Research Analyst Agent
- Chapters:
  - retrieval plus task planning
  - extraction pipelines
  - review loops and source traceability
  - grounded decision memos

### Pillar E. Zero-to-Orchestrate

#### Course 17. Agent roles, decomposition, multi-agent patterns

- Main project:
  - Operations Agent Team
- Chapters:
  - planner/worker/reviewer roles
  - contracts and stop conditions
  - failure handling
  - avoiding complexity addiction

#### Course 18. Messaging integrations and Workflow Studio

- Main project:
  - Message-to-Workflow Control Center
- Chapters:
  - messaging interfaces
  - n8n-style node mental model
  - human approval and replay
  - monitoring workflow runs

### Pillar F. Zero-to-Ship

#### Course 19. Deployment paths, observability, reliability, safety

- Main project:
  - Shippable Agent System
- Chapters:
  - local to Docker to VPS choices
  - observability and alerts
  - reliability patterns and rollback
  - safety layers and go-live checklist
  - 2026 Update micro-module

#### Course 20. Portfolio packaging and final capstone

- Main project:
  - Autonomous AI Workforce Capstone
- Chapters:
  - plan the integrated system
  - build and pilot
  - collect evidence
  - package README, diagrams, demo script, and roadmap

#### Course 21. Cost engineering, scaling, and multi-provider agents

- Mastery layer only
- Main project:
  - Production Cost and Resilience Layer
- Chapters:
  - token budgets and latency tradeoffs
  - fallback providers and graceful degradation
  - evaluation harnesses and SLOs
  - dashboards, alerts, and cost-aware orchestration

### Flagship course seed depth for first release

The first 4-5 flagship surfaces should ship with obvious depth:

- Setup Claude Code
- Setup Claude Cowork
- Setup OpenClaw and runtime foundations
- Prompt & Context Studio starter pack
- MCP / skills / builder extension pack
- RAG foundations seed

## 4. 8-Week Fast Path in Full Detail

| Week | Theme | Deliverable | Core live bridge |
|---|---|---|---|
| 1 | Setup and first win | Local Starter Assistant | Paths 01, 02, 03 |
| 2 | Claude Code foundations | Useful Builder App | Paths 03, 04, 05, 07 |
| 3 | Cowork and templates | Folder-to-Briefing Workflow | Paths 08, 09, 10 |
| 4 | Runtime foundations | Message-to-Action Assistant | Paths 07, 11, 14 |
| 5 | Skills and integrations | Builder Extension Pack | Paths 12, 14, 17 |
| 6 | Grounded workflows | Grounded Knowledge Assistant | live bridge + seeded RAG courses |
| 7 | Orchestration | Operations Agent Team | Paths 13, 16, 17, 18 |
| 8 | Deployment and portfolio | Autonomous AI Workforce | Paths 15, 18, 19 |

### Week pattern

Every week includes:

- overview and visible win
- 3-5 short lessons
- worked example
- guided lab
- checkpoint quiz
- exercise
- boss fight
- downloadable pack
- reflection
- working artifact

## 5. Content Model / Schema

### Program-level entities

- `program`
  - title
  - positioning
  - promise
  - totalWeeks
- `pillar`
  - id
  - title
  - summary
  - sortOrder
- `course`
  - id
  - title
  - pillarId
  - difficulty
  - position
  - estimatedHours
  - mainProject
  - liveStatus
  - livePathSlug optional
- `chapter`
  - id
  - courseId
  - title
  - summary
  - chapterNumber
- `lesson`
  - existing MDX contract stays
  - add optional tags for week, spine milestone, studio surface, and asset pack
- `lab`
  - id
  - lessonId
  - environmentType
  - resettable
  - compareToReference
  - hintModeSupport
- `asset`
  - id
  - category
  - tier
  - formats
  - printable
  - recommendedLessons
  - recommendedPaths
- `spineMilestone`
  - week
  - artifact
  - unlockText
- `progressEvent`
  - userId
  - lessonId
  - verifierState
  - modeUsed
  - artifactCount

### Model decision

Do not replace the existing lesson MDX loader. Extend around it:

- keep lesson MDX as the content truth
- add academy-level metadata objects for weeks, pillars, setup tracks, and spine progress
- progressively enrich the catalog rather than migrating every lesson file at once

## 6. Page Map and Component Map

### Page map

- Home
  - promise
  - fast path preview
  - spine project preview
  - surfaces grid
  - setup tracks
- Learn catalog
  - fast path strip
  - grouped live paths
- Path detail
  - path summary
  - spine role
  - assets
  - lesson list
- Setup Academy
  - week 1 outcome
  - setup tracks
  - troubleshooting moat
  - featured starter assets
- Asset Vault
  - filters
  - asset cards
  - tier states
- Dashboard
  - current focus
  - completed count
  - tutor usage
  - spine project tracker
  - recommended next
  - continue learning

### Component map

- `FastPathTimeline`
- `SpineProjectProgress`
- `AssetCard`
- `DownloadsFilter`
- `LessonPlayer`
- `LessonContent`
- `LearningModeSelector`
- `FloatingTutor`
- `ProgressHydration`

## 7. Phased Implementation Plan

### Phase 1. Reframe without breaking the engine

- introduce shared academy data model
- update home page positioning
- add Setup Academy surface
- add spine progress UI
- rename Downloads surface to Asset Vault

### Phase 2. Strengthen catalog and week mapping

- add week/pillar/spine metadata to live catalog cards
- tune onboarding recommendations to the fast path
- unify downloads and resources into one asset model

### Phase 3. Expand content depth

- seed the first 4-5 flagship courses with deeper downloadable packs
- author missing Prompt & Context Studio starter content
- add RAG seed material

### Phase 4. Labs and studios

- convert `/labs` from prototype to curriculum-native live labs surface
- add Workflow Studio and Runtime Lab shells
- connect future portfolio and capstone surfaces

## 8. Systematic Implementation Started

This planning pass is already being implemented in the live product:

- new academy blueprint data model for fast path, setup tracks, and spine stages
- homepage reframed around the install-to-production academy promise
- new Setup Academy marketing surface
- new spine-project progress component added to dashboard and path pages
- Asset Vault taxonomy expanded and legacy asset-path mismatches corrected
- new starter playbooks and field manuals added for Week 1 and builder extension work
- 2026 freshness micro-modules are now explicitly part of Course 4 and Course 19
- chapter delivery standards now require short demo video, annotated visuals, one simple diagram, and a Mini Notes printable
- Course 21 now exists as the post-capstone mastery layer for cost engineering, scaling, and multi-provider resilience
- badges and optional showcase hooks are framed as light motivation tied to real artifacts, not as a noisy community-first product layer
