"use client";

import Link from "next/link";
import { useState } from "react";
import { FloatingTutor } from "@/components/tutor/FloatingTutor";

interface LessonPlayerProps {
  lessonTitle: string;
  lessonSlug: string;
  pathTitle: string;
  pathSlug: string;
  estimatedMinutes: number;
  lastReviewedAt: string;
  hasSafetyWarning: boolean;
  previousLessonHref?: string;
  nextLessonHref?: string;
  children: React.ReactNode;
}

export function LessonPlayer({
  lessonTitle,
  pathTitle,
  pathSlug,
  estimatedMinutes,
  lastReviewedAt,
  hasSafetyWarning,
  previousLessonHref,
  nextLessonHref,
  children,
}: LessonPlayerProps) {
  const [completed, setCompleted] = useState(false);

  return (
    <>
      <div className="page-shell">
        <div className="grid gap-6">
          <div className="panel p-6">
            <div className="eyebrow">Lesson player</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">{lessonTitle}</h1>
            <p className="mt-3 max-w-3xl text-[var(--color-fg-muted)]">
              Restored from the recovery scaffold. The route architecture is back, and rich MDX rendering is being
              rebuilt incrementally.
            </p>
            <div className="metadata-bar mt-4">
              <span>{pathTitle}</span>
              <span>{estimatedMinutes} min</span>
              <span>Last reviewed: {lastReviewedAt}</span>
              <span>{completed ? "Marked complete" : "Not completed yet"}</span>
            </div>
            {hasSafetyWarning ? (
              <div className="callout mt-4" data-tone="warning">
                <h3>Safety warning</h3>
                <p>This lesson includes commands or guidance that should be followed carefully.</p>
              </div>
            ) : null}
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="panel p-6">{children}</div>
            <aside className="grid h-fit gap-4">
              <div className="panel p-5">
                <div className="text-sm font-semibold">Progress</div>
                <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
                  Progress persistence is being rewired. Use this local control while the database flow is restored.
                </p>
                <button type="button" className="button-primary mt-4 w-full" onClick={() => setCompleted((value) => !value)}>
                  {completed ? "Undo completion" : "Mark complete"}
                </button>
              </div>

              <div className="panel p-5">
                <div className="text-sm font-semibold">Navigation</div>
                <div className="mt-4 grid gap-3">
                  {previousLessonHref ? (
                    <Link href={previousLessonHref} className="button-secondary">
                      Previous lesson
                    </Link>
                  ) : null}
                  {nextLessonHref ? (
                    <Link href={nextLessonHref} className="button-primary">
                      Next lesson
                    </Link>
                  ) : null}
                  <Link href={`/learn/${pathSlug}`} className="button-ghost">
                    Back to path
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <FloatingTutor lessonTitle={lessonTitle} />
    </>
  );
}
