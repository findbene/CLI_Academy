# CLI Academy Recovery Reframe and Rebuild

Date: 2026-04-06
Status: Recommended canonical recovery document
Basis: Repo audit plus owner direction

## SECTION A - Executive Reframe

CLI Academy should not be treated as a generic AI education platform, a broad agent marketplace, or a flashy multi-agent demo. It should be rebuilt and sold as a trust-first setup, troubleshooting, and practical use academy for Claude Code, Claude CoWork, and the adjacent agentic ecosystem, with OpenClaw and community variants positioned as advanced specialist tracks rather than the beginner entry point.

The central product truth is this:

> CLI Academy is the safest, most beginner-friendly place to set up, troubleshoot, understand, and start using Claude Code, Claude CoWork, and related agentic tools on real machines and real environments.

That means the real product is:

- setup academy
- troubleshooting academy
- confidence-building beginner school
- practical workflow school
- downloadable guide and template library
- internally agent-assisted support and content system

It is not:

- an everything-AI course bundle
- a public swarm-of-agents toy
- an enterprise platform in v1
- a content catalog with weak product surfaces

### Current Repo Truth

The repo already contains useful raw material, but it is not yet a coherent sellable product.

- The documentation layer is ahead of the implementation layer.
- The frontend appears effectively missing or lost. The `app/` directory is empty.
- The backend exists as a thin FastAPI scaffold with auth verification and a tutor streaming endpoint.
- The schema is real and valuable, but still Phase 1 only.
- The content layer contains strong beginner and setup lessons, especially for Claude Code, Windows, macOS, troubleshooting, Claude CoWork, MCP, and some advanced OpenClaw tracks.
- The role-based professional tracks are almost entirely placeholders and should not currently be treated as finished curriculum.
- The downloads, visual media, compatibility, freshness, and known-issues systems are not productized yet.
- The internal swarm is mostly architectural intention, not implemented product capability.

### Most Important Audit Findings

1. The product strategy is directionally strong but insufficiently anchored to the true core: setup, troubleshooting, first success, and confidence on real devices.
2. The repo contains documentation drift. Some documents claim implementation that the current snapshot does not actually contain.
3. The strongest existing asset is the beginner/setup curriculum foundation, not the role-based or agent-systems layer.
4. The biggest missing piece is the frontend learner product shell and the content delivery system around visuals, downloads, trust metadata, and navigation.
5. The current tutor is too thin to carry the product promise. It streams answers, but it is not yet a serious retrieval-grounded tutor/support system.
6. The current schema is a good starting point, but it does not yet model the curriculum, support, trust, export, compatibility, and versioning depth this product needs.

### What Should Be Reframed Immediately

- Recenter the entire product around beginner-friendly setup and troubleshooting.
- Reposition advanced self-hosting and OpenClaw material as expert expansion, not the main entry.
- Treat downloads, printable guides, checklists, and reference packs as core value, not bonus extras.
- Treat visual teaching as a first-class content requirement.
- Keep the specialized internal agent vision, but hide the complexity behind one coherent learner-facing experience.

## SECTION B - Recommended Product Positioning

### Category

CLI Academy is a SaaS learning and support platform for Claude Code and adjacent agentic tools.

### Primary Positioning

CLI Academy is the safest and easiest way for ordinary people to successfully set up, troubleshoot, and begin using Claude Code, Claude CoWork, and related agentic tools on real devices and environments.

### Secondary Positioning

After setup success, CLI Academy becomes the practical school for productive use, safe automation, role-based workflows, and advanced self-hosted ecosystems like OpenClaw.

### Who It Is For

- Complete beginners who need patient, step-by-step setup help
- Practical builders who want Claude Code for real projects and workflows
- Working professionals who want use-case-driven productivity outcomes
- Advanced technical users who want infrastructure, self-hosting, and ecosystem depth

### Why It Wins

- It solves the scariest part first: setup and failure recovery
- It teaches on real devices and real environments, not abstract theory
- It is structured for beginners but still credible to advanced users
- It combines lessons, troubleshooting, downloads, and tutor support in one product
- It can monetize honestly through depth, trust, and saved time

### What Makes It Different

- OS-specific and environment-specific setup paths
- visible tested-on and freshness metadata
- "Fix My Setup" guidance instead of generic chat
- troubleshooting matrices and decision trees as first-class product surfaces
- printable setup packs and reusable operational templates
- one tutor interface powered by specialized support modes
- advanced OpenClaw ecosystem guidance without making beginners start there

### What To Cut

- vague "secure AI agent workflows" as the lead message
- public emphasis on internal swarm complexity
- placeholder professional tracks presented like complete offerings
- early marketplace, enterprise, community, or managed-runtime ambitions in the v1 story

### What To Add

- Linux setup branch
- Mac mini / dedicated machine branch
- compatibility matrix
- known issues and freshness center
- setup confidence scoring
- download/export center with real assets
- lesson support for screenshots, diagrams, and short video clips
- structured tutor modes and escalation flows

### What To Reposition

- Claude CoWork should move up into the beginner/early-core experience, because it is a natural adjacent entry path.
- OpenClaw and variants should be treated as advanced ecosystem content with clearer warnings and stronger trust framing.
- Role-based tracks should be framed as practical accelerators after foundations, not the main hook until they are fully built.

## SECTION C - Curriculum Architecture

The curriculum should become a smooth confidence ladder, not a random library. The learner should feel guided from fear and confusion to practical capability.

### Curriculum Design Principles

- setup first
- first win early
- troubleshooting everywhere
- plain language before jargon
- visuals for every major setup lesson
- exports and printables as standard learning assets
- optional advanced depth after confidence, not before it

### Recommended Six-Level Ladder

#### Level 1: Zero to Ready

Goal: Get the learner installed, configured, verified, and calm.

Included topics:

- what Claude Code is
- what Claude CoWork is
- what OpenClaw is at a very high level
- device and OS selection
- prerequisites
- installation
- authentication
- verification
- first-run checks
- safety basics

Exit condition:

The learner has a verified working setup and one simple success on their actual machine.

#### Level 2: First Useful Wins

Goal: Help the learner do useful things immediately and safely.

Included topics:

- first helpful workflows
- safe files and commands
- basic prompts
- basic project structure
- CLAUDE.md basics
- reading output
- beginner troubleshooting
- "what good looks like"

Exit condition:

The learner can use Claude Code or CoWork for simple tasks without panic.

#### Level 3: Productive Daily Use

Goal: Turn the learner into a steady everyday operator.

Included topics:

- project folder structure
- MEMORY.md and project memory patterns
- skills
- slash commands
- plugins and hooks
- MCP basics
- debugging and iteration
- document and report workflows
- output and artifact generation

Exit condition:

The learner can organize work, guide the tool reliably, and recover from routine problems.

#### Level 4: Role-Based Application Tracks

Goal: Translate tool fluency into job-relevant outcomes.

Included topics:

- marketers
- analysts
- founders
- students
- junior developers
- designers
- sales and ops

Exit condition:

The learner can apply the tools to recurring work in their role and see ROI.

#### Level 5: Automation and Agent Systems

Goal: Move from one-off use to repeatable workflows.

Included topics:

- task decomposition
- workflow safety
- subagents and agent teams
- Claude Skills in practice
- MCP in practice
- n8n, Make, and Zapier integrations
- personal productivity automations
- business automations

Exit condition:

The learner can design and operate bounded automations safely.

#### Level 6: Infrastructure and Self-Hosted Ecosystem

Goal: Support advanced deployment and operational control.

Included topics:

- Claude Code on VPS
- Mac mini and dedicated machine deployment
- OpenClaw foundations
- OpenClaw deployment and runtime troubleshooting
- NemoClaw, ZeroClaw, NanoClaw, PicoClaw, AutoClaw variants
- monitoring
- updates, rollback, recovery
- compliance and hardening basics

Exit condition:

The learner can choose the right infrastructure path and operate it with eyes open.

### Learning Object Types

Every curriculum area should be built from reusable object types:

- path
- course
- module
- lesson
- lesson step
- lab
- quiz
- setup checklist
- troubleshooting matrix
- quick-reference card
- template/config pack
- video clip
- screenshot sequence
- diagram
- printable guide

### Recommended Delivery Pattern for Major Setup Lessons

Every major setup lesson should contain:

- Step 1
- What you should see
- If you do not see that, try this
- Common mistakes
- Safety note
- Quick recap
- Optional video walkthrough
- Downloadable checklist

## SECTION D - Curriculum Database Blueprint

The current schema in `infrastructure/schema.sql` is a useful Phase 1 baseline, but it needs to grow into a curriculum and trust system, not just a path-and-progress schema.

### D1. Schema Blueprint by Domain

#### Identity, Profiles, and Commerce

| Entity | Purpose | Core Fields | Relationships | MVP or Later |
|---|---|---|---|---|
| `auth.users` | Canonical auth identity in Supabase | `id`, `email` | 1:1 with `profiles` | MVP |
| `profiles` | Learner profile and product-level status | `id`, `display_name`, `tier`, `technical_confidence`, `primary_role_id`, `primary_environment_profile_id`, `timezone` | belongs to `auth.users`; references `role_profiles`, `environment_profiles` | MVP |
| `onboarding_answers` | Stores structured onboarding snapshots over time | `id`, `user_id`, `device_type`, `os_family`, `environment_goal`, `confidence_level`, `learning_goal`, `created_at` | many-to-one to `profiles` | MVP |
| `pricing_plans` | Normalized pricing plan catalog | `id`, `slug`, `name`, `tier`, `billing_interval`, `message_limit`, `is_active` | referenced by `subscriptions`, `entitlements` | MVP |
| `subscriptions` | Billing state independent from profile | `id`, `user_id`, `pricing_plan_id`, `stripe_customer_id`, `stripe_subscription_id`, `status`, `current_period_end` | many-to-one to `profiles`, `pricing_plans` | MVP |
| `entitlements` | Grants access by plan, purchase, promo, or admin override | `id`, `user_id`, `resource_type`, `resource_id`, `grant_type`, `starts_at`, `ends_at` | many-to-one to `profiles`; gates `paths`, `downloads`, `tutor_modes` | MVP |
| `role_profiles` | Canonical role taxonomy for people and content targeting | `id`, `slug`, `label`, `description`, `sort_order` | referenced by `profiles`, `paths`, `recommendations` | MVP |
| `environment_profiles` | Canonical learner environment taxonomy | `id`, `slug`, `os_family`, `device_type`, `environment_type`, `shell_family`, `confidence_notes` | referenced by `profiles`, `compatibility_matrix`, `troubleshooting_guides` | MVP |

#### Curriculum Catalog and Versioning

| Entity | Purpose | Core Fields | Relationships | MVP or Later |
|---|---|---|---|---|
| `tracks` | Top-level curricular groupings such as Foundations or Self-Hosted | `id`, `slug`, `title`, `description`, `sort_order`, `tier_floor`, `status` | has many `paths` | MVP |
| `paths` | Guided learner routes with a clear outcome | `id`, `track_id`, `slug`, `title`, `positioning`, `difficulty`, `tier_required`, `status`, `estimated_hours` | belongs to `tracks`; has many `courses` | MVP |
| `courses` | Sellable or enrollable learning units within a path | `id`, `path_id`, `slug`, `title`, `summary`, `is_flagship`, `status`, `sort_order` | belongs to `paths`; has many `modules` | MVP |
| `modules` | Ordered sections inside a course | `id`, `course_id`, `slug`, `title`, `learning_objective`, `sort_order` | belongs to `courses`; has many `lessons`, `labs` | MVP |
| `lessons` | Core teachable units | `id`, `module_id`, `slug`, `title`, `lesson_type`, `difficulty`, `status`, `delivery_type`, `estimated_minutes`, `has_safety_warning` | belongs to `modules`; has many `lesson_steps`, `quizzes`, `downloads`, `tutor_contexts` | MVP |
| `lesson_steps` | Fine-grained step-by-step instructional blocks | `id`, `lesson_id`, `step_number`, `title`, `instruction_md`, `expected_result`, `if_not_seen_help`, `common_mistakes`, `safety_note` | belongs to `lessons` | MVP |
| `labs` | Practical exercises with optional verification | `id`, `module_id`, `lesson_id`, `slug`, `title`, `verification_type`, `difficulty`, `status` | belongs to `modules` and optionally `lessons` | MVP |
| `quizzes` | Lightweight checks for understanding | `id`, `lesson_id`, `quiz_type`, `passing_score`, `status` | belongs to `lessons` | MVP |
| `content_versions` | Immutable content version records | `id`, `content_type`, `content_id`, `version_number`, `source_path`, `status`, `change_summary`, `published_at` | version layer for `paths`, `courses`, `lessons`, `downloads`, `tutor_contexts` | MVP |
| `freshness_reviews` | Human or agent review records | `id`, `content_type`, `content_id`, `freshness_status`, `reviewed_at`, `reviewed_by`, `next_review_at`, `notes` | many-to-one to content entities | MVP |

#### Support, Trust, and Compatibility

| Entity | Purpose | Core Fields | Relationships | MVP or Later |
|---|---|---|---|---|
| `tool_profiles` | Canonical tool catalog | `id`, `slug`, `name`, `vendor`, `product_area`, `current_status`, `official_url` | referenced by compatibility, lessons, release notes, known issues | MVP |
| `supported_platforms` | Canonical platform catalog | `id`, `os_family`, `os_version`, `device_type`, `shell_family`, `architecture`, `label` | referenced by compatibility and tested-on metadata | MVP |
| `compatibility_matrix` | Tested combinations of tool, version, platform, and environment | `id`, `tool_profile_id`, `version_range`, `supported_platform_id`, `environment_profile_id`, `trust_level`, `test_status`, `tested_on_at`, `notes` | joins `tool_profiles`, `supported_platforms`, `environment_profiles` | MVP |
| `troubleshooting_guides` | Structured problem-solving guides | `id`, `slug`, `title`, `problem_area`, `environment_profile_id`, `severity`, `decision_tree_json`, `resolution_md` | linked from lessons, known issues, tutor | MVP |
| `issue_signatures` | Known symptom patterns for faster diagnosis | `id`, `guide_id`, `signature_type`, `match_pattern`, `normalized_hash`, `confidence_weight` | belongs to `troubleshooting_guides` | MVP |
| `known_issues` | Time-bound issue records for freshness and trust | `id`, `tool_profile_id`, `title`, `status`, `affected_versions`, `affected_platforms_json`, `workaround_md`, `opened_at`, `resolved_at` | linked to `release_notes`, `compatibility_matrix`, tutor | Phase 2 |
| `release_notes` | Product and ecosystem release radar | `id`, `tool_profile_id`, `version_label`, `release_date`, `summary_md`, `impact_level`, `action_required` | linked to lessons and known issues | Phase 2 |
| `tutor_contexts` | Curated retrieval bundles for tutor answers | `id`, `lesson_id`, `path_id`, `context_type`, `source_version_id`, `retrieval_payload`, `risk_level`, `status` | linked to lessons, paths, troubleshooting guides | MVP |
| `learning_modes` | Canonical tutor or learner interaction modes | `id`, `slug`, `label`, `description`, `plan_requirement`, `daily_limit` | linked to tutor sessions and plan gating | MVP |

#### Reference Library and Ecosystem Knowledge

| Entity | Purpose | Core Fields | Relationships | MVP or Later |
|---|---|---|---|---|
| `use_case_collections` | Curated role- or goal-based use case packs | `id`, `slug`, `title`, `role_profile_id`, `summary`, `status` | linked to role tracks, downloads, recommendations | Phase 2 |
| `command_reference_entries` | Searchable command knowledge base | `id`, `tool_profile_id`, `command_name`, `shell_family`, `syntax`, `danger_level`, `description`, `example_md` | linked to lessons, downloads, tutor | MVP |
| `skills_library_entries` | Structured catalog of Claude Skills | `id`, `tool_profile_id`, `slug`, `title`, `summary`, `scope`, `risk_level`, `example_md` | linked to lessons, workflows, tutor | Phase 2 |
| `mcp_server_entries` | Structured MCP server directory | `id`, `slug`, `name`, `provider`, `install_method`, `trust_level`, `capabilities_json`, `compatibility_notes` | linked to compatibility and lessons | Phase 2 |
| `plugin_entries` | Structured plugin catalog | `id`, `slug`, `name`, `provider`, `install_method`, `trust_level`, `compatibility_notes` | linked to tool profiles, lessons | Phase 2 |
| `slash_command_entries` | Structured slash command directory | `id`, `tool_profile_id`, `command`, `description`, `example_md`, `risk_level` | linked to lessons and tutor | Phase 2 |
| `agent_pattern_entries` | Reusable agent team patterns and boundaries | `id`, `slug`, `title`, `pattern_type`, `summary`, `risk_level`, `example_md` | linked to automation and advanced tracks | Phase 2 |
| `workflow_template_entries` | Reusable automation and workflow templates | `id`, `slug`, `title`, `platform`, `template_format`, `summary`, `json_payload`, `status` | linked to downloads and role/use-case packs | Phase 2 |

#### Media, Downloads, and Export System

| Entity | Purpose | Core Fields | Relationships | MVP or Later |
|---|---|---|---|---|
| `media_assets` | Canonical storage for screenshots, videos, diagrams, illustrations | `id`, `asset_kind`, `file_url`, `thumbnail_url`, `caption`, `alt_text`, `duration_seconds`, `status` | linked to `lesson_steps`, `downloads`, `content_versions` | MVP |
| `downloads` | User-facing downloadable artifacts | `id`, `lesson_id`, `path_id`, `title`, `asset_type`, `format`, `tier_required`, `version_id`, `file_url`, `is_print_friendly` | linked to lessons, paths, content versions | MVP |
| `asset_templates` | Source templates for generated or manual assets | `id`, `slug`, `template_type`, `source_format`, `schema_json`, `status` | linked to downloads and export generation | Phase 2 |
| `downloadable_asset_generations` | Generated export records per learner or on demand | `id`, `user_id`, `download_id`, `generation_status`, `requested_format`, `generated_file_url`, `created_at` | belongs to `profiles`, `downloads` | Phase 2 |

#### Progress, Feedback, and Recommendations

| Entity | Purpose | Core Fields | Relationships | MVP or Later |
|---|---|---|---|---|
| `progress_events` | Event stream of learner progress | `id`, `user_id`, `event_type`, `path_id`, `course_id`, `lesson_id`, `lab_id`, `payload_json`, `created_at` | append-only; feeds progress and recommendations | MVP |
| `path_progress` | Aggregate progress by path | `id`, `user_id`, `path_id`, `completion_percent`, `status`, `last_activity_at` | derived from progress events and lesson progress | MVP |
| `lesson_progress` | Fine-grained lesson completion and confidence | `id`, `user_id`, `lesson_id`, `status`, `started_at`, `completed_at`, `confidence_score`, `needs_help` | belongs to learner and lesson | MVP |
| `lab_attempts` | Full history of lab attempts | `id`, `user_id`, `lab_id`, `attempt_number`, `verification_result`, `output_json`, `started_at`, `completed_at` | belongs to learner and lab | MVP |
| `recommendations` | Next-best-content and support recommendations | `id`, `user_id`, `recommendation_type`, `reason_code`, `target_type`, `target_id`, `score`, `created_at` | references learners and many content types | Phase 2 |
| `reviews_feedback` | Learner qualitative and quantitative feedback | `id`, `user_id`, `content_type`, `content_id`, `rating`, `feedback_type`, `comment`, `created_at` | linked to learners and content | MVP |
| `badges` | Future-ready badge catalog | `id`, `slug`, `title`, `description`, `criteria_json`, `status` | linked to future completion awards | Phase 3 |
| `certificates` | Future-ready certificate issuance | `id`, `user_id`, `badge_id`, `issued_at`, `certificate_url`, `verification_code` | linked to learner and badge | Phase 3 |

### D2. Key Relationships

- one learner has one profile
- one learner has many onboarding answer snapshots
- one track has many paths
- one path has many courses
- one course has many modules
- one module has many lessons and labs
- one lesson has many lesson steps, quizzes, downloads, tutor contexts, and media references
- one tool profile has many compatibility rows, command references, known issues, and release notes
- one troubleshooting guide has many issue signatures
- one content item has many content versions and many freshness reviews
- one learner has many progress events, lesson progress rows, lab attempts, and recommendations

### D3. Suggested Enums and Taxonomies

| Taxonomy | Suggested Values |
|---|---|
| `level` | `level_1_zero_to_ready`, `level_2_first_wins`, `level_3_productive_use`, `level_4_role_based`, `level_5_automation_agents`, `level_6_infrastructure_self_hosted` |
| `difficulty` | `absolute_beginner`, `beginner`, `early_intermediate`, `intermediate`, `advanced`, `expert` |
| `tier` | `free`, `pro`, `team`, `lifetime`, `admin_grant` |
| `product_area` | `claude_code`, `claude_cowork`, `mcp`, `skills`, `slash_commands`, `plugins`, `hooks`, `agent_teams`, `automation`, `openclaw`, `openclaw_variant`, `deployment`, `troubleshooting`, `downloads` |
| `role` | `general`, `marketer`, `designer`, `founder`, `student`, `junior_developer`, `analyst`, `sales_ops`, `consultant`, `creator`, `operator` |
| `environment` | `local_laptop`, `local_desktop`, `vps`, `mac_mini`, `dedicated_box`, `remote_linux`, `container`, `air_gapped` |
| `operating_system` | `windows`, `macos`, `linux`, `wsl2`, `ubuntu`, `debian`, `rhel_like` |
| `delivery_type` | `lesson`, `lab`, `walkthrough`, `reference`, `checklist`, `decision_tree`, `download_pack`, `video`, `screenshot_sequence` |
| `learning_mode` | `self_paced`, `guided`, `challenge`, `troubleshoot`, `compare_options`, `planning`, `export_helper` |
| `status` | `draft`, `in_review`, `published`, `deprecated`, `coming_soon`, `archived` |
| `freshness_status` | `fresh`, `review_due`, `stale`, `blocked`, `superseded` |
| `trust_level` | `official`, `verified_by_team`, `community_reviewed`, `experimental`, `unsafe_without_review` |
| `asset_type` | `pdf`, `markdown`, `json`, `csv`, `docx`, `diagram`, `checklist`, `template_pack`, `reference_card` |

### D4. Required Indexes

- unique slugs on tracks, paths, courses, lessons, downloads, use-case collections
- composite ordering indexes like `(path_id, sort_order)` and `(course_id, sort_order)`
- lookup indexes on `(tool_profile_id, version_range)` for compatibility and known issues
- retrieval indexes on `tutor_contexts (lesson_id, context_type, status)`
- search indexes on command names, issue signatures, and reference library titles
- freshness indexes on `(freshness_status, next_review_at)`
- progress indexes on `(user_id, created_at desc)` for events and `(user_id, lesson_id)` for lesson progress
- entitlement indexes on `(user_id, resource_type, resource_id, ends_at)`
- generation queue indexes on `(generation_status, created_at)`

### D5. Future-Proofing Notes

- Keep Git-authored lesson content, but store normalized metadata and version pointers in the database.
- Treat `content_versions` as immutable publish records so tutor answers and downloads can cite an exact version.
- Do not bury environment compatibility in freeform markdown only. Normalize it.
- Keep learner progress event-based so future recommendations and certifications are possible without schema churn.
- Model visuals explicitly. This product cannot succeed as text-only content.
- Separate pricing plans, subscriptions, and entitlements from profiles to avoid future billing knots.

## SECTION E - Suggested Course / Path Inventory

This inventory is deliberately shaped around beginner setup and troubleshooting first, then productive use, then advanced depth.

### E1. Flagship Foundations and Setup

| Path | Purpose | Tier | Phase | Recommendation |
|---|---|---|---|---|
| Claude Code Setup for Absolute Beginners | Install, verify, first success, fear reduction | Free | MVP | Flagship keep and strengthen |
| Claude CoWork Introduction and Setup for Beginners | Understand access, setup, first task, limitations | Free | MVP | Keep and move earlier |
| Claude Code + CoWork Troubleshooting Basics | Error recovery, auth issues, path issues, permissions, reset flows | Free | MVP | Keep and strengthen |
| First Useful Things to Do with Claude Code | Quick wins that feel immediately valuable | Free | MVP | New flagship path |
| Safe Use, Files, Commands, and Project Structure Basics | Safety, files, terminals, folders, dangerous vs safe operations | Free | MVP | New flagship path |
| Windows Setup Path | Windows-specific setup, WSL2, PowerShell, file quirks | Free | MVP | Keep and fold into setup hub |
| macOS Setup Path | Homebrew, zsh, Apple Silicon, common issues | Free | MVP | Keep and fold into setup hub |
| Linux Setup Path | Ubuntu/Debian basics, shells, permissions, package management | Free | MVP | New, required |

### E2. Productive Claude Code and CoWork

| Path | Purpose | Tier | Phase | Recommendation |
|---|---|---|---|---|
| CLAUDE.md, MEMORY.md, and Project Memory | Teach durable project guidance patterns | Pro | MVP | New |
| Claude Skills, Slash Commands, Plugins, and Hooks | Practical extension patterns without overload | Pro | MVP | New merged path |
| MCP Setup for Beginners | Safe first integrations and mental model | Pro | MVP | New beginner MCP path |
| Productive Claude CoWork Workflows | Research, documents, analysis, review loops | Pro | Phase 2 | Split from intro/setup |
| Debugging and Iteration with Claude Code | How to recover, verify, and improve outputs | Pro | Phase 2 | New |
| Practical Output and Artifact Generation | Docs, references, templates, and exports | Pro | Phase 2 | New |

### E3. Role-Based Tracks

| Path | Purpose | Tier | Phase | Recommendation |
|---|---|---|---|---|
| Claude Code for Marketers | Content, reporting, campaign ops | Pro | Phase 2 | Rewrite from scratch |
| Claude Code for Founders | research, validation, internal tools, operations | Pro | Phase 2 | Rewrite from scratch |
| Claude Code for Analysts | data cleanup, SQL help, reports, insight workflows | Pro | Phase 2 | Rewrite from scratch |
| Claude Code for Students | research, study systems, projects, ethics | Free or Pro hybrid | Phase 2 | Rewrite from scratch |
| Claude Code for Junior Developers | repo navigation, bug fixing, safe coding workflows | Pro | Phase 2 | New |
| Claude Code for Designers | content systems, design ops, handoff, audits | Pro | Phase 2 | New |
| Claude Code for Sales and Ops | research, CRM cleanup, outreach support, SOPs | Pro | Phase 2 | Merge existing sales material into broader track |

### E4. Automation and Agent Systems

| Path | Purpose | Tier | Phase | Recommendation |
|---|---|---|---|---|
| Agent Workflow Foundations | bounded automation, task design, safety | Pro | Phase 2 | New |
| Claude Skills in Practice | build, choose, and govern skills | Pro | Phase 2 | Can split from extensions if needed |
| Subagents and Agent Teams | orchestration, roles, decomposition, handoff | Pro | Phase 2 | New |
| n8n, Make, and Zapier with Claude | external workflow integrations anchored to real use cases | Pro | Phase 2 | New |
| Personal Productivity Automations | solo operator automations | Pro | Phase 2 | New |
| Business Automation Playbooks | business-safe recurring workflows | Pro | Phase 3 | New |

### E5. Infrastructure and OpenClaw Ecosystem

| Path | Purpose | Tier | Phase | Recommendation |
|---|---|---|---|---|
| Claude Code on a VPS | headless installs, SSH, safety, maintenance | Pro | Phase 2 | Keep and expand |
| Mac mini and Dedicated Box Deployment | home lab and office deployment patterns | Pro | Phase 2 | New |
| OpenClaw Foundations | what it is, when to use it, prerequisites | Pro | Phase 2 | Keep as advanced entry |
| OpenClaw Deployment and Troubleshooting | install, configure, monitor, harden, recover | Pro | Phase 2 | Keep |
| OpenClaw Variants Overview | NemoClaw, ZeroClaw, NanoClaw, PicoClaw, AutoClaw comparison | Pro | Phase 2 | New unifying survey path |
| NemoClaw Runtime | NVIDIA-centric deployments | Pro | Phase 3 | Keep |
| ZeroClaw and Lightweight Variants | low-latency and lightweight variants | Pro | Phase 3 | Merge Zero/Nano/Pico into one path until depth exists |
| AutoClaw Automation | headless automation and scheduled runs | Pro | Phase 3 | Keep |

### E6. Monetization and Business Builder Paths

| Path | Purpose | Tier | Phase | Recommendation |
|---|---|---|---|---|
| Making Money with Claude Code | service, product, automation, consulting ideas | Pro | Phase 3 | New |
| Freelance, Agency, and Consulting Workflows | delivery, repeatability, onboarding, QA | Pro | Phase 3 | New |
| Internal Assistant Systems for Teams | safe internal knowledge and support assistants | Pro | Phase 3 | New |
| Content Factory and Ops Systems | repeated outputs with approvals and guardrails | Pro | Phase 3 | New |

### E7. Download and Asset Paths

These are not separate courses, but they should be treated as product lines:

- setup pack library
- troubleshooting matrix library
- quick-reference cards
- command reference sheets
- configuration template packs
- starter project folders
- CLAUDE.md examples
- MEMORY.md examples
- workflow templates
- role-specific use-case packs

## SECTION F - What to Keep / Merge / Remove / Add

### Keep

- the core product thesis in [README.md](/C:/CLI_Academy/README.md)
- the current schema baseline in [infrastructure/schema.sql](/C:/CLI_Academy/infrastructure/schema.sql)
- the beginner Claude Code lessons in [content/paths/claude-code-beginners](/C:/CLI_Academy/content/paths/claude-code-beginners)
- the Windows and macOS setup content
- the config and troubleshooting lessons
- the Claude CoWork starter path
- the advanced OpenClaw, NemoClaw, ZeroClaw, and AutoClaw content as future advanced inventory
- the thin backend scaffold as a seed, not as finished product infrastructure

### Merge

- Merge the current beginner path, Windows path, macOS path, and config/troubleshooting path into one beginner setup academy with OS branching.
- Merge separate skills, slash commands, plugins, and hooks into one coherent "extensions and control surfaces" path before splitting later.
- Merge fragmented professional tracks into a smaller number of high-quality role tracks instead of many shallow ones.
- Merge ZeroClaw, NanoClaw, and PicoClaw coverage into one lightweight-variants track until there is enough real depth to justify separate paths.

### Remove or Delay

- Remove placeholder role tracks from public "available" positioning until they are genuinely written.
- Delay community, certificates, marketplace, enterprise SSO, and managed runtime.
- Delay public emphasis on multi-agent swarm architecture. Keep it internal.
- Delay elaborate gamification. Progress and confidence matter more than streak cosmetics.

### Add

- Linux setup path
- Mac mini / dedicated box path
- Fix My Setup wizard
- troubleshooting center
- compatibility matrix
- known issues center
- release radar
- media asset layer for screenshots, diagrams, and short video
- real download center with versioned exports
- stronger onboarding based on OS, device, confidence, and goal
- structured tutor modes with environment-aware retrieval

## SECTION G - Tutor Agent Design

The tutor should be one learner-facing interface backed by specialized internal support roles. The learner sees one calm tutor. The system underneath routes to specialized knowledge and behaviors.

### G1. Tutor Product Role

The tutor is not a generic chatbot. It is:

- setup guide
- troubleshooting partner
- concept explainer
- path navigator
- safe decision helper
- export and template assistant

### G2. Recommended Internal Specialist Roles

- Setup Coach: install, config, verification, first-run help
- Troubleshooting Analyst: error diagnosis, symptom matching, resolution trees
- Concept Tutor: plain-language explanation and analogy
- Path Guide: "what should I learn next?" and onboarding routing
- Workflow Planner: role-based workflow recommendations
- Export Helper: points learners to checklists, cards, templates, and printables
- Safety Guard: reviews risky commands, self-hosted steps, secret handling

### G3. Tutor Modes

| Mode | Use | Plan |
|---|---|---|
| `explain` | plain-language concept help | Free |
| `guided` | step-by-step coaching tied to lesson steps | Free |
| `hint` | small nudge without giving away the whole solution | Free |
| `troubleshooting` | diagnose symptoms and give next action | Free |
| `compare_options` | choose OS path, shell, tool, or deployment option | Pro |
| `planning` | recommend next learning path or workflow architecture | Pro |
| `export_helper` | find the right checklist, template, or print pack | Pro |

### G4. Prompt Architecture

The tutor prompt stack should be layered:

1. Base product policy
2. Safety and risk policy
3. Learner profile and onboarding context
4. Current lesson or path context
5. Environment profile and compatibility data
6. Retrieved trusted snippets from lesson steps, troubleshooting guides, known issues, command references, and downloads
7. Mode-specific response instructions

### G5. Retrieval Sources

- current lesson steps
- course and path summaries
- troubleshooting guides
- issue signatures
- compatibility matrix
- known issues
- command reference
- setup checklists
- downloadable asset metadata
- path recommendation rules

### G6. Response Contract

Tutor responses for setup and troubleshooting should consistently include:

- what is happening
- the next safest action
- what the learner should expect to see
- what to do if that does not happen
- whether the command or step is low, medium, or high risk
- when to stop and escalate

### G7. Risk Controls

- Never invent product-specific steps when no trusted source exists.
- Always label destructive or high-risk commands.
- Never advise secret exposure or unsafe credential storage.
- Never present self-hosted guidance as beginner-safe by default.
- If the tutor lacks confidence, it must say so and route to the relevant guide.
- Retrieval must be restricted to published content versions for learner-facing answers.

### G8. Fallback Behavior

If the tutor cannot confidently answer:

- route to the exact troubleshooting guide
- route to the compatibility matrix row
- route to the known issue
- recommend the next relevant lesson
- surface a "not fully verified" warning if the content is stale or experimental

### G9. Rate Limits by Plan

- Free: 10 messages/day
- Pro: 100 messages/day
- Team later: pooled and admin-configurable

### G10. Product Recommendation

Do not ship the tutor as a plain streaming text box. Ship it as a tutor panel with:

- mode selector
- lesson/environment context badge
- source-backed answer cards
- next-step checklist
- quick links to downloadables
- escalation links to troubleshooting center

## SECTION H - Feature Set by Phase (MVP / Phase 2 / Phase 3)

### MVP

The MVP should prove the beginner setup-and-troubleshooting promise.

- public landing page and pricing
- auth and onboarding
- dashboard
- setup-first path catalog
- lesson player with media support
- free flagship beginner paths
- Windows, macOS, Linux setup branches
- Claude CoWork intro/setup path
- Claude Code + CoWork troubleshooting path
- First Useful Things to Do with Claude Code path
- downloads center with real PDF and Markdown assets
- floating tutor with grounded setup and troubleshooting modes
- progress tracking
- trust surfaces: last reviewed, tested-on, warnings
- compatibility matrix
- Fix My Setup wizard
- Stripe and tier gating

### Phase 2

Phase 2 should deepen product usefulness and trust.

- known issues center
- release radar
- content freshness workflows
- MCP beginner path
- CLAUDE.md / MEMORY.md path
- extensions path for skills, slash commands, plugins, and hooks
- productive Claude CoWork workflows
- role-based tracks
- guided labs and quiz system
- DOCX, CSV, and JSON export expansion
- richer tutor planning and compare-options modes
- VPS and Mac mini deployment content

### Phase 3

Phase 3 should expand advanced and business value.

- OpenClaw ecosystem paths
- subagents and agent teams paths
- automation platform integrations
- business-builder tracks
- recommendations engine
- badges and certificates
- team edition foundations
- internal content/freshness agent ops

### What Not to Build Yet

- marketplace
- large community layer
- enterprise SSO
- managed runtime
- broad mobile app ambitions
- dozens of shallow tracks
- autonomous publishing agents

## SECTION I - Full PRD

### 1. Product Summary

CLI Academy is a beginner-friendly SaaS learning platform focused on helping people successfully set up, troubleshoot, understand, and start using Claude Code, Claude CoWork, and related agentic tools on real devices and environments. It combines guided curriculum, visual instruction, downloadable assets, compatibility and trust data, and a built-in tutor.

### 2. Problem Statement

People are interested in Claude-powered tools but struggle with the real-world barriers to adoption:

- setup friction
- confusing prerequisites
- OS and environment differences
- fear of breaking things
- scattered or stale guidance
- weak troubleshooting support
- too much jargon too early

Most alternatives solve fragments of the problem. Docs are narrow. YouTube is inconsistent. Generic AI courses are too broad. Community advice is unreliable.

### 3. Vision

Become the most trusted place on the internet to get Claude Code and adjacent agentic tools working correctly, understand how to use them safely, and grow from beginner to productive operator.

### 4. Target Users

- Complete beginners
- Aspiring builders
- Working professionals
- Advanced and curious technical users

### 5. Core Jobs to Be Done

- Help me get this installed correctly.
- Help me understand what this tool is and whether it is for me.
- Help me verify my setup actually works.
- Help me recover when a command or configuration fails.
- Help me know what to learn next.
- Help me apply this to real work.

### 6. Product Principles

- First success fast
- Trust before hype
- Troubleshooting is curriculum, not support debt
- Plain language before jargon
- Visual teaching matters
- Downloads are product value
- Advanced depth comes after beginner confidence

### 7. Key Differentiators

- setup and troubleshooting first
- OS and environment-specific pathways
- tested-on metadata
- compatibility matrix
- fix-my-setup guidance
- printable and exportable learning assets
- one tutor interface with specialized support modes

### 8. Competitive Gap / Market Opportunity

Competitors usually fail in one or more of these ways:

- they are too broad
- they assume too much technical confidence
- they do not teach across device and OS realities
- they lack structured troubleshooting
- they do not provide trustworthy freshness signals
- they do not package reusable assets well

CLI Academy can win by owning the "get it working, understand it, and use it safely" wedge.

### 9. Scope

In scope:

- setup and troubleshooting academy
- guided learning paths
- visual lesson support
- tutor
- downloads
- compatibility and trust surfaces
- role-based and advanced tracks in later phases

### 10. Out of Scope

For early phases:

- marketplace
- team workspace depth
- enterprise security stack
- broad social community
- non-Claude tool sprawl

### 11. User Journeys

#### Beginner

Landing page -> onboarding -> choose OS/device -> complete setup path -> verify first success -> use troubleshooting path when stuck -> upgrade for deeper practical paths.

#### Professional

Landing page -> onboarding by role and goal -> skip to foundations checkpoint -> complete practical use path -> access templates and use-case packs -> upgrade for role track and automation packs.

#### Advanced Technical User

Landing page -> understand advanced ecosystem -> complete prerequisites check -> use VPS/OpenClaw path -> consult compatibility, known issues, and hardening guides.

### 12. Feature Requirements

- path catalog with setup-first navigation
- lesson player with media blocks
- progress and completion
- compatibility matrix
- troubleshooting center
- downloads center
- tutor panel
- tier gating
- trusted metadata

### 13. Curriculum Requirements

- beginner-first slope
- structured prerequisites
- environment-specific variants
- step-by-step lesson steps
- safety and recovery notes
- role-based applicability
- version-aware content
- freshness review workflow

### 14. Tutor Requirements

- guided, explain, troubleshooting, compare, planning, and export modes
- lesson-aware context
- retrieval-grounded responses
- risk labeling
- plan-based rate limits
- escalation to guides and known issues

### 15. Downloads / Printable Asset Requirements

- every flagship path includes real downloadables
- PDF and Markdown are first-class
- JSON for configs and templates
- CSV for matrices and checklists
- DOCX where editable guides make sense
- downloads must be versioned and tied to content versions

### 16. Trust and Safety Requirements

- visible warnings for risky steps
- tested-on metadata by platform and version
- known issues center
- freshness status
- no unsupported security claims
- no unsafe default recommendations

### 17. Monetization Options

- free flagship beginner foundation
- Pro subscription for deeper paths, downloads, and tutor depth
- annual pricing
- lifetime or workshop bundles later
- team plans later

### 18. MVP Definition

An MVP is successful when a beginner can sign up, choose their environment, complete a setup path, recover from common issues, achieve a first useful result, access a printable guide, and get context-aware tutor help.

### 19. Phase 2

Add deeper practical and role-based value:

- advanced productive-use paths
- role-based paths
- richer downloads
- known issues center
- release radar
- content freshness systems

### 20. Phase 3

Add advanced ecosystem and business value:

- OpenClaw and variants
- automation platform paths
- team-oriented workflows
- credentials, badges, and recommendations

### 21. Success Metrics

Activation:

- onboarding completion rate
- setup path start rate
- setup path completion rate
- time to first verified success
- troubleshooting resolution rate

Engagement:

- weekly active learners
- download rate per learner
- tutor-assisted completion rate

Monetization:

- free to pro conversion
- annual plan adoption
- refund rate

Trust:

- stale content rate
- support tickets per completed lesson
- known issue coverage

### 22. Risks

- content freshness burden
- overexpansion into too many tracks
- tutor hallucinations in volatile technical areas
- positioning drift toward generic AI education
- underinvesting in visuals and assets

### 23. Dependencies

- Next.js frontend rebuild
- Supabase schema v2
- Stripe billing setup
- asset and media pipeline
- retrieval pipeline for tutor
- content review cadence

### 24. Open Questions

- Which parts of Claude CoWork access/setup remain volatile enough to require ongoing review cadence?
- Which OpenClaw variants deserve standalone paths versus comparison lessons?
- Should Linux setup be one path or split into Ubuntu-first plus distro notes?
- How much of the Fix My Setup wizard is deterministic rules versus tutor-assisted?
- Should team edition be subscription-tiered or sold as onboarding packages first?

### 25. Recommended Next Actions

1. Declare beginner setup and troubleshooting the canonical wedge in all docs.
2. Rebuild the frontend shell around that wedge.
3. Upgrade the schema to curriculum/trust/export v2.
4. Finish and polish the flagship beginner foundations before expanding catalog breadth.
5. Replace placeholder public tracks with honest coming-soon or hidden states.

## SECTION J - Rebuild / Implementation Priorities

This is not a patch-only project. It is a selective salvage plus focused rebuild.

### Priority 0: Truth Reset

- Reconcile [README.md](/C:/CLI_Academy/README.md), [TASKS.md](/C:/CLI_Academy/TASKS.md), [DECISIONS.md](/C:/CLI_Academy/DECISIONS.md), [docs/PRD.md](/C:/CLI_Academy/docs/PRD.md), and the actual repo state.
- Treat missing frontend implementation as a real reset, not a minor omission.
- Remove or correct any launch-ready claims that overstate current reality.

### Priority 1: Frontend Rebuild

Rebuild the learner product shell first:

- marketing site
- onboarding
- dashboard
- setup-first path catalog
- lesson player
- downloads center
- compatibility matrix
- troubleshooting center
- tutor shell

### Priority 2: Schema v2 and Content Registry

Extend the current schema into the v2 model described above:

- tracks, courses, lesson steps, downloads, media assets, compatibility, troubleshooting, versions, freshness
- keep the existing Phase 1 tables where they still fit
- normalize the rest instead of packing everything into JSON

### Priority 3: Flagship Content Polish

Finish the most important learning experience before expanding breadth:

- Claude Code Setup for Absolute Beginners
- Claude CoWork Setup for Beginners
- Troubleshooting Basics
- First Useful Things to Do with Claude Code
- Safe Use, Files, Commands, and Project Structure Basics

Add:

- screenshots
- diagrams
- short clips
- PDFs
- Markdown checklists

### Priority 4: Tutor Hardening

- add retrieval
- add structured modes
- add environment-aware scoping
- add source-backed responses
- add real message-limit enforcement
- add escalation rules

### Priority 5: Trust Surfaces

- tested-on metadata
- compatibility matrix
- known issues center
- release radar
- freshness review pipeline

### Priority 6: Billing and Gating

Only after the core free experience is excellent:

- Stripe
- entitlements
- Pro-only deeper paths
- Pro-only richer tutor modes and asset packs

### Priority 7: Phase 2 and 3 Expansion

Only after the core wedge works:

- role tracks
- automation
- OpenClaw ecosystem depth
- team and business features

### Current Codebase Gaps That Need Action

- `app/` is empty, so the learner product shell needs a complete rebuild.
- The CI workflow references `app/package-lock.json` and npm commands, which cannot work with the current snapshot.
- The backend tutor endpoint streams text, but it does not enforce the documented daily message limits yet.
- The backend does not yet implement enrollment, progress, downloads, billing, or trust APIs.
- The content layer has no assets, videos, schemas, or export pipeline yet.
- The professional-track content is mostly placeholder "coming soon" files and should not be treated as shippable curriculum.
- The current schema does not model the compatibility, troubleshooting, versioning, and media needs of the real product.

## SECTION K - Final Build Recommendation to the Engineering Team

Treat CLI Academy as a setup-and-troubleshooting learning product with advanced depth, not as a broad AI academy.

Use the current repo like this:

- salvage the documentation spine
- keep the strong beginner and advanced content drafts
- keep the schema as a starting layer
- keep the backend tutor/auth scaffold as a seed
- rebuild the frontend product shell
- harden the content model around visuals, trust, exports, and troubleshooting
- hide internal swarm complexity behind one calm learner-facing tutor

If the team does one thing right, it should be this:

Build the best beginner setup and troubleshooting experience in the category first. Everything else should stack on top of that victory.
