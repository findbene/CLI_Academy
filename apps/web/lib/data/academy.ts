export interface AcademySurface {
  description: string;
  href: string;
  title: string;
}

export interface FastPathWeek {
  artifact: string;
  focus: string[];
  hours: string;
  livePathSlugs: string[];
  outcome: string;
  plannedCourseSeeds?: string[];
  title: string;
  week: number;
}

export interface SetupAcademyTrack {
  description: string;
  href: string | null;
  livePathSlugs: string[];
  outcome: string;
  status: "live" | "seeded";
  title: string;
}

export interface SpineStage {
  label: string;
  week: number;
}

export interface PathBlueprint {
  flagship?: boolean;
  fastPathWeek?: number;
  spineOutcome: string;
  studioFocus: string;
}

export const ACADEMY_POSITIONING =
  "CLI Academy is the beginner-first install-to-production academy for Claude Code, Claude Cowork, OpenClaw, and the Claw-verse, with guided setup, deep troubleshooting, downloadable builder assets, live sandboxes, and one project-first fast path that grows a personal AI workforce from first run to production-ready workflows.";

export const ACADEMY_SURFACES: AcademySurface[] = [
  {
    title: "Learn",
    href: "/paths",
    description: "The 8-week fast path plus deeper role and runtime tracks.",
  },
  {
    title: "Setup Academy",
    href: "/setup-academy",
    description: "Install, configure, troubleshoot, and verify before you try to go fast.",
  },
  {
    title: "Asset Vault",
    href: "/downloads",
    description: "Field manuals, templates, starter packs, playbooks, and printable builder assets.",
  },
  {
    title: "Runtime Lab",
    href: "/compatibility",
    description: "Honest support and maturity guidance for runtimes, surfaces, and environments.",
  },
  {
    title: "Field Manuals",
    href: "/troubleshooting",
    description: "Troubleshooting guides, recovery paths, and operational reference sheets.",
  },
];

export const SPINE_STAGES: SpineStage[] = [
  { week: 1, label: "Local Starter Assistant" },
  { week: 2, label: "Useful Builder App" },
  { week: 3, label: "Folder-to-Briefing Workflow" },
  { week: 4, label: "Message-to-Action Assistant" },
  { week: 5, label: "Builder Extension Pack" },
  { week: 6, label: "Grounded Knowledge Assistant" },
  { week: 7, label: "Operations Agent Team" },
  { week: 8, label: "Autonomous AI Workforce" },
];

export const FAST_PATH_WEEKS: FastPathWeek[] = [
  {
    week: 1,
    title: "Setup and first win",
    outcome: "Stand up your CLI Academy workspace, install Claude Code safely, and ship a calm first success.",
    artifact: "Personal AI Starter Assistant running locally with a clear workspace, safety checklist, and first proof of use.",
    hours: "8-10 hours",
    focus: [
      "workspace setup and safety",
      "terminal confidence",
      "Claude Code install and first run",
      "printable checklists and first troubleshooting wins",
    ],
    livePathSlugs: [
      "01-start-here",
      "02-terminal-and-file-system-foundations-for-normal-people",
      "03-claude-code",
    ],
  },
  {
    week: 2,
    title: "Claude Code foundations and prompt discipline",
    outcome: "Move from first run to repeatable repo work, debugging habits, and better task framing.",
    artifact: "A tiny useful builder app with review notes, tests, and prompt upgrades.",
    hours: "10 hours",
    focus: [
      "repo navigation",
      "tiny edits and review loops",
      "debugging and testing",
      "prompt clarity for builders",
    ],
    livePathSlugs: [
      "03-claude-code",
      "04-claude-code-repo-workflows-and-project-navigation",
      "05-claude-code-debugging-testing-and-refactoring",
      "07-claude-code-across-terminal-ide-desktop-and-browser",
    ],
    plannedCourseSeeds: ["Prompting Fundamentals for Beginners"],
  },
  {
    week: 3,
    title: "Cowork and reusable prompting",
    outcome: "Turn messy notes and files into polished outputs with review discipline and reusable briefs.",
    artifact: "Folder-to-Briefing workflow plus a reusable prompt and briefing kit.",
    hours: "10 hours",
    focus: [
      "Claude Cowork fundamentals",
      "source-bundle hygiene",
      "document and research workflows",
      "reusable prompt templates",
    ],
    livePathSlugs: [
      "08-claude-cowork",
      "09-claude-cowork-for-documents-research-and-data-extraction",
      "10-claude-cowork-for-admin-operations-and-team-rituals",
    ],
    plannedCourseSeeds: ["Prompt & Context Studio starter labs"],
  },
  {
    week: 4,
    title: "Runtime foundations and bounded autonomy",
    outcome: "Understand the runtime layer, sandbox risky actions, and choose the right operating surface for bounded tasks.",
    artifact: "Message-to-Action assistant design with safe boundaries, logs, and support notes.",
    hours: "10 hours",
    focus: [
      "sandbox and runtime thinking",
      "safe execution boundaries",
      "surface selection",
      "mini-capstone integration design",
    ],
    livePathSlugs: [
      "07-claude-code-across-terminal-ide-desktop-and-browser",
      "11-openclaw-and-claw-runtime-foundations",
      "14-secure-local-machines-and-safe-defaults",
    ],
    plannedCourseSeeds: ["Setup OpenClaw", "Claw-verse Runtime Lab"],
  },
  {
    week: 5,
    title: "Skills, hooks, memory, and integrations",
    outcome: "Package reusable instructions, memory, and safe integrations into a builder extension layer.",
    artifact: "Builder Extension Pack with CLAUDE.md guidance, one custom skill, memory rules, and a safe integration plan.",
    hours: "10 hours",
    focus: [
      "CLAUDE.md and skills",
      "memory that stays useful",
      "integration scopes and review loops",
      "downloadable starter assets",
    ],
    livePathSlugs: [
      "12-skills-memory-heartbeats-and-scheduled-work",
      "14-secure-local-machines-and-safe-defaults",
      "17-secure-integrations",
    ],
    plannedCourseSeeds: ["MCP, Hooks, Slash Commands, and Subagents"],
  },
  {
    week: 6,
    title: "Grounded knowledge and retrieval discipline",
    outcome: "Move from generic outputs to grounded answers and evidence-backed workflows.",
    artifact: "Grounded Knowledge Assistant with source bundles, extraction traces, and review criteria.",
    hours: "10 hours",
    focus: [
      "source collection and extraction",
      "evidence-backed outputs",
      "grounded assistant patterns",
      "retrieval and knowledge packaging",
    ],
    livePathSlugs: [
      "09-claude-cowork-for-documents-research-and-data-extraction",
      "10-claude-cowork-for-admin-operations-and-team-rituals",
      "18-real-world-agent-builds-for-everyday-productivity",
    ],
    plannedCourseSeeds: ["RAG Foundations", "Agentic RAG and Document Pipelines"],
  },
  {
    week: 7,
    title: "Orchestration, workflow design, and safety loops",
    outcome: "Coordinate multiple bounded agents and human review points without complexity addiction.",
    artifact: "Operations Agent Team with planner-worker-reviewer handoffs and workflow checkpoints.",
    hours: "10 hours",
    focus: [
      "multi-agent patterns",
      "browser and desktop automation",
      "safe tool integrations",
      "workflow canvas planning",
    ],
    livePathSlugs: [
      "13-multi-agent-patterns-for-real-life",
      "16-computer-use-sandboxes-and-browser-automation",
      "17-secure-integrations",
      "18-real-world-agent-builds-for-everyday-productivity",
    ],
    plannedCourseSeeds: ["Workflow Studio", "Harness Engineering and Evaluation"],
  },
  {
    week: 8,
    title: "Deployment, evidence, and portfolio proof",
    outcome: "Package the system, tighten trust and observability, and present real evidence of capability.",
    artifact: "Autonomous AI Workforce capstone with launch docs, evidence pack, portfolio bundle, and next-step roadmap.",
    hours: "10 hours",
    focus: [
      "remote and production-minded setups",
      "safety and observability",
      "capstone assembly",
      "portfolio packaging",
    ],
    livePathSlugs: [
      "15-secure-remote-setups",
      "18-real-world-agent-builds-for-everyday-productivity",
      "19-capstones-portfolio-proof-and-job-ready-evidence",
    ],
    plannedCourseSeeds: ["Deployment Paths", "Cost Engineering and Multi-Provider Agents"],
  },
];

export const SETUP_ACADEMY_TRACKS: SetupAcademyTrack[] = [
  {
    title: "Setup Claude Code",
    description: "Install, authenticate, verify, and troubleshoot the Claude Code session loop on a real machine.",
    outcome: "You finish with a working claude CLI, a safe workspace, and a first builder task completed.",
    status: "live",
    href: "/learn/03-claude-code",
    livePathSlugs: [
      "01-start-here",
      "02-terminal-and-file-system-foundations-for-normal-people",
      "03-claude-code",
      "07-claude-code-across-terminal-ide-desktop-and-browser",
    ],
  },
  {
    title: "Setup Claude Cowork",
    description: "Grant access carefully, brief work clearly, and review outputs like a calm operator.",
    outcome: "You turn a messy folder into a reusable briefing workflow with human oversight still in charge.",
    status: "live",
    href: "/learn/08-claude-cowork",
    livePathSlugs: [
      "08-claude-cowork",
      "09-claude-cowork-for-documents-research-and-data-extraction",
      "10-claude-cowork-for-admin-operations-and-team-rituals",
    ],
  },
  {
    title: "Setup OpenClaw and safe runtime boundaries",
    description: "Learn the runtime mental model, boot a starter sandbox, and test bounded actions before you chase autonomy.",
    outcome: "You can explain where the runtime sits, what it can touch, and how to keep it reviewable.",
    status: "live",
    href: "/learn/11-openclaw-and-claw-runtime-foundations",
    livePathSlugs: [
      "11-openclaw-and-claw-runtime-foundations",
      "14-secure-local-machines-and-safe-defaults",
    ],
  },
  {
    title: "Claw-verse variants and runtime decisions",
    description: "Compare runtimes, maturity tiers, and deployment shapes without marketing fog.",
    outcome: "You can choose the right runtime for a beginner build, a lightweight pilot, or a safer sandboxed setup.",
    status: "seeded",
    href: "/compatibility",
    livePathSlugs: ["11-openclaw-and-claw-runtime-foundations", "15-secure-remote-setups"],
  },
  {
    title: "Hermes, persistence, and always-on study loops",
    description: "Bridge from simple runtime setups to persistent memory, scheduled work, and reviewable ongoing behavior.",
    outcome: "You can scope a persistent assistant without losing control of memory, schedules, or support burden.",
    status: "seeded",
    href: "/downloads",
    livePathSlugs: ["12-skills-memory-heartbeats-and-scheduled-work"],
  },
];

export const ACADEMY_BADGES = [
  "Setup Master",
  "Prompt Architect",
  "Runtime Ranger",
  "Agentic Workforce Architect",
] as const;

export const PATH_BLUEPRINTS: Record<string, PathBlueprint> = {
  "01-start-here": {
    fastPathWeek: 1,
    flagship: true,
    spineOutcome: "Create the safe operating base for your Personal AI Workforce.",
    studioFocus: "Setup Academy",
  },
  "02-terminal-and-file-system-foundations-for-normal-people": {
    fastPathWeek: 1,
    flagship: true,
    spineOutcome: "Build the filesystem confidence that later labs depend on.",
    studioFocus: "Setup Academy",
  },
  "03-claude-code": {
    fastPathWeek: 1,
    flagship: true,
    spineOutcome: "Install Claude Code and complete the first useful builder session.",
    studioFocus: "Setup Academy",
  },
  "04-claude-code-repo-workflows-and-project-navigation": {
    fastPathWeek: 2,
    spineOutcome: "Expand the starter assistant into a real repo helper.",
    studioFocus: "Projects",
  },
  "05-claude-code-debugging-testing-and-refactoring": {
    fastPathWeek: 2,
    spineOutcome: "Teach your builder workflow to debug, test, and verify before trusting output.",
    studioFocus: "Prompt & Context Studio",
  },
  "06-git-and-github-for-ai-assisted-builders": {
    fastPathWeek: 2,
    spineOutcome: "Add recovery, branching, and review habits to the spine project.",
    studioFocus: "Projects",
  },
  "07-claude-code-across-terminal-ide-desktop-and-browser": {
    fastPathWeek: 2,
    spineOutcome: "Choose the right working surface as the workflow grows more complex.",
    studioFocus: "Runtime Lab",
  },
  "08-claude-cowork": {
    fastPathWeek: 3,
    flagship: true,
    spineOutcome: "Turn solo prompting into repeatable knowledge-work delegation.",
    studioFocus: "Setup Academy",
  },
  "09-claude-cowork-for-documents-research-and-data-extraction": {
    fastPathWeek: 3,
    flagship: true,
    spineOutcome: "Add source-aware research and extraction outputs to the workforce.",
    studioFocus: "Prompt & Context Studio",
  },
  "10-claude-cowork-for-admin-operations-and-team-rituals": {
    fastPathWeek: 3,
    spineOutcome: "Package repeatable operations and brief-driven outputs for a team setting.",
    studioFocus: "Projects",
  },
  "11-openclaw-and-claw-runtime-foundations": {
    fastPathWeek: 4,
    flagship: true,
    spineOutcome: "Introduce runtime boundaries and bounded autonomy.",
    studioFocus: "Runtime Lab",
  },
  "12-skills-memory-heartbeats-and-scheduled-work": {
    fastPathWeek: 5,
    flagship: true,
    spineOutcome: "Install reusable instructions, memory, and scheduled support into the workforce.",
    studioFocus: "Asset Vault",
  },
  "13-multi-agent-patterns-for-real-life": {
    fastPathWeek: 7,
    spineOutcome: "Split work into planner, worker, and reviewer roles without overbuilding.",
    studioFocus: "Workflow Studio",
  },
  "14-secure-local-machines-and-safe-defaults": {
    fastPathWeek: 4,
    spineOutcome: "Keep the whole system recoverable, reviewable, and safe to operate.",
    studioFocus: "Docs / Field Manuals",
  },
  "15-secure-remote-setups": {
    fastPathWeek: 8,
    spineOutcome: "Prepare the workforce for remote or production-minded deployment.",
    studioFocus: "Zero-to-Ship",
  },
  "16-computer-use-sandboxes-and-browser-automation": {
    fastPathWeek: 7,
    spineOutcome: "Add bounded browser and desktop execution with logs and resets.",
    studioFocus: "Live Labs",
  },
  "17-secure-integrations": {
    fastPathWeek: 5,
    spineOutcome: "Connect tools with explicit scopes, revoke paths, and review loops.",
    studioFocus: "Workflow Studio",
  },
  "18-real-world-agent-builds-for-everyday-productivity": {
    fastPathWeek: 7,
    spineOutcome: "Assemble useful assistants that solve real work without hiding the evidence.",
    studioFocus: "Capstone Studio",
  },
  "19-capstones-portfolio-proof-and-job-ready-evidence": {
    fastPathWeek: 8,
    flagship: true,
    spineOutcome: "Package the final Autonomous AI Workforce and the proof that it works.",
    studioFocus: "Progress & Portfolio",
  },
};

export function getFastPathWeek(week: number) {
  return FAST_PATH_WEEKS.find((entry) => entry.week === week) ?? null;
}

export function getPathBlueprint(pathSlug: string) {
  return PATH_BLUEPRINTS[pathSlug] ?? null;
}
