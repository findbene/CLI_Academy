import { NextResponse } from "next/server";
import { PATHS } from "@/lib/data/paths";
import { getLessonsForPath } from "@/lib/mdx";

export interface SearchEntry {
  type: "path" | "lesson";
  title: string;
  description: string;
  href: string;
  section?: string;
  tier: string;
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
    entries.push({
      type: "path",
      title: p.title,
      description: p.summary,
      href: `/paths/${p.slug}`,
      section: p.section,
      tier: p.tier,
    });

    const lessons = await getLessonsForPath(p.slug);
    for (const l of lessons) {
      entries.push({
        type: "lesson",
        title: l.title,
        description: l.description,
        href: `/paths/${p.slug}/lessons/${l.slug}`,
        tier: l.tierRequired,
        pathTitle: p.title,
      });
    }
  }

  cached = { entries, ts: Date.now() };
  return NextResponse.json(entries);
}
