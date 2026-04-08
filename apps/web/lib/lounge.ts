import { promises as fs } from "node:fs";
import path from "node:path";

export interface LoungeMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  type: "article" | "video" | "graphic" | string;
  tags: string[];
  image?: string;
}

export interface LoungeRecord extends LoungeMeta {
  body: string;
  sourcePath: string;
}

const LOUNGE_ROOT = path.resolve(process.cwd(), "content", "lounge_published");

function parseScalar(value: string) {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  // Handle arrays like: '["tag1", "tag2"]' or '[tag1, tag2]'
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      const inner = trimmed.slice(1, -1);
      return inner.split(",").map(s => {
          let sRaw = s.trim();
          if ((sRaw.startsWith('"') && sRaw.endsWith('"')) || (sRaw.startsWith("'") && sRaw.endsWith("'"))) {
              return sRaw.slice(1, -1);
          }
          return sRaw;
      }).filter(Boolean);
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

function toLoungeRecord(filePath: string, source: string): LoungeRecord {
  const { frontmatter, body } = splitFrontmatter(source);
  const parsed = parseFrontmatter(frontmatter);
  const fallbackSlug = path.basename(filePath, ".mdx");

  return {
    slug: String(parsed.slug ?? fallbackSlug),
    title: String(parsed.title ?? fallbackSlug),
    description: String(parsed.description ?? ""),
    date: String(parsed.date ?? new Date().toISOString().split('T')[0]),
    type: String(parsed.type ?? "article"),
    tags: Array.isArray(parsed.tags) ? parsed.tags : [],
    image: parsed.image ? String(parsed.image) : undefined,
    body,
    sourcePath: filePath,
  };
}

export async function getPublishedLoungeArticles() {
  try {
    // If the directory doesn't exist yet, return empty
    try {
        await fs.access(LOUNGE_ROOT);
    } catch {
        return [];
    }

    const files = await fs.readdir(LOUNGE_ROOT, { recursive: false });
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

    const records = await Promise.all(
      mdxFiles.map(async (fileName) => {
        const filePath = path.join(LOUNGE_ROOT, fileName);
        const source = await fs.readFile(filePath, "utf8");
        return toLoungeRecord(filePath, source);
      }),
    );

    // Sort by date newest first
    return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error fetching lounge articles:", error);
    return [] satisfies LoungeRecord[];
  }
}

export async function getLoungeArticle(slug: string) {
  const articles = await getPublishedLoungeArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}
