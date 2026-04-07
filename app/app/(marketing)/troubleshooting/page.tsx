import type { Metadata } from "next";
import Link from "next/link";
import { knownIssues, troubleshootingGuides } from "@/lib/support";

export const metadata: Metadata = {
  title: "Troubleshooting",
  description:
    "Start with the symptom. Known issues, error codes, and step-by-step fixes for Claude Code, Claude CoWork, and related agentic tools on Windows, macOS, and Linux.",
};


export default function TroubleshootingPage() {
  return (
    <main className="page-shell">
      <div className="max-w-3xl">
        <div className="eyebrow">Troubleshooting center</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Start with the symptom, not the panic</h1>
        <p className="mt-4 text-lg leading-8 text-[var(--color-fg-muted)]">
          Troubleshooting is part of the curriculum, not a support afterthought. Find common failure patterns,
          diagnostic steps, and next-step guidance organized by symptom.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/compatibility" className="button-secondary">
            Check compatibility first
          </Link>
          <Link href="/trust" className="button-primary">
            Open trust center
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {troubleshootingGuides.map((guide) => (
          <article key={guide.slug} className="panel p-5">
            <div className="flex flex-wrap gap-2">
              <span className="badge" data-tone={guide.severity === "advanced" ? "danger" : guide.severity === "important" ? "warning" : "accent"}>
                {guide.severity}
              </span>
              <span className="badge">{guide.problemArea}</span>
            </div>
            <h2 className="text-xl font-semibold">{guide.title}</h2>
            <div className="mt-4 text-sm font-medium">Symptoms</div>
            <ul className="mt-2 grid gap-2 text-sm leading-6 text-[var(--color-fg-muted)]">
              {guide.symptoms.map((symptom) => (
                <li key={symptom}>• {symptom}</li>
              ))}
            </ul>
            <div className="mt-4 text-sm font-medium">Likely cause</div>
            <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{guide.likelyCause}</p>
            <div className="mt-4 text-sm font-medium">Safest checks</div>
            <ul className="mt-2 grid gap-2 text-sm leading-6 text-[var(--color-fg-muted)]">
              {guide.safestChecks.map((check) => (
                <li key={check}>• {check}</li>
              ))}
            </ul>
            <div className="mt-4 text-sm font-medium">Next safest step</div>
            <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{guide.nextStep}</p>
          </article>
        ))}
      </div>

      <section className="mt-10 panel p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold">Known issues that may explain a failure</h2>
          <Link href="/trust" className="button-secondary">
            View all trust notes
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {knownIssues.map((issue) => (
            <article key={issue.slug} className="rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] p-4">
              <div className="flex flex-wrap gap-2">
                <span className="badge" data-tone={issue.status === "resolved" ? "accent" : issue.status === "monitoring" ? "warning" : "danger"}>
                  {issue.status}
                </span>
                <span className="badge">{issue.tool}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{issue.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{issue.workaround}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
