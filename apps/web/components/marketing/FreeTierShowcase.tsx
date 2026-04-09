"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play, Lock, ChevronRight, CheckCircle2, Sparkles, MoveRight } from "lucide-react";

interface FreeTierShowcaseProps {
  userName: string;
}

export function FreeTierShowcase({ userName }: FreeTierShowcaseProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="flex flex-col gap-10">
      
      {/* ── Cinematic Welcome Video & Teaser ──────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl border border-[var(--color-accent-primary)]/20 bg-[#0A0D14] shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-primary)]/10 to-transparent pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row">
          {/* Left Text / Play CTA */}
          <div className="flex w-full flex-col justify-center p-8 lg:w-5/12 xl:p-12 z-10 relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-primary)]/30 bg-[var(--color-accent-primary)]/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-[var(--color-accent-primary)]">
              <Sparkles className="h-3.5 w-3.5" /> WELCOME TO CLI ACADEMY
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
              Anyone can build software now, <span className="text-[var(--color-accent-primary)] capitalize">{userName.split("@")[0] || "Builder"}</span>.
            </h2>
            <p className="text-[var(--color-fg-muted)] leading-relaxed mb-8">
              Watch this 3-minute onboarding masterclass to see how complete beginners use AI agents to build fully-functioning applications without writing traditional code. We promise—it will amaze you.
            </p>
            
            <button 
              onClick={() => setIsVideoPlaying(true)}
              className="group flex h-14 w-[85%] items-center justify-between rounded-2xl bg-white px-6 font-semibold text-black transition-all hover:scale-[1.02] hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <span className="flex items-center gap-3">
                <Play className="h-5 w-5 fill-black" />
                Watch the magic happen
              </span>
              <span className="text-xs font-medium text-gray-500 group-hover:text-black">3:12</span>
            </button>
          </div>

          {/* Right Cinematic Video Dummy */}
          <div className="relative flex w-full flex-col lg:w-7/12 aspect-[16/9] lg:aspect-auto min-h-[300px] border-l border-white/5 bg-[#111621] overflow-hidden group">
            {isVideoPlaying ? (
              <iframe 
                className="absolute inset-0 w-full h-full" 
                src="https://www.youtube.com/embed/AJpK3YTTKZ4?autoplay=1" 
                title="Anthropic Claude Demo" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            ) : (
              <>
                {/* Stock Image Placeholder for Video Cover */}
                <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity duration-700 group-hover:opacity-60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-transparent" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                   <button 
                     onClick={() => setIsVideoPlaying(true)}
                     className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-transform hover:scale-110 shadow-[0_0_30px_rgba(45,212,191,0.3)]"
                   >
                      <Play className="h-8 w-8 ml-1 fill-white" />
                   </button>
                </div>
                {/* Duration Tag */}
                <div className="absolute bottom-6 right-6 rounded-lg bg-black/60 backdrop-blur-md px-3 py-1 font-mono text-sm text-white">
                  03:12
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── The Promise Board: Locked Roadmap ──────────────────────────────────── */}
      <section className="mb-4">
        <div className="mb-6 flex items-end justify-between">
            <div>
               <h3 className="text-2xl font-semibold tracking-tight text-[var(--color-fg-default)]">
                 The CLI Academy Blueprint
               </h3>
               <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
                 What you will master when you upgrade your subscription.
               </p>
            </div>
            <Link href="/pricing" className="text-sm font-semibold text-[var(--color-accent-primary)] hover:underline flex items-center gap-1 group">
               View Pro benefits <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
           
           {/* Unlocked Starter Module */}
           <div className="relative overflow-hidden rounded-2xl border border-[var(--color-accent-primary)]/50 bg-[var(--color-accent-primary)]/5 p-6 transition-all hover:bg-[var(--color-accent-primary)]/10">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent-primary)] text-white shadow-lg shadow-[var(--color-accent-primary)]/30">
                 <CheckCircle2 className="h-5 w-5" />
              </div>
              <h4 className="mb-2 text-lg font-bold text-[var(--color-fg-default)]">Foundations</h4>
              <p className="mb-6 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                 Your free limits give you access to initial environment provisioning, deep local directory routing, and basic CLI commands.
              </p>
              <div className="text-xs font-semibold text-[var(--color-accent-primary)] flex items-center gap-1">
                 CURRENTLY UNLOCKED <ChevronRight className="h-3 w-3" />
              </div>
           </div>

           {/* Locked Premium Module 1 */}
           <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/50 p-6">
              <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center opacity-0 transition-opacity hover:opacity-100">
                 <div className="rounded-full bg-black/80 px-4 py-2 flex items-center gap-2 text-sm font-semibold text-white shadow-xl shadow-black/10">
                    <Lock className="h-4 w-4 text-[var(--color-accent-primary)]" /> PRO ONLY
                 </div>
              </div>
              
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-200 text-gray-500">
                 <Lock className="h-5 w-5" />
              </div>
              <h4 className="mb-2 text-lg font-bold text-gray-800">Industry Case Studies</h4>
              <p className="mb-6 text-sm leading-relaxed text-gray-500">
                  Unlock tear-downs of how top companies deploy agents, including deep-dives into NVIDIA&apos;s rumored &apos;NemoClaw&apos; and production-grade architectures.
              </p>
              <div className="text-xs font-semibold text-gray-400 flex items-center gap-1">
                 UNABLE TO ACCESS <ChevronRight className="h-3 w-3" />
              </div>
           </div>

           {/* Locked Premium Module 2 */}
           <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/50 p-6">
              <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center opacity-0 transition-opacity hover:opacity-100">
                 <div className="rounded-full bg-black/80 px-4 py-2 flex items-center gap-2 text-sm font-semibold text-white shadow-xl shadow-black/10">
                    <Lock className="h-4 w-4 text-[var(--color-accent-primary)]" /> PRO ONLY
                 </div>
              </div>
              
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-200 text-gray-500">
                 <Lock className="h-5 w-5" />
              </div>
              <h4 className="mb-2 text-lg font-bold text-gray-800">The Certification Paths</h4>
              <p className="mb-6 text-sm leading-relaxed text-gray-500">
                  Gamified, rigorous progression lines that award you verifiable industry badges (e.g., &apos;Certified Agentic Ops Specialist&apos;) upon passing our capstone labs.
              </p>
              <div className="text-xs font-semibold text-gray-400 flex items-center gap-1">
                 UNABLE TO ACCESS <ChevronRight className="h-3 w-3" />
              </div>
           </div>

        </div>
      </section>

    </div>
  );
}
