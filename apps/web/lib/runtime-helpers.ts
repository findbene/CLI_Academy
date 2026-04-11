/**
 * Runtime decision helpers
 * Inline copy to avoid cross-directory imports that Turbopack can't resolve
 */
import type { AcademyRuntime } from "@/lib/academy-core";

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
        const persistentMatch = runtime.bestFor.some((entry) => entry.toLowerCase().includes("persistent"));
        const memoryMatch = runtime.bestFor.some((entry) => entry.toLowerCase().includes("memory"));
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
        adjustments.push(`Setup tolerance fit: ${toleranceBoost > 0 ? `+${toleranceBoost}` : toleranceBoost}`);
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

export function recommendRuntime(
  runtimes: AcademyRuntime[],
  input: RuntimeRecommendationInput,
) {
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
    input.preferPersistence && winner.bestFor.some((entry) => entry.toLowerCase().includes("persistent"))
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
