"use client";

import { CheckCircle2, ChevronRight, Terminal } from "lucide-react";
import { useState } from "react";
import { getLessonMastery, saveLessonMastery } from "@/lib/local-lesson-mastery";

interface VerificationBlockProps {
  deliverable?: string;
  initialMastery?: { matchedCriteria: string[]; score: number } | null;
  lessonSlug?: string;
  pathSlug?: string;
  rubricCriteria?: string[];
  verifyCheck?: string;
}

export function VerificationBlock({
  deliverable,
  initialMastery = null,
  lessonSlug,
  pathSlug,
  rubricCriteria = [],
  verifyCheck,
}: VerificationBlockProps) {
  // Resolve initial mastery from server prop or browser-local storage once.
  const resolvedInitial = (() => {
    if (initialMastery) {
      return { feedback: "Previously verified.", mastery: initialMastery };
    }
    if (pathSlug && lessonSlug) {
      const local = getLessonMastery(pathSlug, lessonSlug);
      if (local) {
        return { feedback: "Previously verified on this device.", mastery: local };
      }
    }
    return null;
  })();

  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "fail">(
    resolvedInitial ? "success" : "idle",
  );
  const [output, setOutput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(resolvedInitial?.feedback ?? null);
  const [masteryScore, setMasteryScore] = useState<number | null>(
    resolvedInitial?.mastery.score ?? null,
  );
  const [matchedCriteria, setMatchedCriteria] = useState<string[]>(
    resolvedInitial?.mastery.matchedCriteria ?? [],
  );

  // No synchronisation effect needed — the component remounts when the lesson
  // route changes and resolvedInitial re-computes from fresh storage on mount.

  async function handleVerify() {
    setStatus("verifying");
    setFeedback(null);

    try {
      const response = await fetch("/api/lesson-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliverable, output, rubricCriteria, verifyCheck }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        matchedCriteria?: string[];
        message?: string;
        ok?: boolean;
        score?: number;
      };
      setFeedback(data.message ?? null);
      setStatus(data.ok ? "success" : "fail");
      setMatchedCriteria(data.matchedCriteria ?? []);
      setMasteryScore(typeof data.score === "number" ? data.score : null);

      if (data.ok && pathSlug && lessonSlug && typeof data.score === "number") {
        saveLessonMastery({
          lessonSlug,
          matchedCriteria: data.matchedCriteria ?? [],
          pathSlug,
          score: data.score,
        });

        try {
          await fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              completionData: {
                masteryScore: data.score,
                matchedCriteria: data.matchedCriteria ?? [],
                verificationSource: "lesson-verification",
                verifiedAt: new Date().toISOString(),
              },
              lessonSlug,
              pathSlug,
            }),
          });
        } catch {
          // Local mastery is already saved; server sync can catch up later.
        }
      }
    } catch {
      setStatus("fail");
      setFeedback("Verification service is temporarily unavailable. Keep your output and try again.");
    }
  }

  return (
    <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] overflow-hidden">
      <div className="border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-4 py-3 flex gap-2 items-center">
        <CheckCircle2 className="size-5 text-[var(--color-accent-primary)]" />
        <span className="font-semibold text-[var(--color-fg-default)]">Lesson Verification</span>
      </div>
      
      <div className="p-5 grid gap-5">
        <div className="grid gap-2">
          <div className="text-sm font-medium text-[var(--color-fg-muted)] uppercase tracking-wider">Deliverable</div>
          <div className="text-[var(--color-fg-default)]">{deliverable || "Complete the task above."}</div>
        </div>

        <div className="grid gap-2">
          <div className="text-sm font-medium text-[var(--color-fg-muted)] uppercase tracking-wider">Verification Task</div>
          <div className="text-[var(--color-fg-default)]">{verifyCheck || "Tutor Agent will review your progress."}</div>
        </div>

        {rubricCriteria.length ? (
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-medium text-[var(--color-fg-muted)] uppercase tracking-wider">Mastery rubric</div>
              {masteryScore !== null ? (
                <div className="text-sm font-semibold text-[var(--color-accent-primary)]">{masteryScore}/100</div>
              ) : null}
            </div>
            <div className="grid gap-2">
              {rubricCriteria.map((criterion) => {
                const matched = matchedCriteria.includes(criterion);
                return (
                  <div
                    key={criterion}
                    className={`rounded-[var(--radius-md)] border px-3 py-2 text-sm ${
                      matched
                        ? "border-[var(--color-accent-primary)] bg-[var(--color-accent-subtle)] text-[var(--color-fg-default)]"
                        : "border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] text-[var(--color-fg-muted)]"
                    }`}
                  >
                    {matched ? "✓ " : ""}{criterion}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="bg-[#1e1e1e] rounded-[var(--radius-md)] border border-[#333] shadow-inner mt-2">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-[#333] bg-[#2d2d2d] rounded-t-[var(--radius-md)]">
            <Terminal className="size-3.5 text-[#a3a3a3]" />
            <span className="text-xs text-[#a3a3a3] font-mono">Terminal Output</span>
          </div>
          <textarea 
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            disabled={status === "verifying" || status === "success"}
            placeholder="Paste your terminal output or code here to verify..."
            className="w-full bg-transparent text-[#d4d4d4] font-mono text-sm p-4 min-h-[120px] focus:outline-none resize-y"
          />
        </div>

        <div className="flex items-center justify-between mt-2 gap-3">
          {status === "success" && (
            <div className="flex items-center gap-2 text-[var(--color-accent-primary)] font-medium text-sm">
              <CheckCircle2 className="size-5" />
              {feedback || "Verification passed. You may proceed."}
            </div>
          )}
          {status === "fail" && (
            <div className="flex items-center gap-2 text-[var(--color-accent-warning)] font-medium text-sm">
              <ChevronRight className="size-5" />
              {feedback || "Not quite right. Please check your output and try again."}
            </div>
          )}
          {status === "idle" && !output.trim() && (
            <p className="text-xs text-[var(--color-fg-muted)]">
              Paste your terminal output or code above, then click <strong>Verify Work</strong>.
            </p>
          )}
          {status === "idle" && output.trim() ? <div /> : null}

          <button
            onClick={handleVerify}
            disabled={status === "verifying" || status === "success" || !output.trim()}
            className="button-primary shrink-0 ml-auto"
          >
            {status === "verifying" ? "Verifying..." : status === "success" ? "Verified" : "Verify Work"}
          </button>
        </div>
      </div>
    </div>
  );
}
