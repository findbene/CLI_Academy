"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, PlayCircle, BookOpen } from "lucide-react";
import { HeroPick } from "./HeroPick";
import { ContentCard } from "./ContentCard";
import { FilterNav } from "./FilterNav";

// --- Mock Data ---
export type Category = "All" | "Agentic Articles" | "Tool Spotlights" | "Visual Explainers";

export interface LoungeItem {
  id: string;
  title: string;
  teaser: string;
  readTime: string;
  category: "Agentic Articles" | "Tool Spotlights" | "Visual Explainers";
  heroImage: string;
  author: string;
  href?: string;
}

const MOCK_DATA: LoungeItem[] = [
  {
    id: "1",
    title: "Why ZeroClaw Changes Everything for Beginners",
    teaser: "A deep dive into why decoupling dependencies leads to a 10x smoother learning curve.",
    readTime: "4 min read",
    category: "Agentic Articles",
    heroImage: "/assets/placeholders/lounge_article_1.jpg",
    author: "CLI Editorial"
  },
  {
    id: "2",
    title: "Understanding RAG: Visualized",
    teaser: "See the exact flow of data from vector database to context window.",
    readTime: "2 min watch",
    category: "Visual Explainers",
    heroImage: "/assets/placeholders/lounge_video_1.jpg",
    author: "Alex Agent"
  },
  {
    id: "3",
    title: "Spotlight: MCP Server for Postgres",
    teaser: "Connect your local OpenClaw agent directly to your Postgres database using this incredible community tool.",
    readTime: "6 min read",
    category: "Tool Spotlights",
    heroImage: "/assets/placeholders/lounge_tool_1.jpg",
    author: "CLI Editors"
  },
  {
    id: "4",
    title: "The 'Stop, Undo, Recover' Loop",
    teaser: "How to stop stressing over agent mistakes and embrace the undo loop.",
    readTime: "7 min read",
    category: "Agentic Articles",
    heroImage: "/assets/placeholders/lounge_article_2.jpg",
    author: "Safety First",
    href: "/lounge/agent_anxiety_loop"
  },
  {
    id: "5",
    title: "Tool Use vs Multi-Agent Swarms",
    teaser: "When should one agent do it all, and when should you hire a whole team?",
    readTime: "3 min watch",
    category: "Visual Explainers",
    heroImage: "/assets/placeholders/lounge_video_2.jpg",
    author: "CLI Academy"
  },
  {
    id: "6",
    title: "Spotlight: AutoClaw Orchestrator",
    teaser: "A glimpse at the tool powering our most advanced pro capstone.",
    readTime: "4 min read",
    category: "Tool Spotlights",
    heroImage: "/assets/placeholders/lounge_tool_2.jpg",
    author: "CLI Builders"
  }
];

export default function AgentLounge() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredItems = MOCK_DATA.filter(
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
