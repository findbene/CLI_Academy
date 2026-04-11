import type { AcademyExercise } from "@/lib/academy-content";

interface ExerciseCardProps {
  exercise: AcademyExercise;
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <article className="panel p-6">
      <div className="flex flex-wrap gap-2">
        <span className="badge">Exercise</span>
        <span className="badge" data-tone="accent">Applied practice</span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold">{exercise.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{exercise.summary}</p>
      {exercise.steps?.length ? (
        <ol className="mt-5 grid gap-2 text-sm text-[var(--color-fg-default)]">
          {exercise.steps.map((step, index) => (
            <li key={`${exercise.slug}-step-${index}`} className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-4 py-3">
              <span className="mr-2 font-semibold text-[var(--color-accent-primary)]">{index + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      ) : null}
      <div className="mt-5 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-4 py-4">
        <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Expected artifact</div>
        <div className="mt-2 text-sm">{exercise.expectedArtifact}</div>
      </div>
    </article>
  );
}
