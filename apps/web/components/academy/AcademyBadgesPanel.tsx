import type { AcademyBadge } from "@/lib/academy";

interface AcademyBadgesPanelProps {
  badges: AcademyBadge[];
}

export function AcademyBadgesPanel({ badges }: AcademyBadgesPanelProps) {
  return (
    <section className="panel p-6">
      <div className="eyebrow">Badges</div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight">Light motivation, tied to real outcomes</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {badges.map((badge) => (
          <article key={badge.title} className="rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] p-4">
            <span className="badge" data-tone="warning">{badge.title}</span>
            <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{badge.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
