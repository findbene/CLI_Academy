"use client";

import { motion } from "framer-motion";
import { Flame, Share2, Download, Award, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface AlumniHubProps {
  streak: number;
  clearanceLevel: string;
  badgesCompleted: number;
}

export function AlumniHub({ streak, clearanceLevel, badgesCompleted }: AlumniHubProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleShare = () => {
    const text = `I just reached ${streak}-day streak and unlocked ${clearanceLevel} clearance at CLI Academy! Learning to command AI agents. #OpenClaw #AI`;
    window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div className="grid gap-6 mb-8">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-gradient-to-r from-[#14161F] to-[#1A1D28] border border-white/5 rounded-3xl p-8 relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#00D4FF]/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <ShieldCheck className="w-6 h-6 text-[#00D4FF]" />
              <h2 className="text-2xl font-display font-semibold text-white">Alumni Command Center</h2>
            </div>
            <p className="text-gray-400 font-light">
              Your operational hub. Level up, maintain your streak, and access premium tools.
            </p>
          </div>
          
          <div className="mt-6 md:mt-0 flex items-center space-x-4">
            <button 
              onClick={handleShare}
              className="px-4 py-2 flex items-center space-x-2 bg-white/5 hover:bg-[#0077b5]/20 text-gray-300 hover:text-[#0077b5] border border-white/10 hover:border-[#0077b5]/50 rounded-xl transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Share to LinkedIn</span>
            </button>
            <Link href="/lounge" className="px-4 py-2 flex items-center space-x-2 bg-[#00D4FF]/20 hover:bg-[#00D4FF]/30 text-[#00D4FF] border border-[#00D4FF]/30 rounded-xl transition-all">
              <span>Agent Lounge</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Gamification Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Streak Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-[#14161F]/60 border border-white/5 backdrop-blur-xl rounded-3xl p-6 flex items-center space-x-4 relative overflow-hidden"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#FFB300]/20 blur-xl rounded-full" />
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-14 h-14 bg-[#FFB300]/10 border border-[#FFB300]/30 rounded-2xl flex items-center justify-center relative z-10"
            >
              <Flame className="w-7 h-7 text-[#FFB300]" />
            </motion.div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Streak</div>
            <div className="text-3xl font-display font-bold text-white flex items-baseline space-x-1">
              <span>{streak}</span>
              <span className="text-xl text-[#FFB300]">🔥</span>
            </div>
          </div>
        </motion.div>

        {/* Clearance Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#14161F]/60 border border-white/5 backdrop-blur-xl rounded-3xl p-6 flex items-center space-x-4 relative overflow-hidden"
        >
          <div className="w-14 h-14 bg-[#00D4FF]/10 border border-[#00D4FF]/30 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-[#00D4FF]" />
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Clearance Level</div>
            <div className="text-xl font-display font-bold text-white">{clearanceLevel}</div>
          </div>
        </motion.div>

        {/* Badges Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[#14161F]/60 border border-white/5 backdrop-blur-xl rounded-3xl p-6 flex items-center space-x-4"
        >
          <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center">
            <Award className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Unlocked Badges</div>
            <div className="text-xl font-display font-bold text-white">{badgesCompleted}</div>
          </div>
        </motion.div>
      </div>

      {/* Resources & Cheat Sheets */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#14161F]/40 border border-white/5 rounded-3xl p-6 md:p-8"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Download className="w-5 h-5 text-gray-400" />
          <span>Alumni Resources</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {["ZeroClaw Cheat Sheet", "RAG Prompt Template", "Orchestrator Setup", "Agent Security Checklist"].map((doc, i) => (
            <a key={i} href="#" className="flex p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer justify-between items-center">
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">{doc}</span>
              <Download className="w-4 h-4 text-gray-500 group-hover:text-[#00D4FF]" />
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
