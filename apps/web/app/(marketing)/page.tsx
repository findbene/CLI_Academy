import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedCatalogPaths, getPathCta } from "@/lib/catalog";
import { getServerViewer } from "@/lib/viewer";
import {
  ArrowRight,
  Terminal,
  BookOpen,
  Layers,
  Cpu,
  GitBranch,
  Server,
  Zap,
  Globe,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "CLI Academy — Master Claude Code, OpenClaw & the Claw-Verse",
  },
  description:
    "30 guided paths. 194+ lessons. Go from zero to self-hosted AI infrastructure with Claude Code, OpenClaw, ZeroClaw, and the full Claw-Verse ecosystem.",
  openGraph: {
    title: "CLI Academy — Master Claude Code, OpenClaw & the Claw-Verse",
    description:
      "30 guided paths. 194+ lessons. Go from zero to self-hosted AI infrastructure with Claude Code, OpenClaw, ZeroClaw, and the full Claw-Verse ecosystem.",
  },
};

export default async function HomePage() {
  const [catalogPaths, viewer] = await Promise.all([
    getPublishedCatalogPaths(),
    getServerViewer(),
  ]);

  const featuredPaths = catalogPaths.slice(0, 6);
  const totalLessons = catalogPaths.reduce((sum, p) => sum + p.availableLessonCount, 0);
  const totalPaths = catalogPaths.length;

  return (
    <>
      {/* ── Aurora Hero ──────────────────────────────────────── */}
      <section className="hero-aurora-wrapper">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 18%, rgba(22,176,168,0.22), transparent 22%), radial-gradient(circle at 18% 82%, rgba(37,99,235,0.12), transparent 26%), linear-gradient(180deg, #000a04 0%, #06111f 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(22,176,168,0.28) 0%, rgba(22,176,168,0.1) 28%, transparent 68%)",
            filter: "blur(28px)",
          }}
        />

        <div className="hero-content">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-400/50 bg-teal-400/10 shadow-[0_0_20px_rgba(45,212,191,0.4)] px-4 py-1.5 text-sm text-[rgba(255,255,255,0.85)]">
            <Zap className="h-3.5 w-3.5 text-teal-400" />
            30 paths. 194+ lessons. Zero to production.
          </div>

          <h1 className="text-white [text-shadow:_0_0_30px_rgba(255,255,255,0.4)]">
            Master Claude Code.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 drop-shadow-[0_0_25px_rgba(45,212,191,0.8)]">
              Deploy OpenClaw. Own the Claw-Verse.
            </span>
          </h1>

          <p className="font-light text-[1.15rem] tracking-wide text-[rgba(255,255,255,0.95)] mt-2 [text-shadow:_0_0_15px_rgba(255,255,255,0.3)]">
            The only curriculum that takes you from Claude Code install to a self-hosted AI
            gateway — ZeroClaw, NanoClaw, AutoClaw, and NemoClaw included. Built from scratch.
            Running in production.
          </p>

          <div className="hero-actions flex-wrap gap-4 mt-8">
            <Link
              href={viewer.user ? "/dashboard" : "/signup"}
              className="hero-cta-primary"
            >
              {viewer.user ? "Open dashboard" : "Start learning free"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/lounge"
              className="hero-cta-secondary border-teal-500/50 text-teal-100 hover:bg-teal-500/10 hover:shadow-[0_0_20px_rgba(22,176,168,0.2)]"
            >
              <Globe className="h-4 w-4" />
              Explore the Claw-Verse
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
              <div className="hero-stat-value">7</div>
              <div className="hero-stat-label">Curriculum Groups</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">4</div>
              <div className="hero-stat-label">Claw Variants</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What You'll Master ───────────────────────────────── */}
      <section className="page-shell py-20">
        <div className="text-center">
          <div className="eyebrow">Three Tracks. One Curriculum.</div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-fg-default)]">
            What you&apos;ll master
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-fg-muted)]">
            Every track is hands-on, project-first, and designed to put working software in
            your hands before moving on.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* Track 1 */}
          <div className="panel panel-lift group relative overflow-hidden p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -top-5 select-none font-[family-name:var(--font-display)] text-9xl font-bold leading-none text-[var(--color-accent-primary)] opacity-[0.05]"
            >
              01
            </div>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--color-accent-subtle)] text-[var(--color-accent-primary)] transition-colors group-hover:bg-[var(--color-accent-subtle-strong)]">
              <Terminal className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-[var(--color-fg-default)]">
              Claude Code Mastery
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">
              Anthropic&apos;s official agentic CLI — installed, configured, and running real
              workflows from day one.
            </p>
            <ul className="mt-5 space-y-2">
              {[
                "Install, auth, and session loop",
                "Repo workflows and Git integration",
                "CLAUDE.md and context management",
                "MCP server integration",
                "Surface switching and debugging",
                "Agentic mental models",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-[var(--color-fg-muted)]"
                >
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-primary)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Track 2 */}
          <div className="panel panel-lift group relative overflow-hidden p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -top-5 select-none font-[family-name:var(--font-display)] text-9xl font-bold leading-none text-[var(--color-accent-primary)] opacity-[0.05]"
            >
              02
            </div>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--color-accent-subtle)] text-[var(--color-accent-primary)] transition-colors group-hover:bg-[var(--color-accent-subtle-strong)]">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-[var(--color-fg-default)]">
              Claude Cowork &amp; Prompt Engineering
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">
              Claude&apos;s collaboration mode inside claude.ai — session briefs, artifact
              editing, and prompt engineering that actually transfers to production.
            </p>
            <ul className="mt-5 space-y-2">
              {[
                "Projects, artifacts, and session briefs",
                "Task framing and handoff patterns",
                "Prompt anatomy and failure modes",
                "Research and synthesis workflows",
                "Multi-turn context management",
                "Cowork-to-CLI handoff strategies",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-[var(--color-fg-muted)]"
                >
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-primary)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Track 3 */}
          <div className="panel panel-lift group relative overflow-hidden p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -top-5 select-none font-[family-name:var(--font-display)] text-9xl font-bold leading-none text-[var(--color-accent-primary)] opacity-[0.05]"
            >
              03
            </div>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--color-accent-subtle)] text-[var(--color-accent-primary)] transition-colors group-hover:bg-[var(--color-accent-subtle-strong)]">
              <Server className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-[var(--color-fg-default)]">
              OpenClaw &amp; the Claw-Verse
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">
              Self-host your own operational layer in front of the Anthropic API. Auth, rate
              limiting, skill execution, and security — then deploy every Claw variant.
            </p>
            <ul className="mt-5 space-y-2">
              {[
                "OpenClaw gateway: Logic Spine + YES gate",
                "Skills system and SKILL.md authoring",
                "ZeroClaw — low-latency, no gateway",
                "NanoClaw — ARM and Raspberry Pi edge",
                "AutoClaw — CI/CD pipeline integration",
                "NemoClaw — GPU inference layer",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-[var(--color-fg-muted)]"
                >
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-primary)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Journey Section ──────────────────────────────────── */}
      <section className="page-shell pb-20">
        <div className="text-center">
          <div className="eyebrow">The Zero-to-Mastery Journey</div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-fg-default)]">
            Seven groups. One complete arc.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-fg-muted)]">
            Every group builds on the last. You never jump without a foundation.
          </p>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
          {[
            {
              group: "Group 0",
              label: "First Win",
              desc: "Install Claude Code. Ship something real within the first session.",
              icon: Zap,
            },
            {
              group: "Groups 1–2",
              label: "Foundations & Setup",
              desc: "Shell fluency, CLAUDE.md, viewer setup, and safe agentic defaults.",
              icon: Terminal,
            },
            {
              group: "Group 3",
              label: "Tool Mastery",
              desc: "Claude Code deep-dive, Cowork patterns, MCP, and prompt engineering.",
              icon: Layers,
            },
            {
              group: "Group 4",
              label: "Project Studio",
              desc: "Real projects. Real repos. Team workflows and multi-surface builds.",
              icon: GitBranch,
            },
            {
              group: "Group 5",
              label: "Production & Advanced",
              desc: "Deploy, secure, monitor, and scale. Production infrastructure included.",
              icon: Cpu,
            },
            {
              group: "Group 5+",
              label: "OpenClaw Ecosystem",
              desc: "Self-hosted gateway, skills, Logic Spine, YES gate, and every Claw variant.",
              icon: Server,
            },
            {
              group: "Group 6",
              label: "Career Pathways",
              desc: "Portfolio, hiring, freelance, and building your own agentic products.",
              icon: Globe,
            },
          ].map((step, idx) => (
            <div
              key={step.group}
              className="panel panel-lift group relative flex flex-col items-center p-5 text-center"
            >
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(22,176,168,${0.3 + idx * 0.1}), transparent)`,
                }}
              />
              <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--color-accent-subtle)] text-[var(--color-accent-primary)] transition-colors group-hover:bg-[var(--color-accent-subtle-strong)]">
                <step.icon className="h-5 w-5" />
              </div>
              <div className="mt-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-primary)]">
                {step.group}
              </div>
              <h3 className="mt-1 text-sm font-semibold text-[var(--color-fg-default)]">
                {step.label}
              </h3>
              <p className="mt-2 text-xs leading-5 text-[var(--color-fg-muted)]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Concrete Numbers ─────────────────────────────────── */}
      <section className="page-shell pb-20">
        <div
          className="panel relative overflow-hidden p-10 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(22,176,168,0.06) 0%, rgba(37,99,235,0.06) 100%)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(22,176,168,0.07),transparent)]"
          />
          <div className="relative">
            <div className="eyebrow mb-6">By the numbers</div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { value: String(totalPaths), label: "Guided paths", sub: "from install to infra" },
                { value: "194+", label: "Lessons", sub: "project-first, no filler" },
                { value: "7", label: "Curriculum groups", sub: "orientation to career" },
                { value: "4", label: "Claw variants", sub: "Zero, Nano, Auto, Nemo" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <div className="text-5xl font-bold text-[var(--color-accent-primary)] [text-shadow:_0_0_20px_rgba(22,176,168,0.4)]">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-base font-semibold text-[var(--color-fg-default)]">
                    {stat.label}
                  </div>
                  <div className="mt-1 text-sm text-[var(--color-fg-muted)]">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Paths ───────────────────────────────────── */}
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
                style={{
                  background:
                    path.tier === "free" ? "var(--teal-500)" : "var(--amber-500)",
                }}
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
                {path.lastReviewedAt ? (
                  <span>Reviewed {path.lastReviewedAt}</span>
                ) : null}
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

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="page-shell pb-24">
        <div
          className="panel relative overflow-hidden p-12 text-center"
          style={{
            background: "linear-gradient(135deg, var(--ink-950) 0%, #0d1e3a 100%)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(22,176,168,0.13),transparent)]"
          />
          <div className="relative">
            <div className="mb-4 flex justify-center">
              <div className="eyebrow text-[var(--aurora-light)]">Stop reading about AI</div>
            </div>
            <h2 className="text-3xl font-semibold text-white">
              Start building with it.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              Every lesson ends with something working. Claude Code installed. OpenClaw running.
              A Claw variant deployed. No fluff. No toy examples.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href={viewer.user ? "/dashboard" : "/signup"}
                className="hero-cta-primary"
              >
                {viewer.user ? "Open your dashboard" : "Start free today"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/paths" className="hero-cta-secondary">
                <BookOpen className="h-4 w-4" />
                Browse all paths
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
