import { createHash } from "node:crypto";
import { PATHS, type PathMeta } from "@/lib/data/paths";
import { getLessonsForPath, type LessonRecord } from "@/lib/mdx";
import { getSupabaseServiceClient } from "@/lib/supabase/service";

type PathDifficulty = "advanced" | "beginner" | "intermediate";

const SYNC_TTL_MS = 5 * 60 * 1000;

let inFlightSync: Promise<boolean> | null = null;
let lastSuccessfulSyncAt = 0;

function deterministicUuid(input: string) {
  const hash = createHash("sha1").update(input).digest("hex");
  const variantNibble = ((Number.parseInt(hash.slice(16, 17), 16) & 0x3) | 0x8).toString(16);

  return [
    hash.slice(0, 8),
    hash.slice(8, 12),
    `5${hash.slice(13, 16)}`,
    `${variantNibble}${hash.slice(17, 20)}`,
    hash.slice(20, 32),
  ].join("-");
}

function inferDifficulty(path: PathMeta): PathDifficulty {
  switch (path.section) {
    case "Self-Hosting":
    case "Professional Tracks":
      return "advanced";
    case "Agent Infrastructure":
    case "OpenClaw Ecosystem":
      return "intermediate";
    default:
      return path.tier === "free" ? "beginner" : "intermediate";
  }
}

function normalizeReviewDate(reviewDate: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(reviewDate)) {
    return reviewDate;
  }

  return null;
}

function parseEstimatedHours(value: string) {
  const matches = [...value.matchAll(/\d+(?:\.\d+)?/g)].map((match) => Number.parseFloat(match[0]));

  if (matches.length === 0) {
    return 0;
  }

  if (matches.length === 1) {
    return matches[0];
  }

  const total = matches.reduce((sum, current) => sum + current, 0);
  return Math.round((total / matches.length) * 10) / 10;
}

function buildLessonRow(input: {
  existingLessonIdByKey: Map<string, string>;
  lesson: LessonRecord;
  moduleId: string;
  pathId: string;
  pathSlug: string;
}) {
  const lessonIdKey = `${input.pathId}::${input.lesson.slug}`;

  return {
    description: input.lesson.description,
    estimated_minutes: input.lesson.estimatedMinutes,
    has_safety_warning: input.lesson.hasSafetyWarning,
    id:
      input.existingLessonIdByKey.get(lessonIdKey) ??
      deterministicUuid(`lesson:${input.pathSlug}:${input.lesson.slug}`),
    is_deprecated: false,
    is_published: true,
    last_reviewed_at: normalizeReviewDate(input.lesson.lastReviewedAt),
    module_id: input.moduleId,
    path_id: input.pathId,
    reviewed_by: null,
    slug: input.lesson.slug,
    sort_order: input.lesson.lessonSortOrder,
    supported_tool_versions: {},
    supersedes_lesson_id: null,
    tier_required: input.lesson.tierRequired === "pro" ? "pro" : "free",
    title: input.lesson.title,
    version_label: "",
  };
}

async function loadLiveCurriculum() {
  return Promise.all(
    PATHS.map(async (path, index) => ({
      lessons: await getLessonsForPath(path.slug),
      path,
      sortOrder: index + 1,
    })),
  );
}

async function syncCurriculum() {
  const supabase = getSupabaseServiceClient();

  if (!supabase) {
    return false;
  }

  const curriculum = await loadLiveCurriculum();
  const pathSlugs = curriculum.map((entry) => entry.path.slug);

  const { data: existingPaths, error: existingPathsError } = await supabase
    .from("paths")
    .select("id, slug")
    .in("slug", pathSlugs);

  if (existingPathsError) {
    throw existingPathsError;
  }

  const existingPathIdBySlug = new Map((existingPaths ?? []).map((entry) => [entry.slug, entry.id]));

  const pathRows = curriculum.map(({ path, sortOrder }) => ({
    category: path.section,
    description: path.summary,
    difficulty: inferDifficulty(path),
    estimated_hours: parseEstimatedHours(path.estimatedHours),
    id: existingPathIdBySlug.get(path.slug) ?? deterministicUuid(`path:${path.slug}`),
    is_deprecated: false,
    is_published: path.status === "available",
    last_reviewed_at: null,
    slug: path.slug,
    sort_order: sortOrder,
    supported_tool_versions: {},
    tier_required: path.tier,
    title: path.title,
    version_label: "",
  }));

  const { error: upsertPathsError } = await supabase.from("paths").upsert(pathRows, { onConflict: "slug" });

  if (upsertPathsError) {
    throw upsertPathsError;
  }

  const { data: syncedPaths, error: syncedPathsError } = await supabase
    .from("paths")
    .select("id, slug")
    .in("slug", pathSlugs);

  if (syncedPathsError) {
    throw syncedPathsError;
  }

  const pathIdBySlug = new Map((syncedPaths ?? []).map((entry) => [entry.slug, entry.id]));
  const pathIds = [...pathIdBySlug.values()];

  if (!pathIds.length) {
    return true;
  }

  const { data: existingModules, error: existingModulesError } = await supabase
    .from("modules")
    .select("id, path_id, sort_order")
    .in("path_id", pathIds)
    .order("sort_order", { ascending: true });

  if (existingModulesError) {
    throw existingModulesError;
  }

  const moduleIdByPathId = new Map<string, string>();
  for (const moduleRow of existingModules ?? []) {
    if (!moduleIdByPathId.has(moduleRow.path_id)) {
      moduleIdByPathId.set(moduleRow.path_id, moduleRow.id);
    }
  }

  const moduleRows = curriculum
    .map(({ path }) => {
      const pathId = pathIdBySlug.get(path.slug);
      if (!pathId) {
        return null;
      }

      return {
        id: moduleIdByPathId.get(pathId) ?? deterministicUuid(`module:${path.slug}`),
        is_published: path.status === "available",
        path_id: pathId,
        sort_order: 1,
        title: path.title,
      };
    })
    .filter((row): row is { id: string; is_published: boolean; path_id: string; sort_order: number; title: string } => Boolean(row));

  if (moduleRows.length) {
    const { error: upsertModulesError } = await supabase
      .from("modules")
      .upsert(moduleRows, { onConflict: "id" });

    if (upsertModulesError) {
      throw upsertModulesError;
    }
  }

  for (const moduleRow of moduleRows) {
    moduleIdByPathId.set(moduleRow.path_id, moduleRow.id);
  }

  const { data: existingLessons, error: existingLessonsError } = await supabase
    .from("lessons")
    .select("id, path_id, slug")
    .in("path_id", pathIds);

  if (existingLessonsError) {
    throw existingLessonsError;
  }

  const existingLessonIdByKey = new Map(
    (existingLessons ?? []).map((entry) => [`${entry.path_id}::${entry.slug}`, entry.id]),
  );

  const lessonRows = curriculum.flatMap(({ lessons, path }) => {
    const pathId = pathIdBySlug.get(path.slug);
    const moduleId = pathId ? moduleIdByPathId.get(pathId) : null;

    if (!pathId || !moduleId) {
      return [];
    }

    return lessons.map((lesson) =>
      buildLessonRow({
        existingLessonIdByKey,
        lesson,
        moduleId,
        pathId,
        pathSlug: path.slug,
      }),
    );
  });

  if (lessonRows.length) {
    const { error: upsertLessonsError } = await supabase
      .from("lessons")
      .upsert(lessonRows, { onConflict: "path_id,slug" });

    if (upsertLessonsError) {
      throw upsertLessonsError;
    }
  }

  return true;
}

export async function ensurePublishedCurriculumSynced() {
  const now = Date.now();

  if (lastSuccessfulSyncAt && now - lastSuccessfulSyncAt < SYNC_TTL_MS) {
    return true;
  }

  if (inFlightSync) {
    return inFlightSync;
  }

  inFlightSync = syncCurriculum()
    .then((result) => {
      if (result) {
        lastSuccessfulSyncAt = Date.now();
      }

      return result;
    })
    .catch((error) => {
      console.error("[curriculum-sync] Could not sync published curriculum.", error);
      return false;
    })
    .finally(() => {
      inFlightSync = null;
    });

  return inFlightSync;
}