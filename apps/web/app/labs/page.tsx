'use client';

import React from 'react';
import { PlayCircle, ShieldAlert, Filter } from 'lucide-react';

export default function LabsDiscoveryPage() {
  const categories = [
    {
      title: "Trending Bounties 🚀",
      description: "Compete with the community. Lowest API token cost wins the bounty.",
      projects: [
        { id: 'b1', title: "The Kaggle-Style Challenge", length: "7 days", tech: "ZeroClaw", locked: false, image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800" },
        { id: 'b2', title: "Fix the Infinite Loop", length: "Week-long", tech: "AutoClaw", locked: true, image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800" }
      ]
    },
    {
      title: "Under 15 Minutes ⚡",
      description: "Quick, gamified micro-drills to build your daily streak.",
      projects: [
        { id: 'u1', title: "NanoClaw: File Organizer", length: "10 mins", tech: "NanoClaw", locked: false, image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800" },
        { id: 'u2', title: "Defeating the Hallucination", length: "5 mins", tech: "Prompting", locked: false, image: "https://images.unsplash.com/photo-1620825937374-87fc1d620f8c?auto=format&fit=crop&q=80&w=800" },
        { id: 'u3', title: "Pokedex Vector Memory", length: "15 mins", tech: "RAG", locked: false, image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" },
      ]
    },
    {
       title: "Solving Complex Societal Problems 🌍",
       description: "End-to-end ProjectPro style courses addressing real-world impact.",
       projects: [
           { id: 'c1', title: "Climate Data Swarm", length: "2 Hours", tech: "NemoClaw", locked: true, image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" },
           { id: 'c2', title: "Medical Supply Scout", length: "3 Hours", tech: "AutoClaw", locked: true, image: "https://images.unsplash.com/photo-1532187863486-abf9dbefa146?auto=format&fit=crop&q=80&w=800" },
       ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto px-6 py-20 pb-32">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">The Command Center</h1>
            <p className="text-gray-400 text-lg">Your Netflix-style library of agentic labs. Build your daily streak with 15-minute quick hits, or tackle a massive societal problem using a full Swarm.</p>
          </div>
          <button className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors self-start md:self-auto">
            <Filter className="h-4 w-4" />
            Filter by Claw-Verse Variant
          </button>
        </div>

        {/* Carousel Categories */}
        <div className="space-y-16">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{cat.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{cat.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {cat.projects.map((proj) => (
                   <div key={proj.id} className="group relative rounded-xl overflow-hidden cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-opacity group-hover:opacity-100" />
                      
                      {/* Image background */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={proj.image} 
                        alt={proj.title} 
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Dark overlay for locked items */}
                      {proj.locked && (
                         <div className="absolute inset-0 bg-black/60 z-20 flex flex-col items-center justify-center backdrop-blur-[2px]">
                            <ShieldAlert className="h-8 w-8 text-amber-400 mb-2" />
                            <span className="text-xs font-bold tracking-widest text-white uppercase flex items-center gap-1">Pro Certificate Required</span>
                         </div>
                      )}

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 w-full p-4 z-30 transform transition-transform duration-300">
                         <div className="flex items-center gap-2 mb-2">
                           <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-black">
                             {proj.tech}
                           </span>
                           <span className="text-xs font-medium text-gray-300 bg-black/50 px-2 py-0.5 rounded backdrop-blur-md">
                             {proj.length}
                           </span>
                         </div>
                         <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors drop-shadow-md">{proj.title}</h3>
                         <div className="mt-3 flex items-center gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <PlayCircle className="h-5 w-5 text-emerald-400" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Launch Lab</span>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
