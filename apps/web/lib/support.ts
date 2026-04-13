export type CompatibilityStatus =
  | "strong-default"
  | "supported-with-quirks"
  | "access-dependent"
  | "advanced-only"
  | "experimental";

export type TrustLevel = "official" | "verified-by-team" | "community-reviewed" | "experimental";
export type FreshnessState = "fresh" | "review-due" | "stale";

export interface CompatibilityEntry {
  bestFor: string;
  environment: string;
  notes: string;
  osFamily: string;
  shellFamily: string;
  slug: string;
  status: CompatibilityStatus;
  testedOn: string;
  tool: string;
  trustLevel: TrustLevel;
}

export interface TroubleshootingGuide {
  keywords: string[];
  likelyCause: string;
  nextStep: string;
  problemArea: string;
  relatedPathSlug?: string;
  safestChecks: string[];
  severity: "common" | "important" | "advanced";
  slug: string;
  symptoms: string[];
  title: string;
}

export interface KnownIssue {
  affected: string;
  keywords: string[];
  severity: "notice" | "warning" | "critical";
  slug: string;
  status: "open" | "monitoring" | "resolved";
  title: string;
  tool: string;
  updatedAt: string;
  workaround: string;
}

export interface ReleaseRadarEntry {
  actionRequired: boolean;
  impactLevel: "low" | "medium" | "high";
  keywords: string[];
  learnerImpact: string;
  releaseDate: string;
  slug: string;
  summary: string;
  title: string;
  tool: string;
}

export interface PathSupportBundle {
  compatibility: CompatibilityEntry[];
  guides: TroubleshootingGuide[];
  issues: KnownIssue[];
}

export interface TutorSupportMatches {
  compatibility: CompatibilityEntry[];
  guides: TroubleshootingGuide[];
  issues: KnownIssue[];
}

export const compatibilityEntries: CompatibilityEntry[] = [
  {
    bestFor: "Most Windows beginners who want the smoothest terminal and file-path experience.",
    environment: "Windows + WSL2",
    notes: "Recommended baseline for most Windows learners because it behaves closest to the Unix-oriented examples used in Claude tooling.",
    osFamily: "Windows",
    shellFamily: "bash",
    slug: "claude-code-windows-wsl2",
    status: "strong-default",
    testedOn: "2026-04-04",
    tool: "Claude Code",
    trustLevel: "verified-by-team",
  },
  {
    bestFor: "Windows users who cannot use WSL2 and need a native shell route.",
    environment: "Windows + PowerShell",
    notes: "Supported, but path formatting, permissions, and package-manager behavior need more explanation and more frequent troubleshooting check-ins.",
    osFamily: "Windows",
    shellFamily: "powershell",
    slug: "claude-code-windows-powershell",
    status: "supported-with-quirks",
    testedOn: "2026-04-03",
    tool: "Claude Code",
    trustLevel: "verified-by-team",
  },
  {
    bestFor: "Most macOS learners, especially on Apple Silicon.",
    environment: "macOS + Homebrew + zsh",
    notes: "Cleanest beginner path on macOS with the fewest permission surprises when Homebrew and Node are installed in the expected order.",
    osFamily: "macOS",
    shellFamily: "zsh",
    slug: "claude-code-macos-homebrew",
    status: "strong-default",
    testedOn: "2026-04-04",
    tool: "Claude Code",
    trustLevel: "verified-by-team",
  },
  {
    bestFor: "Learners who already have feature access and want knowledge-work workflows.",
    environment: "Browser interface",
    notes: "Availability depends on account tier and rollout state, so guidance should always be paired with freshness notes and access caveats.",
    osFamily: "Cross-platform",
    shellFamily: "browser",
    slug: "claude-cowork-browser",
    status: "access-dependent",
    testedOn: "2026-04-02",
    tool: "Claude CoWork",
    trustLevel: "community-reviewed",
  },
  {
    bestFor: "Advanced users who intentionally want self-hosted runtime control.",
    environment: "Linux self-hosted",
    notes: "OpenClaw is not a beginner entry point. Stronger warnings, hardening, monitoring, and operational recovery steps are required.",
    osFamily: "Linux",
    shellFamily: "bash",
    slug: "openclaw-linux-self-hosted",
    status: "advanced-only",
    testedOn: "2026-03-28",
    tool: "OpenClaw",
    trustLevel: "experimental",
  },
];

export const troubleshootingGuides: TroubleshootingGuide[] = [
  {
    keywords: ["command not found", "not found", "install", "npm", "path", "claude"],
    likelyCause: "Claude Code is not installed globally, PATH has not refreshed, or the current shell session is still holding stale environment state.",
    nextStep: "Verify `node --version` and `npm --version`, reinstall Claude Code if needed, then fully restart the terminal before retrying.",
    problemArea: "installation",
    relatedPathSlug: "claude-code-beginners",
    safestChecks: [
      "Run `node --version` to confirm Node is installed.",
      "Run `npm --version` to confirm npm is available.",
      "Close and reopen the shell before retrying the Claude command.",
    ],
    severity: "common",
    slug: "claude-command-not-found",
    symptoms: ["`claude` command is not recognized", "Terminal says command not found", "Install looked successful but the command still fails"],
    title: "Claude command not found",
  },
  {
    keywords: ["auth", "authentication", "api key", "unauthorized", "401", "login"],
    likelyCause: "The key is expired, copied incorrectly, or tied to the wrong account context.",
    nextStep: "Generate a fresh key, run the auth flow again, and verify that the active account matches the workspace you expect to use.",
    problemArea: "authentication",
    relatedPathSlug: "claude-code-config-troubleshoot",
    safestChecks: [
      "Check whether the key was copied with extra spaces or missing characters.",
      "Confirm you are authenticating against the correct account.",
      "Repeat the auth step before troubleshooting anything more advanced.",
    ],
    severity: "important",
    slug: "authentication-failed",
    symptoms: ["Auth step fails", "Unauthorized or invalid key errors", "Login works in one place but not another"],
    title: "Authentication failed",
  },
  {
    keywords: ["windows", "wsl", "powershell", "permission", "path", "drive", "file system"],
    likelyCause: "The learner is mixing WSL and Windows file paths, or running commands in a shell that does not match the instructions they are following.",
    nextStep: "Pause and identify the active shell first, then use the matching path conventions and environment-specific steps from the Windows setup paths.",
    problemArea: "environment mismatch",
    relatedPathSlug: "claude-code-windows",
    safestChecks: [
      "Confirm whether the current shell is WSL2 or PowerShell.",
      "Check whether the current path uses `/home/...` style or `C:\\...` style.",
      "Avoid copying file paths across shells without translating them first.",
    ],
    severity: "common",
    slug: "windows-path-permission-weirdness",
    symptoms: ["Permission denied on Windows", "Paths look wrong", "Files exist but commands cannot find them"],
    title: "Windows path and permission weirdness",
  },
  {
    keywords: ["cowork", "co work", "not visible", "missing", "access", "browser"],
    likelyCause: "Feature access is account-dependent, region-dependent, or rolling out gradually.",
    nextStep: "Check the current account tier, confirm rollout notes, and avoid assuming a local install issue if the product surface itself is missing.",
    problemArea: "access and rollout",
    relatedPathSlug: "claude-cowork",
    safestChecks: [
      "Verify that you are signed into the expected account.",
      "Check whether the account should have access to CoWork.",
      "Use current release notes or trust-center notes before retrying setup steps.",
    ],
    severity: "important",
    slug: "cowork-not-visible",
    symptoms: ["CoWork is missing from the interface", "The learner expects CoWork but cannot find it", "Setup seems fine but the feature is absent"],
    title: "Claude CoWork is not visible",
  },
  {
    keywords: ["mcp", "server", "config", "json", "spawn", "stdio"],
    likelyCause: "The MCP server config is malformed, pointing to the wrong executable, or missing expected environment variables.",
    nextStep: "Validate the config file shape, confirm the executable path, and test the server in isolation before assuming Claude Code is the broken layer.",
    problemArea: "mcp configuration",
    safestChecks: [
      "Open the config and confirm valid JSON or expected syntax.",
      "Verify the command path the MCP server entry is trying to launch.",
      "Check environment variables and working directory assumptions.",
    ],
    severity: "advanced",
    slug: "mcp-server-config-broken",
    symptoms: ["MCP server will not start", "Spawn errors", "Config file seems ignored"],
    title: "MCP server configuration is broken",
  },
];

export const knownIssues: KnownIssue[] = [
  {
    affected: "Some Claude CoWork accounts depending on rollout state and entitlement timing.",
    keywords: ["cowork", "access", "rollout", "missing"],
    severity: "warning",
    slug: "cowork-rollout-visibility",
    status: "monitoring",
    title: "Claude CoWork visibility may lag behind entitlement changes",
    tool: "Claude CoWork",
    updatedAt: "2026-04-03",
    workaround: "Recheck the expected account context, then wait for rollout propagation before troubleshooting local machine setup.",
  },
  {
    affected: "Windows learners switching between WSL2 and PowerShell in the same setup session.",
    keywords: ["windows", "wsl", "powershell", "path", "permission"],
    severity: "warning",
    slug: "windows-shell-mixing",
    status: "open",
    title: "Mixed-shell path handling still causes the most beginner setup failures",
    tool: "Claude Code",
    updatedAt: "2026-04-04",
    workaround: "Choose one shell path per setup session and translate paths intentionally if you switch later.",
  },
  {
    affected: "Self-hosted OpenClaw and variant deployments without clear monitoring or restart strategy.",
    keywords: ["openclaw", "runtime", "pm2", "docker", "monitoring", "vps"],
    severity: "critical",
    slug: "openclaw-runtime-hardening",
    status: "open",
    title: "OpenClaw runtime guidance should be treated as advanced and operationally risky",
    tool: "OpenClaw",
    updatedAt: "2026-03-29",
    workaround: "Do not treat self-hosted OpenClaw as a beginner path. Use monitored restarts, logs, and hardened network exposure before calling the setup stable.",
  },
];

function filterSupportEntries(
  compatibility: typeof compatibilityEntries,
  guides: typeof troubleshootingGuides,
  issues: typeof knownIssues,
  config: { compatTags: string[]; guideTags: string[]; issueTags: string[] },
) {
  return {
    compatibility: compatibility.filter((e) => config.compatTags.some((t) => e.slug === t)),
    guides: guides.filter((g) => config.guideTags.some((t) => g.slug === t)),
    issues: issues.filter((i) => config.issueTags.some((t) => i.slug === t)),
  };
}

export const releaseRadar: ReleaseRadarEntry[] = [
  {
    actionRequired: false,
    impactLevel: "medium",
    keywords: ["claude code", "install", "setup", "release"],
    learnerImpact: "Beginner setup content should stay aligned with the latest install assumptions and command examples.",
    releaseDate: "2026-04-02",
    slug: "claude-code-install-doc-refresh",
    summary: "Install assumptions and command examples need periodic review whenever Claude tooling changes packaging or auth flow expectations.",
    title: "Claude Code install guidance requires regular review",
    tool: "Claude Code",
  },
  {
    actionRequired: true,
    impactLevel: "medium",
    keywords: ["cowork", "access", "entitlement", "browser"],
    learnerImpact: "Learners may misdiagnose a rollout or entitlement issue as a setup failure unless freshness notes are explicit.",
    releaseDate: "2026-04-03",
    slug: "cowork-access-notes",
    summary: "CoWork access notes should stay visible because availability can change by account state faster than lesson content changes.",
    title: "Claude CoWork access notes need visible freshness framing",
    tool: "Claude CoWork",
  },
];

export function getFreshnessState(lastReviewedAt: string | null | undefined): FreshnessState {
  if (!lastReviewedAt) {
    return "stale";
  }

  const reviewed = new Date(lastReviewedAt);
  if (Number.isNaN(reviewed.getTime())) {
    return "stale";
  }

  const diffDays = Math.floor((Date.now() - reviewed.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays <= 14) {
    return "fresh";
  }

  if (diffDays <= 45) {
    return "review-due";
  }

  return "stale";
}

function scoreMatch(keywords: string[], haystack: string) {
  return keywords.reduce((score, keyword) => score + (haystack.includes(keyword) ? 1 : 0), 0);
}

export function getTutorSupportMatches(question: string, lessonTitle?: string) {
  const haystack = `${question} ${lessonTitle ?? ""}`.toLowerCase();

  const matchedGuides = troubleshootingGuides
    .map((guide) => ({ guide, score: scoreMatch(guide.keywords, haystack) }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 2)
    .map(({ guide }) => guide);

  const matchedIssues = knownIssues
    .map((issue) => ({ issue, score: scoreMatch(issue.keywords, haystack) }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 1)
    .map(({ issue }) => issue);

  const matchedCompatibility = compatibilityEntries
    .map((entry) => ({
      entry,
      score: scoreMatch(
        [
          entry.tool.toLowerCase(),
          entry.environment.toLowerCase(),
          entry.osFamily.toLowerCase(),
          entry.shellFamily.toLowerCase(),
        ],
        haystack,
      ),
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 2)
    .map(({ entry }) => entry);

  return {
    compatibility: matchedCompatibility,
    guides: matchedGuides,
    issues: matchedIssues,
  } satisfies TutorSupportMatches;
}

export function buildTutorSupportContext(question: string, lessonTitle?: string) {
  const matches = getTutorSupportMatches(question, lessonTitle);

  const parts: string[] = [];

  if (matches.guides.length) {
    parts.push(
      `Relevant troubleshooting guides: ${matches.guides
        .map(
          (guide) =>
            `${guide.title}. Likely cause: ${guide.likelyCause} Safest checks: ${guide.safestChecks.join(" ")}`,
        )
        .join(" ")}`,
    );
  }

  if (matches.issues.length) {
    parts.push(
      `Relevant known issues: ${matches.issues
        .map(
          (issue) =>
            `${issue.title} (${issue.status}, updated ${issue.updatedAt}). Workaround: ${issue.workaround}`,
        )
        .join(" ")}`,
    );
  }

  if (matches.compatibility.length) {
    parts.push(
      `Relevant compatibility notes: ${matches.compatibility
        .map(
          (entry) =>
            `${entry.tool} on ${entry.environment} is ${entry.status.replaceAll("-", " ")} and was tested on ${entry.testedOn}. Notes: ${entry.notes}`,
        )
        .join(" ")}`,
    );
  }

  return parts.join("\n\n");
}

export function getPathSupportBundle(pathSlug: string): PathSupportBundle {
  const bundles: Record<string, PathSupportBundle> = {
    "01-start-here": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-code-windows-wsl2", "claude-code-windows-powershell", "claude-code-macos-homebrew"],
      guideTags: ["claude-command-not-found", "windows-path-permission-weirdness"],
      issueTags: ["windows-shell-mixing"],
    }),
    "02-terminal-and-file-system-foundations-for-normal-people": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-code-windows-wsl2", "claude-code-windows-powershell", "claude-code-macos-homebrew"],
      guideTags: ["windows-path-permission-weirdness", "claude-command-not-found"],
      issueTags: ["windows-shell-mixing"],
    }),
    "03-claude-code": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-code-windows-wsl2", "claude-code-windows-powershell", "claude-code-macos-homebrew"],
      guideTags: ["claude-command-not-found", "authentication-failed", "windows-path-permission-weirdness"],
      issueTags: ["windows-shell-mixing"],
    }),
    "04-claude-code-repo-workflows-and-project-navigation": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-code-windows-wsl2", "claude-code-windows-powershell", "claude-code-macos-homebrew"],
      guideTags: ["claude-command-not-found", "authentication-failed"],
      issueTags: ["windows-shell-mixing"],
    }),
    "05-claude-code-debugging-testing-and-refactoring": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-code-windows-wsl2", "claude-code-windows-powershell", "claude-code-macos-homebrew"],
      guideTags: ["claude-command-not-found", "authentication-failed"],
      issueTags: [],
    }),
    "06-git-and-github-for-ai-assisted-builders": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-code-windows-wsl2", "claude-code-windows-powershell", "claude-code-macos-homebrew"],
      guideTags: ["authentication-failed", "windows-path-permission-weirdness"],
      issueTags: ["windows-shell-mixing"],
    }),
    "07-claude-code-across-terminal-ide-desktop-and-browser": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-code-windows-wsl2", "claude-code-windows-powershell", "claude-code-macos-homebrew", "claude-cowork-browser"],
      guideTags: ["authentication-failed", "windows-path-permission-weirdness", "cowork-not-visible"],
      issueTags: ["windows-shell-mixing", "cowork-rollout-visibility"],
    }),
    "08-claude-cowork": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-cowork-browser"],
      guideTags: ["cowork-not-visible", "authentication-failed"],
      issueTags: ["cowork-rollout-visibility"],
    }),
    "09-claude-cowork-for-documents-research-and-data-extraction": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-cowork-browser"],
      guideTags: ["cowork-not-visible", "authentication-failed"],
      issueTags: ["cowork-rollout-visibility"],
    }),
    "10-claude-cowork-for-admin-operations-and-team-rituals": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-cowork-browser"],
      guideTags: ["cowork-not-visible", "authentication-failed"],
      issueTags: ["cowork-rollout-visibility"],
    }),
    "11-openclaw-and-claw-runtime-foundations": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["openclaw-linux-self-hosted"],
      guideTags: ["mcp-server-config-broken"],
      issueTags: ["openclaw-runtime-hardening"],
    }),
    "12-skills-memory-heartbeats-and-scheduled-work": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-code-macos-homebrew", "claude-code-windows-wsl2"],
      guideTags: ["mcp-server-config-broken", "authentication-failed"],
      issueTags: [],
    }),
    "13-multi-agent-patterns-for-real-life": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-code-macos-homebrew", "claude-code-windows-wsl2"],
      guideTags: ["mcp-server-config-broken", "authentication-failed"],
      issueTags: [],
    }),
    "14-secure-local-machines-and-safe-defaults": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-code-windows-wsl2", "claude-code-windows-powershell", "claude-code-macos-homebrew"],
      guideTags: ["authentication-failed", "windows-path-permission-weirdness"],
      issueTags: ["windows-shell-mixing"],
    }),
    "15-secure-remote-setups": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["openclaw-linux-self-hosted", "claude-code-macos-homebrew", "claude-code-windows-wsl2"],
      guideTags: ["authentication-failed", "mcp-server-config-broken"],
      issueTags: ["openclaw-runtime-hardening"],
    }),
    "16-computer-use-sandboxes-and-browser-automation": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-code-macos-homebrew", "claude-code-windows-wsl2", "claude-cowork-browser"],
      guideTags: ["authentication-failed", "cowork-not-visible"],
      issueTags: ["cowork-rollout-visibility"],
    }),
    "17-secure-integrations": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-code-macos-homebrew", "claude-code-windows-wsl2", "claude-cowork-browser"],
      guideTags: ["authentication-failed", "mcp-server-config-broken"],
      issueTags: [],
    }),
    "18-real-world-agent-builds-for-everyday-productivity": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-code-macos-homebrew", "claude-code-windows-wsl2", "claude-cowork-browser"],
      guideTags: ["authentication-failed", "cowork-not-visible", "mcp-server-config-broken"],
      issueTags: ["cowork-rollout-visibility"],
    }),
    "19-capstones-portfolio-proof-and-job-ready-evidence": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-code-macos-homebrew", "claude-code-windows-wsl2", "claude-cowork-browser"],
      guideTags: ["authentication-failed", "mcp-server-config-broken"],
      issueTags: ["cowork-rollout-visibility"],
    }),
    "claude-code-beginners": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-code-windows-wsl2", "claude-code-macos-homebrew"],
      guideTags: ["claude-command-not-found", "authentication-failed"],
      issueTags: [],
    }),
    "claude-code-windows": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-code-windows-wsl2", "claude-code-windows-powershell"],
      guideTags: ["windows-path-permission-weirdness", "claude-command-not-found"],
      issueTags: ["windows-shell-mixing"],
    }),
    "claude-code-macos": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-code-macos-homebrew"],
      guideTags: ["claude-command-not-found", "authentication-failed"],
      issueTags: [],
    }),
    "claude-code-config-troubleshoot": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: [
        "claude-code-windows-wsl2",
        "claude-code-windows-powershell",
        "claude-code-macos-homebrew",
        "claude-cowork-browser",
      ],
      guideTags: [
        "claude-command-not-found",
        "authentication-failed",
        "windows-path-permission-weirdness",
        "mcp-server-config-broken",
      ],
      issueTags: ["cowork-rollout-visibility", "windows-shell-mixing"],
    }),
    "claude-cowork": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-cowork-browser"],
      guideTags: ["cowork-not-visible", "authentication-failed"],
      issueTags: ["cowork-rollout-visibility"],
    }),
    "mcp-mastery": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["claude-code-macos-homebrew", "claude-code-windows-wsl2"],
      guideTags: ["mcp-server-config-broken", "authentication-failed"],
      issueTags: [],
    }),
    "openclaw-deployment": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["openclaw-linux-self-hosted"],
      guideTags: ["mcp-server-config-broken"],
      issueTags: ["openclaw-runtime-hardening"],
    }),
    "nemoclaw-runtime": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["openclaw-linux-self-hosted"],
      guideTags: [],
      issueTags: ["openclaw-runtime-hardening"],
    }),
    "zeroclaw-quickstart": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["openclaw-linux-self-hosted"],
      guideTags: [],
      issueTags: ["openclaw-runtime-hardening"],
    }),
    "autoclaw-automation": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["openclaw-linux-self-hosted"],
      guideTags: [],
      issueTags: ["openclaw-runtime-hardening"],
    }),
    "vps-deployment": filterSupportEntries(compatibilityEntries, troubleshootingGuides, knownIssues, {
      compatTags: ["openclaw-linux-self-hosted"],
      guideTags: [],
      issueTags: ["openclaw-runtime-hardening"],
    }),
  };

  return bundles[pathSlug] ?? {
    compatibility: [],
    guides: troubleshootingGuides.slice(0, 2),
    issues: [],
  };
}
