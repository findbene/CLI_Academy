import type { AcademyStandard } from "@/lib/academy";

interface AcademyStandardsPanelProps {
  standards: AcademyStandard[];
  title?: string;
  eyebrow?: string;
}

export function AcademyStandardsPanel({
  standards,
  title = "What every chapter includes",
  eyebrow = "Delivery standard",
}: AcademyStandardsPanelProps) {
  return (
    <section className="panel p-6">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {standards.map((standard) => (
          <article key={standard.title} className="rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] p-4">
            <h3 className="text-lg font-semibold">{standard.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{standard.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
