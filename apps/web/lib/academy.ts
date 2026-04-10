export interface AcademySurface {
  title: string;
  href: string;
  label: string;
  summary: string;
  status: "live-now" | "seeded-now" | "next-up";
}

export interface SpineStage {
  stage: number;
  title: string;
  summary: string;
  artifact: string;
}

export interface FastPathWeek {
  week: number;
  title: string;
  focus: string;
  artifact: string;
  unlock: string;
  hours: string;
  mappedPathSlugs: string[];
  liveHref: string;
  downloads: string[];
}

export interface FlagshipCourseSeed {
  title: string;
  difficulty: string;
  duration: string;
  project: string;
  summary: string;
  chapters: string[];
  downloads: string[];
  href: string;
}

export const ACADEMY_POSITIONING =
  "The beginner-first install-to-production academy for Claude Code, Claude Cowork, OpenClaw, and the Claw-verse.";

export const ACADEMY_MOAT =
  "Guided setup, deep troubleshooting, printable field manuals, downloadable builder assets, live labs, and one evolving spine project that grows into a Personal AI Workforce.";

export const ACADEMY_SURFACES: AcademySurface[] = [
  {
    title: "Learn",
    href: "/learn",
    label: "8-week fast path",
    summary: "The finishable, beginner-first route from first install to a production-ready autonomous AI workforce.",
    status: "live-now",
  },
  {
    title: "Setup Academy",
    href: "/setup-academy",
    label: "install-to-production moat",
    summary: "Install, authenticate, troubleshoot, test, and evaluate Claude Code, Cowork, OpenClaw, and runtime variants with calm guidance.",
    status: "live-now",
  },
  {
    title: "Prompt & Context Studio",
    href: "/prompt-context-studio",
    label: "prompt doctor + harnesses",
    summary: "Prompting fundamentals, prompt engineering, context engineering, harness design, and repair workflows in one studio.",
    status: "live-now",
  },
  {
    title: "Asset Vault",
    href: "/asset-vault",
    label: "field manuals + starter packs",
    summary: "Download printable checklists, prompt packs, CLAUDE.md templates, troubleshooting kits, and builder starter packs.",
    status: "live-now",
  },
  {
    title: "Runtime Lab",
    href: "/setup-academy#runtime-lab",
    label: "comparison and decision layer",
    summary: "See what each runtime is best for, which one is stable enough for beginners, and when to stay local versus remote.",
    status: "seeded-now",
  },
  {
    title: "Workflow Studio",
    href: "/prompt-context-studio#workflow-studio",
    label: "n8n-style orchestration",
    summary: "Map planner, worker, reviewer, retrieval, approval, and scheduling flows before you automate them.",
    status: "seeded-now",
  },
];

export const SPINE_PROJECT_STAGES: SpineStage[] = [
  {
    stage: 1,
    title: "Local Starter Assistant",
    summary: "A safe workspace, a first Claude Code session, and a tiny but working local helper.",
    artifact: "Starter repo and first verified task",
  },
  {
    stage: 2,
    title: "Builder Assistant",
    summary: "A small coding and prompting helper that can explore, edit, verify, and explain changes.",
    artifact: "Tiny useful app and prompt kit",
  },
  {
    stage: 3,
    title: "Knowledge Workflow Assistant",
    summary: "A Cowork-driven workflow that turns folders, documents, and notes into clean outputs.",
    artifact: "Folder-to-briefing system",
  },
  {
    stage: 4,
    title: "Channel-Connected Runtime",
    summary: "A bounded runtime that can accept one message-based task and complete it safely.",
    artifact: "Message-to-action assistant",
  },
  {
    stage: 5,
    title: "Builder Extension Pack",
    summary: "MCP, skills, hooks, prompt kits, and CLAUDE.md structure that make the assistant reusable.",
    artifact: "Extension pack and context bundle",
  },
  {
    stage: 6,
    title: "Grounded Knowledge Assistant",
    summary: "The assistant can retrieve from trusted documents instead of guessing from memory alone.",
    artifact: "Grounded Q&A system",
  },
  {
    stage: 7,
    title: "Operations Agent Team",
    summary: "Planner, worker, and reviewer flows with evaluation and explicit checkpoints.",
    artifact: "Reviewed multi-agent workflow",
  },
  {
    stage: 8,
    title: "Autonomous AI Workforce",
    summary: "A production-minded capstone with deployment, observability, safety layers, and portfolio packaging.",
    artifact: "Portfolio-grade final capstone",
  },
];

export const FAST_PATH_WEEKS: FastPathWeek[] = [
  {
    week: 1,
    title: "Setup and First Win",
    focus: "Workspace safety, terminal confidence, Claude Code install, and first useful local assistant.",
    artifact: "Personal AI Starter Assistant",
    unlock: "You can install, verify, and safely complete your first Claude-assisted task.",
    hours: "10 hours",
    mappedPathSlugs: ["01-start-here", "02-terminal-and-file-system-foundations-for-normal-people", "03-claude-code"],
    liveHref: "/learn/01-start-here",
    downloads: [
      "week-1-local-starter-assistant-checklist",
      "setup-academy-install-troubleshooting-playbook",
      "personal-ai-workforce-spine-map",
    ],
  },
  {
    week: 2,
    title: "Claude Code Foundations and Prompting Fundamentals",
    focus: "Session loop, repo navigation, first app improvement, and prompt basics that reduce drift.",
    artifact: "Tiny useful builder app",
    unlock: "You can ask for understanding first, scope changes, and rewrite weak prompts into useful ones.",
    hours: "10 hours",
    mappedPathSlugs: ["03-claude-code", "04-claude-code-repo-workflows-and-project-navigation", "05-claude-code-debugging-testing-and-refactoring"],
    liveHref: "/learn/03-claude-code",
    downloads: ["prompt-context-studio-starter-pack"],
  },
  {
    week: 3,
    title: "Claude Cowork and Reusable Prompt Kits",
    focus: "Outcome-focused briefs, document workflows, and repeatable knowledge-work automation.",
    artifact: "Folder-to-briefing workflow",
    unlock: "You can decide when a task needs Cowork, run it with oversight, and package the result.",
    hours: "10 hours",
    mappedPathSlugs: ["08-claude-cowork", "09-claude-cowork-for-documents-research-and-data-extraction"],
    liveHref: "/learn/08-claude-cowork",
    downloads: ["prompt-context-studio-starter-pack"],
  },
  {
    week: 4,
    title: "OpenClaw Runtime and Channel Integration",
    focus: "Sandbox-first runtime setup, one safe channel, and message-driven bounded execution.",
    artifact: "Message-to-action assistant",
    unlock: "You can bring up a runtime, connect a surface, and keep it within explicit boundaries.",
    hours: "10 hours",
    mappedPathSlugs: ["11-openclaw-and-claw-runtime-foundations", "17-secure-integrations"],
    liveHref: "/learn/11-openclaw-and-claw-runtime-foundations",
    downloads: ["runtime-lab-decision-matrix"],
  },
  {
    week: 5,
    title: "MCP, Skills, Hooks, Subagents, and Context Engineering",
    focus: "Builder extensibility, reusable instructions, and safe augmentation of the assistant.",
    artifact: "Builder extension pack",
    unlock: "You can create reusable skill packs, hooks, and context scaffolds without creating chaos.",
    hours: "10 hours",
    mappedPathSlugs: ["12-skills-memory-heartbeats-and-scheduled-work"],
    liveHref: "/learn/12-skills-memory-heartbeats-and-scheduled-work",
    downloads: ["builder-extension-pack-blueprint"],
  },
  {
    week: 6,
    title: "RAG and Agentic RAG",
    focus: "Grounding the workforce on trusted documents, structured retrieval, and review loops.",
    artifact: "Grounded knowledge assistant",
    unlock: "You can move from generic prompting to evidence-backed answers with citations and retrieval quality checks.",
    hours: "10 hours",
    mappedPathSlugs: [],
    liveHref: "/prompt-context-studio#rag-track",
    downloads: ["prompt-context-studio-starter-pack"],
  },
  {
    week: 7,
    title: "Orchestration, Workflow Studio, Harnesses, and Safety",
    focus: "Planner-worker-reviewer systems, workflow graphs, evaluation harnesses, and approval loops.",
    artifact: "Operations agent team",
    unlock: "You can orchestrate multi-step work without losing accountability, observability, or human review.",
    hours: "10 hours",
    mappedPathSlugs: ["13-multi-agent-patterns-for-real-life", "17-secure-integrations", "18-real-world-agent-builds-for-everyday-productivity"],
    liveHref: "/learn/13-multi-agent-patterns-for-real-life",
    downloads: ["builder-extension-pack-blueprint"],
  },
  {
    week: 8,
    title: "Deployment, Observability, Portfolio",
    focus: "Deployment paths, reliability patterns, safety reviews, and portfolio packaging.",
    artifact: "Autonomous AI Workforce capstone",
    unlock: "You can package the system as real proof of work instead of a disconnected collection of experiments.",
    hours: "10 hours",
    mappedPathSlugs: ["15-secure-remote-setups", "18-real-world-agent-builds-for-everyday-productivity", "19-capstones-portfolio-proof-and-job-ready-evidence"],
    liveHref: "/learn/19-capstones-portfolio-proof-and-job-ready-evidence",
    downloads: ["personal-ai-workforce-spine-map"],
  },
];

export const SETUP_ACADEMY_FLAGSHIP_COURSES: FlagshipCourseSeed[] = [
  {
    title: "Claude Code Setup Academy",
    difficulty: "Absolute beginner",
    duration: "6-8 hours",
    project: "First working Claude Code builder session",
    summary: "Install by OS, authenticate cleanly, review safe approvals, troubleshoot configs, and complete your first real repo task.",
    chapters: [
      "What Claude Code is and where it lives",
      "Install and authenticate by OS",
      "Core commands, project context, and approvals",
      "Doctor, logs, config, and recovery",
      "First end-to-end build and evaluation",
    ],
    downloads: ["week-1-local-starter-assistant-checklist", "setup-academy-install-troubleshooting-playbook"],
    href: "/learn/03-claude-code",
  },
  {
    title: "Claude Cowork Setup Academy",
    difficulty: "Beginner",
    duration: "4-6 hours",
    project: "Research folder to briefing pack",
    summary: "Give Cowork a messy folder, define the outcome, review the work, and ship a useful deliverable without losing oversight.",
    chapters: [
      "What Cowork is and when to use it",
      "Setup, access, and safe file permissions",
      "Outcome-focused session briefs",
      "Run, review, and troubleshoot a session",
      "End-to-end briefing build and QA",
    ],
    downloads: ["prompt-context-studio-starter-pack"],
    href: "/learn/08-claude-cowork",
  },
  {
    title: "OpenClaw Runtime Setup",
    difficulty: "Intermediate beginner",
    duration: "8-10 hours",
    project: "Personal assistant in a sandbox",
    summary: "Bring up a bounded runtime locally, connect one channel, and prove that the runtime can do one useful task safely.",
    chapters: [
      "OpenClaw fundamentals",
      "Installation and environment prep",
      "Configuration and channel wiring",
      "Troubleshooting and rollback",
      "Safe end-to-end assistant build",
    ],
    downloads: ["runtime-lab-decision-matrix", "setup-academy-install-troubleshooting-playbook"],
    href: "/learn/11-openclaw-and-claw-runtime-foundations",
  },
  {
    title: "Claw-verse Runtime Decisions",
    difficulty: "Beginner to intermediate",
    duration: "3-4 hours",
    project: "One task, multiple runtimes",
    summary: "Compare OpenClaw, NemoClaw-style secure runtimes, lightweight variants, and honest support tiers before you pick a production path.",
    chapters: [
      "What the Claw-verse is",
      "How to choose a runtime",
      "Shared config patterns",
      "Cross-runtime troubleshooting",
      "2026 update micro-module",
    ],
    downloads: ["runtime-lab-decision-matrix"],
    href: "/setup-academy#runtime-lab",
  },
  {
    title: "Hermes Persistence And Memory",
    difficulty: "Intermediate",
    duration: "4-5 hours",
    project: "Persistent study and ops assistant",
    summary: "Configure memory, test session continuity, and keep persistent behavior useful instead of noisy.",
    chapters: [
      "What Hermes is",
      "Install and configure",
      "Memory policy and continuity tests",
      "Failure recovery for persistent agents",
      "Cross-session validation",
    ],
    downloads: ["builder-extension-pack-blueprint", "personal-ai-workforce-spine-map"],
    href: "/prompt-context-studio#memory-track",
  },
];

export const PROMPT_STUDIO_TRACKS: FlagshipCourseSeed[] = [
  {
    title: "Prompting Fundamentals",
    difficulty: "Absolute beginner",
    duration: "3-4 hours",
    project: "Prompt makeover pack",
    summary: "Learn prompt anatomy, clarity, constraints, and examples by rewriting weak prompts into usable task briefs.",
    chapters: [
      "Prompt anatomy",
      "Clarity and specificity",
      "Examples and few-shot patterns",
      "Rewrite workshop",
      "Prompt makeover lab",
    ],
    downloads: ["prompt-context-studio-starter-pack"],
    href: "/prompt-context-studio#fundamentals",
  },
  {
    title: "Prompt and Context Engineering",
    difficulty: "Beginner to intermediate",
    duration: "5-6 hours",
    project: "Context optimization lab",
    summary: "Move from prompts alone to well-bounded context packets, token budgets, variables, and structured instructions.",
    chapters: [
      "User and system prompting",
      "Templates and variables",
      "Context engineering",
      "Token budgets and model controls",
      "Context optimization lab",
    ],
    downloads: ["prompt-context-studio-starter-pack", "personal-ai-workforce-spine-map"],
    href: "/prompt-context-studio#context-track",
  },
  {
    title: "Harness Engineering and Prompt Doctor",
    difficulty: "Intermediate",
    duration: "4-5 hours",
    project: "Prompt harness and eval kit",
    summary: "Create test cases, run evaluations, diagnose failures, and use Prompt Doctor to turn rough instructions into reliable production patterns.",
    chapters: [
      "Harness basics",
      "Test cases and rubrics",
      "Prompt Doctor workflows",
      "Regression checks",
      "Eval kit packaging",
    ],
    downloads: ["prompt-context-studio-starter-pack"],
    href: "/prompt-context-studio#prompt-doctor",
  },
];
