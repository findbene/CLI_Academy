import { NextResponse } from "next/server";
import { PATHS } from "@/lib/data/paths";
import { getDifficultyLabel, getFormatLabel, getPathExperienceMeta } from "@/lib/learning-experience";
import { getLessonsForPath } from "@/lib/mdx";

export interface SearchEntry {
  type: "path" | "lesson";
  title: string;
  description: string;
  href: string;
  audience?: string;
  difficulty?: string;
  estimatedHours?: string;
  format?: string;
  keywords?: string[];
  lessonCount?: number;
  lessonNumber?: string;
  metadata?: string[];
  section?: string;
  tier: string;
  pathSlug?: string;
  pathTitle?: string;
}

let cached: { entries: SearchEntry[]; ts: number } | null = null;
const TTL = 60_000; // 1 minute

export async function GET() {
  if (cached && Date.now() - cached.ts < TTL) {
    return NextResponse.json(cached.entries);
  }

  const entries: SearchEntry[] = [];

  for (const p of PATHS) {
    const experience = getPathExperienceMeta(p);

    entries.push({
      type: "path",
      title: p.title,
      description: p.summary,
      audience: experience.audience,
      difficulty: getDifficultyLabel(experience.difficulty),
      estimatedHours: p.estimatedHours,
      format: getFormatLabel(experience.format),
      href: `/paths/${p.slug}`,
      keywords: experience.outcomes,
      lessonCount: p.lessonCount,
      metadata: [p.section, p.tier.toUpperCase(), getDifficultyLabel(experience.difficulty), getFormatLabel(experience.format)],
      section: p.section,
      tier: p.tier,
      pathSlug: p.slug,
    });

    const lessons = await getLessonsForPath(p.slug);
    for (const l of lessons) {
      entries.push({
        type: "lesson",
        title: l.title,
        description: l.description,
        href: `/learn/${p.slug}/${l.slug}`,
        keywords: [l.lessonNumber, l.chapterNumber, l.pathNumber, l.verifyType ?? "", l.modeBalance ?? ""].filter(Boolean),
        lessonNumber: l.lessonNumber,
        metadata: [p.section, l.lessonNumber, `${l.estimatedMinutes} min`].filter(Boolean),
        tier: l.tierRequired,
        pathSlug: p.slug,
        pathTitle: p.title,
      });
    }
  }

  cached = { entries, ts: Date.now() };
  return NextResponse.json(entries);
}
