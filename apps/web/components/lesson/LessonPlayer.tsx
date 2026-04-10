"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Printer,
  Shield,
} from "lucide-react";
import { AssetCard } from "@/components/assets/AssetCard";
import { TutorContextBridge } from "@/components/tutor/TutorRuntimeProvider";
import { LearningModeSelector, type LearningMode } from "@/components/lesson/LearningModeSelector";
import type { DownloadSurfaceAsset } from "@/lib/assets";
import {
  isLessonCompletedLocally,
  markLessonCompletedLocally,
  removeLessonCompletedLocally,
} from "@/lib/local-lesson-progress";

interface LessonPlayerProps {
  lessonTitle: string;
  lessonSlug: string;
  userId?: string | null;
  pathTitle: string;
  pathSlug: string;
  estimatedMinutes: number;
  lastReviewedAt: string;
  freshnessState: "fresh" | "review-due" | "stale";
  hasSafetyWarning: boolean;
  tutorPreload?: string;
  modeBalance?: string;
  knownIssueTitle?: string;
  previousLessonHref?: string;
  nextLessonHref?: string;
  recommendedAssets?: DownloadSurfaceAsset[];
  supportGuideTitles?: string[];
  testedOnEnvironments?: string[];
  children: React.ReactNode;
}

function freshnessLabel(state: "fresh" | "review-due" | "stale") {
  if (state === "fresh") {
    return "Fresh";
  }

  return state === "review-due" ? "Review due" : "Stale";
}

function freshnessTone(state: "fresh" | "review-due" | "stale") {
  if (state === "fresh") {
    return "accent";
  }

  return state === "review-due" ? "warning" : "danger";
}

export function LessonPlayer({
  lessonTitle,
  lessonSlug,
  userId,
  pathTitle,
  pathSlug,
  estimatedMinutes,
  lastReviewedAt,
  freshnessState,
  hasSafetyWarning,
  tutorPreload,
  modeBalance,
  knownIssueTitle,
  previousLessonHref,
  nextLessonHref,
  recommendedAssets = [],
  supportGuideTitles = [],
  testedOnEnvironments = [],
  children,
}: LessonPlayerProps) {
  const [completed, setCompleted] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [savingProgress, setSavingProgress] = useState(false);
  const [progressMessage, setProgressMessage] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [learningMode, setLearningMode] = useState<LearningMode>("guided");
  const [sectionTitles, setSectionTitles] = useState<string[]>([]);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    function collectSections() {
      const headings = Array.from(document.querySelectorAll<HTMLElement>("[data-lesson-section-heading]"));
      const titles = headings.map((heading) => heading.textContent?.trim()).filter((title): title is string => Boolean(title));
      setSectionTitles(titles);
      setActiveSectionIndex(0);
    }

    collectSections();
    window.addEventListener("resize", collectSections);

    return () => {
      window.removeEventListener("resize", collectSections);
    };
  }, [lessonSlug]);

  useEffect(() => {
    if (!sectionTitles.length) {
      return;
    }

    function updateActiveSection() {
      const headings = Array.from(document.querySelectorAll<HTMLElement>("[data-lesson-section-heading]"));
      if (!headings.length) {
        return;
      }

      let currentIndex = 0;
      for (const [index, heading] of headings.entries()) {
        if (heading.getBoundingClientRect().top <= 180) {
          currentIndex = index;
        }
      }

      setActiveSectionIndex(currentIndex);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, [sectionTitles, lessonSlug]);

  const sectionProgressPercent = sectionTitles.length
    ? Math.round(((activeSectionIndex + 1) / sectionTitles.length) * 100)
    : 0;

  useEffect(() => {
    let cancelled = false;

    async function loadProgress() {
      const localCompletion = isLessonCompletedLocally(pathSlug, lessonSlug, userId);

      try {
        const response = await fetch(
          `/api/progress?pathSlug=${encodeURIComponent(pathSlug)}&lessonSlug=${encodeURIComponent(lessonSlug)}`,
        );
        const data = (await response.json().catch(() => ({}))) as {
          completed?: boolean;
          message?: string;
        };

        if (cancelled) {
          return;
        }

        if (response.ok) {
          const syncedCompletion = Boolean(data.completed);
          if (syncedCompletion) {
            removeLessonCompletedLocally(pathSlug, lessonSlug, userId);
          }
          setCompleted(syncedCompletion || localCompletion);
          setProgressMessage(
            syncedCompletion
              ? "Progress already saved."
              : localCompletion
                ? "Progress saved on this device."
                : null,
          );
          return;
        }

        if (response.status === 401) {
          setCompleted(localCompletion);
          setProgressMessage(
            localCompletion
              ? "Progress saved on this device. Sign in to sync it across devices."
              : data.message ?? "Sign in to sync your progress.",
          );
          return;
        }

        setCompleted(localCompletion);
        setProgressMessage(
          localCompletion
            ? "Progress saved on this device while lesson sync catches up."
            : data.message ?? "Progress is available, but this lesson is not synced yet.",
        );
      } catch {
        if (!cancelled) {
          setCompleted(localCompletion);
          setProgressMessage(
            localCompletion
              ? "Progress saved on this device while sync is temporarily unavailable."
              : "Progress sync is temporarily unavailable.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingProgress(false);
        }
      }
    }

    loadProgress();

    return () => {
      cancelled = true;
    };
  }, [lessonSlug, pathSlug, userId]);

  async function handleMarkComplete() {
    if (completed || savingProgress) {
      return;
    }

    setSavingProgress(true);
    setProgressMessage(null);
    let shouldAdvance = false;

    try {
      const response = await fetch("/api/progress", {
        body: JSON.stringify({
          completionData: {
            source: "lesson-player",
          },
          lessonSlug,
          pathSlug,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      const data = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) {
        if (response.status === 401) {
          markLessonCompletedLocally(pathSlug, lessonSlug, userId);
          setCompleted(true);
          setProgressMessage("Progress saved on this device. Sign in to sync it across devices.");
          setShowCelebration(true);
          shouldAdvance = true;
        } else if (response.status === 404) {
          markLessonCompletedLocally(pathSlug, lessonSlug, userId);
          setCompleted(true);
          setProgressMessage("Progress saved on this device while lesson sync catches up.");
          setShowCelebration(true);
          shouldAdvance = true;
        } else {
          setProgressMessage(data.message ?? "Could not save progress yet.");
          return;
        }
      } else {
        removeLessonCompletedLocally(pathSlug, lessonSlug, userId);
        setCompleted(true);
        setProgressMessage(data.message ?? "Progress saved.");
        setShowCelebration(true);
        shouldAdvance = true;
      }

      // Auto-advance to next lesson after a brief pause
      if (shouldAdvance && nextLessonHref) {
        setTimeout(() => {
          router.push(nextLessonHref);
        }, 2000);
      }
    } catch {
      markLessonCompletedLocally(pathSlug, lessonSlug, userId);
      setCompleted(true);
      setProgressMessage("Progress saved on this device while sync is temporarily unavailable.");
      setShowCelebration(true);
      shouldAdvance = true;

      if (shouldAdvance && nextLessonHref) {
        setTimeout(() => {
          router.push(nextLessonHref);
        }, 2000);
      }
    } finally {
      setSavingProgress(false);
    }
  }

  function handlePrintLesson() {
    window.print();
  }

  return (
    <>
      <div className="page-shell">
        <div className="grid gap-6">
          <div className="panel p-6">
            <Link href={`/learn/${pathSlug}`} className="inline-flex items-center gap-1.5 text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-accent-primary)] transition-colors mb-4">
              <ChevronLeft className="size-4" />
              {pathTitle}
            </Link>
            <h1 className="text-[clamp(2rem,3vw,3rem)] font-bold tracking-tight">{lessonTitle}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="badge" data-tone={freshnessTone(freshnessState)}>
                {freshnessLabel(freshnessState)}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-[var(--color-fg-muted)]">
                <Clock className="size-3.5" />
                {estimatedMinutes} min
              </span>
              <span className="text-sm text-[var(--color-fg-muted)]">
                Reviewed {lastReviewedAt}
              </span>
              {completed ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent-primary)]">
                  <CheckCircle2 className="size-4" />
                  Completed
                </span>
              ) : null}
            </div>
            {hasSafetyWarning ? (
              <div className="callout mt-4 flex items-start gap-3" data-tone="warning">
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-[var(--color-accent-warning)]" />
                <div>
                  <h3 className="font-semibold">Safety warning</h3>
                  <p className="text-sm">This lesson includes commands or guidance that should be followed carefully.</p>
                </div>
              </div>
            ) : null}
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="grid gap-6 h-fit">
              <LearningModeSelector currentMode={learningMode} onChange={setLearningMode} />
              {modeBalance ? (
                <div className="panel p-4 text-sm leading-6 text-[var(--color-fg-muted)]">
                  <span className="font-semibold text-[var(--color-fg-default)]">Suggested learning balance:</span>{" "}
                  <span className="font-mono">{modeBalance}</span>
                </div>
              ) : null}
              <div className="lesson-stage" data-learning-mode={learningMode}>{children}</div>
            </div>
            <aside className="grid h-fit gap-4">
              {sectionTitles.length ? (
                <div className="panel p-5">
                  <div className="flex items-center justify-between gap-3 text-sm font-semibold">
                    <span>Lesson progress</span>
                    <span className="text-[var(--color-fg-muted)]">{sectionProgressPercent}%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--color-border-subtle)]">
                    <div
                      className="h-full rounded-full bg-[var(--color-accent-primary)] transition-all duration-300"
                      style={{ width: `${sectionProgressPercent}%` }}
                    />
                  </div>
                  <div className="mt-4 grid gap-2">
                    {sectionTitles.map((title, index) => (
                      <div
                        key={`${lessonSlug}-section-${index}`}
                        className={`rounded-[var(--radius-lg)] px-3 py-2 text-sm ${
                          index === activeSectionIndex
                            ? "bg-[var(--color-accent-subtle)] text-[var(--color-fg-default)]"
                            : "bg-[var(--color-bg-panel-subtle)] text-[var(--color-fg-muted)]"
                        }`}
                      >
                        {index + 1}. {title}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="panel p-5">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <BookOpen className="size-4 text-[var(--color-accent-primary)]" />
                  Progress
                </div>
                <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
                  Your progress is saved automatically when you are signed in.
                </p>
                {progressMessage ? (
                  <p className="mt-3 text-xs leading-5 text-[var(--color-fg-muted)]">{progressMessage}</p>
                ) : null}
                <div className="mt-4 grid gap-3">
                  <button
                    type="button"
                    className="button-primary w-full"
                    onClick={handleMarkComplete}
                    disabled={completed || loadingProgress || savingProgress}
                  >
                    {loadingProgress
                      ? "Loading progress..."
                      : savingProgress
                        ? "Saving..."
                        : completed
                          ? "✓ Completed"
                          : "Mark complete"}
                  </button>
                  <button type="button" className="button-secondary w-full inline-flex items-center justify-center gap-2" onClick={handlePrintLesson}>
                    <Printer className="size-4" />
                    Print this lesson
                  </button>
                </div>
              </div>

              <div className="panel p-5">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Shield className="size-4 text-[var(--color-accent-primary)]" />
                  Trust and support
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="badge" data-tone={freshnessTone(freshnessState)}>
                    {freshnessLabel(freshnessState)}
                  </span>
                  {testedOnEnvironments.map((environment) => (
                    <span key={environment} className="badge">
                      {environment}
                    </span>
                  ))}
                </div>
                {knownIssueTitle ? (
                  <p className="mt-4 text-sm leading-6 text-[var(--color-fg-muted)]">
                    Active note: {knownIssueTitle}
                  </p>
                ) : null}
                {supportGuideTitles.length ? (
                  <div className="mt-4">
                    <div className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">
                      Quick help
                    </div>
                    <div className="mt-2 grid gap-2 text-sm text-[var(--color-fg-muted)]">
                      {supportGuideTitles.map((title) => (
                        <div key={title}>• {title}</div>
                      ))}
                    </div>
                  </div>
                ) : null}
                <div className="mt-4 grid gap-3">
                  <Link href="/troubleshooting" className="button-secondary">
                    Troubleshooting center
                  </Link>
                  <Link href="/compatibility" className="button-ghost">
                    Compatibility matrix
                  </Link>
                </div>
              </div>

              <div className="panel p-5">
                <div className="text-sm font-semibold">Navigation</div>
                <div className="mt-4 grid gap-3">
                  {previousLessonHref ? (
                    <Link href={previousLessonHref} className="button-secondary inline-flex items-center justify-center gap-2">
                      <ChevronLeft className="size-4" />
                      Previous lesson
                    </Link>
                  ) : null}
                  {nextLessonHref ? (
                    <Link href={nextLessonHref} className="button-primary inline-flex items-center justify-center gap-2">
                      Next lesson
                      <ChevronRight className="size-4" />
                    </Link>
                  ) : null}
                  <Link href={`/learn/${pathSlug}`} className="button-ghost">
                    Back to path
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {recommendedAssets.length ? (
            <section className="grid gap-4">
              <div>
                <div className="eyebrow">Downloads for this lesson</div>
                <h2 className="mt-3 text-2xl font-semibold">Keep these beside the lesson while you work</h2>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                {recommendedAssets.map((asset) => (
                  <AssetCard key={asset.slug} asset={asset} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
      {showCelebration ? (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-bounce rounded-2xl border border-[var(--color-accent-primary)]/30 bg-[var(--color-bg-panel)] px-6 py-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="size-6 text-[var(--color-accent-primary)]" />
            <div>
              <div className="font-semibold text-[var(--color-fg-default)]">Lesson complete!</div>
              <div className="text-sm text-[var(--color-fg-muted)]">
                {nextLessonHref ? "Moving to the next lesson…" : "You finished this path!"}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <TutorContextBridge lessonTitle={lessonTitle} tutorPreload={tutorPreload} learningMode={learningMode} />
    </>
  );
}
