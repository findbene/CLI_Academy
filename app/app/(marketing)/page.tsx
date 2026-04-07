import Link from "next/link";
import { getCatalogPaths, getPathCta } from "@/lib/catalog";
import { getServerViewer } from "@/lib/viewer";
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
} from "lucide-react";

export default async function HomePage() {
  const [catalogPaths, viewer] = await Promise.all([getCatalogPaths(), getServerViewer()]);
  const featuredPaths = catalogPaths.filter((path) => path.status === "available").slice(0, 6);

  return (
    <>
      {/* ── Aurora Hero Section ─────────────────────────── */}
      <section className="hero-aurora-wrapper">
        <BackgroundScene beamCount={60} />
        <div className="hero-content">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(22,176,168,0.25)] bg-[rgba(22,176,168,0.08)] px-4 py-1.5 text-sm text-[rgba(255,255,255,0.75)]">
            <Zap className="h-3.5 w-3.5 text-[#16b0a8]" />
            Beginner-first tech education
          </div>
          <h1>
            Master Claude Code.
            <br />
            <span className="text-[#16b0a8]">Build with confidence.</span>
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
              <div className="hero-stat-value">16</div>
              <div className="hero-stat-label">Learning Paths</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">100+</div>
              <div className="hero-stat-label">Lessons</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">Free</div>
              <div className="hero-stat-label">Foundation Tier</div>
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
          ].map((item) => (
            <div
              key={item.title}
              className="panel group p-6 transition-all duration-200 hover:shadow-[var(--shadow-2)] hover:border-[var(--color-accent-primary)]"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[rgba(22,176,168,0.1)] text-[var(--color-accent-primary)] transition-colors group-hover:bg-[rgba(22,176,168,0.18)]">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--color-fg-default)]">
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
              className="panel group flex flex-col p-6 transition-all duration-200 hover:shadow-[var(--shadow-2)]"
            >
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

      {/* ── CTA Section ─────────────────────────── */}
      <section className="page-shell pb-24">
        <div className="panel overflow-hidden bg-gradient-to-br from-[var(--ink-950)] to-[var(--ink-900)] p-12 text-center">
          <h2 className="text-3xl font-semibold text-white">
            Ready to start building with Claude?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[rgba(255,255,255,0.7)]">
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
      </section>
    </>
  );
}
