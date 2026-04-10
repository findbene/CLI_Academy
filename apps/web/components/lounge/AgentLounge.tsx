"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee } from "lucide-react";
import { LoungePageHero } from "./LoungePageHero";
import { HeroPick } from "./HeroPick";
import { ContentCard } from "./ContentCard";
import { FilterNav } from "./FilterNav";

// --- Mock Data ---
export type Category = "All" | "Agentic Articles" | "Tool Spotlights" | "Visual Explainers" | string;

export interface LoungeItem {
  id: string;
  title: string;
  teaser: string;
  readTime: string;
  category: "Agentic Articles" | "Tool Spotlights" | "Visual Explainers" | string;
  heroImage: string;
  author: string;
  href?: string;
}

export default function AgentLounge({ items }: { items: LoungeItem[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredItems = items.filter(
    item => activeCategory === "All" || item.category === activeCategory
  );
  const uniqueCategoryCount = new Set(items.map((item) => item.category)).size;

  return (
    <div className="font-sans text-[var(--color-fg-default)]">
      <LoungePageHero />

      <div className="mx-auto max-w-7xl px-6 pb-20 pt-10 md:px-10 md:pt-12 lg:px-12">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] px-4 py-2 text-sm text-[var(--color-fg-default)] shadow-[var(--shadow-1)]">
              <div className="rounded-xl bg-[var(--color-accent-subtle)] p-2 text-[var(--color-accent-warning)]">
                <Coffee className="h-4 w-4" />
              </div>
              <span>Curated for calmer catching up</span>
            </div>
            <h2 className="text-3xl font-display font-semibold tracking-tight text-[var(--color-fg-default)] md:text-4xl">
              Fresh reads, visual explainers, and tool spotlights.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[var(--color-fg-muted)] md:text-lg">
              Start with the featured pick below, then filter the library when you want to browse
              by format instead of by hype cycle.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 md:justify-end">
            <div className="rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] px-4 py-2 text-sm text-[var(--color-fg-muted)] shadow-[var(--shadow-1)]">
              {items.length} lounge picks
            </div>
            <div className="rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] px-4 py-2 text-sm text-[var(--color-fg-muted)] shadow-[var(--shadow-1)]">
              {uniqueCategoryCount} formats to explore
            </div>
          </div>
        </motion.header>

        <div id="lounge-featured">
          <HeroPick />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="mb-8 mt-12"
        >
          <p className="max-w-3xl text-base leading-7 text-[var(--color-fg-muted)] md:text-lg">
            Browse the latest reads, tool spotlights, and visual explainers once you&apos;re ready
            to go deeper.
          </p>
        </motion.div>

        <div className="sticky top-24 z-40 mb-10 flex justify-center">
          <FilterNav activeCategory={activeCategory} onSelect={setActiveCategory} />
        </div>

        <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <ContentCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
