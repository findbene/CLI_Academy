"use client";

import { motion } from "framer-motion";
import type { Category } from "./AgentLounge";

interface FilterNavProps {
  activeCategory: Category;
  onSelect: (category: Category) => void;
}

const CATEGORIES: Category[] = ["All", "Agentic Articles", "Tool Spotlights", "Visual Explainers"];

export function FilterNav({ activeCategory, onSelect }: FilterNavProps) {
  return (
    <div className="bg-[#14161F]/80 backdrop-blur-2xl border border-white/10 p-1.5 rounded-full flex space-x-1 shadow-[0_8px_30px_rgb(0,0,0,0.5)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
      {CATEGORIES.map(category => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
              isActive ? "text-[#0F1117]" : "text-gray-400 hover:text-white"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilterPill"
                className="absolute inset-0 bg-[#00D4FF] rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        );
      })}
    </div>
  );
}
