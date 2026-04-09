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

  return (
    <div className="font-sans text-[#F0F4F8]">
      <LoungePageHero />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 flex flex-col items-center space-y-4 text-center"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <Coffee className="h-8 w-8 text-[#FFB300]" />
          </div>
          <h1 className="text-4xl font-display font-semibold tracking-tight md:text-5xl">
            Welcome to the Agent Lounge
          </h1>
          <p className="max-w-2xl text-lg font-light text-gray-400 md:text-xl">
            Take a breath. Grab a coffee. Here&apos;s a curated quiet corner to explore the future of AI agents without the pressure of a terminal.
          </p>
        </motion.header>

        <HeroPick />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="mb-10 mt-20"
        >
          <p className="max-w-3xl text-base leading-7 text-gray-400 md:text-lg">
            Browse the latest reads, tool spotlights, and visual explainers once you&apos;re ready to go deeper.
          </p>
        </motion.div>

        <div className="sticky top-4 z-50 mb-10 flex justify-center">
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
