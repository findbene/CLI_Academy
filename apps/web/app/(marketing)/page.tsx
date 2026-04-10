import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, ShieldCheck, TerminalSquare, Wrench } from "lucide-react";
import { AcademyBadgesPanel } from "@/components/academy/AcademyBadgesPanel";
import { AcademySurfaceCard } from "@/components/academy/AcademySurfaceCard";
import { CommunityShowcasePanel } from "@/components/academy/CommunityShowcasePanel";
import { FastPathWeekCard } from "@/components/academy/FastPathWeekCard";
import { SpineProjectDashboard } from "@/components/academy/SpineProjectDashboard";
import { getPublishedCatalogPaths, getPathCta } from "@/lib/catalog";
import { getServerViewer } from "@/lib/viewer";
import {
  ACADEMY_BADGES,
  ACADEMY_MOAT,
  ACADEMY_POSITIONING,
  ACADEMY_SURFACES,
  COMMUNITY_SHOWCASE_HIGHLIGHTS,
  FAST_PATH_WEEKS,
} from "@/lib/academy";

export const metadata: Metadata = {
  title: {
    absolute: "CLI Academy — Beginner-First Install-To-Production Academy",
  },
  description:
    "CLI Academy is the beginner-first install-to-production academy for Claude Code, Claude Cowork, OpenClaw, and the Claw-verse.",
};

export default async function HomePage() {
  const [catalogPaths, viewer] = await Promise.all([getPublishedCatalogPaths(), getServerViewer()]);
  const totalLessons = catalogPaths.reduce((sum, path) => sum + path.availableLessonCount, 0);
  const featuredPaths = catalogPaths.filter((path) =>
    ["01-start-here", "03-claude-code", "08-claude-cowork", "11-openclaw-and-claw-runtime-foundations"].includes(path.slug),
  );

  return (
    <>
      <section className="page-shell py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="eyebrow">Beginner-first install-to-production academy</div>
            <h1 className="mt-4 max-w-5xl text-5xl font-semibold tracking-tight text-[var(--color-fg-default)] sm:text-6xl">
              Learn Claude Code, Cowork, OpenClaw, and the Claw-verse by building one real AI workforce.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-fg-muted)]">
              {ACADEMY_POSITIONING} {ACADEMY_MOAT}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/learn" className="button-primary">
                Explore the 8-week fast path
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/setup-academy" className="button-secondary">
                Open Setup Academy
              </Link>
              <Link href={viewer.user ? "/dashboard" : "/signup"} className="button-ghost">
                {viewer.user ? "Go to dashboard" : "Start free"}
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="panel p-4">
                <div className="text-3xl font-semibold">{catalogPaths.length}</div>
                <div className="mt-1 text-sm text-[var(--color-fg-muted)]">Live execution paths</div>
              </div>
              <div className="panel p-4">
                <div className="text-3xl font-semibold">{totalLessons}</div>
                <div className="mt-1 text-sm text-[var(--color-fg-muted)]">Published lessons</div>
              </div>
              <div className="panel p-4">
                <div className="text-3xl font-semibold">8 weeks</div>
                <div className="mt-1 text-sm text-[var(--color-fg-muted)]">Finishable core path at 10h/week</div>
              </div>
            </div>
          </div>

          <div className="panel p-6">
            <div className="eyebrow">What makes the product different</div>
            <div className="mt-5 grid gap-4">
              {[
                {
                  icon: TerminalSquare,
                  title: "Setup and troubleshooting as the moat",
                  body: "The product starts with install, auth, shell drift, runtime bring-up, and real failure recovery instead of generic AI theory.",
                },
                {
                  icon: Download,
                  title: "Builder assets you keep",
                  body: "Field manuals, prompt packs, CLAUDE.md templates, starter packs, and troubleshooting kits stay useful even when you are offline.",
                },
                {
                  icon: Wrench,
                  title: "Studios, not just lessons",
                  body: "Prompt & Context Studio, Runtime Lab, Workflow Studio, and the Asset Vault give learners a working operating environment instead of a static course catalog.",
                },
                {
                  icon: ShieldCheck,
                  title: "Safety before autonomy",
                  body: "Approvals, boundaries, test data, rollback, evidence, and review loops are built into the product shell and the curriculum.",
                },
              ].map((item) => (
                <article key={item.title} className="rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--color-accent-subtle)] text-[var(--color-accent-primary)]">
                      <item.icon className="size-5" />
                    </div>
                    <div className="text-lg font-semibold">{item.title}</div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell pb-16">
        <SpineProjectDashboard currentStage={1} />
      </section>

      <section className="page-shell pb-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="eyebrow">8-week fast path</div>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">A finishable route from first install to a portfolio-grade AI workforce</h2>
          </div>
          <Link href="/learn" className="button-secondary">
            Open full fast path
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {FAST_PATH_WEEKS.slice(0, 4).map((week) => (
            <FastPathWeekCard key={week.week} week={week} />
          ))}
        </div>
      </section>

      <section className="page-shell pb-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Academy surfaces</div>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">The academy is more than a path catalog</h2>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ACADEMY_SURFACES.map((surface) => (
            <AcademySurfaceCard key={surface.title} surface={surface} />
          ))}
        </div>
      </section>

      <section className="page-shell pb-16">
        <AcademyBadgesPanel badges={ACADEMY_BADGES} />
      </section>

      <section className="page-shell pb-16">
        <CommunityShowcasePanel highlights={COMMUNITY_SHOWCASE_HIGHLIGHTS} />
      </section>

      <section className="page-shell pb-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Start where the product is already deep</div>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">Use the live curriculum now while the academy shell expands around it</h2>
          </div>
          <Link href="/paths" className="button-secondary">
            Browse full catalog
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredPaths.map((path) => (
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
                <Link
                  href={
                    getPathCta(path, {
                      signedIn: Boolean(viewer.user),
                      tier: viewer.profile?.tier ?? null,
                    }).href
                  }
                  className="button-secondary"
                >
                  {getPathCta(path, {
                    signedIn: Boolean(viewer.user),
                    tier: viewer.profile?.tier ?? null,
                  }).label}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell pb-24">
        <div className="panel p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="eyebrow">Visible weekly wins</div>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight">Week 1 ends with a working local assistant, not just finished videos</h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-fg-muted)]">
                The academy is designed so complete beginners can keep momentum. Guided support is heavy at the start,
                then fades into hints and independent rubric-driven work as confidence increases.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/setup-academy" className="button-primary">
                Start with setup
              </Link>
              <Link href="/asset-vault" className="button-secondary">
                Open Asset Vault
              </Link>
              <Link href="/prompt-context-studio" className="button-ghost">
                Enter Prompt Studio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
