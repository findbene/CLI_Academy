"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getCompletedLessonEntriesLocally,
  removeLessonCompletedLocally,
} from "@/lib/local-lesson-progress";

let inFlightBackfill: Promise<number> | null = null;

async function backfillLocalProgressToHosted(userId: string) {
  const localEntries = getCompletedLessonEntriesLocally(userId);
  let syncedCount = 0;

  for (const entry of localEntries) {
    try {
      const response = await fetch("/api/progress", {
        body: JSON.stringify({
          completionData: {
            completedAt: entry.completedAt,
            source: "local-backfill",
          },
          lessonSlug: entry.lessonSlug,
          pathSlug: entry.pathSlug,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (response.ok) {
        removeLessonCompletedLocally(entry.pathSlug, entry.lessonSlug, userId);
        syncedCount += 1;
        continue;
      }

      if (response.status === 401) {
        break;
      }
    } catch {
      break;
    }
  }

  return syncedCount;
}

export function LocalProgressBackfill({ userId }: { userId?: string | null }) {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    if (!userId || !getCompletedLessonEntriesLocally(userId).length) {
      return;
    }

    const pendingBackfill =
      inFlightBackfill ??
      backfillLocalProgressToHosted(userId).finally(() => {
        inFlightBackfill = null;
      });

    inFlightBackfill = pendingBackfill;

    void pendingBackfill.then((syncedCount) => {
      if (!cancelled && syncedCount > 0) {
        router.refresh();
      }
    });

    return () => {
      cancelled = true;
    };
  }, [router, userId]);

  return null;
}