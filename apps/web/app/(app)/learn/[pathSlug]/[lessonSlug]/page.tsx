import { LessonCompanionBlocks } from "@/components/academy/LessonCompanionBlocks";
import { LessonRelatedResources } from "@/components/academy/LessonRelatedResources";
import { LessonContent } from "@/components/lesson/LessonContent";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";
import Link from "next/link";
import type { Metadata } from "next";
import { CheckoutButton } from "@/components/billing/CheckoutButton";
import {
  getAcademyAssets,
  getAcademyExercises,
  getAcademyLabs,
  getAcademyQuizzes,
  getAcademyRelationships,
  getAcademyRuntimes,
  getAcademyRubrics,
} from "@/lib/academy-content";
import { getLessonCompanionBlocks, getLessonResourceLinks } from "@/lib/academy-recommendations";
import { getRecommendedAssetsForLesson, toDownloadSurfaceAsset } from "@/lib/assets";
import { getCatalogPathBySlug } from "@/lib/catalog";
import { buildLessonGuidance, getPathAccessState } from "@/lib/learning-experience";
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
  const [lessons, quizzes, exercises, rubrics, relationships, academyAssets, academyLabs, academyRuntimes] = await Promise.all([
    getLessonsForPath(pathSlug),
    getAcademyQuizzes(),
    getAcademyExercises(),
    getAcademyRubrics(),
    getAcademyRelationships(),
    getAcademyAssets(),
    getAcademyLabs(),
    getAcademyRuntimes(),
  ]);
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

  const accessState = getPathAccessState(path, viewer);

  if (accessState.isComingSoon) {
    return (
      <main className="page-shell">
        <div className="panel p-6">
          <h1 className="text-3xl font-semibold">{path.title}</h1>
          <p className="mt-3 text-[var(--color-fg-muted)]">
            This path is not learner-ready yet, so the lesson route is still held back while quality checks finish.
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
  const companionBlocks = getLessonCompanionBlocks({
    pathSlug: path.slug,
    lessonSlug: lesson.slug,
    quizzes,
    exercises,
    rubrics,
    relationships,
  });
  const relatedResources = getLessonResourceLinks({
    pathSlug: path.slug,
    lessonSlug: lesson.slug,
    relationships,
    assets: academyAssets,
    labs: academyLabs,
    runtimes: academyRuntimes,
  });
  const lessonGuidance = buildLessonGuidance({
    lesson,
    nextLessonTitle: nextLesson?.title,
    previousLessonTitle: previousLesson?.title,
    primaryEnvironment: support.compatibility[0]?.environment,
    supportSteps: support.guides.map((guide) => `${guide.title}: ${guide.nextStep}`),
  });
  let initialMastery: { matchedCriteria: string[]; score: number } | null = null;

  if (viewer.user && viewer.supabaseContext) {
    const { data: dbPath } = await viewer.supabaseContext.supabase
      .from("paths")
      .select("id")
      .eq("slug", path.slug)
      .maybeSingle();

    if (dbPath) {
      const { data: dbLesson } = await viewer.supabaseContext.supabase
        .from("lessons")
        .select("id")
        .eq("path_id", dbPath.id)
        .eq("slug", lesson.slug)
        .maybeSingle();

      if (dbLesson) {
        const { data: progress } = await viewer.supabaseContext.supabase
          .from("lesson_progress")
          .select("completion_data")
          .eq("user_id", viewer.user.id)
          .eq("lesson_id", dbLesson.id)
          .maybeSingle();

        const completionData =
          progress?.completion_data && typeof progress.completion_data === "object"
            ? (progress.completion_data as Record<string, unknown>)
            : null;

        if (completionData && typeof completionData.masteryScore === "number") {
          initialMastery = {
            matchedCriteria: Array.isArray(completionData.matchedCriteria)
              ? completionData.matchedCriteria.filter((value): value is string => typeof value === "string")
              : [],
            score: completionData.masteryScore,
          };
        }
      }
    }
  }

  return (
    <LessonPlayer
      lessonTitle={lesson.title}
      lessonSlug={lesson.slug}
      initialMastery={initialMastery}
      userId={viewer.user?.id}
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
      relatedAcademyAssets={relatedResources.assets}
      relatedAcademyLabs={relatedResources.labs}
      relatedAcademyRuntimes={relatedResources.runtimes}
      rubricCriteria={companionBlocks.rubric?.criteria}
      supportGuideTitles={support.guides.slice(0, 2).map((guide) => guide.title)}
      testedOnEnvironments={support.compatibility.slice(0, 2).map((entry) => entry.environment)}
      beforeYouStart={lessonGuidance.beforeYouStart}
      missionOutcome={lessonGuidance.missionOutcome}
      nextMilestone={lessonGuidance.nextMilestone}
      stuckSteps={lessonGuidance.stuckSteps}
      tutorPreload={lesson.tutorPreload}
      modeBalance={lesson.modeBalance}
    >
      <LessonContent
        initialMastery={initialMastery}
        pathSlug={pathSlug}
        lessonSlug={lessonSlug}
        rubricCriteria={companionBlocks.rubric?.criteria}
      />
      <LessonCompanionBlocks
        quiz={companionBlocks.quiz}
        exercise={companionBlocks.exercise}
        rubric={companionBlocks.rubric}
      />
      <LessonRelatedResources
        assets={relatedResources.assets}
        labs={relatedResources.labs}
        runtimes={relatedResources.runtimes}
      />
    </LessonPlayer>
  );
}
