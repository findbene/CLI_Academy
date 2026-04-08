import Link from "next/link";
import { getLoungeArticle, getPublishedLoungeArticles } from "@/lib/lounge";
import { LoungeContent } from "@/components/lounge/LoungeContent";
import { ArrowLeft, Calendar } from "lucide-react";

export async function generateStaticParams() {
  const articles = await getPublishedLoungeArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function LoungeArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getLoungeArticle(slug);

  if (!article) {
    return (
      <main className="min-h-screen bg-[#040508] pt-32 pb-24 text-center">
        <h1 className="text-3xl text-white">404 - Content Missing</h1>
        <Link href="/lounge" className="mt-6 inline-block text-teal-400">Return to the Tavern</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#040508] relative">
      <div className="mx-auto max-w-3xl px-6 pt-32 pb-12">
        <Link href="/lounge" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-12 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Lounge
        </Link>

        {article.image && (
           <div className="mb-12 w-full aspect-video rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src={article.image} alt={article.title} className="w-full h-full object-cover opacity-80" />
           </div>
        )}

        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="rounded-full bg-teal-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-teal-300">
              {article.type}
            </span>
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold flex items-center gap-2 text-white/50">
               <Calendar className="h-3 w-3" /> {article.date}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-xl text-white/60 font-light leading-relaxed">
            {article.description}
          </p>
        </header>

        <LoungeContent slug={slug} />
      </div>
    </main>
  );
}
