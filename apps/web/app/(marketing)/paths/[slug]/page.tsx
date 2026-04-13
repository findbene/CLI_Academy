import { AssetCard } from "@/components/assets/AssetCard";
import Link from "next/link";
import type { Metadata } from "next";
import { getRecommendedAssetsForPath, toDownloadSurfaceAsset } from "@/lib/assets";
import { getCatalogPathBySlug, getPathCta } from "@/lib/catalog";
import { getDifficultyLabel, getFormatLabel, getPathExperienceMeta } from "@/lib/learning-experience";
import { getLessonsForPath } from "@/lib/mdx";
import { getFreshnessState } from "@/lib/support";
import { getServerViewer } from "@/lib/viewer";

interface PathDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PathDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = await getCatalogPathBySlug(slug);

  if (!path) {
    return { title: "Path not found | CLI Academy" };
  }

  return {
    title: `${path.title} | CLI Academy`,
    description: path.summary,
    openGraph: {
      title: `${path.title} | CLI Academy`,
      description: path.summary,
      type: "website",
    },
  };
}

export default async function PathDetailPage({ params }: PathDetailPageProps) {
  const { slug } = await params;
  const [path, viewer] = await Promise.all([getCatalogPathBySlug(slug), getServerViewer()]);

  if (!path) {
    return (
      <main className="page-shell">
        <div className="panel p-6">
          <h1 className="text-3xl font-semibold">Path not found</h1>
          <p className="mt-3 text-[var(--color-fg-muted)]">
            This path could not be found. It may have been moved or is no longer available.
          </p>
        </div>
      </main>
    );
  }

  const lessons = path.status === "available" ? await getLessonsForPath(path.slug) : [];
  const cta = getPathCta(path, { signedIn: Boolean(viewer.user), tier: viewer.profile?.tier ?? null });
  const recommendedAssets = getRecommendedAssetsForPath(path.slug)
    .slice(0, 2)
    .map((asset) => toDownloadSurfaceAsset(asset, viewer.profile?.tier ?? "free"));
  const experience = getPathExperienceMeta(path);
  const freshness = getFreshnessState(path.lastReviewedAt);

  return (
    <main className="page-shell">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="panel p-6">
          <div className="flex flex-wrap gap-2">
            <span className="badge" data-tone={path.tier === "free" ? "accent" : "warning"}>
              {path.tier.toUpperCase()}
            </span>
            <span className="badge" data-tone={path.status === "available" ? "accent" : "warning"}>
              {path.status === "available" ? "Available" : "Coming soon"}
            </span>
            <span className="badge">{getDifficultyLabel(experience.difficulty)}</span>
            <span className="badge">{getFormatLabel(experience.format)}</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{path.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-fg-muted)]">{path.summary}</p>
          <div className="metadata-bar mt-5">
            <span>{path.section}</span>
            <span>{path.availableLessonCount} lessons</span>
            <span>{path.estimatedHours}</span>
            {path.lastReviewedAt ? <span>Reviewed {path.lastReviewedAt}</span> : null}
            {path.versionLabel ? <span>{path.versionLabel}</span> : null}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={cta.href} className="button-primary">
              {cta.label}
            </Link>
            <Link href="/paths" className="button-secondary">
              Back to catalog
            </Link>
          </div>
        </div>

        <aside className="panel p-6">
          <div className="text-sm font-semibold">Path guidance</div>
          <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
            Best for: {experience.audience}
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
            Paths marked coming soon may already have draft content, but they stay gated until the lessons meet our quality and trust standards.
          </p>
          <div className="mt-4 rounded-[var(--radius-xl)] bg-[var(--color-bg-panel-subtle)] px-4 py-4 text-sm text-[var(--color-fg-muted)]">
            Freshness: <span className="font-medium text-[var(--color-fg-default)]">{freshness === "fresh" ? "Fresh" : freshness === "review-due" ? "Review due" : "Stale"}</span>
          </div>
          {path.tier === "pro" ? (
            <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
              This is a Pro path. Free learners can browse the overview, then upgrade when they are ready for deeper material.
            </p>
          ) : null}
          <div className="mt-4">
            <div className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">You will leave with</div>
            <div className="mt-2 grid gap-2 text-sm text-[var(--color-fg-muted)]">
              {experience.outcomes.map((outcome) => (
                <div key={outcome}>• {outcome}</div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {recommendedAssets.length ? (
        <section className="mt-10 grid gap-4">
          <h2 className="text-2xl font-semibold">Included starter assets</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {recommendedAssets.map((asset) => (
              <AssetCard key={asset.slug} asset={asset} />
            ))}
          </div>
        </section>
      ) : null}

      {lessons.length > 0 ? (
        <section className="mt-10 grid gap-4">
          <h2 className="text-2xl font-semibold">Lessons</h2>
          {lessons.map((lesson) => (
            <article key={lesson.slug} className="panel flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm text-[var(--color-fg-muted)]">Lesson {lesson.lessonNumber}</div>
                <h3 className="mt-1 text-lg font-semibold">{lesson.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{lesson.description}</p>
              </div>
              <Link href={`/learn/${path.slug}/${lesson.slug}`} className="button-secondary">
                Open lesson
              </Link>
            </article>
          ))}
        </section>
      ) : null}
    </main>
  );
}
