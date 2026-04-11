import { compareRuntimes } from "@/lib/academy-core";
import Link from "next/link";
import type { AcademyRuntime } from "@/lib/academy-core";

interface RuntimeCompareTableProps {
  left: AcademyRuntime;
  learningPathsByRuntime?: Record<
    string,
    Array<{
      href: string;
      title: string;
    }>
  >;
  right: AcademyRuntime;
}

const ROWS: Array<{ label: string; getValue: (runtime: AcademyRuntime) => string }> = [
  { label: "Support tier", getValue: (runtime) => runtime.supportTier },
  { label: "Maturity", getValue: (runtime) => runtime.maturityLabel },
  { label: "Beginner fit", getValue: (runtime) => runtime.beginnerFriendliness },
  { label: "Setup complexity", getValue: (runtime) => runtime.setupComplexity },
  { label: "Setup time", getValue: (runtime) => runtime.setupTime },
  { label: "Deployment paths", getValue: (runtime) => runtime.deploymentPaths.join(", ") },
  { label: "Interface options", getValue: (runtime) => runtime.interfaceOptions.join(", ") },
  { label: "Best for", getValue: (runtime) => runtime.bestFor.join(", ") },
  { label: "Recommended for", getValue: (runtime) => runtime.recommendedFor.join(", ") },
  { label: "Avoid if", getValue: (runtime) => runtime.avoidIf.join(", ") },
];

export function RuntimeCompareTable({ left, right, learningPathsByRuntime = {} }: RuntimeCompareTableProps) {
  const recommendation = compareRuntimes(left, right);
  const recommendedRuntime = recommendation.recommendedSlug === left.slug ? left : right;

  return (
    <section className="grid gap-6">
      <article className="panel p-6">
        <div className="eyebrow">Decision helper</div>
        <h2 className="mt-3 text-2xl font-semibold">{recommendedRuntime.title} is the safer default for this comparison</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{recommendation.reason}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="badge" data-tone="accent">
            Recommendation confidence: {recommendation.confidence}
          </span>
          <span className="badge">Default choice: {recommendedRuntime.slug}</span>
        </div>
      </article>

      <article className="panel overflow-hidden">
        <div className="grid grid-cols-[minmax(160px,220px)_1fr_1fr] border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)]">
          <div className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Category</div>
          <div className="px-4 py-4 text-sm font-semibold">{left.title}</div>
          <div className="px-4 py-4 text-sm font-semibold">{right.title}</div>
        </div>
        {ROWS.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[minmax(160px,220px)_1fr_1fr] border-b border-[var(--color-border-subtle)] last:border-b-0"
          >
            <div className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-fg-muted)]">{row.label}</div>
            <div className="px-4 py-4 text-sm leading-6">{row.getValue(left)}</div>
            <div className="px-4 py-4 text-sm leading-6">{row.getValue(right)}</div>
          </div>
        ))}
      </article>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="panel p-6">
          <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">{left.title} strengths</div>
          <ul className="mt-4 grid gap-2 text-sm">
            {(left.pros ?? []).map((entry) => (
              <li key={`${left.slug}-${entry}`} className="rounded-[var(--radius-lg)] border border-[rgba(22,176,168,0.20)] bg-[rgba(22,176,168,0.08)] px-4 py-3">
                {entry}
              </li>
            ))}
          </ul>
          <div className="mt-6 text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Watch out for</div>
          <ul className="mt-3 grid gap-2 text-sm">
            {left.avoidIf.map((entry) => (
              <li key={`${left.slug}-avoid-${entry}`} className="rounded-[var(--radius-lg)] border border-[rgba(214,90,70,0.20)] bg-[rgba(214,90,70,0.08)] px-4 py-3">
                {entry}
              </li>
            ))}
          </ul>
          {learningPathsByRuntime[left.slug]?.length ? (
            <div className="mt-6">
              <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Learn this runtime in</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {learningPathsByRuntime[left.slug].slice(0, 2).map((path) => (
                  <Link key={`${left.slug}-${path.href}`} href={path.href} className="button-secondary">
                    {path.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </article>

        <article className="panel p-6">
          <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">{right.title} strengths</div>
          <ul className="mt-4 grid gap-2 text-sm">
            {(right.pros ?? []).map((entry) => (
              <li key={`${right.slug}-${entry}`} className="rounded-[var(--radius-lg)] border border-[rgba(22,176,168,0.20)] bg-[rgba(22,176,168,0.08)] px-4 py-3">
                {entry}
              </li>
            ))}
          </ul>
          <div className="mt-6 text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Watch out for</div>
          <ul className="mt-3 grid gap-2 text-sm">
            {right.avoidIf.map((entry) => (
              <li key={`${right.slug}-avoid-${entry}`} className="rounded-[var(--radius-lg)] border border-[rgba(214,90,70,0.20)] bg-[rgba(214,90,70,0.08)] px-4 py-3">
                {entry}
              </li>
            ))}
          </ul>
          {learningPathsByRuntime[right.slug]?.length ? (
            <div className="mt-6">
              <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Learn this runtime in</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {learningPathsByRuntime[right.slug].slice(0, 2).map((path) => (
                  <Link key={`${right.slug}-${path.href}`} href={path.href} className="button-secondary">
                    {path.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </article>
      </div>
    </section>
  );
}
