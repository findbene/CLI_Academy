"use client";

import { useEffect, useState } from "react";
import { Award } from "lucide-react";
import { getLessonMastery } from "@/lib/local-lesson-mastery";

export function MasteryMeter({
  initialMastery = null,
  lessonSlug,
  pathSlug,
  rubricCriteria = [],
}: {
  initialMastery?: { matchedCriteria: string[]; score: number } | null;
  lessonSlug: string;
  pathSlug: string;
  rubricCriteria?: string[];
}) {
  const [score, setScore] = useState<number | null>(null);
  const [matchedCriteria, setMatchedCriteria] = useState<string[]>([]);

  useEffect(() => {
    function sync() {
      const mastery = getLessonMastery(pathSlug, lessonSlug);
      setScore(mastery?.score ?? initialMastery?.score ?? null);
      setMatchedCriteria(mastery?.matchedCriteria ?? initialMastery?.matchedCriteria ?? []);
    }

    sync();
    window.addEventListener("lesson-mastery-updated", sync);
    return () => {
      window.removeEventListener("lesson-mastery-updated", sync);
    };
  }, [initialMastery, lessonSlug, pathSlug]);

  if (!rubricCriteria.length) {
    return null;
  }

  return (
    <div className="panel p-5">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Award className="size-4 text-[var(--color-accent-primary)]" />
        Mastery checkpoint
      </div>
      <div className="mt-3 text-sm text-[var(--color-fg-muted)]">
        {score !== null ? `Verified mastery score: ${score}/100` : "Verify your work to record mastery on this device."}
      </div>
      <div className="mt-4 grid gap-2">
        {rubricCriteria.map((criterion) => {
          const matched = matchedCriteria.includes(criterion);
          return (
            <div
              key={criterion}
              className={`rounded-[var(--radius-md)] px-3 py-2 text-sm ${
                matched
                  ? "bg-[var(--color-accent-subtle)] text-[var(--color-fg-default)]"
                  : "bg-[var(--color-bg-panel-subtle)] text-[var(--color-fg-muted)]"
              }`}
            >
              {matched ? "✓ " : ""}{criterion}
            </div>
          );
        })}
      </div>
    </div>
  );
}
