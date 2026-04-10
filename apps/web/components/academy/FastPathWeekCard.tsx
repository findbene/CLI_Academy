import Link from "next/link";
import type { FastPathWeek } from "@/lib/academy";

interface FastPathWeekCardProps {
  week: FastPathWeek;
}

export function FastPathWeekCard({ week }: FastPathWeekCardProps) {
  return (
    <article className="panel panel-lift p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="eyebrow">Week {week.week}</div>
        <span className="badge" data-tone="accent">
          {week.hours}
        </span>
      </div>
      <h3 className="mt-3 text-2xl font-semibold">{week.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{week.focus}</p>
      <div className="mt-4 grid gap-2 text-sm">
        <div>
          <span className="font-semibold text-[var(--color-fg-default)]">Artifact:</span> {week.artifact}
        </div>
        <div>
          <span className="font-semibold text-[var(--color-fg-default)]">Unlock:</span> {week.unlock}
        </div>
        <div>
          <span className="font-semibold text-[var(--color-fg-default)]">Week win:</span> {week.celebration}
        </div>
      </div>
      <div className="mt-4">
        <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Modes available</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {week.modeSupport.map((mode) => (
            <span key={mode} className="badge">{mode}</span>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {week.mappedPathSlugs.length ? (
          week.mappedPathSlugs.map((slug) => <span key={slug} className="badge">{slug}</span>)
        ) : (
          <span className="badge">Seeded 2026 academy content</span>
        )}
      </div>
      <div className="mt-5">
        <Link href={week.liveHref} className="button-secondary">
          Open week bridge
        </Link>
      </div>
    </article>
  );
}
