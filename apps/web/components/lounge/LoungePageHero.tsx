"use client";

import { motion } from "framer-motion";
import { Coffee, ArrowDown } from "lucide-react";
import ShaderBackground from "@/components/ui/shader-background";

export function LoungePageHero() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
      className="group relative flex min-h-[32rem] w-full items-center overflow-hidden md:min-h-[36rem]"
    >
      <ShaderBackground className="opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.22),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.16),transparent_45%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,17,23,0.72)_0%,rgba(15,17,23,0.28)_28%,rgba(15,17,23,0.72)_100%),linear-gradient(90deg,rgba(15,17,23,0.96)_0%,rgba(15,17,23,0.82)_38%,rgba(15,17,23,0.3)_72%,rgba(15,17,23,0.12)_100%)]" />
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] transition-all duration-500 group-hover:bg-white/8" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-[#0F1117] to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-28 lg:px-12">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-[#F0F4F8] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-md">
            <div className="rounded-xl border border-white/10 bg-white/8 p-2">
              <Coffee className="h-4 w-4 text-[#FFB300]" />
            </div>
            <span>Welcome to the Agent Lounge</span>
          </div>

          <h1 className="max-w-4xl text-4xl font-display font-semibold tracking-tight text-[#F0F4F8] md:text-5xl lg:text-6xl">
            A quieter corner for learning the Agentic Era.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-gray-300 md:text-lg">
            Take a breath. Grab a coffee. Explore the future of AI agents without the pressure of a terminal, then keep scrolling for the featured chill pick, filters, and article grid.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/12 px-4 py-2 text-sm font-medium text-[#00D4FF]">
            <ArrowDown className="h-4 w-4" />
            Scroll for today&apos;s pick
          </div>
        </div>
      </div>
    </motion.section>
  );
}
