import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ecosystem Resources",
  description:
    "Browse the wider Claude-builder ecosystem directory: skills, MCPs, agents, plugins, and CLI tools that complement the academy.",
};

import {
  Sparkles,
  Plug,
  Bot,
  Puzzle,
  Terminal,
  ArrowRight,
  Download,
  Star,
  TrendingUp,
  Zap,
  BookOpen,
  Play,
} from "lucide-react";
import { RESOURCE_CATEGORIES, getFeaturedResources, ALL_RESOURCES } from "@/lib/data/resources";

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Plug,
  Bot,
  Puzzle,
  Terminal,
};

export default function ResourceHubPage() {
  const featured = getFeaturedResources().slice(0, 6);
  const totalResources = ALL_RESOURCES.length;
  const freeCount = ALL_RESOURCES.filter((r) => r.tier === "free").length;

  return (
    <div className="page-shell">
      {/* Hero */}
      <section className="mb-16 text-center">
        <div className="eyebrow mb-4">Ecosystem directory</div>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--color-fg-default)] sm:text-5xl">
          Skills, MCPs, agents, plugins, and tools
          <span className="bg-gradient-to-r from-[var(--teal-500)] to-[var(--blue-500)] bg-clip-text text-transparent"> around the academy</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-fg-muted)]">
          This is the broader ecosystem directory, not the primary learner route. Start with `/learn` for the
          academy journey, use `/asset-vault` for builder packs and field manuals, and come here when you want the
          surrounding tools and integrations.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/learn" className="button-primary">
            Start with Learn
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/asset-vault" className="button-secondary">
            Open Asset Vault
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] px-5 py-2 text-sm font-medium text-[var(--color-fg-default)]">
            <Download className="h-4 w-4 text-[var(--color-accent-primary)]" />
            {totalResources}+ Resources
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] px-5 py-2 text-sm font-medium text-[var(--color-fg-default)]">
            <Zap className="h-4 w-4 text-amber-500" />
            {freeCount} Free Downloads
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] px-5 py-2 text-sm font-medium text-[var(--color-fg-default)]">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            Updated Weekly
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="mb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {RESOURCE_CATEGORIES.map(({ key, label, description, icon, count }) => {
            const Icon = iconMap[icon] ?? Sparkles;
            return (
              <Link
                key={key}
                href={`/resources/${key}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-6 transition-all duration-300 hover:border-[var(--color-accent-primary)] hover:shadow-[0_8px_30px_var(--color-accent-glow)]"
              >
                <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-accent-subtle-strong)] to-[var(--color-accent-subtle-faint)] text-[var(--color-accent-primary)] transition-all duration-300 group-hover:scale-110 group-hover:from-[var(--color-accent-ring)] group-hover:to-[var(--color-accent-subtle)]">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-fg-default)] transition-colors group-hover:text-[var(--color-accent-primary)]">
                  {label}
                </h3>
                <p className="mt-2 flex-1 text-sm text-[var(--color-fg-muted)]">{description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-[var(--color-accent-primary)]">{count} items</span>
                  <ArrowRight className="h-4 w-4 text-[var(--color-fg-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-accent-primary)]" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Resources */}
      <section className="mb-16">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="eyebrow mb-2">Editors&apos; Picks</div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--color-fg-default)]">
              Featured Resources
            </h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <article
              key={item.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-6 transition-all duration-300 hover:border-[var(--color-accent-primary)] hover:shadow-[0_8px_30px_var(--color-accent-glow)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent-subtle-strong)] to-[var(--color-accent-subtle-faint)] text-[var(--color-accent-primary)]">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[0.625rem] font-medium uppercase tracking-wider ${item.tier === "free" ? "bg-emerald-50 text-emerald-700" : "bg-violet-50 text-violet-700"}`}>
                    {item.tier}
                  </span>
                  <span className="ml-2 inline-flex items-center rounded-full bg-[var(--color-bg-panel-subtle)] px-2 py-0.5 text-[0.625rem] font-medium uppercase tracking-wider text-[var(--color-fg-muted)]">
                    {item.category}
                  </span>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--color-fg-default)] transition-colors group-hover:text-[var(--color-accent-primary)]">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-fg-muted)]">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-2 py-0.5 text-[0.625rem] text-[var(--color-fg-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2">
                {item.formats.map((fmt) => (
                  <span
                    key={fmt}
                    className="inline-flex items-center rounded bg-[var(--color-bg-code)] px-1.5 py-0.5 font-mono text-[0.5625rem] uppercase text-[var(--color-fg-inverse)]"
                  >
                    .{fmt}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Quick Links / Video CTA */}
      <section className="mb-16">
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-gradient-to-br from-[var(--ink-950)] to-[var(--ink-900)] p-8 sm:p-12">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-subtle-strong)] px-4 py-1.5 text-sm text-[rgba(255,255,255,0.8)]">
                <Play className="h-3.5 w-3.5 text-[var(--color-accent-primary)]" />
                Video tutorials included
              </div>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                Learn by watching, learn by doing
              </h2>
              <p className="mt-3 text-base text-[rgba(255,255,255,0.65)]">
                Every resource comes with short, high-quality video walkthroughs. No fluff — just the setup,
                the config, and the result.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/resources/skills"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent-primary)] px-6 py-3 font-medium text-white transition-colors hover:bg-[var(--color-accent-primary-hover)]"
              >
                <Sparkles className="h-4 w-4" />
                Browse Skills
              </Link>
              <Link
                href="/resources/agents"
                className="inline-flex items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.2)] px-6 py-3 font-medium text-white transition-colors hover:bg-[rgba(255,255,255,0.1)]"
              >
                <Bot className="h-4 w-4" />
                Browse Agents
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Use Case */}
      <section>
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--color-fg-default)]">
            Not sure where to start?
          </h2>
          <p className="mt-2 text-[var(--color-fg-muted)]">
            Start with the academy flow, then come back here for the surrounding tool ecosystem.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/learn" className="button-secondary">
              <BookOpen className="h-4 w-4" />
              Open Learn
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
