export interface RecommendedLearningInput {
  goal?: string;
  hostOs?: string;
  tier?: "free" | "pro";
}

const DEFAULT_START_HREF = "/learn/01-start-here/lesson-1-1-1-create-the-cli-academy-workspace";

const START_HREFS_BY_GOAL: Record<string, string> = {
  "setup-and-first-success": DEFAULT_START_HREF,
  troubleshooting: "/learn/03-claude-code/lesson-3-1-1-install-claude-code-the-right-way",
  cowork: "/learn/08-claude-cowork/lesson-8-1-1-what-cowork-does-differently-from-solo-claude",
  automation: "/learn/03-claude-code/lesson-3-1-1-install-claude-code-the-right-way",
};

export function getOnboardingStartHref(goal?: string) {
  if (!goal) {
    return DEFAULT_START_HREF;
  }

  return START_HREFS_BY_GOAL[goal] ?? DEFAULT_START_HREF;
}

export function getRecommendedPathSlugs(input: RecommendedLearningInput) {
  const slugs: string[] = [];
  const seen = new Set<string>();

  function add(slug: string, requiresPro = false) {
    if (requiresPro && input.tier !== "pro") {
      return;
    }

    if (seen.has(slug)) {
      return;
    }

    seen.add(slug);
    slugs.push(slug);
  }

  add("01-start-here");

  if (input.hostOs === "windows") {
    add("02-terminal-and-file-system-foundations-for-normal-people");
  }

  add("03-claude-code");

  if (input.goal === "troubleshooting") {
    add("05-claude-code-debugging-testing-and-refactoring", true);
  }

  if (input.goal === "cowork") {
    add("08-claude-cowork");
    add("09-claude-cowork-for-documents-research-and-data-extraction", true);
  }

  if (input.goal === "automation") {
    add("13-multi-agent-patterns-for-real-life", true);
    add("18-real-world-agent-builds-for-everyday-productivity", true);
  }

  add("06-git-and-github-for-ai-assisted-builders", true);

  return slugs;
}