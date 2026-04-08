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
import BackgroundScene from "@/components/ui/aurora-section-hero";
import {
  BookOpen,
  Download,
  MessageCircle,
  ShieldCheck,
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
        <BackgroundScene beamCount={60} />
        <div className="hero-content">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-ring)] bg-[var(--color-accent-subtle-faint)] px-4 py-1.5 text-sm text-[rgba(255,255,255,0.75)]">
            <Zap className="h-3.5 w-3.5 text-[var(--color-accent-primary)]" />
            Beginner-first tech education
          </div>
          <h1>
            Master Claude Code.
            <br />
            <span className="text-gradient">Build with confidence.</span>
          </h1>
          <p>
            The safest, most beginner-friendly way to go from zero to productive with Claude Code,
            secure agent workflows, and AI-powered development tools.
          </p>
          <div className="hero-actions">
            <Link
              href={viewer.user ? "/dashboard" : "/signup"}
              className="hero-cta-primary"
            >
              {viewer.user ? "Open dashboard" : "Start learning free"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/paths" className="hero-cta-secondary">
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
              icon: Terminal,
              title: "Setup-First Paths",
              desc: "Step-by-step guides for Windows, macOS, and Linux. No assumptions about prior experience.",
            },
            {
              icon: ShieldCheck,
              title: "Safety Warnings Built In",
              desc: "Every risky command is flagged. Every deployment lesson has visible safety blocks. Trust first.",
            },
            {
              icon: MessageCircle,
              title: "AI Tutor",
              desc: "A floating tutor powered by Claude that understands your current lesson, OS, and skill level.",
            },
            {
              icon: Download,
              title: "Downloads Center",
              desc: "Checklists, starter templates, and reference guides in PDF, Markdown, CSV, and JSON.",
            },
            {
              icon: GraduationCap,
              title: "Role-Based Tracks",
              desc: "Paths designed for founders, marketers, analysts, students, and developers. Learn what matters to you.",
            },
            {
              icon: CheckCircle2,
              title: "Verified Progress",
              desc: "Lab verification, quiz tracking, and completion evidence. Know you actually learned it.",
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
