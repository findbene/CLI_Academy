import { describe, it, expect } from "vitest";
import { getOnboardingStartHref, getRecommendedPathSlugs } from "@/lib/learning";

describe("getOnboardingStartHref", () => {
  it("returns the default start href when no goal is provided", () => {
    expect(getOnboardingStartHref()).toBe(
      "/learn/01-start-here/lesson-1-1-1-create-the-cli-academy-workspace",
    );
  });

  it("returns the default start href for an unknown goal", () => {
    expect(getOnboardingStartHref("nonexistent-goal")).toBe(
      "/learn/01-start-here/lesson-1-1-1-create-the-cli-academy-workspace",
    );
  });

  it("returns a goal-specific href for a known goal", () => {
    expect(getOnboardingStartHref("cowork")).toBe(
      "/learn/08-claude-cowork/lesson-8-1-1-what-cowork-does-differently-from-solo-claude",
    );
  });

  it("returns the troubleshooting href for the troubleshooting goal", () => {
    expect(getOnboardingStartHref("troubleshooting")).toBe(
      "/learn/03-claude-code/lesson-3-1-1-install-claude-code-the-right-way",
    );
  });
});

describe("getRecommendedPathSlugs", () => {
  it("always includes the start-here and claude-code paths", () => {
    const slugs = getRecommendedPathSlugs({});
    expect(slugs).toContain("01-start-here");
    expect(slugs).toContain("03-claude-code");
  });

  it("includes the windows foundations path when hostOs is windows", () => {
    const slugs = getRecommendedPathSlugs({ hostOs: "windows" });
    expect(slugs).toContain("02-terminal-and-file-system-foundations-for-normal-people");
  });

  it("does not include the windows foundations path for non-windows hosts", () => {
    const slugs = getRecommendedPathSlugs({ hostOs: "mac" });
    expect(slugs).not.toContain("02-terminal-and-file-system-foundations-for-normal-people");
  });

  it("omits pro-required paths for free-tier users", () => {
    const slugs = getRecommendedPathSlugs({ goal: "cowork", tier: "free" });
    expect(slugs).toContain("08-claude-cowork");
    expect(slugs).not.toContain("09-claude-cowork-for-documents-research-and-data-extraction");
  });

  it("includes pro-required paths for pro-tier users", () => {
    const slugs = getRecommendedPathSlugs({ goal: "cowork", tier: "pro" });
    expect(slugs).toContain("08-claude-cowork");
    expect(slugs).toContain("09-claude-cowork-for-documents-research-and-data-extraction");
  });

  it("returns no duplicates", () => {
    const slugs = getRecommendedPathSlugs({ goal: "cowork", tier: "pro" });
    const unique = new Set(slugs);
    expect(slugs.length).toBe(unique.size);
  });
});
