import { AssetCard } from "@/components/assets/AssetCard";
import { PathLessonListHydration } from "@/components/path/PathLessonListHydration";
import Link from "next/link";
import type { Metadata } from "next";
import { CheckoutButton } from "@/components/billing/CheckoutButton";
import { PathMasterySnapshot } from "@/components/path/PathMasterySnapshot";
import { getAcademyRelationships, getAcademyRuntimes } from "@/lib/academy-content";
import { getPathRuntimeLinks } from "@/lib/academy-recommendations";
import { getRecommendedAssetsForPath, toDownloadSurfaceAsset } from "@/lib/assets";
import { getCatalogPathBySlug } from "@/lib/catalog";
import {
  getDifficultyLabel,
  getFormatLabel,
  getPathAccessState,
  getPathExperienceMeta,
} from "@/lib/learning-experience";
import { getLessonsForPath } from "@/lib/mdx";
import { ensurePublishedCurriculumSynced } from "@/lib/supabase/curriculum-sync";
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

  if (viewer.user && viewer.supabaseContext) {
    await ensurePublishedCurriculumSynced();
  }

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

  const accessState = getPathAccessState(path, viewer);
  const experience = getPathExperienceMeta(path);

  if (accessState.isComingSoon) {
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

  if (accessState.requiresUpgrade) {
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
              <span>{getDifficultyLabel(experience.difficulty)}</span>
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
            <div className="mt-5 grid gap-3 text-sm">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Best for</div>
                <p className="mt-1 text-[var(--color-fg-muted)]">{experience.audience}</p>
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">You leave with</div>
                <ul className="mt-2 grid gap-2 text-[var(--color-fg-muted)]">
                  {experience.outcomes.map((outcome) => (
                    <li key={outcome}>• {outcome}</li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </main>
    );
  }

  const [lessons, academyRuntimes, academyRelationships] = await Promise.all([
    getLessonsForPath(pathSlug),
    getAcademyRuntimes(),
    getAcademyRelationships(),
  ]);
  const recommendedAssets = getRecommendedAssetsForPath(pathSlug)
    .slice(0, 3)
    .map((asset) => toDownloadSurfaceAsset(asset, viewer.profile?.tier ?? "free"));
  const relatedRuntimes = getPathRuntimeLinks({
    pathSlug,
    relationships: academyRelationships,
    runtimes: academyRuntimes,
  });
  const completedLessonSlugs = new Set<string>();
  let initialVerifiedCount = 0;

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
          .select("lesson_id, completion_data")
          .eq("user_id", viewer.user.id)
          .in("lesson_id", lessonIds);

        const lessonSlugById = new Map((dbLessons ?? []).map((lesson) => [lesson.id, lesson.slug]));
        for (const entry of progress ?? []) {
          const slug = lessonSlugById.get(entry.lesson_id);
          if (slug) {
            completedLessonSlugs.add(slug);
          }
          if (
            entry.completion_data &&
            typeof entry.completion_data === "object" &&
            typeof (entry.completion_data as Record<string, unknown>).masteryScore === "number"
          ) {
            initialVerifiedCount += 1;
          }
        }
      }
    }
  }

  const firstIncompleteLesson = lessons.find((lesson) => !completedLessonSlugs.has(lesson.slug)) ?? lessons[0] ?? null;

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
          <span>{getDifficultyLabel(experience.difficulty)}</span>
          <span>{getFormatLabel(experience.format)}</span>
          <span>{path.tier.toUpperCase()}</span>
          {path.lastReviewedAt ? <span>Reviewed {path.lastReviewedAt}</span> : null}
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="panel p-6">
          <div className="eyebrow">Path guidance</div>
          <h2 className="mt-3 text-2xl font-semibold">What this path is designed to do</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--color-fg-muted)]">{experience.audience}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">You will leave with</div>
              <ul className="mt-3 grid gap-2 text-sm text-[var(--color-fg-muted)]">
                {experience.outcomes.map((outcome) => (
                  <li key={outcome}>• {outcome}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Before you start</div>
              <ul className="mt-3 grid gap-2 text-sm text-[var(--color-fg-muted)]">
                {experience.prerequisites.map((prerequisite) => (
                  <li key={prerequisite}>• {prerequisite}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        <div className="grid gap-4">
          <aside className="panel p-6">
            <div className="text-sm font-semibold">Suggested next move</div>
            <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
              {firstIncompleteLesson
                ? `Continue with Lesson ${firstIncompleteLesson.lessonNumber}: ${firstIncompleteLesson.title}.`
                : "You have finished every lesson in this path. Review or move into the next applied path."}
            </p>
            <div className="mt-5 grid gap-3">
              {firstIncompleteLesson ? (
                <Link href={`/learn/${path.slug}/${firstIncompleteLesson.slug}`} className="button-primary">
                  Continue path
                </Link>
              ) : null}
              <Link href="/paths" className="button-secondary">
                Explore all paths
              </Link>
            </div>
          </aside>
          <PathMasterySnapshot
            initialVerifiedCount={initialVerifiedCount}
            lessonCount={lessons.length}
            pathSlug={path.slug}
          />
        </div>
      </section>

      {relatedRuntimes.length ? (
        <section className="mt-8 grid gap-4">
          <div>
            <div className="eyebrow">Runtime Guidance</div>
            <h2 className="mt-3 text-2xl font-semibold">This path connects directly to Runtime Lab</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--color-fg-muted)]">
              If you want help choosing the right runtime before or during this path, start with these related runtime profiles and compare them inside Runtime Lab.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {relatedRuntimes.map((runtime) => {
              const compareTarget = runtime.slug === "openclaw" ? "hermes-agent" : "openclaw";

              return (
                <article key={runtime.slug} className="panel p-5">
                  <div className="flex flex-wrap gap-2">
                    <span
                      className="badge"
                      data-tone={
                        runtime.supportTier === "stable"
                          ? "accent"
                          : runtime.supportTier === "emerging"
                            ? "warning"
                            : "danger"
                      }
                    >
                      {runtime.supportTier}
                    </span>
                    <span className="badge">Setup: {runtime.setupComplexity}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{runtime.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{runtime.summary}</p>
                  {runtime.note ? <p className="mt-3 text-sm leading-6">{runtime.note}</p> : null}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link href={`/runtime-lab/${runtime.slug}`} className="button-secondary">
                      View runtime
                    </Link>
                    <Link href={`/runtime-lab/compare?runtimes=${runtime.slug},${compareTarget}`} className="button-ghost">
                      Compare
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

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

      <section className="mt-8">
        <PathLessonListHydration
          lessons={lessons.map((lesson) => ({
            description: lesson.description,
            estimatedMinutes: lesson.estimatedMinutes,
            lessonNumber: lesson.lessonNumber,
            slug: lesson.slug,
            title: lesson.title,
          }))}
          pathSlug={path.slug}
          serverCompletedSlugs={Array.from(completedLessonSlugs)}
          userId={viewer.user?.id ?? null}
        />
      </section>
    </main>
  );
}
