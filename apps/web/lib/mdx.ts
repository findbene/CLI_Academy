import { promises as fs } from "node:fs";
import path from "node:path";

export interface LessonMeta {
  slug: string;
  title: string;
  description: string;
  lessonNumber: number;
  chapterNumber: number;
  pathNumber: number;
  estimatedMinutes: number;
  tierRequired: string;
  lastReviewedAt: string;
  hasSafetyWarning: boolean;
  tutorPreload?: string;
  modeBalance?: string;
  verifyType?: string;
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

function toLessonRecord(filePath: string, source: string): LessonRecord {
  const { frontmatter, body } = splitFrontmatter(source);
  const parsed = parseFrontmatter(frontmatter);
  const fallbackSlug = path.basename(filePath, ".mdx");

  return {
    slug: String(parsed.slug ?? fallbackSlug),
    title: String(parsed.title ?? fallbackSlug),
    description: String(parsed.description ?? ""),
    lessonNumber: Number(parsed.lessonNumber ?? parsed.lesson_number ?? 999),
    chapterNumber: Number(parsed.chapterNumber ?? 999),
    pathNumber: Number(parsed.pathNumber ?? 999),
    estimatedMinutes: Number(parsed.estimated_minutes ?? 10),
    tierRequired: String(parsed.tier_required ?? "free"),
    lastReviewedAt: String(parsed.last_reviewed_at ?? "unknown"),
    hasSafetyWarning: Boolean(parsed.has_safety_warning ?? false),
    tutorPreload: parsed.tutorPreload ? String(parsed.tutorPreload) : undefined,
    modeBalance: parsed.modeBalance ? String(parsed.modeBalance) : undefined,
    verifyType: parsed.verifyType ? String(parsed.verifyType) : undefined,
    body,
    sourcePath: filePath,
  };
}

export async function getLessonsForPath(pathSlug: string) {
  const directory = path.join(CONTENT_ROOT, pathSlug);

  try {
    const files = await fs.readdir(directory, { recursive: true });
    // files could be nested like "chapter-1/lesson.mdx"
    // we convert them to full paths before working heavily
    const lessonFiles = typeof files[0] === 'string' 
      ? files.filter((file) => file.endsWith(".mdx"))
      // If the node type varies, falling back to string mapping just in case
      : files.map(f => String(f)).filter(file => file.endsWith(".mdx"));

    const records = await Promise.all(
      lessonFiles.map(async (fileName) => {
        const filePath = path.join(directory, fileName);
        const source = await fs.readFile(filePath, "utf8");
        return toLessonRecord(filePath, source);
      }),
    );

    return records.sort((a, b) => a.lessonNumber - b.lessonNumber);
  } catch {
    return [] satisfies LessonRecord[];
  }
}

export async function getLesson(pathSlug: string, lessonSlug: string) {
  const lessons = await getLessonsForPath(pathSlug);
  return lessons.find((lesson) => lesson.slug === lessonSlug) ?? null;
}
