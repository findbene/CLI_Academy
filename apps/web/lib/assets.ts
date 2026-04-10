export type AssetTier = "free" | "pro";
export type AssetCategory =
  | "checklist"
  | "quick-reference"
  | "template"
  | "starter-pack"
  | "field-manual"
  | "prompt-pack"
  | "troubleshooting-kit"
  | "workflow-pack";
export type AssetFormat = "md" | "csv" | "json";

export interface AssetVariant {
  fileName: string;
  format: AssetFormat;
  mimeType: string;
  storagePath: string;
}

export interface AssetLessonTarget {
  lessonSlug: string;
  pathSlug: string;
}

export interface LearningAsset {
  bestFor?: string;
  category: AssetCategory;
  compatibility?: string[];
  exampleUse?: string;
  formats: AssetVariant[];
  installSteps?: string[];
  previewBullets?: string[];
  printable: boolean;
  recommendedLessons: AssetLessonTarget[];
  recommendedPaths: string[];
  slug: string;
  summary: string;
  tier: AssetTier;
  title: string;
  updatedAt: string;
  versionLabel?: string;
}

export interface AssetDownloadLink {
  external?: boolean;
  formatLabel: string;
  href: string;
}

export interface DownloadSurfaceAsset {
  categoryLabel: string;
  compatibility?: string[];
  downloads: AssetDownloadLink[];
  exampleUse?: string;
  installSteps?: string[];
  locked: boolean;
  previewBullets?: string[];
  printable: boolean;
  slug: string;
  summary: string;
  tier: AssetTier;
  title: string;
  updatedAt: string;
  versionLabel?: string;
}

const localAssets: LearningAsset[] = [
  {
    category: "checklist",
    compatibility: ["Windows", "macOS", "Linux", "WSL"],
    exampleUse: "Keep this open while you install Claude Code and verify the first working repo session.",
    formats: [
      {
        fileName: "claude-code-setup-checklist.md",
        format: "md",
        mimeType: "text/markdown; charset=utf-8",
        storagePath: "claude-code-setup-checklist.md",
      },
      {
        fileName: "claude-code-setup-checklist.csv",
        format: "csv",
        mimeType: "text/csv; charset=utf-8",
        storagePath: "claude-code-setup-checklist.csv",
      },
      {
        fileName: "claude-code-setup-checklist.json",
        format: "json",
        mimeType: "application/json; charset=utf-8",
        storagePath: "claude-code-setup-checklist.json",
      },
    ],
    installSteps: [
      "Download the Markdown or CSV copy.",
      "Keep it beside your terminal during install and first authentication.",
      "Tick off each verify step before moving to the next lesson.",
    ],
    previewBullets: [
      "OS-aware install checks",
      "First-run verification steps",
      "Safe approval reminders",
    ],
    printable: true,
    recommendedLessons: [
      { lessonSlug: "lesson-1-1-1-create-the-cli-academy-workspace", pathSlug: "01-start-here" },
      { lessonSlug: "lesson-3-1-1-install-claude-code-the-right-way", pathSlug: "03-claude-code" },
    ],
    recommendedPaths: ["01-start-here", "03-claude-code"],
    slug: "claude-code-setup-checklist",
    summary:
      "A step-by-step install, verify, and first-run checklist you can keep beside the terminal while you work.",
    tier: "free",
    title: "Claude Code setup checklist",
    updatedAt: "2026-04-10",
    versionLabel: "setup-core-v2",
  },
  {
    category: "quick-reference",
    compatibility: ["Windows", "WSL", "PowerShell"],
    exampleUse: "Use it when switching between PowerShell, Windows paths, and Linux-style paths during setup and troubleshooting.",
    formats: [
      {
        fileName: "windows-shell-path-reference.md",
        format: "md",
        mimeType: "text/markdown; charset=utf-8",
        storagePath: "windows-shell-path-reference.md",
      },
      {
        fileName: "windows-shell-path-reference.csv",
        format: "csv",
        mimeType: "text/csv; charset=utf-8",
        storagePath: "windows-shell-path-reference.csv",
      },
    ],
    previewBullets: [
      "Path translation examples",
      "Shell command equivalents",
      "Common Windows setup mistakes",
    ],
    printable: true,
    recommendedLessons: [
      {
        lessonSlug: "lesson-2-1-2-move-between-folders-the-safe-way",
        pathSlug: "02-terminal-and-file-system-foundations-for-normal-people",
      },
      {
        lessonSlug: "lesson-3-1-1-install-claude-code-the-right-way",
        pathSlug: "03-claude-code",
      },
    ],
    recommendedPaths: ["02-terminal-and-file-system-foundations-for-normal-people", "03-claude-code"],
    slug: "windows-shell-path-reference",
    summary:
      "A side-by-side guide for WSL, PowerShell, and Windows paths so beginners stop mixing environments mid-setup.",
    tier: "free",
    title: "Windows shell and path quick reference",
    updatedAt: "2026-04-10",
    versionLabel: "windows-v2",
  },
  {
    category: "troubleshooting-kit",
    compatibility: ["Claude Code install", "Authentication repair", "PATH issues"],
    exampleUse: "Reach for this when the installer worked halfway, auth broke, or the CLI is no longer found in PATH.",
    formats: [
      {
        fileName: "claude-auth-recovery-checklist.md",
        format: "md",
        mimeType: "text/markdown; charset=utf-8",
        storagePath: "claude-auth-recovery-checklist.md",
      },
      {
        fileName: "claude-auth-recovery-checklist.csv",
        format: "csv",
        mimeType: "text/csv; charset=utf-8",
        storagePath: "claude-auth-recovery-checklist.csv",
      },
    ],
    installSteps: [
      "Start at the symptom that matches your failure.",
      "Follow the repair branch for PATH, auth, or shell mismatch.",
      "Re-run the final sanity check before continuing.",
    ],
    previewBullets: [
      "Auth reset sequence",
      "PATH diagnosis",
      "Post-repair sanity checks",
    ],
    printable: true,
    recommendedLessons: [
      { lessonSlug: "lesson-3-1-1-install-claude-code-the-right-way", pathSlug: "03-claude-code" },
    ],
    recommendedPaths: ["03-claude-code", "01-start-here"],
    slug: "claude-auth-recovery-checklist",
    summary:
      "A beginner-friendly recovery flow for broken auth, invalid keys, and environment-variable confusion.",
    tier: "free",
    title: "Claude authentication recovery checklist",
    updatedAt: "2026-04-10",
    versionLabel: "auth-v2",
  },
  {
    category: "template",
    compatibility: ["Claude Code", "Local repos", "Starter projects"],
    exampleUse: "Copy this into a new repo before your first serious Claude Code session so the assistant starts with boundaries.",
    formats: [
      {
        fileName: "claude-md-starter-template.md",
        format: "md",
        mimeType: "text/markdown; charset=utf-8",
        storagePath: "claude-md-starter-template.md",
      },
    ],
    previewBullets: [
      "Purpose section",
      "Allowed and forbidden actions",
      "Review and verification defaults",
    ],
    printable: true,
    recommendedLessons: [
      { lessonSlug: "lesson-12-1-1-create-your-first-project-claude-md", pathSlug: "12-skills-memory-heartbeats-and-scheduled-work" },
      { lessonSlug: "lesson-18-1-1-build-daily-brief-assistant", pathSlug: "18-real-world-agent-builds-for-everyday-productivity" },
    ],
    recommendedPaths: ["03-claude-code", "12-skills-memory-heartbeats-and-scheduled-work", "18-real-world-agent-builds-for-everyday-productivity"],
    slug: "claude-md-starter-template",
    summary:
      "A copy-paste starter template that gives learners a safe first version of CLAUDE.md instead of a blank page.",
    tier: "free",
    title: "CLAUDE.md starter template",
    updatedAt: "2026-04-10",
    versionLabel: "claudemd-v2",
  },
  {
    category: "template",
    compatibility: ["Claude Cowork", "Knowledge-work tasks", "Document workflows"],
    exampleUse: "Use this before any Cowork session that needs a clean outcome, success criteria, and file-level guardrails.",
    formats: [
      {
        fileName: "claude-cowork-session-brief-template.md",
        format: "md",
        mimeType: "text/markdown; charset=utf-8",
        storagePath: "claude-cowork-session-brief-template.md",
      },
    ],
    previewBullets: [
      "Outcome definition",
      "Source boundaries",
      "Review checklist",
    ],
    printable: true,
    recommendedLessons: [
      { lessonSlug: "lesson-8-1-2-set-up-a-cowork-session-brief", pathSlug: "08-claude-cowork" },
      { lessonSlug: "lesson-8-2-1-launch-a-cowork-session-with-a-clear-goal", pathSlug: "08-claude-cowork" },
    ],
    recommendedPaths: ["08-claude-cowork", "09-claude-cowork-for-documents-research-and-data-extraction"],
    slug: "claude-cowork-session-brief-template",
    summary:
      "A simple brief template for telling Claude Cowork what you need, what good looks like, and what to avoid.",
    tier: "free",
    title: "Claude Cowork session brief template",
    updatedAt: "2026-04-10",
    versionLabel: "cowork-v2",
  },
  {
    category: "starter-pack",
    compatibility: ["Claude Code", "Skills", "Automation starter repos"],
    exampleUse: "Use this when you want a bounded starting structure for a builder assistant rather than a blank folder.",
    formats: [
      {
        fileName: "agent-project-starter-pack.md",
        format: "md",
        mimeType: "text/markdown; charset=utf-8",
        storagePath: "agent-project-starter-pack.md",
      },
      {
        fileName: "agent-project-starter-pack.json",
        format: "json",
        mimeType: "application/json; charset=utf-8",
        storagePath: "agent-project-starter-pack.json",
      },
    ],
    installSteps: [
      "Review the starter pack sections and pick the smallest folder layout that fits your workflow.",
      "Copy the markdown pack or machine-readable JSON into a new project folder.",
      "Adapt the included CLAUDE.md and memory notes before adding automation.",
    ],
    previewBullets: [
      "Project memory structure",
      "Starter CLAUDE.md outline",
      "Machine-readable scaffold",
    ],
    printable: false,
    recommendedLessons: [
      { lessonSlug: "lesson-18-1-1-build-daily-brief-assistant", pathSlug: "18-real-world-agent-builds-for-everyday-productivity" },
      { lessonSlug: "lesson-18-2-1-build-repo-helper-or-content-workflow-helper", pathSlug: "18-real-world-agent-builds-for-everyday-productivity" },
    ],
    recommendedPaths: ["12-skills-memory-heartbeats-and-scheduled-work", "18-real-world-agent-builds-for-everyday-productivity"],
    slug: "agent-project-starter-pack",
    summary:
      "A reusable starter pack with project-memory structure, CLAUDE.md guidance, and machine-readable scaffolding.",
    tier: "pro",
    title: "Agent project starter pack",
    updatedAt: "2026-04-10",
    versionLabel: "starter-v2",
  },
  {
    category: "field-manual",
    compatibility: ["Week 1 fast path", "Absolute beginners", "Local install"],
    exampleUse: "Use it as the single printed guide for the first 10 hours of CLI Academy.",
    formats: [
      {
        fileName: "week-1-local-starter-assistant-checklist.md",
        format: "md",
        mimeType: "text/markdown; charset=utf-8",
        storagePath: "week-1-local-starter-assistant-checklist.md",
      },
    ],
    installSteps: [
      "Open this manual before starting Week 1.",
      "Use each section as a stop gate before moving into the next lesson block.",
      "Print or save locally so you can keep working if the browser is closed.",
    ],
    previewBullets: [
      "Week 1 artifact map",
      "Environment baseline checks",
      "First-win verification gates",
    ],
    printable: true,
    recommendedLessons: [
      { lessonSlug: "lesson-1-1-1-create-the-cli-academy-workspace", pathSlug: "01-start-here" },
      { lessonSlug: "lesson-1-3-1-complete-the-first-tiny-project", pathSlug: "01-start-here" },
      { lessonSlug: "lesson-3-1-1-install-claude-code-the-right-way", pathSlug: "03-claude-code" },
    ],
    recommendedPaths: ["01-start-here", "03-claude-code"],
    slug: "week-1-local-starter-assistant-checklist",
    summary:
      "The printable Week 1 field manual for the local starter assistant, from workspace creation to first verified Claude session.",
    tier: "free",
    title: "Week 1 local starter assistant field manual",
    updatedAt: "2026-04-10",
    versionLabel: "fast-path-week-1",
  },
  {
    category: "troubleshooting-kit",
    compatibility: ["Claude Code", "Cowork", "OpenClaw", "Windows", "macOS", "Linux"],
    exampleUse: "Use this when setup works on paper but fails in the real world because of shell drift, auth issues, Docker errors, or runtime mismatches.",
    formats: [
      {
        fileName: "setup-academy-install-troubleshooting-playbook.md",
        format: "md",
        mimeType: "text/markdown; charset=utf-8",
        storagePath: "setup-academy-install-troubleshooting-playbook.md",
      },
    ],
    previewBullets: [
      "Symptom-first triage",
      "Doctor-command decision tree",
      "Repair steps by platform",
    ],
    printable: true,
    recommendedLessons: [
      { lessonSlug: "lesson-3-1-1-install-claude-code-the-right-way", pathSlug: "03-claude-code" },
      { lessonSlug: "lesson-11-1-1-what-a-sandbox-is-and-why-it-matters", pathSlug: "11-openclaw-and-claw-runtime-foundations" },
    ],
    recommendedPaths: ["03-claude-code", "08-claude-cowork", "11-openclaw-and-claw-runtime-foundations"],
    slug: "setup-academy-install-troubleshooting-playbook",
    summary:
      "A setup-first troubleshooting playbook covering shell mismatches, auth failures, Docker/runtime bring-up, and first-run validation.",
    tier: "free",
    title: "Setup Academy install and troubleshooting playbook",
    updatedAt: "2026-04-10",
    versionLabel: "setup-playbook-v1",
  },
  {
    category: "field-manual",
    compatibility: ["Fast path", "Portfolio planning", "Capstone progression"],
    exampleUse: "Use it to keep the full 8-week project arc visible while you work through individual paths and lessons.",
    formats: [
      {
        fileName: "personal-ai-workforce-spine-map.md",
        format: "md",
        mimeType: "text/markdown; charset=utf-8",
        storagePath: "personal-ai-workforce-spine-map.md",
      },
    ],
    previewBullets: [
      "Eight-stage spine map",
      "Artifact checklist by week",
      "Portfolio packaging notes",
    ],
    printable: true,
    recommendedLessons: [],
    recommendedPaths: ["01-start-here", "18-real-world-agent-builds-for-everyday-productivity", "19-capstones-portfolio-proof-and-job-ready-evidence"],
    slug: "personal-ai-workforce-spine-map",
    summary:
      "A printable map of how the Personal AI Workforce evolves from a local starter assistant into the final capstone system.",
    tier: "free",
    title: "Personal AI Workforce spine map",
    updatedAt: "2026-04-10",
    versionLabel: "spine-map-v1",
  },
  {
    category: "prompt-pack",
    compatibility: ["Prompting", "Context engineering", "Cowork", "Claude Code"],
    exampleUse: "Use this as the seed pack for Week 2 and Week 3 when you start turning rough requests into reusable prompt families.",
    formats: [
      {
        fileName: "prompt-context-studio-starter-pack.md",
        format: "md",
        mimeType: "text/markdown; charset=utf-8",
        storagePath: "prompt-context-studio-starter-pack.md",
      },
    ],
    previewBullets: [
      "Prompt anatomy worksheet",
      "System + user prompt starter templates",
      "Context packet checklist",
    ],
    printable: true,
    recommendedLessons: [],
    recommendedPaths: ["03-claude-code", "08-claude-cowork", "09-claude-cowork-for-documents-research-and-data-extraction"],
    slug: "prompt-context-studio-starter-pack",
    summary:
      "A starter pack for prompt anatomy, role framing, context packets, and first-pass evaluation prompts.",
    tier: "free",
    title: "Prompt & Context Studio starter pack",
    updatedAt: "2026-04-10",
    versionLabel: "prompt-studio-v1",
  },
  {
    category: "workflow-pack",
    compatibility: ["Skills", "Hooks", "MCP", "Builder assistants"],
    exampleUse: "Use it when turning a one-off assistant into a reusable extension pack with clear boundaries.",
    formats: [
      {
        fileName: "builder-extension-pack-blueprint.md",
        format: "md",
        mimeType: "text/markdown; charset=utf-8",
        storagePath: "builder-extension-pack-blueprint.md",
      },
    ],
    previewBullets: [
      "Skill pack structure",
      "Hook and MCP planning prompts",
      "Packaging checklist",
    ],
    printable: true,
    recommendedLessons: [
      { lessonSlug: "lesson-12-2-1-understand-the-skill-file-format", pathSlug: "12-skills-memory-heartbeats-and-scheduled-work" },
    ],
    recommendedPaths: ["12-skills-memory-heartbeats-and-scheduled-work", "18-real-world-agent-builds-for-everyday-productivity"],
    slug: "builder-extension-pack-blueprint",
    summary:
      "A blueprint for packaging skills, hooks, MCP ideas, and CLAUDE.md guidance into one builder extension pack.",
    tier: "pro",
    title: "Builder extension pack blueprint",
    updatedAt: "2026-04-10",
    versionLabel: "extension-pack-v1",
  },
  {
    category: "quick-reference",
    compatibility: ["OpenClaw", "Runtime comparisons", "Sandbox planning"],
    exampleUse: "Use this before choosing a runtime so you stay honest about maturity, support, isolation, and beginner fit.",
    formats: [
      {
        fileName: "runtime-lab-decision-matrix.md",
        format: "md",
        mimeType: "text/markdown; charset=utf-8",
        storagePath: "runtime-lab-decision-matrix.md",
      },
    ],
    previewBullets: [
      "Beginner-fit matrix",
      "Security and maturity notes",
      "Best-for scenarios",
    ],
    printable: true,
    recommendedLessons: [
      { lessonSlug: "lesson-11-1-2-compare-local-docker-and-cloud-sandboxes", pathSlug: "11-openclaw-and-claw-runtime-foundations" },
    ],
    recommendedPaths: ["11-openclaw-and-claw-runtime-foundations", "15-secure-remote-setups"],
    slug: "runtime-lab-decision-matrix",
    summary:
      "An honest comparison sheet for local, Docker, cloud, and runtime-variant decisions before you commit to an agent setup.",
    tier: "free",
    title: "Runtime Lab decision matrix",
    updatedAt: "2026-04-10",
    versionLabel: "runtime-lab-v1",
  },
];

export function getAllLocalAssets() {
  return localAssets;
}

export function getAssetBySlug(slug: string) {
  return localAssets.find((asset) => asset.slug === slug) ?? null;
}

export function getAssetVariant(asset: LearningAsset, format?: string | null) {
  if (!format) {
    return asset.formats[0] ?? null;
  }

  return asset.formats.find((variant) => variant.format === format) ?? null;
}

export function getRecommendedAssetsForPath(pathSlug: string) {
  return localAssets.filter(
    (asset) =>
      asset.recommendedPaths.includes(pathSlug) ||
      asset.recommendedLessons.some((target) => target.pathSlug === pathSlug),
  );
}

export function getRecommendedAssetsForLesson(pathSlug: string, lessonSlug: string) {
  const lessonMatches = localAssets.filter((asset) =>
    asset.recommendedLessons.some((target) => target.pathSlug === pathSlug && target.lessonSlug === lessonSlug),
  );

  const seen = new Set(lessonMatches.map((asset) => asset.slug));
  const pathMatches = localAssets.filter(
    (asset) => !seen.has(asset.slug) && asset.recommendedPaths.includes(pathSlug),
  );

  return [...lessonMatches, ...pathMatches];
}

export function buildAssetDownloadHref(slug: string, format: AssetFormat) {
  return `/api/assets/${encodeURIComponent(slug)}?format=${encodeURIComponent(format)}`;
}

export function getAssetCategoryLabel(category: AssetCategory) {
  switch (category) {
    case "checklist":
      return "Checklist";
    case "quick-reference":
      return "Quick reference";
    case "template":
      return "Template";
    case "starter-pack":
      return "Starter pack";
    case "field-manual":
      return "Field manual";
    case "prompt-pack":
      return "Prompt pack";
    case "troubleshooting-kit":
      return "Troubleshooting kit";
    case "workflow-pack":
      return "Workflow pack";
    default:
      return "Asset";
  }
}

export function getAssetFormatLabel(format: AssetFormat | string) {
  switch (format) {
    case "md":
      return "Markdown";
    case "csv":
      return "CSV";
    case "json":
      return "JSON";
    default:
      return String(format).toUpperCase();
  }
}

export function toDownloadSurfaceAsset(
  asset: LearningAsset,
  viewerTier: AssetTier | null | undefined,
): DownloadSurfaceAsset {
  return {
    categoryLabel: getAssetCategoryLabel(asset.category),
    compatibility: asset.compatibility,
    downloads: asset.formats.map((variant) => ({
      formatLabel: getAssetFormatLabel(variant.format),
      href: buildAssetDownloadHref(asset.slug, variant.format),
    })),
    exampleUse: asset.exampleUse,
    installSteps: asset.installSteps,
    locked: asset.tier === "pro" && viewerTier !== "pro",
    previewBullets: asset.previewBullets,
    printable: asset.printable,
    slug: asset.slug,
    summary: asset.summary,
    tier: asset.tier,
    title: asset.title,
    updatedAt: asset.updatedAt,
    versionLabel: asset.versionLabel,
  };
}
