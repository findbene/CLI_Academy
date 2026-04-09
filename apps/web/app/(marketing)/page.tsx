import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedCatalogPaths, getPathCta } from "@/lib/catalog";

export const metadata: Metadata = {
  title: {
    absolute: "CLI Academy — Learn Claude Code & AI Agent Workflows",
  },
  description:
    "The safest, most beginner-friendly way to go from zero to productive with Claude Code and secure AI agent workflows.",
  openGraph: {
    title: "CLI Academy — Learn Claude Code & AI Agent Workflows",
    description:
      "The safest, most beginner-friendly way to go from zero to productive with Claude Code and secure AI agent workflows.",
  },
};

import { getServerViewer } from "@/lib/viewer";
import { ALL_RESOURCES, RESOURCE_CATEGORIES } from "@/lib/data/resources";
import ShaderBackground from "@/components/ui/shader-background";
import {
  BookOpen,
  MessageCircle,
  GraduationCap,
  Zap,
  ArrowRight,
  Terminal,
  CheckCircle2,
  Sparkles,
  Plug,
  Bot,
  Puzzle,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  Sparkles, Plug, Bot, Puzzle, Terminal,
};

export default async function HomePage() {
  const [catalogPaths, viewer] = await Promise.all([getPublishedCatalogPaths(), getServerViewer()]);
  const featuredPaths = catalogPaths.slice(0, 6);
  const totalLessons = catalogPaths.reduce((sum, p) => sum + p.availableLessonCount, 0);
  const totalPaths = catalogPaths.length;
  const totalResources = ALL_RESOURCES.length;

  return (
    <>
      {/* ── Aurora Hero Section ─────────────────────────── */}
      <section className="hero-aurora-wrapper">
        <ShaderBackground />
        <div className="hero-content">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-400/50 bg-teal-400/10 shadow-[0_0_20px_rgba(45,212,191,0.4)] px-4 py-1.5 text-sm text-[rgba(255,255,255,0.85)]">
            <Zap className="h-3.5 w-3.5 text-teal-400" />
            No coding experience required
          </div>
          <h1 className="text-white [text-shadow:_0_0_30px_rgba(255,255,255,0.4)]">
            Zero To Mastery:
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 drop-shadow-[0_0_25px_rgba(45,212,191,0.8)]">The Agentic Era.</span>
          </h1>
          <p className="font-light text-[1.15rem] tracking-wide text-[rgba(255,255,255,0.95)] mt-2 [text-shadow:_0_0_15px_rgba(255,255,255,0.3)]">
            Master autonomous agents, automate the mundane, and engineer the future.
          </p>
          <div className="hero-actions flex-wrap gap-4 mt-8">
            <Link
              href={viewer.user ? "/dashboard" : "/signup"}
              className="hero-cta-primary"
            >
              {viewer.user ? "Open dashboard" : "Start learning free"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/lounge" className="hero-cta-secondary border-fuchsia-500/50 text-fuchsia-100 hover:bg-fuchsia-500/10 hover:shadow-[0_0_20px_rgba(217,70,239,0.2)]">
              📰 The Agentic Era
            </Link>
            <Link href="/paths" className="hero-cta-secondary hidden sm:flex">
              <BookOpen className="h-4 w-4" />
              Browse all paths
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">{totalPaths}</div>
              <div className="hero-stat-label">Learning Paths</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">{totalLessons}+</div>
              <div className="hero-stat-label">Lessons</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">{totalResources}</div>
              <div className="hero-stat-label">Resources</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Value Propositions ─────────────────────────── */}
      <section className="page-shell py-20">
        <div className="text-center">
          <div className="eyebrow">Why CLI Academy</div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-fg-default)]">
            Everything you need to go from zero to productive
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-fg-muted)]">
            Structured paths, safety-first teaching, a contextual AI tutor, and downloadable assets
            that work on real machines.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: GraduationCap,
              title: "Industry Certifications",
              desc: "Don't just learn. Graduate as a 'Certified Prompt Architect' or 'AI Infrastructure Engineer'. Stand out to employers immediately.",
            },
            {
              icon: Zap,
              title: "Real-Time Agent Simulations",
              desc: "Watch live, interactive visualizations of autonomous Swarms communicating in real-time right from your dashboard.",
            },
            {
              icon: MessageCircle,
              title: "Live AI Co-Piloting",
              desc: "An embedded AI Co-founder watches your code. If a term like 'Context Window' confuses you, it explains it instantly and perfectly.",
            },
            {
              icon: Plug,
              title: "The Claw-Verse Ecosystem",
              desc: "Deep-dive setup, configuration, and troubleshooting for the ENTIRE ecosystem: OpenClaw, PicoClaw, ZeroClaw, NanoClaw, and AutoClaw.",
            },
            {
              icon: Terminal,
              title: "Solve Complex Societal Problems",
              desc: "We skip boring 'To-Do' apps. Our labs teach you how to deploy agent teams that tackle massive, real-world challenges.",
            },
            {
              icon: CheckCircle2,
              title: "The Agentic Alumni Network",
              desc: "Join an elite community of builders. Participate in gamified community challenges, climb the leaderboards, and launch apps together.",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className="panel panel-lift group relative overflow-hidden p-6"
            >
              <span
                className="pointer-events-none absolute -right-3 -top-4 select-none font-[family-name:var(--font-display)] text-8xl font-bold leading-none text-[var(--color-accent-primary)] opacity-[0.05]"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex size-11 items-center justify-center rounded-2xl bg-[var(--color-accent-subtle)] text-[var(--color-accent-primary)] transition-colors group-hover:bg-[var(--color-accent-subtle-strong)]">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[var(--color-fg-default)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Paths ─────────────────────────── */}
      <section className="page-shell pb-20">
        <div className="flex items-end justify-between">
          <div>
            <div className="eyebrow">Featured Paths</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-fg-default)]">
              Start with what matters most
            </h2>
          </div>
          <Link href="/paths" className="button-ghost hidden md:inline-flex">
            View all paths
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPaths.map((path) => (
            <article
              key={path.slug}
              className="panel panel-lift group relative flex flex-col overflow-hidden p-6"
            >
              <span
                className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl"
                style={{ background: path.tier === "free" ? "var(--teal-500)" : "var(--amber-500)" }}
                aria-hidden="true"
              />
              <div className="flex items-center gap-2">
                <span className="badge" data-tone={path.tier === "free" ? "accent" : "warning"}>
                  {path.tier.toUpperCase()}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[var(--color-fg-default)] group-hover:text-[var(--color-accent-primary)] transition-colors">
                {path.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-[var(--color-fg-muted)]">
                {path.summary}
              </p>
              <div className="metadata-bar mt-4">
                <span>{path.availableLessonCount} lessons</span>
                <span>{path.estimatedHours}</span>
                {path.lastReviewedAt ? <span>Reviewed {path.lastReviewedAt}</span> : null}
              </div>
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
                  {
                    getPathCta(path, {
                      signedIn: Boolean(viewer.user),
                      tier: viewer.profile?.tier ?? null,
                    }).label
                  }
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/paths" className="button-secondary">
            View all paths
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── Resource Hub Teaser ─────────────────────────── */}
      <section className="page-shell pb-20">
        <div className="text-center">
          <div className="eyebrow">Resource Hub</div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-fg-default)]">
            Skills, MCPs, agents, and more
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-fg-muted)]">
            Browse {totalResources} downloadable resources — from Claude skill definitions and
            MCP servers to pre-built agents and CLI tools.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {RESOURCE_CATEGORIES.map((cat) => {
            const IconComponent = categoryIcons[cat.icon] ?? Puzzle;
            return (
              <Link
                key={cat.key}
                href={`/resources/${cat.key}`}
                className="panel panel-lift group flex flex-col items-center p-6 text-center"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--color-accent-subtle)] text-[var(--color-accent-primary)] transition-colors group-hover:bg-[var(--color-accent-subtle-strong)]">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="mt-3 text-base font-semibold text-[var(--color-fg-default)]">
                  {cat.label}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
                  {cat.count} resources
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link href="/resources" className="button-secondary">
            Browse all resources
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── CTA Section ─────────────────────────── */}
      <section className="page-shell pb-24">
        <div className="panel relative overflow-hidden p-12 text-center" style={{ background: "linear-gradient(135deg, var(--ink-950) 0%, #0d1e3a 100%)" }}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(22,176,168,0.13),transparent)]" aria-hidden="true" />
          <div className="relative">
            <div className="mb-4 flex justify-center">
              <div className="eyebrow text-[var(--aurora-light)]">Start today</div>
            </div>
            <h2 className="text-3xl font-semibold text-white">
              Ready to start building with Claude?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              Join CLI Academy and go from zero to productive with guided paths, downloadable
              resources, and an AI tutor that meets you where you are.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href={viewer.user ? "/dashboard" : "/signup"}
                className="hero-cta-primary"
              >
                {viewer.user ? "Open your dashboard" : "Start free today"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/pricing" className="hero-cta-secondary">
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
