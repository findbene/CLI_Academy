/**
 * Inline copy of packages/academy-core/src — source of truth is packages/academy-core.
 * This file exists so Turbopack can resolve academy-core types and helpers without
 * crossing its filesystem sandbox boundary (apps/web is the Turbopack root on Windows).
 * When packages/academy-core/src changes, keep this file in sync.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AcademyProgram {
  slug: string;
  title: string;
  summary: string;
  goal: string;
  estimatedWeeks: number;
  audience: string[];
}

export interface AcademyPillar {
  slug: string;
  title: string;
  summary: string;
  goal: string;
  sequence: number;
}

export interface AcademyCourse {
  slug: string;
  pillarSlug: string;
  title: string;
  summary: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tier: "free" | "pro";
  estimatedHours: string;
  mainProjectTitle: string;
}

export interface AcademyWeek {
  slug: string;
  title: string;
  summary: string;
  artifactGoal: string;
  sequence: number;
}

export interface AcademyLab {
  slug: string;
  title: string;
  summary: string;
  labType: string;
  estimatedMinutes: number;
  expectedOutput: string;
}

export interface AcademyQuizQuestion {
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
}

export interface AcademyQuiz {
  slug: string;
  title: string;
  summary: string;
  questionCount: number;
  passThreshold: number;
  questions?: AcademyQuizQuestion[];
}

export interface AcademyExercise {
  slug: string;
  title: string;
  summary: string;
  expectedArtifact: string;
  steps?: string[];
}

export interface AcademyRubric {
  slug: string;
  title: string;
  criteria: string[];
}

export interface AcademyAsset {
  slug: string;
  title: string;
  type: string;
  summary: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
  supportTier: "free" | "pro";
  compatibility: string[];
  whoItsFor?: string;
  exampleUsage?: string;
}

export interface AcademyRuntime {
  slug: string;
  title: string;
  summary: string;
  supportTier: "experimental" | "emerging" | "stable";
  maturityLabel: string;
  beginnerFriendliness: "low" | "medium" | "high";
  setupComplexity: "low" | "medium" | "high";
  setupTime: string;
  bestFor: string[];
  recommendedFor: string[];
  avoidIf: string[];
  deploymentPaths: string[];
  interfaceOptions: string[];
  supportNotes?: string;
  pros?: string[];
  cons?: string[];
}

export type AcademyRelationshipEntityType =
  | "asset"
  | "exercise"
  | "lab"
  | "quiz"
  | "rubric"
  | "runtime";

export interface AcademyRelationship {
  entityType: AcademyRelationshipEntityType;
  entitySlug: string;
  lessonSlug?: string;
  note?: string;
  pathSlug: string;
}

// ─── Runtime scoring ─────────────────────────────────────────────────────────

const SUPPORT_TIER_SCORE: Record<AcademyRuntime["supportTier"], number> = {
  experimental: 1,
  emerging: 2,
  stable: 3,
};

const BEGINNER_SCORE: Record<AcademyRuntime["beginnerFriendliness"], number> = {
  low: 1,
  medium: 2,
  high: 3,
};

const SETUP_COMPLEXITY_SCORE: Record<AcademyRuntime["setupComplexity"], number> = {
  high: 1,
  medium: 2,
  low: 3,
};

export interface RuntimeRecommendationInput {
  deploymentPath?: string;
  interfaceOption?: string;
  prioritizeBeginnerSafety?: boolean;
  preferPersistence?: boolean;
  setupTolerance?: AcademyRuntime["setupComplexity"] | "any";
}

export interface RuntimeScoreBreakdown {
  adjustments: string[];
  baseScore: number;
  runtime: AcademyRuntime;
  totalScore: number;
}

export function getRuntimeDecisionScore(runtime: AcademyRuntime) {
  return (
    SUPPORT_TIER_SCORE[runtime.supportTier] * 3 +
    BEGINNER_SCORE[runtime.beginnerFriendliness] * 3 +
    SETUP_COMPLEXITY_SCORE[runtime.setupComplexity] * 2
  );
}

export function compareRuntimes(left: AcademyRuntime, right: AcademyRuntime) {
  const leftScore = getRuntimeDecisionScore(left);
  const rightScore = getRuntimeDecisionScore(right);

  if (leftScore === rightScore) {
    return {
      recommendedSlug: left.beginnerFriendliness === "high" ? left.slug : right.slug,
      confidence: "medium" as const,
      reason:
        "These runtimes are close on stability, beginner fit, and setup burden. Choose based on your intended interface and learning goal.",
    };
  }

  const recommended = leftScore > rightScore ? left : right;
  const alternative = recommended.slug === left.slug ? right : left;
  const reasons = [
    recommended.supportTier !== alternative.supportTier
      ? `${recommended.title} has a stronger support tier`
      : null,
    recommended.beginnerFriendliness !== alternative.beginnerFriendliness
      ? `${recommended.title} is a better fit for beginners`
      : null,
    recommended.setupComplexity !== alternative.setupComplexity
      ? `${recommended.title} has a lighter setup burden`
      : null,
  ].filter(Boolean);

  return {
    recommendedSlug: recommended.slug,
    confidence: Math.abs(leftScore - rightScore) >= 3 ? ("high" as const) : ("medium" as const),
    reason:
      reasons.length > 0
        ? `${reasons.join(", ")}.`
        : `${recommended.title} is the safer default unless you specifically need ${alternative.title}'s tradeoffs.`,
  };
}

function setupToleranceWeight(input: RuntimeRecommendationInput, runtime: AcademyRuntime) {
  if (!input.setupTolerance || input.setupTolerance === "any") {
    return 0;
  }

  if (input.setupTolerance === "low") {
    return runtime.setupComplexity === "low" ? 3 : runtime.setupComplexity === "medium" ? 1 : -2;
  }

  if (input.setupTolerance === "medium") {
    return runtime.setupComplexity === "high" ? -1 : 2;
  }

  return 1;
}

export function getRuntimeRecommendationRankings(
  runtimes: AcademyRuntime[],
  input: RuntimeRecommendationInput,
): RuntimeScoreBreakdown[] {
  return runtimes
    .map((runtime) => {
      const adjustments: string[] = [];
      const baseScore = getRuntimeDecisionScore(runtime);
      let totalScore = baseScore;

      if (input.prioritizeBeginnerSafety !== false) {
        const beginnerBoost = BEGINNER_SCORE[runtime.beginnerFriendliness] * 2;
        const supportBoost = SUPPORT_TIER_SCORE[runtime.supportTier] * 2;
        totalScore += beginnerBoost + supportBoost;
        adjustments.push(`Beginner safety weighting: +${beginnerBoost + supportBoost}`);
      }

      if (input.preferPersistence) {
        const persistentMatch = runtime.bestFor.some((entry) =>
          entry.toLowerCase().includes("persistent"),
        );
        const memoryMatch = runtime.bestFor.some((entry) =>
          entry.toLowerCase().includes("memory"),
        );
        const persistenceBoost = (persistentMatch ? 4 : 0) + (memoryMatch ? 3 : 0);
        totalScore += persistenceBoost;
        if (persistenceBoost > 0) {
          adjustments.push(`Persistence preference match: +${persistenceBoost}`);
        }
      }

      if (input.deploymentPath) {
        const deploymentBoost = runtime.deploymentPaths.includes(input.deploymentPath) ? 3 : -1;
        totalScore += deploymentBoost;
        adjustments.push(
          runtime.deploymentPaths.includes(input.deploymentPath)
            ? `Matches deployment path: +${deploymentBoost}`
            : `Misses deployment path: ${deploymentBoost}`,
        );
      }

      if (input.interfaceOption) {
        const interfaceBoost = runtime.interfaceOptions.includes(input.interfaceOption) ? 2 : 0;
        totalScore += interfaceBoost;
        if (interfaceBoost > 0) {
          adjustments.push(`Matches interface preference: +${interfaceBoost}`);
        }
      }

      const toleranceBoost = setupToleranceWeight(input, runtime);
      totalScore += toleranceBoost;
      if (toleranceBoost !== 0) {
        adjustments.push(
          `Setup tolerance fit: ${toleranceBoost > 0 ? `+${toleranceBoost}` : toleranceBoost}`,
        );
      }

      return {
        adjustments,
        baseScore,
        runtime,
        totalScore,
      };
    })
    .sort((left, right) => right.totalScore - left.totalScore);
}

export function recommendRuntime(runtimes: AcademyRuntime[], input: RuntimeRecommendationInput) {
  const scored = getRuntimeRecommendationRankings(runtimes, input);
  const winner = scored[0]?.runtime ?? null;
  const runnerUp = scored[1]?.runtime ?? null;

  if (!winner) {
    return null;
  }

  const reasons = [
    input.prioritizeBeginnerSafety !== false && winner.beginnerFriendliness === "high"
      ? `${winner.title} is the safest beginner-facing option`
      : null,
    input.preferPersistence &&
    winner.bestFor.some((entry) => entry.toLowerCase().includes("persistent"))
      ? `${winner.title} aligns well with persistence-focused work`
      : null,
    input.deploymentPath && winner.deploymentPaths.includes(input.deploymentPath)
      ? `${winner.title} supports your preferred deployment path`
      : null,
    input.interfaceOption && winner.interfaceOptions.includes(input.interfaceOption)
      ? `${winner.title} supports your preferred interface`
      : null,
    input.setupTolerance === "low" && winner.setupComplexity === "low"
      ? `${winner.title} keeps setup burden especially light`
      : null,
  ].filter(Boolean);

  return {
    recommendedSlug: winner.slug,
    alternativeSlug: runnerUp?.slug ?? null,
    scoreBreakdowns: scored,
    reason:
      reasons.length > 0
        ? `${reasons.join(", ")}.`
        : `${winner.title} is the best overall fit for the priorities you selected.`,
  };
}

// ─── Relationships ────────────────────────────────────────────────────────────

interface RelationshipMatchInput {
  entityType: AcademyRelationshipEntityType;
  lessonSlug?: string;
  pathSlug: string;
  relationships: AcademyRelationship[];
}

export function getRelatedRelationships({
  relationships,
  entityType,
  pathSlug,
  lessonSlug,
}: RelationshipMatchInput) {
  const lessonMatches = relationships.filter(
    (relationship) =>
      relationship.entityType === entityType &&
      relationship.pathSlug === pathSlug &&
      relationship.lessonSlug === lessonSlug,
  );

  if (lessonMatches.length) {
    return lessonMatches;
  }

  return relationships.filter(
    (relationship) =>
      relationship.entityType === entityType &&
      relationship.pathSlug === pathSlug &&
      !relationship.lessonSlug,
  );
}

export function getRelationshipsForEntity(
  relationships: AcademyRelationship[],
  entityType: AcademyRelationshipEntityType,
  entitySlug: string,
) {
  return relationships.filter(
    (relationship) =>
      relationship.entityType === entityType && relationship.entitySlug === entitySlug,
  );
}

export function getBestRelationshipMatch({
  relationships,
  entityType,
  pathSlug,
  lessonSlug,
}: RelationshipMatchInput) {
  return (
    relationships.find(
      (relationship) =>
        relationship.entityType === entityType &&
        relationship.pathSlug === pathSlug &&
        relationship.lessonSlug === lessonSlug,
    ) ??
    relationships.find(
      (relationship) =>
        relationship.entityType === entityType &&
        relationship.pathSlug === pathSlug &&
        !relationship.lessonSlug,
    ) ??
    null
  );
}

// ─── Recommendations ─────────────────────────────────────────────────────────

export interface LessonCompanionInput {
  exercises: AcademyExercise[];
  lessonSlug: string;
  pathSlug: string;
  quizzes: AcademyQuiz[];
  relationships: AcademyRelationship[];
  rubrics: AcademyRubric[];
}

export interface LessonResourceInput {
  assets: AcademyAsset[];
  labs: AcademyLab[];
  lessonSlug: string;
  pathSlug: string;
  relationships: AcademyRelationship[];
  runtimes: AcademyRuntime[];
}

export interface PathRuntimeInput {
  pathSlug: string;
  relationships: AcademyRelationship[];
  runtimes: AcademyRuntime[];
}

type RelatedAsset = AcademyAsset & { note?: string };
type RelatedLab = AcademyLab & { note?: string };
type RelatedRuntime = AcademyRuntime & { note?: string };

export function getLessonCompanionBlocks({
  pathSlug,
  lessonSlug,
  quizzes,
  exercises,
  rubrics,
  relationships,
}: LessonCompanionInput) {
  const quizMatch = getBestRelationshipMatch({
    relationships,
    entityType: "quiz",
    pathSlug,
    lessonSlug,
  });
  const exerciseMatch = getBestRelationshipMatch({
    relationships,
    entityType: "exercise",
    pathSlug,
    lessonSlug,
  });
  const rubricMatch = getBestRelationshipMatch({
    relationships,
    entityType: "rubric",
    pathSlug,
    lessonSlug,
  });

  return {
    exercise: exerciseMatch?.entitySlug
      ? exercises.find((exercise) => exercise.slug === exerciseMatch.entitySlug) ?? null
      : null,
    quiz: quizMatch?.entitySlug
      ? quizzes.find((quiz) => quiz.slug === quizMatch.entitySlug) ?? null
      : null,
    rubric: rubricMatch?.entitySlug
      ? rubrics.find((rubric) => rubric.slug === rubricMatch.entitySlug) ?? null
      : null,
  };
}

export function getLessonResourceLinks({
  assets,
  labs,
  lessonSlug,
  pathSlug,
  relationships,
  runtimes,
}: LessonResourceInput) {
  const assetMatches = getRelatedRelationships({
    relationships,
    entityType: "asset",
    pathSlug,
    lessonSlug,
  }).reduce<RelatedAsset[]>((accumulator, relationship) => {
    const asset = assets.find((entry) => entry.slug === relationship.entitySlug);
    if (asset) {
      accumulator.push({ ...asset, note: relationship.note });
    }
    return accumulator;
  }, []);

  const labMatches = getRelatedRelationships({
    relationships,
    entityType: "lab",
    pathSlug,
    lessonSlug,
  }).reduce<RelatedLab[]>((accumulator, relationship) => {
    const lab = labs.find((entry) => entry.slug === relationship.entitySlug);
    if (lab) {
      accumulator.push({ ...lab, note: relationship.note });
    }
    return accumulator;
  }, []);

  const runtimeMatches = getRelatedRelationships({
    relationships,
    entityType: "runtime",
    pathSlug,
    lessonSlug,
  }).reduce<RelatedRuntime[]>((accumulator, relationship) => {
    const runtime = runtimes.find((entry) => entry.slug === relationship.entitySlug);
    if (runtime) {
      accumulator.push({ ...runtime, note: relationship.note });
    }
    return accumulator;
  }, []);

  return {
    assets: assetMatches,
    labs: labMatches,
    runtimes: runtimeMatches,
  };
}

export function getPathRuntimeLinks({ pathSlug, relationships, runtimes }: PathRuntimeInput) {
  return getRelatedRelationships({
    relationships,
    entityType: "runtime",
    pathSlug,
  }).reduce<RelatedRuntime[]>((accumulator, relationship) => {
    const runtime = runtimes.find((entry) => entry.slug === relationship.entitySlug);
    if (runtime) {
      accumulator.push({ ...runtime, note: relationship.note });
    }
    return accumulator;
  }, []);
}

// ─── Saved resources ─────────────────────────────────────────────────────────

export type SavedAcademyResourceType = "asset" | "lab" | "runtime";

export interface SavedAcademyResource {
  lessonSlug: string;
  pathSlug: string;
  resourceSlug: string;
  resourceType: SavedAcademyResourceType;
  savedAt: string;
}

export function mergeSavedResources(resources: SavedAcademyResource[]): SavedAcademyResource[] {
  const seen = new Set<string>();
  const merged: SavedAcademyResource[] = [];

  const sorted = [...resources].sort((left, right) => right.savedAt.localeCompare(left.savedAt));
  for (const entry of sorted) {
    const key = `${entry.pathSlug}:${entry.lessonSlug}:${entry.resourceType}:${entry.resourceSlug}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    merged.push(entry);
  }

  return merged;
}

export function isResourceSaved(
  resources: SavedAcademyResource[],
  pathSlug: string,
  lessonSlug: string,
  resourceType: SavedAcademyResourceType,
  resourceSlug: string,
): boolean {
  return resources.some(
    (entry) =>
      entry.pathSlug === pathSlug &&
      entry.lessonSlug === lessonSlug &&
      entry.resourceType === resourceType &&
      entry.resourceSlug === resourceSlug,
  );
}

export function toggleResourceInList(
  resources: SavedAcademyResource[],
  pathSlug: string,
  lessonSlug: string,
  resourceType: SavedAcademyResourceType,
  resourceSlug: string,
): {
  next: SavedAcademyResource[];
  saved: boolean;
} {
  const exists = isResourceSaved(resources, pathSlug, lessonSlug, resourceType, resourceSlug);

  if (exists) {
    const next = resources.filter(
      (entry) =>
        !(
          entry.pathSlug === pathSlug &&
          entry.lessonSlug === lessonSlug &&
          entry.resourceType === resourceType &&
          entry.resourceSlug === resourceSlug
        ),
    );
    return { next, saved: false };
  }

  const next = [
    ...resources,
    {
      lessonSlug,
      pathSlug,
      resourceSlug,
      resourceType,
      savedAt: new Date().toISOString(),
    },
  ];
  return { next, saved: true };
}

export function removeResourceFromList(
  resources: SavedAcademyResource[],
  pathSlug: string,
  lessonSlug: string,
  resourceType: SavedAcademyResourceType,
  resourceSlug: string,
): SavedAcademyResource[] {
  return resources.filter(
    (entry) =>
      !(
        entry.pathSlug === pathSlug &&
        entry.lessonSlug === lessonSlug &&
        entry.resourceType === resourceType &&
        entry.resourceSlug === resourceSlug
      ),
  );
}
