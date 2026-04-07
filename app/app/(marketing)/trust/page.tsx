import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trust & Safety",
  description:
    "Our commitments on content freshness, safety warnings, transparent pricing, and responsible AI agent workflows at CLI Academy.",
};

import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Radio,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { getPublishedCatalogPaths } from "@/lib/catalog";
import {
  compatibilityEntries,
  getFreshnessState,
  knownIssues,
  releaseRadar,
} from "@/lib/support";

function toneForFreshness(state: ReturnType<typeof getFreshnessState>) {
  if (state === "fresh") {
    return "accent";
  }

  return state === "review-due" ? "warning" : "danger";
}

function toneForIssueStatus(status: string) {
  if (status === "resolved") {
    return "accent";
  }

  return status === "monitoring" ? "warning" : "danger";
}

export default async function TrustPage() {
  const catalogPaths = await getPublishedCatalogPaths();
  const pathFreshness = catalogPaths
    .filter((path) => path.status === "available")
    .slice(0, 6)
    .map((path) => ({
      ...path,
      freshness: getFreshnessState(path.lastReviewedAt),
    }));

  return (
    <main className="page-shell">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="panel p-6">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent-subtle)]">
              <ShieldCheck className="size-6 text-[var(--color-accent-primary)]" />
            </div>
            <div>
              <div className="eyebrow">Trust center</div>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight">
                Transparency you can verify
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-fg-muted)]">
                CLI Academy makes freshness, compatibility, warnings, and known issues visible — so you can trust what you are learning.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-subtle)] px-3 py-1.5 text-sm text-[var(--color-accent-primary)]">
              <CheckCircle2 className="size-3.5" />
              {compatibilityEntries.length} environment notes
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(214,90,70,0.10)] px-3 py-1.5 text-sm text-[var(--color-status-danger)]">
              <AlertCircle className="size-3.5" />
              {knownIssues.length} tracked issues
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(201,134,18,0.10)] px-3 py-1.5 text-sm text-[var(--color-accent-warning)]">
              <Radio className="size-3.5" />
              {releaseRadar.length} release radar
            </div>
          </div>
        </div>

        <aside className="panel p-6">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="size-4 text-[var(--color-accent-primary)]" />
            What learners should expect here
          </div>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-[var(--color-fg-muted)]">
            <p>What the team considers the safest default environment right now.</p>
            <p>What is supported but still quirky enough to deserve extra explanation.</p>
            <p>What known issues or rollout constraints might explain a failure before a learner blames themselves.</p>
          </div>
        </aside>
      </section>

      <section className="mt-10 grid gap-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold">Freshness snapshot</h2>
          <Link href="/paths" className="button-secondary">
            Browse paths
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pathFreshness.map((path) => (
            <article key={path.slug} className="panel p-5 transition hover:shadow-md">
              <div className="flex flex-wrap gap-2">
                <span className="badge" data-tone={toneForFreshness(path.freshness)}>
                  {path.freshness === "fresh"
                    ? "Fresh"
                    : path.freshness === "review-due"
                      ? "Review due"
                      : "Stale"}
                </span>
                {path.versionLabel ? <span className="badge">{path.versionLabel}</span> : null}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{path.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{path.summary}</p>
              <div className="mt-4 flex items-center gap-3 text-sm text-[var(--color-fg-muted)]">
                <span>{path.availableLessonCount} lessons</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3" />
                  {path.lastReviewedAt ?? "No review date"}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="panel p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold">Known issues</h2>
            <Link href="/troubleshooting" className="button-secondary">
              Open troubleshooting
            </Link>
          </div>
          <div className="mt-5 grid gap-4">
            {knownIssues.map((issue) => (
              <article key={issue.slug} className="rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] p-4">
                <div className="flex flex-wrap gap-2">
                  <span className="badge" data-tone={toneForIssueStatus(issue.status)}>
                    {issue.status}
                  </span>
                  <span className="badge">{issue.tool}</span>
                  <span className="badge">{issue.updatedAt}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{issue.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{issue.affected}</p>
                <div className="mt-4 text-sm font-medium">Safest workaround</div>
                <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{issue.workaround}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="panel p-6">
          <div className="text-2xl font-semibold">Release radar</div>
          <div className="mt-5 grid gap-4">
            {releaseRadar.map((release) => (
              <article key={release.slug} className="rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] p-4">
                <div className="flex flex-wrap gap-2">
                  <span className="badge" data-tone={release.impactLevel === "high" ? "danger" : release.impactLevel === "medium" ? "warning" : "accent"}>
                    {release.impactLevel} impact
                  </span>
                  <span className="badge">{release.releaseDate}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{release.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{release.summary}</p>
                <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{release.learnerImpact}</p>
                {release.actionRequired ? (
                  <div className="callout mt-4" data-tone="warning">
                    <h3>Action required</h3>
                    <p>Content and support notes should stay aligned with this change.</p>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
