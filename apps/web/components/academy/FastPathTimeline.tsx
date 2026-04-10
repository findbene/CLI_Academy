"use client";

import { FAST_PATH_WEEKS } from "@/lib/data/academy";

interface FastPathTimelineProps {
  activeWeek?: number;
  compact?: boolean;
}

export function FastPathTimeline({ activeWeek = 1, compact = false }: FastPathTimelineProps) {
  return (
    <div className={`grid gap-4 ${compact ? "md:grid-cols-4 xl:grid-cols-8" : "md:grid-cols-2 xl:grid-cols-4"}`}>
      {FAST_PATH_WEEKS.map((week) => {
        const isActive = week.week === activeWeek;

        return (
          <article
            key={week.week}
            className={`panel p-5 transition ${
              isActive ? "border-[var(--color-accent-primary)] bg-[var(--color-accent-subtle)]" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="badge" data-tone={isActive ? "accent" : "default"}>
                Week {week.week}
              </span>
              <span className="text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">
                {week.hours}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[var(--color-fg-default)]">{week.title}</h3>
            {!compact ? (
              <>
                <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{week.outcome}</p>
                <div className="mt-4 rounded-[var(--radius-lg)] bg-[var(--color-bg-panel-subtle)] px-3 py-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">
                    Working artifact
                  </div>
                  <div className="mt-2 text-sm font-medium text-[var(--color-fg-default)]">{week.artifact}</div>
                </div>
              </>
            ) : (
              <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{week.artifact}</p>
            )}
          </article>
        );
      })}
    </div>
  );
}
