"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { recommendRuntime } from "@/lib/academy-core";
import type { AcademyRuntime } from "@/lib/academy-core";

interface RuntimeDecisionHelperProps {
  runtimeLearningPaths?: Record<
    string,
    Array<{
      href: string;
      summary?: string;
      title: string;
    }>
  >;
  runtimes: AcademyRuntime[];
}

export function RuntimeDecisionHelper({ runtimes, runtimeLearningPaths = {} }: RuntimeDecisionHelperProps) {
  const [setupTolerance, setSetupTolerance] = useState<"low" | "medium" | "high" | "any">("low");
  const [deploymentPath, setDeploymentPath] = useState<string>("local machine");
  const [interfaceOption, setInterfaceOption] = useState<string>("CLI");
  const [preferPersistence, setPreferPersistence] = useState(false);

  const deploymentOptions = useMemo(
    () => Array.from(new Set(runtimes.flatMap((runtime) => runtime.deploymentPaths))),
    [runtimes],
  );
  const interfaceOptions = useMemo(
    () => Array.from(new Set(runtimes.flatMap((runtime) => runtime.interfaceOptions))),
    [runtimes],
  );

  const recommendation = useMemo(
    () =>
      recommendRuntime(runtimes, {
        deploymentPath,
        interfaceOption,
        preferPersistence,
        prioritizeBeginnerSafety: true,
        setupTolerance,
      }),
    [deploymentPath, interfaceOption, preferPersistence, runtimes, setupTolerance],
  );

  const recommendedRuntime = recommendation
    ? runtimes.find((runtime) => runtime.slug === recommendation.recommendedSlug) ?? null
    : null;
  const alternativeRuntime =
    recommendation?.alternativeSlug
      ? runtimes.find((runtime) => runtime.slug === recommendation.alternativeSlug) ?? null
      : null;
  const nextPaths = recommendedRuntime ? runtimeLearningPaths[recommendedRuntime.slug] ?? [] : [];

  return (
    <section className="panel p-6">
      <div className="eyebrow">Best For Me</div>
      <h2 className="mt-3 text-2xl font-semibold">Pick a safe starting runtime based on how you want to learn</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--color-fg-muted)]">
        This helper favors beginner safety first, then adjusts based on your setup tolerance, target deployment path, and whether you specifically want persistence behavior.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        <label className="grid gap-2 text-sm">
          <span className="font-medium">Setup tolerance</span>
          <select value={setupTolerance} onChange={(event) => setSetupTolerance(event.target.value as typeof setupTolerance)} className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-3 py-2">
            <option value="low">Keep it light</option>
            <option value="medium">Moderate is fine</option>
            <option value="high">I can handle heavier setup</option>
            <option value="any">Any</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">Deployment path</span>
          <select value={deploymentPath} onChange={(event) => setDeploymentPath(event.target.value)} className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-3 py-2">
            {deploymentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">Preferred interface</span>
          <select value={interfaceOption} onChange={(event) => setInterfaceOption(event.target.value)} className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-3 py-2">
            {interfaceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-3 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-4 py-3 text-sm">
          <input
            type="checkbox"
            checked={preferPersistence}
            onChange={(event) => setPreferPersistence(event.target.checked)}
          />
          <span>I want persistence or memory-aware behavior</span>
        </label>
      </div>

      {recommendedRuntime ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <article className="rounded-[var(--radius-xl)] border border-[rgba(22,176,168,0.24)] bg-[rgba(22,176,168,0.08)] p-5">
            <div className="flex flex-wrap gap-2">
              <span className="badge" data-tone="accent">Recommended</span>
              <span className="badge">{recommendedRuntime.supportTier}</span>
              <span className="badge">Setup: {recommendedRuntime.setupComplexity}</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold">{recommendedRuntime.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{recommendation?.reason}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {recommendedRuntime.bestFor.map((entry) => (
                <span key={`${recommendedRuntime.slug}-${entry}`} className="badge">
                  {entry}
                </span>
              ))}
            </div>
          </article>

          <div className="grid gap-3">
            <Link href={`/runtime-lab/${recommendedRuntime.slug}`} className="button-primary">
              View recommended runtime
            </Link>
            {alternativeRuntime ? (
              <Link href={`/runtime-lab/compare?runtimes=${recommendedRuntime.slug},${alternativeRuntime.slug}`} className="button-secondary">
                Compare with alternative
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}

      {recommendedRuntime && nextPaths.length ? (
        <div className="mt-6 grid gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Start Here Next</div>
            <h3 className="mt-2 text-xl font-semibold">Open the most relevant academy path for {recommendedRuntime.title}</h3>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {nextPaths.slice(0, 2).map((path) => (
              <article
                key={`${recommendedRuntime.slug}-${path.href}`}
                className="rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] p-5"
              >
                <h4 className="text-lg font-semibold">{path.title}</h4>
                {path.summary ? <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{path.summary}</p> : null}
                <div className="mt-4">
                  <Link href={path.href} className="button-secondary">
                    Open path
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {recommendation?.scoreBreakdowns?.length ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {recommendation.scoreBreakdowns.slice(0, 3).map((entry, index) => (
            <article
              key={entry.runtime.slug}
              className={`rounded-[var(--radius-xl)] border p-5 ${
                index === 0
                  ? "border-[rgba(22,176,168,0.24)] bg-[rgba(22,176,168,0.08)]"
                  : "border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)]"
              }`}
            >
              <div className="flex flex-wrap gap-2">
                <span className="badge" data-tone={index === 0 ? "accent" : undefined}>
                  {index === 0 ? "Top match" : `Option ${index + 1}`}
                </span>
                <span className="badge">Score: {entry.totalScore}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{entry.runtime.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-fg-muted)]">Base score: {entry.baseScore}</p>
              <ul className="mt-3 grid gap-2 text-sm text-[var(--color-fg-muted)]">
                {entry.adjustments.map((adjustment) => (
                  <li key={`${entry.runtime.slug}-${adjustment}`} className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] px-3 py-2">
                    {adjustment}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
