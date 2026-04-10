import { AssetCard } from "@/components/assets/AssetCard";
import { AcademyStandardsPanel } from "@/components/academy/AcademyStandardsPanel";
import { SpineProjectProgress } from "@/components/academy/SpineProjectProgress";
import Link from "next/link";
import type { Metadata } from "next";
import { CheckoutButton } from "@/components/billing/CheckoutButton";
import { getRecommendedAssetsForPath, toDownloadSurfaceAsset } from "@/lib/assets";
import { getCatalogPathBySlug } from "@/lib/catalog";
import { getPathBlueprint } from "@/lib/data/academy";
import { getLessonsForPath } from "@/lib/mdx";
import { ensurePublishedCurriculumSynced } from "@/lib/supabase/curriculum-sync";
import { getServerViewer } from "@/lib/viewer";
import { CHAPTER_MEDIA_REQUIREMENTS } from "@/lib/academy";

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
  const blueprint = getPathBlueprint(pathSlug);
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

  const studioHref =
    blueprint?.studioFocus === "Setup Academy"
      ? "/setup-academy"
      : blueprint?.studioFocus === "Runtime Lab"
        ? "/runtime-lab"
        : blueprint?.studioFocus === "Workflow Studio"
          ? "/workflow-studio"
          : blueprint?.studioFocus === "Prompt & Context Studio"
            ? "/prompt-context-studio"
            : blueprint?.studioFocus === "Asset Vault"
              ? "/asset-vault"
              : blueprint?.studioFocus === "Progress & Portfolio"
                ? "/prompt-doctor"
                : "/learn";

  const milestoneBadge =
    blueprint?.studioFocus === "Setup Academy"
      ? "Setup Master"
      : blueprint?.studioFocus === "Prompt & Context Studio"
        ? "Prompt Architect"
        : blueprint?.studioFocus === "Runtime Lab"
          ? "Runtime Ranger"
          : blueprint?.studioFocus === "Progress & Portfolio"
            ? "Agentic Workforce Architect"
            : "Fast Path Milestone";

  return (
    <main className="page-shell">
      <section className="panel p-6">
        <div className="eyebrow">Learner path</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">{path.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-fg-muted)]">{path.summary}</p>
        <div className="metadata-bar mt-4">
          {blueprint?.fastPathWeek ? <span>Week {blueprint.fastPathWeek} of the fast path</span> : null}
          <span>{lessons.length} lessons</span>
          <span>{completedLessonSlugs.size} completed</span>
          <span>{path.estimatedHours}</span>
          <span>{path.tier.toUpperCase()}</span>
          {path.lastReviewedAt ? <span>Reviewed {path.lastReviewedAt}</span> : null}
        </div>
        {blueprint ? (
          <div className="mt-5 rounded-[var(--radius-xl)] bg-[var(--color-bg-panel-subtle)] px-4 py-4">
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">
              Spine project contribution
            </div>
            <div className="mt-2 text-sm text-[var(--color-fg-default)]">{blueprint.spineOutcome}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="badge" data-tone="warning">{milestoneBadge}</span>
              <span className="badge">{blueprint.studioFocus}</span>
            </div>
          </div>
        ) : null}
      </section>

      {blueprint?.fastPathWeek ? <SpineProjectProgress activeWeek={blueprint.fastPathWeek} /> : null}

      {blueprint ? (
        <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_0.95fr]">
          <article className="panel p-5">
            <div className="eyebrow">Path framing</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">This path is part of a bigger academy system</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
              You are not just opening a standalone path. This lesson set contributes to the Personal AI Workforce
              spine project and is supported by one main studio surface plus a matching asset bundle.
            </p>
            <div className="mt-4 grid gap-2 text-sm">
              <div><span className="font-semibold text-[var(--color-fg-default)]">Studio focus:</span> {blueprint.studioFocus}</div>
              <div><span className="font-semibold text-[var(--color-fg-default)]">Best learning mode arc:</span> Guided to Hint-Based to Independent</div>
              <div><span className="font-semibold text-[var(--color-fg-default)]">Lesson support:</span> demo preview, worked steps, troubleshooting, and downloadable packs</div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={studioHref} className="button-secondary">
                Open {blueprint.studioFocus}
              </Link>
              <Link href="/asset-vault" className="button-ghost">
                Open Asset Vault
              </Link>
            </div>
          </article>

          <article className="panel p-5">
            <div className="eyebrow">Chapter standard</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">Every chapter is expected to stay multi-modal</h2>
            <div className="mt-4 space-y-3">
              {CHAPTER_MEDIA_REQUIREMENTS.map((standard) => (
                <div key={standard.title} className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] p-3">
                  <div className="text-sm font-semibold">{standard.title}</div>
                  <div className="mt-1 text-sm leading-6 text-[var(--color-fg-muted)]">{standard.summary}</div>
                </div>
              ))}
            </div>
          </article>
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

      <div className="mt-8">
        <AcademyStandardsPanel
          standards={CHAPTER_MEDIA_REQUIREMENTS}
          eyebrow="Delivery promise"
          title="Learners should know what support to expect in every chapter"
        />
      </div>

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
