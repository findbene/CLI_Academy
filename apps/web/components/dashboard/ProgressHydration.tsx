"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Compass } from "lucide-react";
import {
  getCompletedLessonCountLocally,
  getCompletedLessonKeysLocally,
  getCompletedLessonSlugsForPathLocally,
} from "@/lib/local-lesson-progress";

interface LessonOption {
  slug: string;
  title: string;
}

interface ContinueLearningCandidate {
  completedLessonSlugs: string[];
  lessons: LessonOption[];
  pathSlug: string;
  pathTitle: string;
}

interface ContinueLearningState {
  completedCount: number;
  href: string;
  lessonTitle: string;
  pathTitle: string;
  progressPercent: number;
  totalCount: number;
}

function resolveContinueLearning(candidates: ContinueLearningCandidate[], userId?: string | null) {
  for (const candidate of candidates) {
    const completedSlugs = new Set([
      ...candidate.completedLessonSlugs,
      ...getCompletedLessonSlugsForPathLocally(candidate.pathSlug, userId),
    ]);
    const nextLesson = candidate.lessons.find((lesson) => !completedSlugs.has(lesson.slug));

    if (!nextLesson) {
      continue;
    }

    return {
      completedCount: completedSlugs.size,
      href: `/learn/${candidate.pathSlug}/${nextLesson.slug}`,
      lessonTitle: nextLesson.title,
      pathTitle: candidate.pathTitle,
      progressPercent: Math.round((completedSlugs.size / candidate.lessons.length) * 100),
      totalCount: candidate.lessons.length,
    } satisfies ContinueLearningState;
  }

  return null;
}

export function CompletedLessonsCount({
  initialCount,
  serverCompletedLessonKeys,
  userId,
}: {
  initialCount: number;
  serverCompletedLessonKeys: string[];
  userId?: string | null;
}) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const mergedLessonKeys = new Set(serverCompletedLessonKeys);
      for (const lessonKey of getCompletedLessonKeysLocally(userId)) {
        mergedLessonKeys.add(lessonKey);
      }

      setCount(Math.max(initialCount, getCompletedLessonCountLocally(userId), mergedLessonKeys.size));
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [initialCount, serverCompletedLessonKeys, userId]);

  return <>{count}</>;
}

export function ContinueLearningHydration({
  candidates,
  initialContinueLearning,
  userId,
}: {
  candidates: ContinueLearningCandidate[];
  initialContinueLearning: ContinueLearningState | null;
  userId?: string | null;
}) {
  const [continueLearning, setContinueLearning] = useState(initialContinueLearning);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setContinueLearning(resolveContinueLearning(candidates, userId) ?? initialContinueLearning);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [candidates, initialContinueLearning, userId]);

  if (!continueLearning) {
    return (
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] px-4 py-4 text-sm text-[var(--color-fg-muted)]">
        No in-progress lesson yet. Start with the first foundations lesson and the dashboard will keep your place here.
      </div>
    );
  }

  return (
    <Link
      href={continueLearning.href}
      className="group block rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] px-4 py-4 transition hover:border-[var(--color-accent-primary)] hover:shadow-md"
    >
      <div className="text-xs uppercase tracking-[0.14em] text-[var(--color-accent-primary)]">
        {continueLearning.pathTitle}
      </div>
      <h3 className="mt-2 text-lg font-semibold group-hover:text-[var(--color-accent-primary)] transition-colors">
        {continueLearning.lessonTitle}
      </h3>
      <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
        {continueLearning.completedCount} of {continueLearning.totalCount} lessons completed
      </p>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--color-border-subtle)]">
        <div
          className="h-full rounded-full bg-[var(--color-accent-primary)] transition-all duration-500"
          style={{ width: `${continueLearning.progressPercent}%` }}
        />
      </div>
      <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-primary)]">
        Resume lesson
        <Compass className="size-4" />
      </div>
    </Link>
  );
}