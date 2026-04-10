import Link from "next/link";
import { AcademySurfaceCard } from "@/components/academy/AcademySurfaceCard";
import { FastPathWeekCard } from "@/components/academy/FastPathWeekCard";
import { SpineProjectDashboard } from "@/components/academy/SpineProjectDashboard";
import { getCatalogPathBySlug, type CatalogPath } from "@/lib/catalog";
import { ACADEMY_SURFACES, FAST_PATH_WEEKS } from "@/lib/academy";

export default async function LearnOverviewPage() {
  const bridgePaths = (
    await Promise.all(
      [
        "01-start-here",
        "03-claude-code",
        "08-claude-cowork",
        "11-openclaw-and-claw-runtime-foundations",
        "12-skills-memory-heartbeats-and-scheduled-work",
        "19-capstones-portfolio-proof-and-job-ready-evidence",
      ].map((slug) => getCatalogPathBySlug(slug)),
    )
  ).filter((path): path is CatalogPath => Boolean(path));

  return (
    <main className="page-shell py-12">
      <section className="panel p-6">
        <div className="eyebrow">Learn</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">The 8-week fast path and the live execution catalog</h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-[var(--color-fg-muted)]">
          CLI Academy now has two layers. The fast path gives complete beginners one coherent route. The existing
          live paths stay in place as the detailed execution layer you can open today.
        </p>
      </section>

      <div className="mt-8">
        <SpineProjectDashboard currentStage={2} />
      </div>

      <section className="mt-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Week-by-week map</div>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">Finishable at roughly 10 hours per week</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {FAST_PATH_WEEKS.map((week) => (
            <FastPathWeekCard key={week.week} week={week} />
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4">
        <div>
          <div className="eyebrow">Bridge into the live product</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">Start the academy shell, then drop into the current learner runtime</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {bridgePaths.map((path) => (
            <article key={path.slug} className="panel p-5">
              <div className="flex flex-wrap gap-2">
                <span className="badge" data-tone={path.tier === "free" ? "accent" : "warning"}>
                  {path.tier.toUpperCase()}
                </span>
                <span className="badge">{path.availableLessonCount} lessons</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold">{path.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{path.summary}</p>
              <div className="mt-5">
                <Link href={`/learn/${path.slug}`} className="button-secondary">
                  Open learner view
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4">
        <div>
          <div className="eyebrow">Studios and labs</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">The academy shell organizes the supporting surfaces around the learner</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ACADEMY_SURFACES.map((surface) => (
            <AcademySurfaceCard key={surface.title} surface={surface} />
          ))}
        </div>
      </section>
    </main>
  );
}
