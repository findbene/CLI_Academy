import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import {
  type AcademyAsset,
  type AcademyCourse,
  type AcademyExercise,
  type AcademyLab,
  type AcademyPillar,
  type AcademyProgram,
  type AcademyQuiz,
  type AcademyRelationship,
  type AcademyRubric,
  type AcademyRuntime,
  type AcademyWeek,
  getRelationshipsForEntity as getRelationshipsForEntityHelper,
} from "@/lib/academy-core";

const CONTENT_ROOT = path.resolve(process.cwd(), "..", "..", "content", "academy");
export type {
  AcademyAsset,
  AcademyCourse,
  AcademyExercise,
  AcademyLab,
  AcademyPillar,
  AcademyProgram,
  AcademyQuiz,
  AcademyRelationship,
  AcademyRubric,
  AcademyRuntime,
  AcademyWeek,
} from "@/lib/academy-core";

async function readJsonFile<T>(segments: string[], fallback: T): Promise<T> {
  const filePath = path.join(CONTENT_ROOT, ...segments);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const getAcademyProgram = cache(() =>
  readJsonFile<AcademyProgram>(
    ["programs", "cli-academy.json"],
    {
      slug: "cli-academy",
      title: "CLI Academy",
      summary: "The beginner-first install-to-production academy for Claude, Claw-verse runtimes, and real agent systems.",
      goal: "Help beginners go from first install to portfolio-ready autonomous AI systems.",
      estimatedWeeks: 8,
      audience: ["beginners", "career-switchers", "builders"],
    },
  ),
);

export const getAcademyPillars = cache(() =>
  readJsonFile<AcademyPillar[]>(["pillars", "pillars.json"], []),
);

export const getAcademyCourses = cache(() =>
  readJsonFile<AcademyCourse[]>(["courses", "courses.json"], []),
);

export const getFastPathWeeks = cache(() =>
  readJsonFile<AcademyWeek[]>(["weeks", "fast-path.json"], []),
);

export const getAcademyLabs = cache(() =>
  readJsonFile<AcademyLab[]>(["labs", "labs.json"], []),
);

export const getAcademyQuizzes = cache(() =>
  readJsonFile<AcademyQuiz[]>(["quizzes", "quizzes.json"], []),
);

export const getAcademyExercises = cache(() =>
  readJsonFile<AcademyExercise[]>(["exercises", "exercises.json"], []),
);

export const getAcademyRubrics = cache(() =>
  readJsonFile<AcademyRubric[]>(["rubrics", "rubrics.json"], []),
);

export const getAcademyAssets = cache(() =>
  readJsonFile<AcademyAsset[]>(["assets", "assets.json"], []),
);

export const getAcademyRuntimes = cache(() =>
  readJsonFile<AcademyRuntime[]>(["runtimes", "runtimes.json"], []),
);

export const getAcademyRelationships = cache(() =>
  readJsonFile<AcademyRelationship[]>(["relationships", "relationships.json"], []),
);

export async function getAcademyAssetBySlug(slug: string) {
  const assets = await getAcademyAssets();
  return assets.find((asset) => asset.slug === slug) ?? null;
}

export async function getAcademyRuntimeBySlug(slug: string) {
  const runtimes = await getAcademyRuntimes();
  return runtimes.find((runtime) => runtime.slug === slug) ?? null;
}

export async function getAcademyLabBySlug(slug: string) {
  const labs = await getAcademyLabs();
  return labs.find((lab) => lab.slug === slug) ?? null;
}

export async function getAcademyRelationshipsForEntity(entityType: AcademyRelationship["entityType"], entitySlug: string) {
  const relationships = await getAcademyRelationships();
  return getRelationshipsForEntityHelper(relationships, entityType, entitySlug);
}
