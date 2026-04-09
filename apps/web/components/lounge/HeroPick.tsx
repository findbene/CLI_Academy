"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export function HeroPick() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
      className="group relative w-full overflow-hidden rounded-3xl"
    >
      <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl transition-all duration-500 group-hover:bg-white/10" />
      <div className="pointer-events-none absolute inset-0 z-20 rounded-3xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]" />

      <div className="relative z-10 flex h-full flex-col md:h-[400px] md:flex-row">
        <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12">
          <div className="mb-6 inline-flex items-center space-x-2 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/20 px-3 py-1 text-xs font-semibold text-[#00D4FF] shadow-[0_0_15px_rgba(0,212,255,0.2)]">
            <Sparkles className="h-3 w-3" />
            <span>Today&apos;s Chill Pick</span>
          </div>

          <h2 className="mb-4 text-3xl font-display font-semibold leading-tight text-[#F0F4F8] transition-colors group-hover:text-white md:text-5xl">
            The Psychology of Context Windows
          </h2>
          <p className="mb-8 max-w-sm text-lg font-light leading-relaxed text-gray-400">
            Why managing token limits feels stressful, and how treating your agent&apos;s memory like a human&apos;s short-term memory changes everything.
          </p>

          <div className="flex items-center space-x-2 text-[#00D4FF] transition-transform duration-300 group-hover:translate-x-2">
            <span className="font-medium font-sans">Read in Lounge</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        <div className="relative h-[300px] w-full overflow-hidden bg-[#030712] md:h-full md:w-1/2">
          <div className="absolute inset-0 z-10 hidden bg-gradient-to-r from-[#0F1117] to-transparent md:block md:w-1/4" />
          <div className="absolute inset-0 bottom-0 z-10 block h-1/4 bg-gradient-to-t from-[#0F1117] to-transparent md:hidden" />
          <div
            className="h-full w-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: 'url("/assets/placeholders/lounge-article.svg")' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
