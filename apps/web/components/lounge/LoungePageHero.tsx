"use client";

import { motion } from "framer-motion";
import { ArrowDown, BookOpen, Coffee, PlayCircle, Wrench } from "lucide-react";

const loungeHighlights = [
  {
    icon: BookOpen,
    title: "Long-form briefings",
    detail: "Calmer reads that explain what changed and why it matters.",
  },
  {
    icon: Wrench,
    title: "Tool spotlights",
    detail: "Practical takes on what to try next without hype overload.",
  },
  {
    icon: PlayCircle,
    title: "Visual explainers",
    detail: "Quick breakdowns when you want the idea before the command line.",
  },
];

export function LoungePageHero() {
  return (
    <section className="px-6 pb-6 pt-8 md:px-10 md:pt-10 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.7, ease: "easeOut" }}
        className="group relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] shadow-[var(--shadow-2)]"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(22, 176, 168, 0.18), transparent 34%), radial-gradient(circle at 88% 14%, rgba(201, 134, 18, 0.14), transparent 24%), linear-gradient(135deg, transparent 0%, rgba(37, 99, 235, 0.05) 100%)",
          }}
        />
        <div className="pointer-events-none absolute -right-20 top-12 h-72 w-72 rounded-full border border-[rgba(22,176,168,0.2)]" />
        <div className="pointer-events-none absolute right-12 top-28 h-56 w-56 rounded-full border border-[rgba(37,99,235,0.14)]" />
        <div className="pointer-events-none absolute -left-14 bottom-[-7rem] h-60 w-60 rounded-full bg-[rgba(22,176,168,0.12)] blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--color-bg-panel)] to-transparent" />

        <div className="relative grid gap-10 px-8 py-10 md:px-10 md:py-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:px-12">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] px-4 py-2 text-sm text-[var(--color-fg-default)] shadow-[var(--shadow-1)]">
              <div className="rounded-xl bg-[var(--color-accent-subtle)] p-2 text-[var(--color-accent-warning)]">
                <Coffee className="h-4 w-4" />
              </div>
              <span>Welcome to the Agent Lounge</span>
            </div>

            <h1 className="max-w-4xl text-4xl font-display font-semibold tracking-tight text-[var(--color-fg-default)] md:text-5xl lg:text-6xl">
              Learn the Agentic Era in a calmer, more readable space.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
              Step out of the command line for a minute. The lounge turns the latest agent ideas,
              launches, and tools into approachable reads that still feel grounded in real builder
              workflows.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#lounge-featured"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-fg-on-accent)] shadow-[0_14px_32px_rgba(22,176,168,0.22)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <ArrowDown className="h-4 w-4" />
                Scroll to the featured pick
              </a>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] px-4 py-3 text-sm text-[var(--color-fg-muted)]">
                Weekly explainers, not doom-scroll noise
              </span>
            </div>
          </div>

          <div className="grid gap-3 lg:pb-1">
            <div className="rounded-[1.5rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] p-5 shadow-[var(--shadow-1)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-primary)]">
                Inside the lounge
              </p>
              <div className="mt-4 grid gap-4">
                {loungeHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] px-4 py-3"
                  >
                    <div className="mt-0.5 rounded-2xl bg-[var(--color-accent-subtle)] p-2 text-[var(--color-accent-primary)]">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-fg-default)]">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-[var(--color-fg-muted)]">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
