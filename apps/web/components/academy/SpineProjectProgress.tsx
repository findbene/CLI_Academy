import { SPINE_STAGES } from "@/lib/data/academy";

interface SpineProjectProgressProps {
  activeWeek?: number;
  title?: string;
}

export function SpineProjectProgress({
  activeWeek = 1,
  title = "Your Personal AI Workforce",
}: SpineProjectProgressProps) {
  return (
    <section className="panel p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="eyebrow">Spine project progress</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--color-fg-muted)]">
            Every major course feeds one evolving system, starting with a safe local assistant and ending with a
            portfolio-grade autonomous AI workforce.
          </p>
        </div>
        <div className="rounded-full bg-[var(--color-accent-subtle)] px-4 py-2 text-sm font-medium text-[var(--color-accent-primary)]">
          Current milestone: Week {activeWeek}
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {SPINE_STAGES.map((stage) => {
          const isActive = stage.week === activeWeek;
          const isComplete = stage.week < activeWeek;

          return (
            <article
              key={stage.week}
              className={`rounded-[var(--radius-xl)] border px-4 py-4 ${
                isActive
                  ? "border-[var(--color-accent-primary)] bg-[var(--color-accent-subtle)]"
                  : isComplete
                    ? "border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)]"
                    : "border-[var(--color-border-subtle)]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold">Week {stage.week}</span>
                <span className="badge" data-tone={isActive ? "accent" : isComplete ? "success" : "default"}>
                  {isActive ? "Current" : isComplete ? "Unlocked" : "Upcoming"}
                </span>
              </div>
              <div className="mt-3 text-sm leading-6 text-[var(--color-fg-default)]">{stage.label}</div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
