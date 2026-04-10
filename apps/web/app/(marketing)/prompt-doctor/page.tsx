import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prompt Doctor",
  description:
    "Prompt Doctor improves rough prompts into reusable structured variants with checklists, token guidance, and save-to-library workflow framing.",
};

const refinedVariants = [
  "Task-focused rewrite",
  "Structured XML variant",
  "Reusable template with variables",
  "Harness-ready evaluation version",
];

const diagnosticChecks = [
  "Does the prompt define the deliverable clearly?",
  "Are constraints and boundaries visible?",
  "Does the context belong in the prompt or in a separate packet?",
  "Would a reviewer know how to judge success?",
];

export default function PromptDoctorPage() {
  return (
    <main className="page-shell py-12">
      <section className="panel p-6">
        <div className="eyebrow">Prompt Doctor</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">Paste a rough prompt. Leave with a cleaner, safer, reusable one.</h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-[var(--color-fg-muted)]">
          Prompt Doctor is the repair layer inside Prompt &amp; Context Studio. It helps learners improve weak task
          requests, choose the right structure, estimate prompt quality, and decide what should move into templates,
          context packets, or evaluation harnesses.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/prompt-context-studio" className="button-primary">
            Back to Prompt Studio
          </Link>
          <Link href="/asset-vault" className="button-secondary">
            Open prompt packs
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <article className="panel p-6">
          <div className="eyebrow">Rough prompt</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Before</h2>
          <div className="mt-4 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] p-4 text-sm leading-6 text-[var(--color-fg-muted)]">
            Help me automate my notes and make the output better.
          </div>
          <div className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">
            Diagnostic checklist
          </div>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-fg-muted)]">
            {diagnosticChecks.map((check) => (
              <li key={check}>• {check}</li>
            ))}
          </ul>
        </article>

        <article className="panel p-6">
          <div className="eyebrow">Improved outputs</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">After</h2>
          <div className="mt-4 grid gap-3">
            {refinedVariants.map((variant) => (
              <div key={variant} className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] px-4 py-3 text-sm font-medium">
                {variant}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[var(--radius-lg)] bg-[var(--color-accent-subtle)] p-4 text-sm leading-6 text-[var(--color-fg-muted)]">
            Prompt Doctor also estimates token pressure, explains what changed, and suggests whether the prompt should
            be saved to the library, converted into a template, or tested inside a harness.
          </div>
        </article>
      </section>
    </main>
  );
}
