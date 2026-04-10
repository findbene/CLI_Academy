import Link from "next/link";
import type { AcademySurface } from "@/lib/academy";

interface AcademySurfaceCardProps {
  surface: AcademySurface;
}

export function AcademySurfaceCard({ surface }: AcademySurfaceCardProps) {
  return (
    <article className="panel panel-lift p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="eyebrow">{surface.label}</div>
        <span className="badge" data-tone={surface.status === "live-now" ? "accent" : surface.status === "seeded-now" ? "warning" : undefined}>
          {surface.status === "live-now" ? "Live now" : surface.status === "seeded-now" ? "Seeded now" : "Next up"}
        </span>
      </div>
      <h3 className="mt-3 text-2xl font-semibold">{surface.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{surface.summary}</p>
      <div className="mt-5">
        <Link href={surface.href} className="button-secondary">
          Explore {surface.title}
        </Link>
      </div>
    </article>
  );
}
