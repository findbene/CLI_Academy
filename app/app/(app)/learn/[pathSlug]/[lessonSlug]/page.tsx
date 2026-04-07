import { LessonContent } from "@/components/lesson/LessonContent";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";
import Link from "next/link";
import type { Metadata } from "next";
import { CheckoutButton } from "@/components/billing/CheckoutButton";
import { getRecommendedAssetsForLesson, toDownloadSurfaceAsset } from "@/lib/assets";
import { getCatalogPathBySlug } from "@/lib/catalog";
import { getLessonsForPath } from "@/lib/mdx";
import { getFreshnessState, getPathSupportBundle } from "@/lib/support";
import { getServerViewer } from "@/lib/viewer";

interface LessonPageProps {
  params: Promise<{ pathSlug: string; lessonSlug: string }>;
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { pathSlug, lessonSlug } = await params;
  const path = await getCatalogPathBySlug(pathSlug);
  const lessons = await getLessonsForPath(pathSlug);
  const lesson = lessons.find((item) => item.slug === lessonSlug);

  if (!path || !lesson) {
    return { title: "Lesson not found | CLI Academy" };
  }

  return {
    title: `${lesson.title} — ${path.title} | CLI Academy`,
    description: lesson.description,
    openGraph: {
      title: `${lesson.title} — ${path.title} | CLI Academy`,
      description: lesson.description,
      type: "article",
    },
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { pathSlug, lessonSlug } = await params;
  const [path, viewer] = await Promise.all([getCatalogPathBySlug(pathSlug), getServerViewer()]);
  const lessons = await getLessonsForPath(pathSlug);
  const lesson = lessons.find((item) => item.slug === lessonSlug) ?? null;

  if (!path || !lesson) {
    return (
      <main className="page-shell">
        <div className="panel p-6">
          <h1 className="text-3xl font-semibold">Lesson not found</h1>
          <p className="mt-3 text-[var(--color-fg-muted)]">
            This lesson could not be found. It may not be published yet, or the URL may be incorrect.
          </p>
        </div>
      </main>
    );
  }

  if (path.tier === "pro" && viewer.profile?.tier !== "pro") {
    return (
      <main className="page-shell">
        <div className="panel p-6">
          <div className="eyebrow">Pro lesson</div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{lesson.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-fg-muted)]">
            This lesson belongs to a Pro path. Upgrade when you want full access to the guided lesson player, downloads, and deeper implementation tracks.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CheckoutButton label="Unlock Pro lessons" />
            <Link href={`/paths/${path.slug}`} className="button-secondary">
              Back to path detail
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const currentIndex = lessons.findIndex((item) => item.slug === lesson.slug);
  const previousLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  const support = getPathSupportBundle(path.slug);
  const recommendedAssets = getRecommendedAssetsForLesson(path.slug, lesson.slug)
    .slice(0, 3)
    .map((asset) => toDownloadSurfaceAsset(asset, viewer.profile?.tier ?? "free"));

  return (
    <LessonPlayer
      lessonTitle={lesson.title}
      lessonSlug={lesson.slug}
      pathTitle={path.title}
      pathSlug={path.slug}
      estimatedMinutes={lesson.estimatedMinutes}
      lastReviewedAt={lesson.lastReviewedAt}
      freshnessState={getFreshnessState(lesson.lastReviewedAt)}
      hasSafetyWarning={lesson.hasSafetyWarning}
      knownIssueTitle={support.issues[0]?.title}
      previousLessonHref={previousLesson ? `/learn/${path.slug}/${previousLesson.slug}` : undefined}
      nextLessonHref={nextLesson ? `/learn/${path.slug}/${nextLesson.slug}` : undefined}
      recommendedAssets={recommendedAssets}
      supportGuideTitles={support.guides.slice(0, 2).map((guide) => guide.title)}
      testedOnEnvironments={support.compatibility.slice(0, 2).map((entry) => entry.environment)}
    >
      <LessonContent pathSlug={pathSlug} lessonSlug={lessonSlug} />
    </LessonPlayer>
  );
}
