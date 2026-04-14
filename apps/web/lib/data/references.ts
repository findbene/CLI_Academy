export type ReferenceCategory = "setup-guide" | "command-ref" | "cheatsheet" | "ecosystem-map";
export type ReferenceTier = "free" | "pro";

export interface ReferenceCard {
  slug: string;
  title: string;
  subtitle: string;
  category: ReferenceCategory;
  tier: ReferenceTier;
  /** Estimated minutes to read the reference page */
  readMinutes: number;
  /** Topics covered, shown as tags */
  topics: string[];
  updatedAt: string;
}

export const REFERENCE_CARDS: ReferenceCard[] = [
  {
    slug: "claude-code-setup",
    title: "Claude Code Setup Guide",
    subtitle: "Install, authenticate, and run Claude Code on macOS, Windows/WSL2, and Linux. Every step on one page.",
    category: "setup-guide",
    tier: "free",
    readMinutes: 3,
    topics: ["install", "auth", "first run", "macOS", "Windows", "WSL2"],
    updatedAt: "2026-04-14",
  },
  {
    slug: "slash-commands",
    title: "Slash Commands Reference",
    subtitle: "Every built-in /command with its purpose, usage, and a quick example. Print it, pin it, use it.",
    category: "command-ref",
    tier: "free",
    readMinutes: 2,
    topics: ["/help", "/clear", "/mcp", "/model", "/memory", "shortcuts"],
    updatedAt: "2026-04-14",
  },
  {
    slug: "claude-code-quick-ref",
    title: "Claude Code Quick Reference",
    subtitle: "Workflow loop, CLAUDE.md structure, key prompting patterns, and the most useful flags — one dense page.",
    category: "cheatsheet",
    tier: "free",
    readMinutes: 3,
    topics: ["workflow", "CLAUDE.md", "prompting", "flags", "plan mode"],
    updatedAt: "2026-04-14",
  },
  {
    slug: "openclaw-setup",
    title: "OpenClaw Setup Guide",
    subtitle: "Self-host the Claude Code operational layer on macOS, Windows/WSL2, or a VPS in one sitting.",
    category: "setup-guide",
    tier: "pro",
    readMinutes: 4,
    topics: ["install", "gateway", "model routing", "verify", "macOS", "VPS"],
    updatedAt: "2026-04-14",
  },
  {
    slug: "claw-variants",
    title: "Claw Variant Selection Guide",
    subtitle: "OpenClaw, ZeroClaw, NanoClaw, AutoClaw — what each does, when to use it, and how to switch.",
    category: "ecosystem-map",
    tier: "pro",
    readMinutes: 3,
    topics: ["OpenClaw", "ZeroClaw", "NanoClaw", "AutoClaw", "NemoClaw", "decision tree"],
    updatedAt: "2026-04-14",
  },
  {
    slug: "skills-reference",
    title: "Skills & SKILL.md Reference",
    subtitle: "SKILL.md frontmatter schema, tool permission levels, YES gate rules, and validation patterns.",
    category: "cheatsheet",
    tier: "pro",
    readMinutes: 3,
    topics: ["SKILL.md", "tool permissions", "YES gate", "Logic Spine", "triggers"],
    updatedAt: "2026-04-14",
  },
  {
    slug: "mcps-reference",
    title: "MCP Server Reference",
    subtitle: "Model Context Protocol — config format, built-in tools, common servers, and transport options.",
    category: "command-ref",
    tier: "free",
    readMinutes: 3,
    topics: ["MCP", "config", "stdio", "SSE", "filesystem", "servers"],
    updatedAt: "2026-04-14",
  },
  {
    slug: "cowork-setup",
    title: "Claude Cowork Setup & Session Guide",
    subtitle: "Start a Cowork session, write a good brief, and use Claude across documents, email, and tasks.",
    category: "setup-guide",
    tier: "free",
    readMinutes: 3,
    topics: ["Cowork", "session brief", "tools", "sharing", "prompting"],
    updatedAt: "2026-04-14",
  },
];

export function getReferenceBySlug(slug: string): ReferenceCard | null {
  return REFERENCE_CARDS.find((r) => r.slug === slug) ?? null;
}

export function getFreeReferences(): ReferenceCard[] {
  return REFERENCE_CARDS.filter((r) => r.tier === "free");
}

export function getProReferences(): ReferenceCard[] {
  return REFERENCE_CARDS.filter((r) => r.tier === "pro");
}

export function getReferenceCategoryLabel(category: ReferenceCategory): string {
  switch (category) {
    case "setup-guide":    return "Setup guide";
    case "command-ref":    return "Command reference";
    case "cheatsheet":     return "Cheat sheet";
    case "ecosystem-map":  return "Ecosystem map";
  }
}

export function getReferenceCategoryColor(category: ReferenceCategory): string {
  switch (category) {
    case "setup-guide":    return "teal";
    case "command-ref":    return "purple";
    case "cheatsheet":     return "amber";
    case "ecosystem-map":  return "blue";
  }
}
