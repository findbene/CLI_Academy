import { promises as fs } from "node:fs";
import path from "node:path";

export interface LessonMeta {
  slug: string;
  title: string;
  description: string;
  lessonNumber: string;
  lessonSortOrder: number;
  chapterNumber: string;
  pathNumber: string;
  estimatedMinutes: number;
  tierRequired: string;
  lastReviewedAt: string;
  hasSafetyWarning: boolean;
  tutorPreload?: string;
  modeBalance?: string;
  verifyType?: string;
  groupId?: string;
  clawClassification?: string;
  prerequisiteLesson?: string;
}

export interface LessonRecord extends LessonMeta {
  body: string;
  sourcePath: string;
}

const CONTENT_ROOT = path.resolve(process.cwd(), "..", "..", "content", "paths");

function parseScalar(value: string) {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  if (trimmed === "true") {
    return true;
  }

  if (trimmed === "false") {
    return false;
  }

  if (/^\d+$/.test(trimmed)) {
    return Number.parseInt(trimmed, 10);
  }

  return trimmed;
}

function splitFrontmatter(source: string) {
  if (!source.startsWith("---")) {
    return { frontmatter: "", body: source };
  }

  const endIndex = source.indexOf("\n---", 3);
  if (endIndex === -1) {
    return { frontmatter: "", body: source };
  }

  const frontmatter = source.slice(4, endIndex).trim();
  const body = source.slice(endIndex + 4).trim();
  return { frontmatter, body };
}

function parseFrontmatter(frontmatter: string) {
  const parsed: Record<string, unknown> = {};

  for (const line of frontmatter.split(/\r?\n/)) {
    if (!line.trim() || line.startsWith("  ") || line.startsWith("- ")) {
      continue;
    }

    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;
    parsed[key] = parseScalar(rawValue);
  }

  return parsed;
}

function extractLessonSegments(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return [value];
  }

  if (typeof value !== "string") {
    return null;
  }

  const segments = value.match(/\d+/g)?.map((segment) => Number.parseInt(segment, 10));
  return segments?.length ? segments : null;
}

function getLessonOrdering(input: { fallbackSlug: string; parsed: Record<string, unknown> }) {
  const slugSource = String(input.parsed.slug ?? input.fallbackSlug);
  const slugMatch = slugSource.match(/^lesson-(\d+)-(\d+)-(\d+)-/);

  const lessonSegments =
    extractLessonSegments(input.parsed.lessonNumber ?? input.parsed.lesson_number) ??
    (slugMatch
      ? [
          Number.parseInt(slugMatch[1], 10),
          Number.parseInt(slugMatch[2], 10),
          Number.parseInt(slugMatch[3], 10),
        ]
      : null) ??
    [999, 999, 999];

  const pathSegments =
    extractLessonSegments(input.parsed.pathNumber ?? input.parsed.path_number) ??
    (lessonSegments.length >= 1 ? [lessonSegments[0]] : null) ??
    [999];

  const chapterSegments =
    extractLessonSegments(input.parsed.chapterNumber ?? input.parsed.chapter_number) ??
    (lessonSegments.length >= 2 ? [lessonSegments[0], lessonSegments[1]] : null) ??
    [999, 999];

  const [pathNumber = 999, chapterNumber = 999, lessonNumber = 999] = lessonSegments;

  return {
    chapterNumberLabel: chapterSegments.join("."),
    lessonNumberLabel: lessonSegments.join("."),
    lessonSortOrder: pathNumber * 10000 + chapterNumber * 100 + lessonNumber,
    pathNumberLabel: pathSegments.join("."),
  };
}

function toLessonRecord(filePath: string, source: string): LessonRecord {
  const { frontmatter, body } = splitFrontmatter(source);
  const parsed = parseFrontmatter(frontmatter);
  const fallbackSlug = path.basename(filePath, ".mdx");
  const ordering = getLessonOrdering({ fallbackSlug, parsed });

  return {
    slug: String(parsed.slug ?? fallbackSlug),
    title: String(parsed.title ?? fallbackSlug),
    description: String(parsed.description ?? ""),
    lessonNumber: ordering.lessonNumberLabel,
    lessonSortOrder: ordering.lessonSortOrder,
    chapterNumber: ordering.chapterNumberLabel,
    pathNumber: ordering.pathNumberLabel,
    estimatedMinutes: Number(parsed.estimated_minutes ?? 10),
    tierRequired: String(parsed.tier_required ?? "free"),
    lastReviewedAt: String(parsed.last_reviewed_at ?? "unknown"),
    hasSafetyWarning: Boolean(parsed.has_safety_warning ?? false),
    tutorPreload: parsed.tutorPreload ? String(parsed.tutorPreload) : undefined,
    modeBalance: parsed.modeBalance ? String(parsed.modeBalance) : undefined,
    verifyType: parsed.verifyType ? String(parsed.verifyType) : undefined,
    groupId: parsed.groupId ? String(parsed.groupId) : undefined,
    clawClassification: parsed.clawClassification ? String(parsed.clawClassification) : undefined,
    prerequisiteLesson: parsed.prerequisiteLesson ? String(parsed.prerequisiteLesson) : undefined,
    body,
    sourcePath: filePath,
  };
}

export async function getLessonsForPath(pathSlug: string) {
  const directory = path.join(CONTENT_ROOT, pathSlug);

  try {
    const files = await fs.readdir(directory, { recursive: true });
    const lessonFilePattern = /(^|[\\/])lesson-\d+-\d+-\d+-.*\.mdx$/;
    const nestedFiles = Array.isArray(files) ? files.map((entry) => String(entry)) : [];
    const lessonFiles = nestedFiles.filter((file) => lessonFilePattern.test(file));

    const records = await Promise.all(
      lessonFiles.map(async (fileName) => {
        const filePath = path.join(directory, fileName);
        const source = await fs.readFile(filePath, "utf8");
        return toLessonRecord(filePath, source);
      }),
    );

    return records.sort((a, b) => a.lessonSortOrder - b.lessonSortOrder || a.sourcePath.localeCompare(b.sourcePath));
  } catch {
    return [] satisfies LessonRecord[];
  }
}

export async function getLesson(pathSlug: string, lessonSlug: string) {
  const lessons = await getLessonsForPath(pathSlug);
  return lessons.find((lesson) => lesson.slug === lessonSlug) ?? null;
}
