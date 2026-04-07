import { AssetCard } from "@/components/assets/AssetCard";
import Link from "next/link";
import type { Metadata } from "next";
import { CheckoutButton } from "@/components/billing/CheckoutButton";
import { getRecommendedAssetsForPath, toDownloadSurfaceAsset } from "@/lib/assets";
import { getCatalogPathBySlug } from "@/lib/catalog";
import { getLessonsForPath } from "@/lib/mdx";
import { getServerViewer } from "@/lib/viewer";

interface LearnPathPageProps {
  params: Promise<{ pathSlug: string }>;
}

export async function generateMetadata({ params }: LearnPathPageProps): Promise<Metadata> {
  const { pathSlug } = await params;
  const path = await getCatalogPathBySlug(pathSlug);

  if (!path) {
    return { title: "Path not found | CLI Academy" };
  }

  return {
    title: `Learn: ${path.title} | CLI Academy`,
    description: path.summary,
    openGraph: {
      title: `Learn: ${path.title} | CLI Academy`,
      description: path.summary,
      type: "website",
    },
  };
}

export default async function LearnPathPage({ params }: LearnPathPageProps) {
  const { pathSlug } = await params;
  const [path, viewer] = await Promise.all([getCatalogPathBySlug(pathSlug), getServerViewer()]);

  if (!path) {
    return (
      <main className="page-shell">
        <div className="panel p-6">
          <h1 className="text-3xl font-semibold">Path not found</h1>
          <p className="mt-3 text-[var(--color-fg-muted)]">
            This path could not be found in the catalog. It may have been moved or renamed.
          </p>
        </div>
      </main>
    );
  }

  if (path.status !== "available") {
    return (
      <main className="page-shell">
        <div className="panel p-6">
          <h1 className="text-3xl font-semibold">{path.title}</h1>
          <p className="mt-3 max-w-3xl text-[var(--color-fg-muted)]">
            This path is coming soon. Content is being finalized to meet our quality and trust standards.
          </p>
          <div className="mt-6">
            <Link href={`/paths/${path.slug}`} className="button-secondary">
              Back to path detail
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (path.tier === "pro" && viewer.profile?.tier !== "pro") {
    return (
      <main className="page-shell">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="panel p-6">
            <div className="eyebrow">Pro path</div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">{path.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-fg-muted)]">
              This path is part of the Pro library. The overview is public, but the learner route is reserved for Pro members because it includes deeper labs, downloads, and guided implementation material.
            </p>
            <div className="metadata-bar mt-5">
              <span>{path.availableLessonCount} lessons</span>
              <span>{path.estimatedHours}</span>
              {path.versionLabel ? <span>{path.versionLabel}</span> : null}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <CheckoutButton label="Unlock this path with Pro" />
              <Link href={`/paths/${path.slug}`} className="button-secondary">
                Back to path detail
              </Link>
            </div>
          </section>

          <aside className="panel p-6">
            <div className="text-sm font-semibold">Why it is gated</div>
            <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
              Pro paths are where CLI Academy gets deeper into automation, infrastructure, specialist tracks, and operational downloads. Free stays generous, but this layer is where the paid product starts.
            </p>
          </aside>
        </div>
      </main>
    );
  }

  const lessons = await getLessonsForPath(pathSlug);
  const recommendedAssets = getRecommendedAssetsForPath(pathSlug)
    .slice(0, 3)
    .map((asset) => toDownloadSurfaceAsset(asset, viewer.profile?.tier ?? "free"));
  const completedLessonSlugs = new Set<string>();

  if (viewer.supabaseConfigured && viewer.user && viewer.supabaseContext) {
    const { data: dbPath } = await viewer.supabaseContext.supabase
      .from("paths")
      .select("id")
      .eq("slug", pathSlug)
      .maybeSingle();

    if (dbPath) {
      const { data: dbLessons } = await viewer.supabaseContext.supabase
        .from("lessons")
        .select("id, slug")
        .eq("path_id", dbPath.id);

      const lessonIds = (dbLessons ?? []).map((lesson) => lesson.id);
      if (lessonIds.length) {
        const { data: progress } = await viewer.supabaseContext.supabase
          .from("lesson_progress")
          .select("lesson_id")
          .eq("user_id", viewer.user.id)
          .in("lesson_id", lessonIds);

        const lessonSlugById = new Map((dbLessons ?? []).map((lesson) => [lesson.id, lesson.slug]));
        for (const entry of progress ?? []) {
          const slug = lessonSlugById.get(entry.lesson_id);
          if (slug) {
            completedLessonSlugs.add(slug);
          }
        }
      }
    }
  }

  return (
    <main className="page-shell">
      <section className="panel p-6">
        <div className="eyebrow">Learner path</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">{path.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-fg-muted)]">{path.summary}</p>
        <div className="metadata-bar mt-4">
          <span>{lessons.length} lessons</span>
          <span>{completedLessonSlugs.size} completed</span>
          <span>{path.estimatedHours}</span>
          <span>{path.tier.toUpperCase()}</span>
          {path.lastReviewedAt ? <span>Reviewed {path.lastReviewedAt}</span> : null}
        </div>
      </section>

      {recommendedAssets.length ? (
        <section className="mt-8 grid gap-4">
          <div>
            <div className="eyebrow">Starter downloads</div>
            <h2 className="mt-3 text-2xl font-semibold">Use these while you work through the path</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {recommendedAssets.map((asset) => (
              <AssetCard key={asset.slug} asset={asset} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-8 grid gap-4">
        {lessons.map((lesson) => (
          <article key={lesson.slug} className="panel flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm text-[var(--color-fg-muted)]">
                Lesson {lesson.lessonNumber} · {lesson.estimatedMinutes} min
              </div>
              <h2 className="mt-1 text-xl font-semibold">{lesson.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{lesson.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {completedLessonSlugs.has(lesson.slug) ? (
                  <span className="badge" data-tone="accent">
                    Completed
                  </span>
                ) : (
                  <span className="badge">Next up</span>
                )}
              </div>
            </div>
            <Link href={`/learn/${path.slug}/${lesson.slug}`} className="button-primary">
              {completedLessonSlugs.has(lesson.slug) ? "Review lesson" : "Open lesson"}
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
