"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCompletedLessonSlugsForPathLocally } from "@/lib/local-lesson-progress";

interface LessonRow {
  slug: string;
  title: string;
  lessonNumber: string;
  estimatedMinutes: number;
  description?: string;
}

interface PathLessonListHydrationProps {
  lessons: LessonRow[];
  pathSlug: string;
  /** Lesson slugs already completed according to the server (hosted progress) */
  serverCompletedSlugs: string[];
  userId?: string | null;
}

/**
 * Client hydration layer for the path overview lesson list.
 *
 * The server renders lesson list completion state from hosted Supabase progress
 * only. This component merges browser-local fallback completions so learners
 * who completed a lesson offline or before sync resolved see the correct badges
 * when they return to the path overview page.
 */
export function PathLessonListHydration({
  lessons,
  pathSlug,
  serverCompletedSlugs,
  userId,
}: PathLessonListHydrationProps) {
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(
    new Set(serverCompletedSlugs),
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const local = getCompletedLessonSlugsForPathLocally(pathSlug, userId);
      const merged = new Set([...serverCompletedSlugs, ...local]);
      setCompletedSlugs(merged);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathSlug, serverCompletedSlugs, userId]);

  const firstIncompleteLesson = lessons.find((l) => !completedSlugs.has(l.slug)) ?? null;
  const firstIncompleteIndex = firstIncompleteLesson
    ? lessons.findIndex((l) => l.slug === firstIncompleteLesson.slug)
    : -1;

  return (
    <div className="grid gap-4">
      {lessons.map((lesson) => {
        const isCompleted = completedSlugs.has(lesson.slug);
        const isContinue = firstIncompleteLesson?.slug === lesson.slug;
        const lessonIndex = lessons.findIndex((l) => l.slug === lesson.slug);
        const isComingUp =
          !isCompleted && !isContinue && firstIncompleteIndex !== -1 && lessonIndex > firstIncompleteIndex;

        return (
          <article
            key={lesson.slug}
            className="panel flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div className="text-sm text-[var(--color-fg-muted)]">
                Lesson {lesson.lessonNumber} · {lesson.estimatedMinutes} min
              </div>
              <h2 className="mt-1 text-xl font-semibold">{lesson.title}</h2>
              {lesson.description ? (
                <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{lesson.description}</p>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-2">
                {isCompleted ? (
                  <span className="badge" data-tone="accent">Completed</span>
                ) : isContinue ? (
                  <span className="badge" data-tone="accent">Continue here</span>
                ) : isComingUp ? (
                  <span className="badge">Coming up</span>
                ) : (
                  <span className="badge">Next up</span>
                )}
              </div>
            </div>
            <Link
              href={`/learn/${pathSlug}/${lesson.slug}`}
              className="button-primary"
            >
              {isCompleted
                ? "Review lesson"
                : isContinue
                  ? "Continue lesson"
                  : "Open lesson"}
            </Link>
          </article>
        );
      })}
    </div>
  );
}
