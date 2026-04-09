"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import ShaderBackground from "@/components/ui/shader-background";

export function HeroPick() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
      className="group relative w-full overflow-hidden rounded-3xl"
    >
      {/* Background layer with blur */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl transition-all duration-500 group-hover:bg-white/10" />
      <div className="absolute inset-0 border border-white/10 rounded-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] pointer-events-none z-20" />
      
      <div className="relative z-10 flex flex-col md:flex-row h-full md:h-[400px]">
        {/* Left Side: Text Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#00D4FF]/20 text-[#00D4FF] rounded-full text-xs font-semibold mb-6 w-max border border-[#00D4FF]/30 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
            <Sparkles className="w-3 h-3" />
            <span>Today&apos;s Chill Pick</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-display font-semibold mb-4 leading-tight group-hover:text-white text-[#F0F4F8] transition-colors">
            The Psychology of Context Windows
          </h2>
          <p className="text-gray-400 font-light text-lg mb-8 leading-relaxed max-w-sm">
            Why managing token limits feels stressful, and how treating your agent&apos;s memory like a human&apos;s short-term memory changes everything.
          </p>
          
          <div className="flex items-center space-x-2 text-[#00D4FF] group-hover:translate-x-2 transition-transform duration-300">
            <span className="font-medium font-sans">Read in Lounge</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Right Side: Visual */}
        <div className="relative h-[300px] w-full overflow-hidden bg-[#030712] md:h-full md:w-1/2">
          <ShaderBackground className="opacity-95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.22),transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.16),transparent_45%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1117] to-transparent z-10 md:w-1/4 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] to-transparent z-10 h-1/4 bottom-0 md:hidden block" />
        </div>
      </div>
    </motion.div>
  );
}
