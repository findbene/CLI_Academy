import Link from "next/link";
import { getPublishedLoungeArticles } from "@/lib/lounge";
import { Sparkles, PlayCircle, Image as ImageIcon, Flame } from "lucide-react";

export const metadata = {
  title: "The Terminal Tavern | CLI Academy",
  description: "The chill zone for high-signal AI news, OpenClaw updates, and agent workflows.",
};

export default async function LoungePage() {
  const articles = await getPublishedLoungeArticles();

  return (
    <main className="min-h-screen bg-[#040508] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-[#040508] to-[#040508] pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-24">
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-sm font-medium text-teal-400 mb-6">
            <Flame className="h-4 w-4" /> The Fun Corner
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-white mb-4 [text-shadow:_0_0_30px_rgba(255,255,255,0.2)]">
            The Terminal Tavern
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-light">
            Kick back, relax, and catch up on the latest Agentic workflows, OpenClaw news, and fun weekend projects.
          </p>
        </header>

        {articles.length === 0 ? (
          <div className="text-center py-24 rounded-2xl border border-white/5 bg-white/[0.02]">
            <Sparkles className="h-12 w-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-lg text-white/60">The Swarm is currently drafting our first piece.</h3>
            <p className="text-white/40">Check back soon for fresh content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link 
                key={article.slug} 
                href={`/lounge/${article.slug}`}
                className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.04] hover:border-teal-500/50 hover:shadow-[0_0_30px_rgba(45,212,191,0.1)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  {article.type === "video" ? (
                    <PlayCircle className="h-5 w-5 text-fuchsia-400" />
                  ) : article.type === "graphic" ? (
                    <ImageIcon className="h-5 w-5 text-amber-400" />
                  ) : (
                    <Sparkles className="h-5 w-5 text-teal-400" />
                  )}
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    {article.type}
                  </span>
                  <span className="ml-auto text-xs text-white/40">{article.date}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-teal-300 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-white/60 text-sm line-clamp-3 mb-6 flex-grow">
                  {article.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {article.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="rounded-md bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wider text-white/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
