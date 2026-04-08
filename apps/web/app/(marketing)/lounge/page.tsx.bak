import Link from "next/link";
import { getPublishedLoungeArticles } from "@/lib/lounge";
import { Newspaper, ChevronRight, Sparkles, BookOpen, Clock } from "lucide-react";

export const metadata = {
  title: "The Agentic Era | Digital Magazine",
  description: "The premier digital publication for the autonomous AI frontier.",
};

export default async function AgenticEraPage() {
  const articles = await getPublishedLoungeArticles();

  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const topStories = articles.length > 1 ? articles.slice(1, 4) : [];
  const dispatches = articles.length > 4 ? articles.slice(4) : [];

  return (
    <main className="min-h-screen bg-[#020617] relative selection:bg-teal-500/30 selection:text-teal-200 text-slate-300 font-sans">
      {/* ── Magazine Header ─────────────────────────────────────────── */}
      <header className="border-b border-white/10 pt-20 pb-8 px-6 bg-gradient-to-b from-slate-900 via-[#020617] to-[#020617]">
        <div className="mx-auto max-w-7xl flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-teal-400">
            <Newspaper className="h-3.5 w-3.5" /> Established 2026
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">
            The Agentic Era
          </h1>
          <p className="text-xl md:text-2xl font-serif italic text-slate-400 max-w-2xl mx-auto">
            "The premier digital publication for the autonomous AI frontier."
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {articles.length === 0 ? (
           <div className="py-32 text-center border-t border-b border-white/5">
             <h3 className="font-serif text-2xl text-slate-500 italic pb-4">Awaiting Dispatches...</h3>
             <p className="text-slate-600">Our swarms are currently investigating the frontier.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* ── Left Column: Featured & Core Pillars (8 cols) ──────── */}
            <div className="lg:col-span-8 flex flex-col gap-12">
              
              {/* Featured Report */}
              {featuredArticle && (
                <section>
                  <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-2">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-teal-500">
                      I. Exclusive Report
                    </h2>
                  </div>
                  <Link 
                    href={`/lounge/${featuredArticle.slug}`}
                    className="group block relative overflow-hidden rounded-sm transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    
                    <div className="py-2">
                      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-slate-500 mb-3">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{featuredArticle.date}</span>
                        <span>•</span>
                        <span className="text-teal-600/80 font-bold">{featuredArticle.tags[0] || 'Swarm'}</span>
                      </div>
                      
                      <h3 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-slate-100 mb-4 group-hover:text-teal-400 transition-colors">
                        {featuredArticle.title}
                      </h3>
                      
                      <p className="font-serif text-xl leading-relaxed text-slate-400 mb-6">
                        {featuredArticle.summary || featuredArticle.description}
                      </p>
                      
                      <div className="text-sm font-bold uppercase tracking-widest text-white/40 flex items-center gap-2 group-hover:text-white transition-colors">
                        Read Report <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </section>
              )}

              {/* Top Stories Grid */}
              {topStories.length > 0 && (
                <section>
                  <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-2">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-teal-500">
                      II. The Core Pillars
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {topStories.map((article) => (
                      <Link 
                        key={article.slug} 
                        href={`/lounge/${article.slug}`}
                        className="group flex flex-col"
                      >
                        <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 border-b border-slate-800 pb-2 flex justify-between">
                          <span className="text-teal-600/80 font-bold">{article.tags[0] || 'Core'}</span>
                        </div>
                        <h3 className="font-serif text-xl font-bold leading-snug text-slate-200 mb-3 group-hover:text-teal-400 transition-colors">
                          {article.title}
                        </h3>
                        <p className="font-serif text-sm text-slate-500 line-clamp-4">
                          {article.summary || article.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* ── Right Column: Trending / Dispatches (4 cols) ──────── */}
            <div className="lg:col-span-4">
              <section className="bg-slate-900/50 border border-white/5 rounded-sm p-6 relative h-full">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-teal-500 to-transparent" />
                
                <div className="mb-6 flex items-center gap-3 pb-2">
                  <Sparkles className="h-4 w-4 text-teal-500" />
                  <h2 className="text-sm font-bold uppercase tracking-widest text-white">
                    III. Latest Dispatches
                  </h2>
                </div>

                <div className="flex flex-col gap-6">
                  {dispatches.length > 0 ? (
                    dispatches.map((article) => (
                      <Link 
                        key={article.slug} 
                        href={`/lounge/${article.slug}`}
                        className="group block border-b border-white/5 pb-6 last:border-0 last:pb-0"
                      >
                        <span className="text-[10px] uppercase font-bold tracking-widest text-teal-600/80 mb-1 block">
                          {article.date}
                        </span>
                        <h4 className="font-serif text-lg font-bold leading-tight text-slate-300 group-hover:text-teal-400 transition-colors mb-2">
                          {article.title}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {article.tags.join(", ")}
                        </p>
                      </Link>
                    ))
                  ) : (
                     <div className="py-10 text-center border border-dashed border-white/10">
                       <p className="text-xs font-serif italic text-slate-500">No active dispatches on the wire.</p>
                     </div>
                  )}

                  {/* EIC Statement */}
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <h5 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">Letter from the Editor</h5>
                    <p className="font-serif text-sm italic text-slate-500 leading-relaxed">
                      "At The Agentic Era, we focus on the architecture of autonomy. 70% deep tech implementation, 20% sector shifts, and 10% speculative horizon scanning."
                    </p>
                  </div>
                </div>
              </section>
            </div>
            
          </div>
        )}
      </div>
    </main>
  );
}
