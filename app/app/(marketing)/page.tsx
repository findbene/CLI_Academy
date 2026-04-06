import Link from "next/link";
import { PATHS } from "@/lib/data/paths";

const featuredPaths = PATHS.filter((path) => path.status === "available").slice(0, 3);

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
        <div>
          <div className="eyebrow">Beginner-first setup academy</div>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-[var(--color-fg-default)]">
            The calmest way to set up, troubleshoot, and start using Claude Code and Claude CoWork.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-fg-muted)]">
            CLI Academy is being rebuilt from recovered architecture notes and content assets. The core promise stays
            intact: help ordinary people get Claude-based tools working on real machines without fear, confusion, or
            technical overwhelm.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/paths" className="button-primary">
              Explore the path catalog
            </Link>
            <Link href="/pricing" className="button-secondary">
              View plans
            </Link>
          </div>
          <div className="metadata-bar mt-6">
            <span>Free foundations</span>
            <span>Contextual tutor</span>
            <span>Downloads and checklists</span>
            <span>Trust-first teaching</span>
          </div>
        </div>

        <div className="panel p-6">
          <div className="eyebrow">Recovered roadmap</div>
          <div className="mt-4 grid gap-4">
            <div className="rounded-[var(--radius-lg)] bg-[var(--color-bg-panel-subtle)] p-4">
              <div className="text-sm font-semibold">What survived</div>
              <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
                The schema, backend scaffold, and foundation lessons are still here. The frontend source is what had
                to be rebuilt.
              </p>
            </div>
            <div className="rounded-[var(--radius-lg)] bg-[var(--color-bg-panel-subtle)] p-4">
              <div className="text-sm font-semibold">What comes first</div>
              <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
                Setup paths, troubleshooting UX, a working lesson player, downloads, and the tutor shell.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {featuredPaths.map((path) => (
          <article key={path.slug} className="panel p-6">
            <span className="badge" data-tone={path.tier === "free" ? "accent" : "warning"}>
              {path.tier.toUpperCase()}
            </span>
            <h2 className="mt-4 text-2xl font-semibold">{path.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{path.summary}</p>
            <div className="metadata-bar mt-4">
              <span>{path.lessonCount} lessons</span>
              <span>{path.estimatedHours}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
