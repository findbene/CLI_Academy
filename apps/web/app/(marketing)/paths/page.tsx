import type { Metadata } from "next";
import Link from "next/link";
import { FastPathTimeline } from "@/components/academy/FastPathTimeline";
import { PATH_SECTIONS, getCatalogPathsBySection, getPathCta } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Learning Paths",
  description:
    "Browse every CLI Academy learning path, from setup and first wins to capstones and portfolio proof. Honest status labels, tier access, and live lesson counts.",
};

import { getServerViewer } from "@/lib/viewer";

export default async function PathsCatalogPage() {
  const viewer = await getServerViewer();

  return (
    <main className="page-shell">
      <div className="max-w-3xl">
        <div className="eyebrow">Live execution catalog</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Detailed path-by-path entry into the live learner runtime</h1>
        <p className="mt-4 text-lg leading-8 text-[var(--color-fg-muted)]">
          Start at `/learn` if you want the full 8-week fast-path story. Use this page when you want the
          detailed catalog view of the live paths that already power the learner experience today.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/learn" className="button-primary">
            Open the 8-week fast path
          </Link>
          <Link href="/setup-academy" className="button-secondary">
            Go to Setup Academy
          </Link>
        </div>
      </div>

      <section className="mt-10 grid gap-4">
        <div>
          <h2 className="text-2xl font-semibold">8-week fast path at a glance</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">
            The fast path is designed to be finishable in about 80 hours while still leaving room for deeper
            dives into safety, runtimes, automation, and capstones.
          </p>
        </div>
        <FastPathTimeline activeWeek={1} compact />
      </section>

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
                {paths.map((path) => (
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
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">{path.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{path.summary}</p>
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
                ))}
              </div>
            </section>
          );
        }))}
      </div>
    </main>
  );
}
