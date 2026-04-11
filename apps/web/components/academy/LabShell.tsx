"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { AcademyLab } from "@/lib/academy-content";

interface LabShellProps {
  lab: AcademyLab;
}

export function LabShell({ lab }: LabShellProps) {
  const steps = useMemo(
    () => [
      "Review the lab outcome and starter state.",
      "Run the first safe command or validation step.",
      "Capture evidence and compare against the expected output.",
      "Reflect on what changed and what you would reuse.",
    ],
    [],
  );
  const [started, setStarted] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [evidence, setEvidence] = useState("");

  const evidenceLooksValid =
    evidence.trim().length >= 20 &&
    lab.expectedOutput
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((token) => token.length >= 4)
      .slice(0, 3)
      .some((token) => evidence.toLowerCase().includes(token));

  function toggleCompletedStep(stepIndex: number) {
    setCompletedSteps((current) =>
      current.includes(stepIndex) ? current.filter((entry) => entry !== stepIndex) : [...current, stepIndex].sort(),
    );
  }

  return (
    <article className="panel overflow-hidden">
      <div className="border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-6 py-4">
        <div className="flex flex-wrap gap-2">
          <span className="badge">{lab.labType}</span>
          <span className="badge" data-tone="accent">{lab.estimatedMinutes} min</span>
          <span className="badge">Resettable lab</span>
        </div>
        <h2 className="mt-4 text-2xl font-semibold">{lab.title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--color-fg-muted)]">{lab.summary}</p>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4">
          <section className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] p-4">
            <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Starter state</div>
            <div className="mt-2 text-sm">
              {started
                ? "Starter state loaded. Use the current step and expected output to guide your work."
                : "A guided starter repo or local-machine checkpoint will load here. Start the lab to move into the guided flow."}
            </div>
          </section>

          <section className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Guided steps</div>
              <div className="text-xs text-[var(--color-fg-muted)]">
                Step {activeStep + 1} of {steps.length}
              </div>
            </div>
            <div className="mt-4 grid gap-2">
              {steps.map((step, index) => (
                <div
                  key={`${lab.slug}-step-${index}`}
                  className={`rounded-[var(--radius-lg)] border px-4 py-3 text-sm transition ${
                    activeStep === index
                      ? "border-[var(--color-accent-primary)] bg-[var(--color-accent-subtle)]"
                      : "border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)]"
                  }`}
                >
                  <button type="button" onClick={() => setActiveStep(index)} className="w-full text-left">
                    <span className="mr-2 font-semibold text-[var(--color-accent-primary)]">{index + 1}.</span>
                    {step}
                  </button>
                  <div className="mt-3">
                    <button
                      type="button"
                      className="button-ghost"
                      onClick={() => toggleCompletedStep(index)}
                    >
                      {completedSteps.includes(index) ? "Mark incomplete" : "Mark step complete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[#121926] p-4">
            <div className="text-xs uppercase tracking-[0.12em] text-[#93a4bf]">Terminal preview</div>
            <pre className="mt-3 overflow-x-auto rounded-[var(--radius-md)] border border-[#243245] bg-[#0b1220] p-4 text-xs text-[#d7e5f6]">
{`> lab --start ${lab.slug}
Preparing starter state...
${started ? "Loading instructions...\nStep active. Waiting for learner action..." : "Waiting for learner action..."}`}
            </pre>
          </section>
        </div>

        <aside className="grid gap-4">
          <section className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] p-4">
            <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Expected output</div>
            <div className="mt-2 text-sm">{lab.expectedOutput}</div>
            <div className="mt-4 text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Checkpoint progress</div>
            <div className="mt-2 text-sm">
              {completedSteps.length} of {steps.length} steps marked complete
            </div>
          </section>

          <section className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] p-4">
            <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Lab actions</div>
            <div className="mt-3 grid gap-3">
              <button type="button" className="button-primary" onClick={() => setStarted(true)}>
                {started ? "Lab in progress" : "Start lab"}
              </button>
              <button
                type="button"
                className="button-secondary"
                onClick={() => {
                  setStarted(false);
                  setActiveStep(0);
                  setCompletedSteps([]);
                  setEvidence("");
                  setShowHints(false);
                  setShowReference(false);
                }}
              >
                Reset starter state
              </button>
              <button type="button" className="button-secondary" onClick={() => setShowHints((current) => !current)}>
                {showHints ? "Hide hints" : "Reveal hints"}
              </button>
              <button type="button" className="button-ghost" onClick={() => setShowReference((current) => !current)}>
                {showReference ? "Hide reference" : "Compare with reference"}
              </button>
            </div>
          </section>

          <section className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] p-4">
            <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Evidence check</div>
            <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">
              Paste command output, a diff summary, or a short explanation of what you changed. This is a lightweight validation layer before richer lab grading lands.
            </p>
            <textarea
              value={evidence}
              onChange={(event) => setEvidence(event.target.value)}
              placeholder="Paste output or describe what changed..."
              className="mt-4 min-h-[120px] w-full rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] px-4 py-3 text-sm outline-none"
            />
            <div className="mt-3">
              <span className="badge" data-tone={evidenceLooksValid ? "accent" : "warning"}>
                {evidenceLooksValid ? "Evidence looks specific enough" : "Add more concrete evidence"}
              </span>
            </div>
          </section>

          {showHints ? (
            <section className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] p-4">
              <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Hints</div>
              <ul className="mt-3 grid gap-2 text-sm text-[var(--color-fg-muted)]">
                <li>Start with the smallest safe command or validation step.</li>
                <li>Check the expected output before changing direction.</li>
                <li>Capture evidence as you go instead of at the very end.</li>
              </ul>
            </section>
          ) : null}

          {showReference ? (
            <section className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] p-4">
              <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Reference comparison</div>
              <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">
                The next lab phase will show a structured reference snapshot here. For now, use the expected output panel and tutor guidance as your comparison anchor.
              </p>
            </section>
          ) : null}

          <section className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] p-4">
            <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Tutor side panel</div>
            <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">
              Tutor support for this lab will explain the next safe step, clarify the expected output, and help debug failures without taking over the whole task.
            </p>
            <div className="mt-4">
              <Link href="/prompt-context-studio" className="button-ghost">
                Open related guidance
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </article>
  );
}
