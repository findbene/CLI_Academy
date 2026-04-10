# CLI Academy 2026 Product Architecture And Curriculum Blueprint

Last updated: 2026-04-10
Status: active redesign blueprint aligned to the live monorepo

## 1. Current Repo And App Diagnosis

### What exists now

- The live product is not greenfield. It already has a functioning Next.js learner app in `apps/web/`, a Supabase-backed progress layer, a floating tutor, a downloads surface, and a chapterized curriculum renderer.
- The active curriculum source of truth is `content/paths/` with 19 published path slugs, 57 chapter folders, and 139 live `lesson-*.mdx` files.
- The guided learning engine is already strong. Every live lesson uses `stepSchemaVersion: 1` plus authored `<StepMeta />` scaffolding, and the lesson player supports Guided, Hint-based, and Independent modes.
- The strongest existing product assets are:
  - structured lesson rendering in `apps/web/components/lesson/LessonContent.tsx`
  - durable path metadata in `apps/web/lib/data/paths.ts`
  - catalog syncing in `apps/web/lib/catalog.ts`
  - learner progress, verification, and tutor context
  - an initial downloads system in `apps/web/lib/assets.ts`

### What the live curriculum is actually teaching

The current 19-path catalog is organized around foundational setup, Claude Code, Cowork, security, runtime basics, multi-agent patterns, automation, and capstones:

1. `01-start-here`
2. `02-terminal-and-file-system-foundations-for-normal-people`
3. `03-claude-code`
4. `04-claude-code-repo-workflows-and-project-navigation`
5. `05-claude-code-debugging-testing-and-refactoring`
6. `06-git-and-github-for-ai-assisted-builders`
7. `07-claude-code-across-terminal-ide-desktop-and-browser`
8. `08-claude-cowork`
9. `09-claude-cowork-for-documents-research-and-data-extraction`
10. `10-claude-cowork-for-admin-operations-and-team-rituals`
11. `11-openclaw-and-claw-runtime-foundations`
12. `12-skills-memory-heartbeats-and-scheduled-work`
13. `13-multi-agent-patterns-for-real-life`
14. `14-secure-local-machines-and-safe-defaults`
15. `15-secure-remote-setups`
16. `16-computer-use-sandboxes-and-browser-automation`
17. `17-secure-integrations`
18. `18-real-world-agent-builds-for-everyday-productivity`
19. `19-capstones-portfolio-proof-and-job-ready-evidence`

### What is working well

- The product already teaches by doing rather than by abstract lecture.
- Paths 01-10 are beginner-usable and calm in tone.
- Paths 11-19 already cover much of the advanced outcome space the 2026 vision needs: bounded runtime thinking, skills, memory, multi-agent patterns, automation, integrations, and capstones.
- The current lesson contract already matches the requested scaffolding model closely:
  - outcome
  - worked steps
  - verification
  - troubleshooting
  - tutor preload
  - progressive modes

### The core gap

The curriculum is path-centric and capability-centric, but the requested 2026 product is:

- academy-centric instead of catalog-centric
- beginner-first install-to-production
- explicitly organized around one 8-week finishable fast path
- visibly centered on the Claude + Cowork + OpenClaw + Claw-verse setup/troubleshooting moat
- much heavier on builder assets, printable field manuals, and studios

### The product strategy implication

The correct move is **not** to replace the live path engine. The correct move is to add a new organizing layer on top of it:

- keep the existing guided lesson infrastructure
- keep the current 19 live paths as the detailed execution layer
- add a new academy shell that introduces:
  - a visible 8-week fast path
  - clearer top-level product pillars
  - flagship setup academies
  - Prompt & Context Studio
  - Asset Vault
  - a spine project dashboard
  - runtime/workflow/capstone framing

### Biggest content gaps relative to the target product

1. The current public shell does not clearly say "beginner-first install-to-production academy."
2. The fast path exists only implicitly across paths; it is not packaged as a finishable 8-week journey.
3. The current catalog has strong setup and safety content but weak visible framing around:
   - Prompt Doctor
   - Context engineering
   - harness engineering
   - RAG / Agentic RAG
   - workflow orchestration as a first-class visual studio
4. The downloads surface is useful but too small to feel like an Asset Vault.
5. The spine project is not explicit enough across the learner-facing shell.
6. Runtime comparisons and Claw-verse decision guidance are still underexposed in the public information architecture.

## 2. Final Product Architecture And Information Architecture

### Product positioning

CLI Academy is the beginner-first install-to-production academy for Claude Code, Claude Cowork, OpenClaw, and the full Claw-verse, with guided setup, deep troubleshooting, downloadable builder assets, live sandboxes, workflow tooling, and project-first learning that grows one Personal AI Workforce from local helper to autonomous production system.

### Product pillars

These are the top-level product pillars the shell should expose:

- Home
- Learn
- Setup Academy
- Prompt & Context Studio
- Projects
- Runtime Lab
- Workflow Studio
- Live Labs & Terminal Sandbox
- Asset Vault
- Capstone Studio
- Docs / Field Manuals
- Progress & Portfolio
- Community
- Pricing
- Admin

### Which pillars should ship in the current implementation slice

Ship now:

- Home
- Learn
- Setup Academy
- Prompt & Context Studio
- Asset Vault
- Progress & Portfolio via the existing dashboard

Expose now as structured roadmap cards or sub-sections:

- Projects
- Runtime Lab
- Workflow Studio
- Live Labs & Terminal Sandbox
- Capstone Studio
- Docs / Field Manuals

### Experience architecture

The academy should have four stacked layers:

1. **Orientation layer**
   - home
   - learn
   - fast path week map
   - why this matters
   - how the spine project evolves

2. **Execution layer**
   - live path routes
   - lesson player
   - guided/hint/independent runtime
   - verification
   - tutor

3. **Builder support layer**
   - Setup Academy
   - Asset Vault
   - Prompt & Context Studio
   - field manuals
   - troubleshooting

4. **Mastery layer**
   - projects
   - runtime lab
   - workflow studio
   - capstone studio
   - progress and portfolio

### Information architecture tree

```text
Homepage (/)
├── Learn (/learn)
│   ├── Fast Path overview
│   ├── Weekly wins
│   ├── Spine project map
│   ├── Existing live path bridge
│   └── Pillar explorer
├── Setup Academy (/setup-academy)
│   ├── Claude Code setup academy
│   ├── Cowork setup academy
│   ├── OpenClaw setup academy
│   ├── Claw-verse runtime academy
│   ├── Hermes setup academy
│   └── Troubleshooting moat
├── Prompt & Context Studio (/prompt-context-studio)
│   ├── Prompt fundamentals
│   ├── Prompt engineering
│   ├── Context engineering
│   ├── Harness engineering
│   └── Prompt Doctor
├── Asset Vault (/asset-vault)
│   ├── Checklists
│   ├── Field manuals
│   ├── Prompt packs
│   ├── CLAUDE.md templates
│   ├── Skills and hook packs
│   ├── MCP packs
│   └── Starter packs
├── Paths (/paths)
│   └── Existing 19-path execution catalog
├── Learn route runtime (/learn/[pathSlug], /learn/[pathSlug]/[lessonSlug])
├── Dashboard (/dashboard)
└── Downloads (/downloads)
```

### Routing strategy

- Keep `/learn/[pathSlug]` and `/learn/[pathSlug]/[lessonSlug]` as the execution runtime.
- Add `/learn` as the academy overview page.
- Add new marketing/product pillar pages for setup, prompt studio, and asset vault.
- Treat `/paths` as the deep catalog view, not the primary first-time learner entry point.

## 3. Full Detailed Curriculum

### Program levels

- Foundational: Zero-to-Run
- Core: Zero-to-Build
- Intermediate: Zero-to-Ground
- Advanced: Zero-to-Orchestrate
- Mastery: Zero-to-Ship

### Spine project

The academy-wide spine project is:

**Your Personal AI Workforce**

It evolves through these stages:

1. local starter assistant
2. coding helper
3. knowledge-work assistant
4. channel-connected assistant
5. builder extension pack
6. grounded knowledge assistant
7. operations agent team
8. production-ready autonomous AI workforce

### Standard course contract

Every course in the academy should declare:

- title
- pillar
- level
- difficulty
- estimated time
- prerequisites
- why it matters
- project brief
- labs used
- multimedia requirements
- downloadable pack
- quiz focus
- exercise pattern
- boss fight
- completion criteria
- next unlock

### Standard chapter contract

Every chapter should include:

1. outcome
2. finished demo preview
3. concepts in plain English
4. worked example
5. guided build
6. hands-on lab
7. checkpoint quiz
8. exercise
9. boss fight
10. common mistakes and troubleshooting
11. downloadables
12. reflection
13. next-step unlock

### Course map

#### Pillar 1: Zero-to-Run

##### Course 1: Setup Claude Code, Config, Troubleshoot, Test, And Evaluate

- Main project: first working Claude Code builder session
- Labs: terminal sandbox, OS install guides, starter repo, diff review lab
- Downloadables: setup checklist, auth recovery checklist, first-session field manual
- Boss fight: install and complete one small repo task with hints only

Chapters:

1. What Claude Code is and where it lives
   - subchapters: surfaces, session model, safe approvals, when not to use it
2. Install and authenticate by OS
   - subchapters: macOS, Windows, Linux/WSL, PATH repair, account linking
3. Core commands, project context, and safe approvals
   - subchapters: `claude`, repo open flow, `CLAUDE.md`, diff review, approval boundaries
4. Config, doctor commands, and troubleshooting
   - subchapters: env vars, doctor workflow, log inspection, reset and recovery
5. First build and evaluation
   - subchapters: explain repo, fix one issue, run validation, write a change note

##### Course 2: Setup Claude Cowork, Config, Troubleshoot, Test, And Evaluate

- Main project: research folder to briefing pack
- Labs: folder ingestion lab, session brief lab, review loop lab
- Downloadables: session brief template, source hygiene checklist, deliverable QA sheet
- Boss fight: turn a messy folder into a clean brief without over-delegating

Chapters:

1. What Cowork is and when to use it
2. Setup, access, and safe file permissions
3. Designing outcome-focused tasks
4. Running, reviewing, and troubleshooting Cowork work
5. End-to-end briefing build and QA

##### Course 3: Setup OpenClaw, Config, Troubleshoot, Test, And Evaluate

- Main project: personal assistant in a sandbox
- Labs: Docker runtime lab, channel connection lab, bounded action lab
- Downloadables: OpenClaw install checklist, `.env` template, channel setup guide, rollback card
- Boss fight: connect one channel, run one safe task, collect evidence

Chapters:

1. OpenClaw fundamentals and runtime architecture
2. Installation and environment preparation
3. Configuration and channel connection
4. Troubleshooting and operational basics
5. End-to-end sandboxed assistant build

##### Course 4: Setup Claw-verse Variants

- Main project: one task across multiple runtimes
- Labs: variant comparison lab, runtime bring-up lab, decision memo lab
- Downloadables: runtime comparison matrix, beginner decision tree, support-tier sheet
- Boss fight: choose the right runtime for a real use case and defend the choice

Chapters:

1. What the Claw-verse is
2. Choosing the right runtime for beginners
3. Configuration patterns across variants
4. Troubleshooting patterns across runtimes
5. Decision memo and recommendation
6. 2026 update micro-module
   - subchapters: Claude 4.6 notes, Agent SDK changes, NemoClaw security layer, MCP v2 patterns

##### Course 5: Setup Hermes Agent

- Main project: persistent study and ops assistant
- Labs: memory policy lab, session continuity lab, correction loop lab
- Downloadables: Hermes setup checklist, memory policy template, continuity test sheet
- Boss fight: prove memory continuity without letting memory sprawl

Chapters:

1. What Hermes is and why persistence matters
2. Installation and baseline configuration
3. Persistence, memory, and skill basics
4. Troubleshooting persistent behavior
5. End-to-end cross-session validation

##### Course 6: CLI Mastery For AI Agents

- Main project: agent operator toolkit
- Labs: navigation lab, file ops lab, process/log lab, script helper lab
- Downloadables: CLI survival guide, shell reference, operator checklist
- Boss fight: recover from a broken path/process/config issue using only CLI tools

Chapters:

1. CLI orientation for absolute beginners
2. Navigation, files, and paths
3. Processes, logs, environment variables, and Git basics
4. Shell scripting and helper commands
5. Build and test your operator toolkit

##### Course 7: Claude Code For Absolute Beginners

- Main project: first useful app
- Labs: prompt loop lab, tiny feature lab, debugging lab, polish lab
- Downloadables: beginner command sheet, review rubric, first-app field manual
- Boss fight: build a small useful tool with Claude doing the heavy lifting and you doing the verification

Chapters:

1. How to talk to Claude Code effectively
2. Reading output, diffs, and safe iteration
3. Building your first useful app
4. Debugging and improving with Claude Code
5. Polishing and reflection

#### Pillar 2: Prompt & Context Studio

##### Course 8: Prompting Fundamentals For Beginners

- Main project: prompt makeover pack
- Labs: anatomy lab, rewrite lab, specificity lab
- Downloadables: prompt anatomy cheat sheet, rewrite worksheet, prompt examples pack
- Boss fight: turn five vague prompts into five production-ready prompts

Chapters:

1. What a prompt really is
2. Clarity, specificity, and constraints
3. Examples and few-shot prompting
4. Rewriting weak prompts
5. Mini-lab: prompt makeover pack

##### Course 9: User/System Prompting, Prompt Engineering, Templates, And Variables

- Main project: reusable prompt kit
- Labs: role framing lab, XML/template lab, variable substitution lab
- Downloadables: system prompt starter kit, variable template library, prompt rubric
- Boss fight: design one reusable prompt family for code, Cowork, and knowledge work

Chapters:

1. User versus system instructions
2. Prompt templates and variables
3. XML and structured prompting
4. Prompt libraries and reuse
5. Build your reusable prompt kit

##### Course 10: Context Engineering, Tokens, Context Windows, And Model Controls

- Main project: context optimization lab
- Labs: token budgeting lab, context packing lab, model-control lab
- Downloadables: context budget worksheet, token triage guide, context packet template
- Boss fight: rescue an overloaded context without losing the task

Chapters:

1. What context engineering is
2. Tokens and context windows
3. Retrieval versus stuffing
4. Model controls and extended thinking
5. Optimize a real workflow context

##### Course 11: Harness Engineering, Prompt Evaluation, Debugging, And Prompt Doctor

- Main project: prompt harness and eval kit
- Labs: rubric lab, test-case lab, regression lab, prompt doctor lab
- Downloadables: eval harness template, failure taxonomy, Prompt Doctor checklist
- Boss fight: diagnose why a prompt fails and prove the fix with test cases

Chapters:

1. What a prompt harness is
2. Building test cases and rubrics
3. Debugging prompt failures
4. Prompt Doctor and prompt refiner workflows
5. Ship a reusable eval harness

#### Pillar 3: Zero-to-Build

##### Course 12: Claude Cowork For Knowledge Work Automation

- Main project: analyst-in-a-box workflow
- Chapters:
  1. Briefs and source bundles
  2. Multi-step research and extraction
  3. Human review and packaging
  4. Reusable team workflows

##### Course 13: MCP, Skills, Slash Commands, Hooks, And Subagents

- Main project: builder extension pack
- Chapters:
  1. MCP foundations and local setup
  2. Skills, slash commands, and hook basics
  3. Subagents and orchestration boundaries
  4. Package your builder extension pack

##### Course 14: First Single-Agent Workflows And Automation

- Main project: personal automation assistant
- Chapters:
  1. Workflow anatomy
  2. Trigger, act, verify
  3. Logging, retries, and stop rules
  4. Package a bounded assistant

#### Pillar 4: Zero-to-Ground

##### Course 15: RAG Foundations

- Main project: courseware Q&A assistant
- Chapters:
  1. What RAG is and is not
  2. Chunking and indexing fundamentals
  3. Retrieval quality and citation discipline
  4. Build the grounded assistant

##### Course 16: Agentic RAG, Document Pipelines, And Grounded Workflows

- Main project: research analyst agent
- Chapters:
  1. When plain RAG stops being enough
  2. Document ingestion pipelines
  3. Multi-step grounded reasoning loops
  4. Review, evaluation, and failure recovery

#### Pillar 5: Zero-to-Orchestrate

##### Course 17: Agent Roles, Decomposition, And Multi-Agent Patterns

- Main project: operations agent team
- Chapters:
  1. Planner, worker, reviewer
  2. Contracts and handoffs
  3. Escalation, checkpoints, and human approval
  4. Build the review-loop team

##### Course 18: Messaging Integrations And Workflow Studio

- Main project: message-to-workflow control center
- Chapters:
  1. Messaging and command surfaces
  2. Visual workflow nodes and canvas patterns
  3. Run, replay, branch, and approve
  4. Package your control center

#### Pillar 6: Zero-to-Ship

##### Course 19: Deployment Paths, Observability, Reliability, And Safety

- Main project: shippable agent system
- Chapters:
  1. Local to Docker to VPS
  2. Logging, metrics, and alerting
  3. Reliability patterns and rollback
  4. Safety review and go-live checklist
  5. 2026 update micro-module

##### Course 20: Portfolio Packaging And Final Capstone

- Main project: autonomous AI workforce capstone
- Chapters:
  1. Mini capstone checkpoint
  2. Final integrated build
  3. README, architecture diagram, and demo script
  4. Portfolio pack export

##### Course 21: Cost Engineering, Scaling, And Multi-Provider Agents

- Main project: scale the capstone cheaply and reliably
- Chapters:
  1. Token budgets and latency tradeoffs
  2. Multi-model orchestration and fallbacks
  3. Cost dashboards and scaling patterns
  4. Evaluation harnesses, SLOs, and alerting

## 4. The 8-Week Fast Path In Full Detail

### Fast path rules

- 80 hours total
- 10 hours per week
- core, boost, mastery layering
- one visible working artifact every week
- one evolving spine project every week

### Week 1: Setup And First Win

- Outcome: local starter assistant
- Primary focus: workspace, terminal confidence, Claude Code install, safety basics
- Existing live path bridge: Paths 01, 02, and 03
- Working artifact: Personal AI Starter Assistant workspace plus first Claude-assisted improvement
- Downloads:
  - week 1 sanity checklist
  - setup playbook
  - workspace map
- Boss fight: install, open a practice repo, and complete one safe improvement without panic

### Week 2: Claude Code Foundations Plus Prompting Fundamentals

- Outcome: tiny useful builder app
- Primary focus: session loop, safe editing, prompt anatomy, template discipline
- Existing live path bridge: Paths 03, 04, 05, 07 plus Prompt Studio seed modules
- Working artifact: tiny builder app plus a reusable prompt set

### Week 3: Claude Cowork Plus Prompt Templates

- Outcome: folder-to-briefing workflow
- Primary focus: Cowork session briefs, structured deliverables, reusable prompts
- Existing live path bridge: Paths 08, 09, 10
- Working artifact: executive briefing workflow and reusable prompt kit

### Week 4: OpenClaw / Runtime Plus Channel Integration

- Outcome: message-to-action assistant
- Primary focus: starter runtime, one channel, one bounded action
- Existing live path bridge: Paths 11 and selected integration groundwork
- Working artifact: mini-capstone runtime assistant

### Week 5: MCP, Skills, Hooks, Subagents, And Context Engineering

- Outcome: builder extension pack
- Primary focus: CLAUDE.md, skills, hook packs, context packets, extension assets
- Existing live path bridge: Path 12 plus new extension-pack seeds
- Working artifact: reusable builder extension pack

### Week 6: RAG And Agentic RAG

- Outcome: grounded knowledge assistant
- Primary focus: ingestion, retrieval, citation, review loops
- Existing live path bridge: new RAG pillar content
- Working artifact: grounded assistant over learner-owned documents

### Week 7: Orchestration, Workflow Studio, Harnesses, Evaluation, And Safety

- Outcome: operations agent team
- Primary focus: planner/worker/reviewer patterns, workflow graphs, eval harnesses
- Existing live path bridge: Paths 13, 17, 18
- Working artifact: small agent team with review loop

### Week 8: Deployment, Observability, Safety, And Portfolio

- Outcome: autonomous AI workforce capstone
- Primary focus: ship, observe, explain, package
- Existing live path bridge: Paths 15, 18, 19, 21
- Working artifact: capstone plus portfolio pack

## 5. Content Model And Schema

### Primary entities

#### Program

- `id`
- `slug`
- `title`
- `positioning`
- `version`
- `levels[]`
- `fastPathWeekIds[]`

#### Pillar

- `id`
- `slug`
- `title`
- `summary`
- `order`
- `navLabel`
- `ctaHref`

#### Course

- `id`
- `slug`
- `pillarId`
- `title`
- `subtitle`
- `difficulty`
- `estimatedHours`
- `prerequisiteCourseIds[]`
- `mainProject`
- `labs[]`
- `downloads[]`
- `guidedSupport`
- `boostExtensions[]`
- `masteryExtensions[]`
- `spineStage`

#### Chapter

- `id`
- `courseId`
- `slug`
- `title`
- `summary`
- `chapterNumber`
- `lessonIds[]`
- `bossFight`
- `quizFocus`
- `assetIds[]`

#### Lesson

- already live in MDX, but the forward model should additionally support:
  - `courseId`
  - `weekId`
  - `spineStage`
  - `artifactType`
  - `modeScaffold`
  - `bossFightRubric`
  - `downloadIds[]`
  - `media[]`

#### Lab

- `id`
- `slug`
- `title`
- `environmentType`
- `starterState`
- `resetStrategy`
- `hintSet[]`
- `referenceSnapshot`
- `exportable`

#### Asset

- `id`
- `slug`
- `title`
- `category`
- `summary`
- `tier`
- `formats[]`
- `compatibility[]`
- `installSteps[]`
- `previewBullets[]`
- `relatedCourses[]`
- `relatedLessons[]`

#### FastPathWeek

- `id`
- `weekNumber`
- `title`
- `focus`
- `artifact`
- `unlock`
- `hours`
- `mappedCourseIds[]`
- `mappedPathSlugs[]`
- `downloadIds[]`

#### SpineProjectStage

- `id`
- `order`
- `title`
- `summary`
- `artifact`
- `requiredWeeks[]`

## 6. Page Map And Component Map

### Page map

- `/`
  - hero
  - fast path summary
  - spine dashboard
  - academy surfaces
  - setup moat
  - asset vault teaser
- `/learn`
  - fast path detail
  - week cards
  - spine evolution
  - current-live path bridge
  - pillar explorer
- `/setup-academy`
  - flagship setup courses
  - install-to-production moat
  - week 1 starter path
  - troubleshooting packs
- `/prompt-context-studio`
  - prompt foundations
  - context engineering
  - harness engineering
  - Prompt Doctor
- `/asset-vault`
  - category filters
  - asset cards
  - compatibility notes
  - install instructions
- `/paths`
  - deep catalog
- `/dashboard`
  - progress
  - spine dashboard
  - recommended week/path

### Component map

- `SpineProjectDashboard`
  - shared on home, learn, and dashboard
- `FastPathWeekCard`
  - used on home and learn
- `AcademySurfaceCard`
  - used on home and learn
- `FlagshipCourseCard`
  - used on Setup Academy and Prompt Studio
- `AssetVaultCard`
  - used on Asset Vault
- `WeekOutcomeStrip`
  - used on learn and dashboard

## 7. Phased Implementation Plan

### Phase 0: Durable architecture alignment

- replace the stale curriculum blueprint with this aligned version
- record architecture decisions in root docs
- do not break the live path runtime

### Phase 1: Core shell reframe

- rewrite the home page around beginner-first install-to-production positioning
- add `/learn`
- add `/setup-academy`
- add `/prompt-context-studio`
- add `/asset-vault`
- update nav and app sidebar labels to match the academy shell

### Phase 2: Fast path and spine project visibility

- add week-by-week fast path presentation
- add spine project dashboard
- map live paths into week recommendations
- add weekly win language in learner-facing shell

### Phase 3: Asset Vault expansion

- expand the local asset registry
- add richer categories
- attach install instructions, compatibility, and preview bullets
- create more downloadable field manuals and starter packs

### Phase 4: Setup Academy depth

- seed richer Setup Academy course detail
- map live setup paths into the setup surface
- add runtime comparison and troubleshooting cards

### Phase 5: Prompt Studio, RAG, and orchestration depth

- ship prompt and context seed courses
- add RAG course seeds
- add workflow studio and runtime lab pages
- add capstone studio packaging

## 8. Initial Implementation Slice

This session should implement the smallest high-value slice that proves the redesign direction:

1. Home page reframe around the academy positioning
2. New `Learn` page with:
   - full 8-week overview
   - spine project dashboard
   - bridge to live execution paths
3. New `Setup Academy` page with:
   - flagship setup tracks
   - week 1 focus
   - troubleshooting moat
4. New `Prompt & Context Studio` page
5. New `Asset Vault` page plus richer asset metadata
6. New downloadable assets supporting:
   - week 1
   - setup troubleshooting
   - spine project planning
   - prompt/context work

That slice preserves the current lesson engine and catalog while making the academy feel like the requested 2026 product.
