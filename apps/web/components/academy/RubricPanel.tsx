import type { AcademyRubric } from "@/lib/academy-content";

interface RubricPanelProps {
  rubric: AcademyRubric;
}

export function RubricPanel({ rubric }: RubricPanelProps) {
  return (
    <article className="panel p-6">
      <div className="flex flex-wrap gap-2">
        <span className="badge" data-tone="warning">Rubric</span>
        <span className="badge">Review criteria</span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold">{rubric.title}</h3>
      <div className="mt-5 grid gap-3">
        {rubric.criteria.map((criterion, index) => (
          <div
            key={`${rubric.slug}-criterion-${index}`}
            className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-4 py-3 text-sm"
          >
            <span className="mr-2 font-semibold text-[var(--color-accent-primary)]">{index + 1}.</span>
            {criterion}
          </div>
        ))}
      </div>
    </article>
  );
}
