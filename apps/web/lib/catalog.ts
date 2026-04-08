import { createClient } from "@supabase/supabase-js";
import { cache } from "react";
import { getPublicSupabaseEnv } from "@/lib/env";
import { getLessonsForPath } from "@/lib/mdx";
import { PATHS, PATH_SECTIONS, type PathMeta, type PathStatus, type PathTier } from "@/lib/data/paths";

export { PATH_SECTIONS };

export interface CatalogPath extends PathMeta {
  availableLessonCount: number;
  lastReviewedAt: string | null;
  versionLabel: string | null;
}

export interface CatalogViewer {
  signedIn: boolean;
  tier: PathTier | null;
}

export interface CatalogPathCta {
  disabled?: boolean;
  href: string;
  kind: "learn" | "pricing" | "signup" | "waitlist";
  label: string;
}

type PublicPathRow = {
  estimated_hours: number | null;
  is_published: boolean;
  last_reviewed_at: string | null;
  slug: string;
  tier_required: string;
  version_label: string | null;
};

const getSupabasePublicPathRows = cache(async () => {
  const env = getPublicSupabaseEnv();

  if (!env) {
    return [] as PublicPathRow[];
  }

  const supabase = createClient(env.url, env.anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { data } = await supabase
    .from("paths")
    .select("slug, tier_required, is_published, version_label, last_reviewed_at, estimated_hours");

  return (data ?? []) as PublicPathRow[];
});

const getMdxLessonCounts = cache(async () => {
  const entries = await Promise.all(
    PATHS.map(async (path) => {
      const lessons = await getLessonsForPath(path.slug);
      return [path.slug, lessons.length] as const;
    }),
  );

  return new Map(entries);
});

export const getCatalogPaths = cache(async (): Promise<CatalogPath[]> => {
  const [dbRows, mdxLessonCounts] = await Promise.all([getSupabasePublicPathRows(), getMdxLessonCounts()]);
  const dbRowBySlug = new Map(dbRows.map((row) => [row.slug, row]));

  return PATHS.map((path) => {
    const dbRow = dbRowBySlug.get(path.slug);
    const availableLessonCount = mdxLessonCounts.get(path.slug) ?? 0;
    const status: PathStatus =
      path.status === "coming-soon"
        ? "coming-soon"
        : dbRow && !dbRow.is_published
          ? "coming-soon"
          : availableLessonCount > 0
            ? "available"
            : path.status;

    const estimatedHours =
      typeof dbRow?.estimated_hours === "number" && Number.isFinite(dbRow.estimated_hours)
        ? `${dbRow.estimated_hours} hours`
        : path.estimatedHours;

    return {
      ...path,
      availableLessonCount: availableLessonCount || path.lessonCount,
      estimatedHours,
      lastReviewedAt: dbRow?.last_reviewed_at ?? null,
      status,
      tier: (dbRow?.tier_required === "pro" ? "pro" : path.tier) as PathTier,
      versionLabel: dbRow?.version_label ?? null,
    };
  });
});

/** Only paths that are ready for learners — hides coming-soon stubs. */
export async function getPublishedCatalogPaths(): Promise<CatalogPath[]> {
  const paths = await getCatalogPaths();
  return paths.filter((path) => path.status === "available");
}

export async function getCatalogPathBySlug(slug: string) {
  const paths = await getCatalogPaths();
  return paths.find((path) => path.slug === slug) ?? null;
}

export async function getCatalogPathsBySection(section: string) {
  const paths = await getCatalogPaths();
  return paths.filter((path) => path.section === section && path.status === "available");
}

export function getPathCta(path: CatalogPath, viewer: CatalogViewer): CatalogPathCta {
  if (path.status !== "available") {
    return {
      href: viewer.signedIn ? "/pricing" : `/signup?next=${encodeURIComponent(`/paths/${path.slug}`)}`,
      kind: viewer.signedIn ? "pricing" : "waitlist",
      label: viewer.signedIn ? "See Pro roadmap" : "Get updates",
    };
  }

  if (path.tier === "pro" && viewer.tier !== "pro") {
    return {
      href: viewer.signedIn ? "/pricing" : `/signup?next=${encodeURIComponent(`/paths/${path.slug}`)}`,
      kind: viewer.signedIn ? "pricing" : "signup",
      label: viewer.signedIn ? "Unlock with Pro" : "Create account to unlock",
    };
  }

  if (!viewer.signedIn) {
    return {
      href: `/signup?next=${encodeURIComponent(`/learn/${path.slug}`)}`,
      kind: "signup",
      label: path.tier === "free" ? "Start free path" : "Create account",
    };
  }

  return {
    href: `/learn/${path.slug}`,
    kind: "learn",
    label: path.tier === "pro" ? "Open Pro path" : "Open learner view",
  };
}
