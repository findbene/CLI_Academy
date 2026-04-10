import { SPINE_PROJECT_STAGES } from "@/lib/academy";

interface SpineProjectDashboardProps {
  currentStage?: number;
}

export function SpineProjectDashboard({ currentStage = 1 }: SpineProjectDashboardProps) {
  return (
    <section className="panel p-6">
      <div className="eyebrow">Spine project</div>
      <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Your Personal AI Workforce</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--color-fg-muted)]">
            One evolving system carries the whole academy. Each stage leaves you with a working artifact,
            not just course completion.
          </p>
        </div>
        <div className="rounded-full bg-[var(--color-accent-subtle)] px-4 py-2 text-sm font-medium text-[var(--color-accent-primary)]">
          Stage {currentStage} of {SPINE_PROJECT_STAGES.length}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {SPINE_PROJECT_STAGES.map((stage) => {
          const isCurrent = stage.stage === currentStage;
          const isComplete = stage.stage < currentStage;

          return (
            <article
              key={stage.stage}
              className={`rounded-[var(--radius-xl)] border p-4 ${
                isCurrent
                  ? "border-[var(--color-accent-primary)] bg-[var(--color-accent-subtle)]"
                  : isComplete
                    ? "border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)]"
                    : "border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-[var(--color-fg-default)]">Stage {stage.stage}</div>
                <span className="badge" data-tone={isCurrent ? "accent" : isComplete ? "warning" : undefined}>
                  {isCurrent ? "Current" : isComplete ? "Unlocked" : "Later"}
                </span>
              </div>
              <h3 className="mt-3 text-xl font-semibold">{stage.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{stage.summary}</p>
              <div className="mt-3 text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">
                Artifact: {stage.artifact}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
