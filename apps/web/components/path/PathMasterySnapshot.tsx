"use client";

import { useEffect, useState } from "react";
import { Award } from "lucide-react";
import { getVerifiedLessonCountForPath } from "@/lib/local-lesson-mastery";

export function PathMasterySnapshot({
  initialVerifiedCount = 0,
  lessonCount,
  pathSlug,
}: {
  initialVerifiedCount?: number;
  lessonCount: number;
  pathSlug: string;
}) {
  const [verifiedCount, setVerifiedCount] = useState(initialVerifiedCount);

  useEffect(() => {
    function sync() {
      setVerifiedCount(Math.max(initialVerifiedCount, getVerifiedLessonCountForPath(pathSlug)));
    }

    sync();
    window.addEventListener("lesson-mastery-updated", sync);
    return () => {
      window.removeEventListener("lesson-mastery-updated", sync);
    };
  }, [initialVerifiedCount, pathSlug]);

  return (
    <div className="panel p-6">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Award className="size-4 text-[var(--color-accent-primary)]" />
        Path mastery
      </div>
      <div className="mt-3 text-3xl font-semibold">
        {verifiedCount} <span className="text-base font-normal text-[var(--color-fg-muted)]">/ {lessonCount}</span>
      </div>
      <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
        Lessons verified with evidence on this device.
      </p>
    </div>
  );
}
