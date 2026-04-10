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
      <main
        className="min-h-screen px-6 pb-24 pt-32 text-center"
        style={{
          background:
            "linear-gradient(180deg, var(--color-bg-page) 0%, var(--color-bg-lesson) 40%, var(--color-bg-page) 100%)",
        }}
      >
        <h1 className="text-3xl text-[var(--color-fg-default)]">404 - Content Missing</h1>
        <Link href="/lounge" className="mt-6 inline-block text-[var(--color-fg-link)]">
          Return to the Lounge
        </Link>
      </main>
    );
  }

  return (
    <main
      className="relative min-h-screen overflow-x-clip"
      style={{
        background:
          "linear-gradient(180deg, var(--color-bg-page) 0%, var(--color-bg-lesson) 36%, var(--color-bg-page) 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem]"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(22, 176, 168, 0.15), transparent 30%), radial-gradient(circle at 84% 16%, rgba(201, 134, 18, 0.12), transparent 18%)",
        }}
      />

      <div className="mx-auto max-w-4xl px-6 pb-16 pt-32">
        <Link href="/lounge" className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg-default)]">
          <ArrowLeft className="h-4 w-4" /> Back to Lounge
        </Link>

        {article.image && (
           <div className="mb-8 aspect-video w-full overflow-hidden rounded-[1.75rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] shadow-[var(--shadow-2)]">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
           </div>
        )}

        <header className="mb-10 rounded-[2rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] px-7 py-8 shadow-[var(--shadow-1)] sm:px-10 sm:py-10">
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-[var(--color-accent-subtle)] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-primary)]">
              {article.type}
            </span>
            <span className="flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] px-3 py-1 text-xs font-semibold text-[var(--color-fg-muted)]">
               <Calendar className="h-3 w-3" /> {article.date}
            </span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-[var(--color-fg-default)] sm:text-5xl">
            {article.title}
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-fg-muted)] sm:text-xl">
            {article.description}
          </p>
        </header>

        <LoungeContent slug={slug} />
      </div>
    </main>
  );
}
