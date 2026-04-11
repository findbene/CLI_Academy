"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { AcademyRuntime } from "@/lib/academy-content";

interface RuntimeLabBrowserProps {
  runtimes: AcademyRuntime[];
}

export function RuntimeLabBrowser({ runtimes }: RuntimeLabBrowserProps) {
  const supportTiers = useMemo(() => ["all", ...new Set(runtimes.map((runtime) => runtime.supportTier))], [runtimes]);
  const beginnerFits = useMemo(
    () => ["all", ...new Set(runtimes.map((runtime) => runtime.beginnerFriendliness))],
    [runtimes],
  );

  const [supportTier, setSupportTier] = useState("all");
  const [beginnerFit, setBeginnerFit] = useState("all");
  const [selectedRuntimeSlugs, setSelectedRuntimeSlugs] = useState<string[]>(["openclaw", "hermes-agent"]);

  function toggleRuntimeSelection(slug: string) {
    setSelectedRuntimeSlugs((current) => {
      if (current.includes(slug)) {
        return current.filter((entry) => entry !== slug);
      }

      if (current.length < 2) {
        return [...current, slug];
      }

      return [current[1], slug];
    });
  }

  const filteredRuntimes = useMemo(
    () =>
      runtimes.filter((runtime) => {
        const tierMatch = supportTier === "all" || runtime.supportTier === supportTier;
        const fitMatch = beginnerFit === "all" || runtime.beginnerFriendliness === beginnerFit;
        return tierMatch && fitMatch;
      }),
    [runtimes, supportTier, beginnerFit],
  );

  const compareHref =
    selectedRuntimeSlugs.length === 2 ? `/runtime-lab/compare?runtimes=${selectedRuntimeSlugs.join(",")}` : null;

  return (
    <div className="grid gap-6">
      <div className="panel p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Support tier</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {supportTiers.map((entry) => (
                <button
                  key={entry}
                  type="button"
                  onClick={() => setSupportTier(entry)}
                  className="badge"
                  data-tone={supportTier === entry ? "accent" : undefined}
                >
                  {entry}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Beginner fit</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {beginnerFits.map((entry) => (
                <button
                  key={entry}
                  type="button"
                  onClick={() => setBeginnerFit(entry)}
                  className="badge"
                  data-tone={beginnerFit === entry ? "warning" : undefined}
                >
                  {entry}
                </button>
              ))}
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Compare tray</div>
            <div className="mt-3 rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] p-4">
              <div className="text-sm leading-6 text-[var(--color-fg-muted)]">
                Pick two runtimes to compare setup burden, support maturity, and beginner fit.
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedRuntimeSlugs.length ? (
                  selectedRuntimeSlugs.map((slug) => (
                    <span key={slug} className="badge" data-tone="accent">
                      {slug}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-[var(--color-fg-muted)]">Select two runtimes below.</span>
                )}
              </div>
              <div className="mt-4">
                {compareHref ? (
                  <Link href={compareHref} className="button-primary">
                    Compare selected runtimes
                  </Link>
                ) : (
                  <span className="inline-flex rounded-full border border-dashed border-[var(--color-border-subtle)] px-4 py-2 text-sm text-[var(--color-fg-muted)]">
                    Select 2 runtimes
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {filteredRuntimes.map((runtime) => (
          <article key={runtime.slug} className="panel p-6">
            <div className="flex flex-wrap gap-2">
              <span className="badge" data-tone={runtime.supportTier === "stable" ? "accent" : runtime.supportTier === "emerging" ? "warning" : "danger"}>
                {runtime.supportTier}
              </span>
              <span className="badge">Beginner fit: {runtime.beginnerFriendliness}</span>
            </div>
            <h2 className="mt-4 text-xl font-semibold">{runtime.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{runtime.summary}</p>
            <div className="mt-4 text-sm">Best for: {runtime.bestFor.join(", ")}</div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => toggleRuntimeSelection(runtime.slug)}
                className="button-secondary"
              >
                {selectedRuntimeSlugs.includes(runtime.slug) ? "Remove from compare" : "Add to compare"}
              </button>
              <Link href={`/runtime-lab/${runtime.slug}`} className="button-secondary">
                View detail
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
