import type { CatalogPath } from "@/lib/catalog";
import { getDifficultyLabel, getPathExperienceMeta } from "@/lib/learning-experience";
import { getFreshnessState } from "@/lib/support";

export interface LearnerRoadmapCard {
  reason: string;
  slug: string;
  stageLabel: string;
  title: string;
}

export interface RoadmapSnapshot {
  focusLabel: string;
  masteryCheckpoint: string;
  nextPhaseLabel: string;
}

export interface MasteryRecommendation {
  reason: string;
  slug: string;
  title: string;
}

export interface MasteryGap {
  averageScore: number;
  label: string;
  reason: string;
}

export interface FreshnessSummary {
  fresh: number;
  reviewDue: number;
  stale: number;
}

export function getFreshnessSummary(paths: Array<Pick<CatalogPath, "lastReviewedAt">>): FreshnessSummary {
  return paths.reduce(
    (summary, path) => {
      const state = getFreshnessState(path.lastReviewedAt);
      if (state === "fresh") {
        summary.fresh += 1;
      } else if (state === "review-due") {
        summary.reviewDue += 1;
      } else {
        summary.stale += 1;
      }
      return summary;
    },
    { fresh: 0, reviewDue: 0, stale: 0 },
  );
}

export function buildLearnerRoadmap(input: {
  catalogPaths: CatalogPath[];
  currentFocus?: string;
  recommendedSlugs: string[];
}) {
  const cards: LearnerRoadmapCard[] = input.recommendedSlugs
    .map((slug, index) => {
      const path = input.catalogPaths.find((entry) => entry.slug === slug);
      if (!path) {
        return null;
      }

      const meta = getPathExperienceMeta(path);

      return {
        reason: index === 0 ? "Start here first" : index === 1 ? "Build momentum next" : "Use when you are ready to deepen skill",
        slug: path.slug,
        stageLabel: getDifficultyLabel(meta.difficulty),
        title: path.title,
      } satisfies LearnerRoadmapCard;
    })
    .filter((card): card is LearnerRoadmapCard => Boolean(card))
    .slice(0, 3);

  const focusLabel =
    input.currentFocus === "cowork"
      ? "Knowledge-work automation"
      : input.currentFocus === "troubleshooting"
        ? "Safer debugging and recovery"
        : input.currentFocus === "automation"
          ? "Practical automation builds"
          : "Safe first wins";

  const masteryCheckpoint =
    input.currentFocus === "automation"
      ? "You can ship a bounded automation and explain its failure modes."
      : input.currentFocus === "troubleshooting"
        ? "You can reproduce a problem, verify a fix, and recover safely."
        : input.currentFocus === "cowork"
          ? "You can turn messy inputs into a reviewable deliverable with oversight."
          : "You can set up the workspace cleanly and finish your first guided task.";

  const nextPhaseLabel =
    cards[1]?.title ?? cards[0]?.title ?? "Foundations";

  return {
    cards,
    snapshot: {
      focusLabel,
      masteryCheckpoint,
      nextPhaseLabel,
    } satisfies RoadmapSnapshot,
  };
}

export function buildMasteryAwareRecommendations(input: {
  catalogPaths: CatalogPath[];
  masteryByPath: Map<string, { averageScore: number; verifiedLessons: number }>;
  recommendedSlugs: string[];
}) {
  const ranked = input.recommendedSlugs
    .map((slug) => {
      const path = input.catalogPaths.find((entry) => entry.slug === slug);
      if (!path) {
        return null;
      }

      const mastery = input.masteryByPath.get(slug);
      const averageScore = mastery?.averageScore ?? 0;
      const verifiedLessons = mastery?.verifiedLessons ?? 0;

      let reason = "Good next path to build momentum.";
      if (verifiedLessons === 0) {
        reason = "You have not verified work in this path yet, so it is still a strong next practice target.";
      } else if (averageScore < 70) {
        reason = "Your verified work here is still shaky. Another pass should raise confidence.";
      } else if (averageScore >= 85) {
        reason = "You are performing strongly here. This path is a good bridge into the next harder layer.";
      }

      return {
        reason,
        slug,
        title: path.title,
      } satisfies MasteryRecommendation;
    })
    .filter((entry): entry is MasteryRecommendation => Boolean(entry));

  return ranked.slice(0, 3);
}

export function buildMasteryGapSummary(input: {
  currentFocus?: string;
  masteryByPath: Map<string, { averageScore: number; verifiedLessons: number }>;
}) {
  const entries = Array.from(input.masteryByPath.entries())
    .filter(([, value]) => value.verifiedLessons > 0)
    .sort((left, right) => left[1].averageScore - right[1].averageScore);

  if (!entries.length) {
    return {
      averageScore: 0,
      label: "No verified mastery yet",
      reason: "Verify your first lesson output and the dashboard will start identifying where you need reinforcement.",
    } satisfies MasteryGap;
  }

  const [lowestSlug, lowest] = entries[0];
  const focusReason =
    input.currentFocus === "automation"
      ? "Automation work needs stronger verification discipline before moving faster."
      : input.currentFocus === "troubleshooting"
        ? "Recovery work benefits from one more careful pass with stronger evidence."
        : "The weakest verified path is the best place to reinforce fundamentals.";

  return {
    averageScore: lowest.averageScore,
    label: lowestSlug,
    reason: focusReason,
  } satisfies MasteryGap;
}
