export type TutorTier = "free" | "pro";

export type TutorMode =
  | "explain"
  | "guided"
  | "hint"
  | "troubleshooting"
  | "compare_options"
  | "planning"
  | "export_helper";

export interface TutorModeDefinition {
  description: string;
  id: TutorMode;
  label: string;
  plan: TutorTier;
  quickPrompt: string;
  shortLabel: string;
}

export const TUTOR_MODE_DEFINITIONS: TutorModeDefinition[] = [
  {
    id: "explain",
    label: "Explain",
    shortLabel: "Explain",
    plan: "free",
    description: "Plain-language concept help and mental models.",
    quickPrompt: "Explain this in plain language for a beginner.",
  },
  {
    id: "guided",
    label: "Guided",
    shortLabel: "Guided",
    plan: "free",
    description: "Step-by-step coaching tied to the current lesson or task.",
    quickPrompt: "Walk me through the next safest step-by-step action.",
  },
  {
    id: "hint",
    label: "Hint Based",
    shortLabel: "Hint",
    plan: "free",
    description: "Small nudges without giving away the whole answer.",
    quickPrompt: "Give me a hint without solving it for me.",
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    shortLabel: "Fix",
    plan: "free",
    description: "Diagnose symptoms and give the next safest action.",
    quickPrompt: "Help me troubleshoot this issue on my machine.",
  },
  {
    id: "compare_options",
    label: "Compare Options",
    shortLabel: "Compare",
    plan: "pro",
    description: "Compare shells, OS paths, tools, or deployment tradeoffs.",
    quickPrompt: "Compare my options and recommend the safest default.",
  },
  {
    id: "planning",
    label: "Planning",
    shortLabel: "Plan",
    plan: "pro",
    description: "Recommend what to learn next or how to structure a workflow.",
    quickPrompt: "Help me plan what to learn or build next.",
  },
  {
    id: "export_helper",
    label: "Export Helper",
    shortLabel: "Assets",
    plan: "pro",
    description: "Point me to the right checklist, template, or printable.",
    quickPrompt: "Find the best checklist, template, or download for this.",
  },
];

export const FREE_TUTOR_MODE_IDS = TUTOR_MODE_DEFINITIONS.filter((mode) => mode.plan === "free").map(
  (mode) => mode.id,
);

export function isTutorMode(value: string | undefined | null): value is TutorMode {
  return TUTOR_MODE_DEFINITIONS.some((mode) => mode.id === value);
}

export function getTutorModeDefinition(mode: TutorMode) {
  return TUTOR_MODE_DEFINITIONS.find((item) => item.id === mode) ?? TUTOR_MODE_DEFINITIONS[0];
}

export function isTutorModeAllowed(mode: TutorMode, tier: TutorTier) {
  return tier === "pro" || FREE_TUTOR_MODE_IDS.includes(mode);
}

export function mapLearningModeToTutorMode(learningMode?: string): TutorMode {
  if (learningMode === "hint") {
    return "hint";
  }

  if (learningMode === "guided") {
    return "guided";
  }

  if (learningMode === "independent") {
    return "explain";
  }

  return "guided";
}
