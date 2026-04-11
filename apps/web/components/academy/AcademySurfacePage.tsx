import Link from "next/link";

interface AcademySurfacePageProps {
  eyebrow: string;
  title: string;
  description: string;
  highlights?: string[];
  stats?: Array<{ label: string; value: string }>;
  ctaHref?: string;
  ctaLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  children?: React.ReactNode;
}

export function AcademySurfacePage({
  eyebrow,
  title,
  description,
  highlights = [],
  stats = [],
  ctaHref,
  ctaLabel,
  secondaryHref,
  secondaryLabel,
  children,
}: AcademySurfacePageProps) {
  return (
    <main className="page-shell">
      <section className="panel p-8">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-fg-muted)]">{description}</p>

        {highlights.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {highlights.map((highlight) => (
              <span key={highlight} className="badge" data-tone="accent">
                {highlight}
              </span>
            ))}
          </div>
        ) : null}

        {(ctaHref && ctaLabel) || (secondaryHref && secondaryLabel) ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {ctaHref && ctaLabel ? (
              <Link href={ctaHref} className="button-primary">
                {ctaLabel}
              </Link>
            ) : null}
            {secondaryHref && secondaryLabel ? (
              <Link href={secondaryHref} className="button-secondary">
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        ) : null}

        {stats.length ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-4 py-4">
                <div className="text-2xl font-semibold">{stat.value}</div>
                <div className="mt-1 text-sm text-[var(--color-fg-muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      {children ? <section className="mt-8 grid gap-6">{children}</section> : null}
    </main>
  );
}
