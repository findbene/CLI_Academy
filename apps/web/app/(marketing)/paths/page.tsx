import type { Metadata } from "next";
import Link from "next/link";
import { BookMarked } from "lucide-react";
import { PATH_SECTIONS, getCatalogPathsBySection, getPathCta } from "@/lib/catalog";
import { getDifficultyLabel, getFormatLabel, getPathExperienceMeta } from "@/lib/learning-experience";

export const metadata: Metadata = {
  title: "Learning Paths",
  description:
    "Browse every CLI Academy learning path — from Claude Code setup to MCP mastery and role-based tracks. Honest status labels, tier access, and live lesson counts.",
};

import { getServerViewer } from "@/lib/viewer";

export default async function PathsCatalogPage() {
  const viewer = await getServerViewer();

  return (
    <main className="page-shell">
      <div className="max-w-3xl">
        <div className="eyebrow">Path catalog</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Structured learning paths for real machines and real first wins</h1>
        <p className="mt-4 text-lg leading-8 text-[var(--color-fg-muted)]">
          Browse every learning path with honest status labels, tier access, and live lesson counts.
          Start with the foundations, then move to the role and environment that matches your goals.
        </p>
      </div>

      {/* Reference center callout */}
      <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-[rgba(22,176,168,0.25)] bg-[rgba(22,176,168,0.06)] px-5 py-4">
        <div className="flex items-center gap-3">
          <BookMarked className="size-5 shrink-0 text-[var(--color-accent-primary)]" />
          <div>
            <p className="text-sm font-semibold">Always in a hurry?</p>
            <p className="text-sm text-[var(--color-fg-muted)]">
              Single-page setup guides, command references, and cheat sheets — print them and keep them beside your terminal.
            </p>
          </div>
        </div>
        <Link href="/reference" className="button-secondary shrink-0 text-sm">
          Reference center
        </Link>
      </div>

      <div className="mt-10 grid gap-10">
        {await Promise.all(PATH_SECTIONS.map(async (section) => {
          const paths = await getCatalogPathsBySection(section);

          if (paths.length === 0) return null;

          return (
            <section key={section} className="grid gap-5">
              <div>
                <h2 className="text-2xl font-semibold">{section}</h2>
                <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
                  {section === "Foundations"
                    ? "Core setup and first-success material. Start here if you're new to Claude-based tools."
                    : "Specialized paths for specific roles, environments, and workflows."}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {paths.map((path) => {
                  const experience = getPathExperienceMeta(path);
                  return (
                    <article key={path.slug} className="panel p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge" data-tone={path.tier === "free" ? "accent" : "warning"}>
                        {path.tier.toUpperCase()}
                      </span>
                      <span
                        className="badge"
                        data-tone={path.status === "available" ? "accent" : "warning"}
                      >
                        {path.status === "available" ? "Available" : "Coming soon"}
                      </span>
                      <span className="badge">{getDifficultyLabel(experience.difficulty)}</span>
                      <span className="badge">{getFormatLabel(experience.format)}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">{path.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{path.summary}</p>
                    <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
                      Best for: {experience.audience}
                    </p>
                    <div className="metadata-bar mt-4">
                      <span>{path.availableLessonCount} lessons</span>
                      <span>{path.estimatedHours}</span>
                      {path.versionLabel ? <span>{path.versionLabel}</span> : null}
                    </div>
                    <div className="mt-5">
                      <Link href={`/paths/${path.slug}`} className="button-secondary">
                        View path
                      </Link>
                    </div>
                    <div className="mt-3 text-xs text-[var(--color-fg-muted)]">
                      {getPathCta(path, { signedIn: Boolean(viewer.user), tier: viewer.profile?.tier ?? null }).label}
                    </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        }))}
      </div>
    </main>
  );
}
