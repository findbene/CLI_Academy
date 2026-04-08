"use client";

import { CheckCircle2, ListChecks, Search } from "lucide-react";

export type LearningMode = "guided" | "hint" | "independent";

interface LearningModeSelectorProps {
  currentMode: LearningMode;
  onChange: (mode: LearningMode) => void;
}

export function LearningModeSelector({ currentMode, onChange }: LearningModeSelectorProps) {
  return (
    <div className="grid gap-4">
      <div className="text-sm font-semibold">Learning Mode</div>
      <div className="grid grid-cols-1 gap-3">
        <button
          type="button"
          onClick={() => onChange("guided")}
          className={`relative flex items-start gap-4 rounded-[var(--radius-lg)] border p-4 text-left transition-colors ${
            currentMode === "guided"
              ? "border-[var(--color-accent-primary)] bg-[var(--color-bg-panel-subtle)] ring-1 ring-[var(--color-accent-primary)]"
              : "border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] hover:border-[var(--color-border-hover)]"
          }`}
        >
          <div className={`mt-0.5 rounded-full p-1 ${currentMode === "guided" ? "bg-[var(--color-accent-primary)] text-white" : "bg-[var(--color-bg-panel-subtle)]"}`}>
            <ListChecks className="size-4" />
          </div>
          <div>
            <div className="font-medium text-[var(--color-fg-default)] flex gap-2 items-center">
              Guided
              {currentMode === "guided" && <CheckCircle2 className="size-4 text-[var(--color-accent-primary)]" />}
            </div>
            <p className="mt-1 text-sm text-[var(--color-fg-muted)]">Oversight and explicit instructions at every step.</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onChange("hint")}
          className={`relative flex items-start gap-4 rounded-[var(--radius-lg)] border p-4 text-left transition-colors ${
            currentMode === "hint"
              ? "border-[var(--color-accent-primary)] bg-[var(--color-bg-panel-subtle)] ring-1 ring-[var(--color-accent-primary)]"
              : "border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] hover:border-[var(--color-border-hover)]"
          }`}
        >
          <div className={`mt-0.5 rounded-full p-1 ${currentMode === "hint" ? "bg-[var(--color-accent-primary)] text-white" : "bg-[var(--color-bg-panel-subtle)]"}`}>
            <Search className="size-4" />
          </div>
          <div>
            <div className="font-medium text-[var(--color-fg-default)] flex gap-2 items-center">
              Hint-based
              {currentMode === "hint" && <CheckCircle2 className="size-4 text-[var(--color-accent-primary)]" />}
            </div>
            <p className="mt-1 text-sm text-[var(--color-fg-muted)]">Course correction when stuck, but you try first.</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onChange("independent")}
          className={`relative flex items-start gap-4 rounded-[var(--radius-lg)] border p-4 text-left transition-colors ${
            currentMode === "independent"
              ? "border-[var(--color-accent-primary)] bg-[var(--color-bg-panel-subtle)] ring-1 ring-[var(--color-accent-primary)]"
              : "border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] hover:border-[var(--color-border-hover)]"
          }`}
        >
          <div className={`mt-0.5 rounded-full p-1 ${currentMode === "independent" ? "bg-[var(--color-accent-primary)] text-white" : "bg-[var(--color-bg-panel-subtle)]"}`}>
            <CheckCircle2 className="size-4" />
          </div>
          <div>
            <div className="font-medium text-[var(--color-fg-default)] flex gap-2 items-center">
              Independent
              {currentMode === "independent" && <CheckCircle2 className="size-4 text-[var(--color-accent-primary)]" />}
            </div>
            <p className="mt-1 text-sm text-[var(--color-fg-muted)]">Verification only. You are completely on your own.</p>
          </div>
        </button>
      </div>
    </div>
  );
}
