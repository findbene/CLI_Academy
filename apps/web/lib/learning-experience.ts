import type { CatalogPath } from "@/lib/catalog";
import type { LessonRecord } from "@/lib/mdx";
import type { ServerViewerResult } from "@/lib/viewer";

export type PathDifficulty = "starter" | "guided-practice" | "applied" | "advanced" | "capstone";
export type PathFormat = "foundation" | "workflow" | "infrastructure" | "build" | "capstone";

export interface PathExperienceMeta {
  audience: string;
  difficulty: PathDifficulty;
  format: PathFormat;
  outcomes: string[];
  prerequisites: string[];
}

export interface PathAccessState {
  canOpenLessons: boolean;
  isComingSoon: boolean;
  requiresUpgrade: boolean;
}

function buildPathMeta(meta: PathExperienceMeta): PathExperienceMeta {
  return meta;
}

export function getPathExperienceMeta(path: Pick<CatalogPath, "section" | "slug" | "summary" | "title">): PathExperienceMeta {
  const slug = path.slug;

  if (slug.startsWith("01-") || slug.startsWith("02-") || slug.startsWith("03-")) {
    return buildPathMeta({
      audience: "New learners who need safe first wins and a reliable mental model.",
      difficulty: "starter",
      format: "foundation",
      outcomes: [
        "Set up a working local learning environment without guessing.",
        "Build confidence with the terminal, files, and the core Claude workflow.",
        "Finish your first real CLI Academy artifact in the same session.",
      ],
      prerequisites: ["No prior path required."],
    });
  }

  if (slug.startsWith("04-") || slug.startsWith("05-") || slug.startsWith("06-") || slug.startsWith("07-")) {
    return buildPathMeta({
      audience: "Learners who are ready to work inside real repos and need safer execution habits.",
      difficulty: "guided-practice",
      format: "workflow",
      outcomes: [
        "Navigate unfamiliar codebases and choose bounded change scopes.",
        "Use tests, Git, and review habits to reduce risky AI-assisted edits.",
        "Move between terminal, IDE, desktop, and browser surfaces with less confusion.",
      ],
      prerequisites: ["Start Here", "Terminal Foundations", "Claude Code: Zero to Productive"],
    });
  }

  if (slug.startsWith("08-") || slug.startsWith("09-") || slug.startsWith("10-")) {
    return buildPathMeta({
      audience: "Operators and knowledge workers who want practical AI workflows with oversight.",
      difficulty: "applied",
      format: "workflow",
      outcomes: [
        "Turn research, documents, and admin tasks into bounded AI-assisted workflows.",
        "Produce cleaner deliverables with less repetitive effort.",
        "Keep human review in the loop while increasing throughput.",
      ],
      prerequisites: ["Claude Code: Zero to Productive"],
    });
  }

  if (slug.startsWith("18-")) {
    return buildPathMeta({
      audience: "Builders who want portfolio-worthy automations and practical assistants.",
      difficulty: "advanced",
      format: "build",
      outcomes: [
        "Ship bounded assistants that solve real work problems.",
        "Capture reusable workflow patterns you can carry into your own projects.",
        "Produce evidence of practical AI builder skill, not just course completion.",
      ],
      prerequisites: ["Repo Workflows", "Debugging and Refactoring", "Skills and Memory"],
    });
  }

  if (slug.startsWith("19-")) {
    return buildPathMeta({
      audience: "Learners who want job-ready proof, case studies, and strong portfolio artifacts.",
      difficulty: "capstone",
      format: "capstone",
      outcomes: [
        "Finish portfolio-grade capstones with clear evidence and narrative.",
        "Package your work so another person can inspect, trust, and evaluate it.",
        "Leave the course collection with mastery signals, not just badges.",
      ],
      prerequisites: ["Complete at least one practical build path before starting capstones."],
    });
  }

  if (path.section === "Agent Infrastructure" || path.section === "Self-Hosting") {
    return buildPathMeta({
      audience: "Intermediate-to-advanced learners who need stronger safety, runtime, and integration habits.",
      difficulty: "advanced",
      format: "infrastructure",
      outcomes: [
        "Understand the tradeoffs behind runtime, automation, and integration choices.",
        "Reduce avoidable failure modes before they become production problems.",
        "Work with infrastructure concepts in a more bounded, reviewable way.",
      ],
      prerequisites: ["Claude Code: Zero to Productive", "Repo workflows and debugging foundations"],
    });
  }

  return buildPathMeta({
    audience: "Learners who want hands-on guidance with clear next steps and practical outputs.",
    difficulty: "guided-practice",
    format: "workflow",
    outcomes: [path.summary],
    prerequisites: ["Start with the first free paths if this topic feels advanced."],
  });
}

export function getPathAccessState(
  path: Pick<CatalogPath, "status" | "tier">,
  viewer: Pick<ServerViewerResult, "profile">,
): PathAccessState {
  const isComingSoon = path.status !== "available";
  const requiresUpgrade = path.tier === "pro" && viewer.profile?.tier !== "pro";

  return {
    canOpenLessons: !isComingSoon && !requiresUpgrade,
    isComingSoon,
    requiresUpgrade,
  };
}

export function getDifficultyLabel(difficulty: PathDifficulty) {
  switch (difficulty) {
    case "starter":
      return "Starter";
    case "guided-practice":
      return "Guided practice";
    case "applied":
      return "Applied";
    case "advanced":
      return "Advanced";
    case "capstone":
      return "Capstone";
    default:
      return "Guided";
  }
}

export function getFormatLabel(format: PathFormat) {
  switch (format) {
    case "foundation":
      return "Foundation";
    case "workflow":
      return "Workflow";
    case "infrastructure":
      return "Infrastructure";
    case "build":
      return "Build";
    case "capstone":
      return "Capstone";
    default:
      return "Path";
  }
}

export function buildLessonGuidance(input: {
  lesson: Pick<LessonRecord, "description" | "title">;
  nextLessonTitle?: string;
  previousLessonTitle?: string;
  primaryEnvironment?: string;
  supportSteps?: string[];
}) {
  const beforeYouStart = [
    input.previousLessonTitle ? `Review ${input.previousLessonTitle} if you need a quick reset.` : "You can treat this as a fresh mission.",
    input.primaryEnvironment ? `Best-tested environment: ${input.primaryEnvironment}.` : "Use the environment that matches your current shell and machine setup.",
    "Keep your output visible while you work so verification is easier.",
  ];

  const stuckSteps = input.supportSteps?.length
    ? input.supportSteps.slice(0, 3)
    : [
        "Pause and rerun the last safe command instead of piling on more changes.",
        "Compare your shell, path, and current folder against the lesson instructions.",
        "Use the tutor for the next smallest step, not for a full restart of the lesson.",
      ];

  return {
    beforeYouStart,
    missionOutcome: input.lesson.description || `Finish ${input.lesson.title} with a concrete, reviewable output.`,
    nextMilestone: input.nextLessonTitle ?? "Finish this path cleanly and move into the next recommended project.",
    stuckSteps,
  };
}
