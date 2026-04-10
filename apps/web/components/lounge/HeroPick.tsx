"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock3, Sparkles } from "lucide-react";

export function HeroPick() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-[2rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] shadow-[var(--shadow-2)]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(22, 176, 168, 0.16), transparent 26%), radial-gradient(circle at bottom left, rgba(201, 134, 18, 0.12), transparent 24%)",
        }}
      />
      <div className="relative z-10 flex h-full flex-col md:min-h-[25rem] md:flex-row">
        <div className="flex w-full flex-col justify-center p-8 md:w-[54%] md:p-12">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(201,134,18,0.22)] bg-[rgba(201,134,18,0.12)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-warning)]">
            <Sparkles className="h-3.5 w-3.5" />
            Today&apos;s featured pick
          </div>

          <h2 className="max-w-xl text-3xl font-display font-semibold leading-tight text-[var(--color-fg-default)] transition-colors duration-300 group-hover:text-[var(--color-accent-primary)] md:text-5xl">
            The Psychology of Context Windows
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-[var(--color-fg-muted)] md:text-lg">
            Why token limits feel stressful, and how treating your agent&apos;s memory more like a
            human short-term workspace changes the way you prompt, scope, and review.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[var(--color-fg-muted)]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] px-4 py-2">
              <Clock3 className="h-4 w-4 text-[var(--color-accent-primary)]" />
              5 minute reset read
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] px-4 py-2">
              Beginner-friendly explainer
            </span>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-primary)] transition-transform duration-300 group-hover:translate-x-1">
            <span>Read in the lounge</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        <div className="relative min-h-[18rem] w-full overflow-hidden bg-[var(--color-bg-page)] md:w-[46%]">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, var(--color-bg-page) 0%, rgba(22, 176, 168, 0.08) 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-32 bg-gradient-to-r from-[var(--color-bg-panel)] via-[var(--color-bg-page)] to-transparent md:block" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[var(--color-bg-panel)] via-[var(--color-bg-page)] to-transparent md:hidden" />
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: 'url("/assets/placeholders/lounge-hero.svg")' }}
          />
          <div className="absolute right-6 top-6 z-20 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-fg-muted)] shadow-[var(--shadow-1)]">
            Featured concept
          </div>
        </div>
      </div>
    </motion.article>
  );
}
