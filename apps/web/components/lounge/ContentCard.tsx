"use client";

import { motion } from "framer-motion";
import type { LoungeItem } from "./AgentLounge";
import { Clock, PlayCircle, BookOpen, Wrench } from "lucide-react";
import Link from "next/link";

interface ContentCardProps {
  item: LoungeItem;
}

export function ContentCard({ item }: ContentCardProps) {
  const isVideo = item.category === "Visual Explainers";
  
  const cardContent = (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "backOut" }}
      className={`group relative flex flex-col rounded-3xl overflow-hidden bg-[#14161F]/60 border border-white/5 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.6)] ${item.href ? "cursor-pointer" : "cursor-default"}`}
    >
      {/* Soft Top Highlight */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Visual Header */}
      <div className="h-48 w-full relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700 ease-out" 
          style={{ backgroundImage: `url(${item.heroImage})`, backgroundColor: '#1A1D28' }} 
        />
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
            <PlayCircle className="w-12 h-12 text-white/80 group-hover:text-white transition-colors" />
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Meta info */}
        <div className="flex items-center space-x-4 mb-4 text-xs font-mono text-gray-500">
          <span className="flex items-center space-x-1 uppercase tracking-wider text-[#FFB300]/80">
            {item.category === "Visual Explainers" && <PlayCircle className="w-3 h-3" />}
            {item.category === "Agentic Articles" && <BookOpen className="w-3 h-3" />}
            {item.category === "Tool Spotlights" && <Wrench className="w-3 h-3" />}
            <span>{item.category}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{item.readTime}</span>
          </span>
        </div>

        <h3 className="text-xl font-display font-medium text-[#F0F4F8] mb-3 leading-snug group-hover:text-white transition-colors">
          {item.title}
        </h3>
        
        <p className="text-gray-400 font-light text-sm mb-6 flex-grow leading-relaxed">
          {item.teaser}
        </p>

        <div className="pt-4 border-t border-white/5 flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">By {item.author}</span>
          <span className="text-[#00D4FF] font-medium opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            {isVideo ? "Watch" : "Relax & Read"}
          </span>
        </div>
      </div>
    </motion.div>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="block outline-none" style={{ display: 'contents' }}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
