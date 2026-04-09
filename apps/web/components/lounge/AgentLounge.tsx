"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee } from "lucide-react";
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
    <div className="max-w-7xl mx-auto px-6 py-16 text-[#F0F4F8] font-sans">
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-center mb-16 space-y-4"
      >
        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
          <Coffee className="w-8 h-8 text-[#FFB300]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight">
          Welcome to the Agent Lounge
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-light">
          Take a breath. Grab a coffee. Here’s a curated quiet corner to explore the future of AI agents without the pressure of a terminal.
        </p>
      </motion.header>

      {/* Hero Pick */}
      <HeroPick />

      {/* Filter Navigation */}
      <div className="mt-20 mb-10 flex justify-center sticky top-4 z-50">
        <FilterNav activeCategory={activeCategory} onSelect={setActiveCategory} />
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.map(item => (
            <ContentCard key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}
