import { LessonContent } from "@/components/lesson/LessonContent";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";
import { getPathBySlug } from "@/lib/data/paths";
import { getLessonsForPath } from "@/lib/mdx";

interface LessonPageProps {
  params: Promise<{ pathSlug: string; lessonSlug: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { pathSlug, lessonSlug } = await params;
  const path = getPathBySlug(pathSlug);
  const lessons = await getLessonsForPath(pathSlug);
  const lesson = lessons.find((item) => item.slug === lessonSlug) ?? null;

  if (!path || !lesson) {
    return (
      <main className="page-shell">
        <div className="panel p-6">
          <h1 className="text-3xl font-semibold">Lesson not found</h1>
          <p className="mt-3 text-[var(--color-fg-muted)]">
            The lesson route has been restored, but this lesson could not be matched to the recovered content files.
          </p>
        </div>
      </main>
    );
  }

  const currentIndex = lessons.findIndex((item) => item.slug === lesson.slug);
  const previousLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  return (
    <LessonPlayer
      lessonTitle={lesson.title}
      lessonSlug={lesson.slug}
      pathTitle={path.title}
      pathSlug={path.slug}
      estimatedMinutes={lesson.estimatedMinutes}
      lastReviewedAt={lesson.lastReviewedAt}
      hasSafetyWarning={lesson.hasSafetyWarning}
      previousLessonHref={previousLesson ? `/learn/${path.slug}/${previousLesson.slug}` : undefined}
      nextLessonHref={nextLesson ? `/learn/${path.slug}/${nextLesson.slug}` : undefined}
    >
      <LessonContent pathSlug={pathSlug} lessonSlug={lessonSlug} />
    </LessonPlayer>
  );
}
