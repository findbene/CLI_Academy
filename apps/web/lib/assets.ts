export type AssetTier = "free" | "pro";
export type AssetCategory = "checklist" | "quick-reference" | "template" | "starter-pack";
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
  category: AssetCategory;
  formats: AssetVariant[];
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
  downloads: AssetDownloadLink[];
  locked: boolean;
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
    printable: true,
    recommendedLessons: [
      { lessonSlug: "installing-on-your-machine", pathSlug: "claude-code-beginners" },
      { lessonSlug: "first-run-on-windows", pathSlug: "claude-code-windows" },
      { lessonSlug: "setting-up-cowork", pathSlug: "claude-cowork" },
    ],
    recommendedPaths: ["claude-code-beginners", "claude-code-macos", "claude-code-windows"],
    slug: "claude-code-setup-checklist",
    summary:
      "A step-by-step install, verify, and first-run checklist you can keep beside the terminal while you work.",
    tier: "free",
    title: "Claude Code setup checklist",
    updatedAt: "2026-04-06",
    versionLabel: "setup-core-v1",
  },
  {
    category: "quick-reference",
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
    printable: true,
    recommendedLessons: [
      { lessonSlug: "path-and-permissions", pathSlug: "claude-code-windows" },
      { lessonSlug: "windows-file-system-quirks", pathSlug: "claude-code-windows" },
    ],
    recommendedPaths: ["claude-code-windows"],
    slug: "windows-shell-path-reference",
    summary:
      "A calm side-by-side guide for WSL2, PowerShell, and Windows paths so beginners stop mixing environments mid-setup.",
    tier: "free",
    title: "Windows shell and path quick reference",
    updatedAt: "2026-04-06",
    versionLabel: "windows-v1",
  },
  {
    category: "checklist",
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
    printable: true,
    recommendedLessons: [
      { lessonSlug: "api-keys-and-auth", pathSlug: "claude-code-config-troubleshoot" },
    ],
    recommendedPaths: ["claude-code-config-troubleshoot", "claude-code-beginners"],
    slug: "claude-auth-recovery-checklist",
    summary:
      "A beginner-friendly recovery flow for broken auth, invalid keys, and environment-variable confusion.",
    tier: "free",
    title: "Claude authentication recovery checklist",
    updatedAt: "2026-04-06",
    versionLabel: "auth-v1",
  },
  {
    category: "template",
    formats: [
      {
        fileName: "claude-md-starter-template.md",
        format: "md",
        mimeType: "text/markdown; charset=utf-8",
        storagePath: "claude-md-starter-template.md",
      },
    ],
    printable: true,
    recommendedLessons: [
      { lessonSlug: "your-first-claudemd", pathSlug: "claude-code-beginners" },
      { lessonSlug: "claude-md-deep-dive", pathSlug: "claude-code-config-troubleshoot" },
    ],
    recommendedPaths: ["claude-code-beginners", "claude-code-config-troubleshoot"],
    slug: "claude-md-starter-template",
    summary:
      "A copy-paste starter template that gives learners a safe first version of CLAUDE.md instead of a blank page.",
    tier: "free",
    title: "CLAUDE.md starter template",
    updatedAt: "2026-04-06",
    versionLabel: "claudemd-v1",
  },
  {
    category: "template",
    formats: [
      {
        fileName: "claude-cowork-session-brief-template.md",
        format: "md",
        mimeType: "text/markdown; charset=utf-8",
        storagePath: "claude-cowork-session-brief-template.md",
      },
    ],
    printable: true,
    recommendedLessons: [
      { lessonSlug: "setting-up-cowork", pathSlug: "claude-cowork" },
      { lessonSlug: "cowork-for-documents", pathSlug: "claude-cowork" },
    ],
    recommendedPaths: ["claude-cowork"],
    slug: "claude-cowork-session-brief-template",
    summary:
      "A simple brief template for telling Claude CoWork what you need, what good looks like, and what to avoid.",
    tier: "free",
    title: "Claude CoWork session brief template",
    updatedAt: "2026-04-06",
    versionLabel: "cowork-v1",
  },
  {
    category: "starter-pack",
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
    printable: false,
    recommendedLessons: [],
    recommendedPaths: ["mcp-mastery", "workflow-automation", "claude-code-for-founders"],
    slug: "agent-project-starter-pack",
    summary:
      "A more advanced starter pack with project-memory structure, CLAUDE.md guidance, and machine-readable scaffolding.",
    tier: "pro",
    title: "Agent project starter pack",
    updatedAt: "2026-04-06",
    versionLabel: "pro-starter-v1",
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
    downloads: asset.formats.map((variant) => ({
      formatLabel: getAssetFormatLabel(variant.format),
      href: buildAssetDownloadHref(asset.slug, variant.format),
    })),
    locked: asset.tier === "pro" && viewerTier !== "pro",
    printable: asset.printable,
    slug: asset.slug,
    summary: asset.summary,
    tier: asset.tier,
    title: asset.title,
    updatedAt: asset.updatedAt,
    versionLabel: asset.versionLabel,
  };
}
