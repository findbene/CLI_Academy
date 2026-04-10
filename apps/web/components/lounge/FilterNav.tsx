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
    <div className="flex max-w-full flex-wrap items-center justify-center gap-2 rounded-[1.5rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-2 shadow-[var(--shadow-1)]">
      {CATEGORIES.map(category => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`relative whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${
              isActive
                ? "text-[var(--color-fg-default)]"
                : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg-default)]"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilterPill"
                className="absolute inset-0 rounded-full border border-[rgba(22,176,168,0.22)] bg-[var(--color-accent-subtle-strong)]"
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
