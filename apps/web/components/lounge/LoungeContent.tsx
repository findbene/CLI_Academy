import Link from "next/link";
import { Fragment } from "react";
import { getLoungeArticle } from "@/lib/lounge";
import { CodeBlock } from "@/components/lesson/CodeBlock";

interface LoungeContentProps {
  slug: string;
}

function renderInlineContent(text: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);

  return parts.map((part, index) => {
    const codeMatch = part.match(/^`([^`]+)`$/);
    if (codeMatch) {
      return <code key={index}>{codeMatch[1]}</code>;
    }

    const strongMatch = part.match(/^\*\*([\s\S]+)\*\*$/);
    if (strongMatch) {
      return <strong key={index}>{strongMatch[1]}</strong>;
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const external = href.startsWith("http://") || href.startsWith("https://");

      return (
        <a
          key={index}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className="text-teal-400 hover:text-teal-300 underline underline-offset-2"
        >
          {label}
        </a>
      );
    }

    return <Fragment key={index}>{part}</Fragment>;
  });
}

function renderBlock(block: string, index: number) {
  // Catch custom Lounge CTAs
  const ctaMatch = block.match(/<div className="tavern-cta">([\s\S]*?)<\/div>/);
  if (ctaMatch) {
    return (
      <div key={index} className="my-8 rounded-xl border border-teal-500/30 bg-teal-500/5 p-6 text-center">
        <p className="text-lg text-[rgba(255,255,255,0.9)]">{renderInlineContent(ctaMatch[1].trim())}</p>
      </div>
    );
  }

  if (block.startsWith("```")) {
    const langMatch = block.match(/^```(\w+)/);
    const language = langMatch?.[1] ?? undefined;
    const code = block.replace(/^```[^\n]*\n?/, "").replace(/\n```$/, "");

    return <CodeBlock key={index} language={language}>{code}</CodeBlock>;
  }

  // Raw HTML embedding (videos, iframes, wrappers)
  if (block.startsWith("<video") || block.startsWith("<iframe") || block.startsWith("<div")) {
    return (
      <div 
        key={index} 
        className="my-8 overflow-hidden rounded-xl shadow-2xl border border-white/5 bg-black"
        dangerouslySetInnerHTML={{ __html: block }} 
      />
    );
  }

  // Markdown Images: ![alt](url)
  const imageMatch = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (imageMatch) {
    const [, alt, src] = imageMatch;
    return (
      <figure key={index} className="my-10 relative overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl">
        <img src={src} alt={alt || "Article illustration"} className="w-full h-auto object-cover" loading="lazy" />
        {alt && (
          <figcaption className="p-3 text-center text-xs text-slate-500 font-serif italic border-t border-white/5">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  }

  if (block === "---") {
    return <hr key={index} className="my-8 border-white/10" />;
  }

  if (block.startsWith("## ")) {
    return <h2 key={index} className="mt-12 mb-4 text-2xl font-bold text-white">{block.slice(3).trim()}</h2>;
  }

  if (block.startsWith("### ")) {
    return <h3 key={index} className="mt-8 mb-3 text-xl font-semibold text-white/90">{block.slice(4).trim()}</h3>;
  }

  if (block.split("\n").every((line) => line.trim().startsWith("- "))) {
    return (
      <ul key={index} className="my-4 ml-6 list-disc space-y-2 text-white/70">
        {block
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => (
             <li key={line}>{renderInlineContent(line.replace(/^- /, "").trim())}</li>
          ))}
      </ul>
    );
  }

  // Fallback as paragraph
  return <p key={index} className="my-4 text-[1.1rem] leading-relaxed text-white/70">{renderInlineContent(block)}</p>;
}

export async function LoungeContent({ slug }: LoungeContentProps) {
  const article = await getLoungeArticle(slug);

  if (!article) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#0f1115] p-6">
        <h2 className="text-2xl font-semibold text-white">Item not found</h2>
        <p className="mt-3 text-white/60">
          This piece of content is currently missing or has been fully archived.
        </p>
      </div>
    );
  }

  const blocks = article.body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <article className="mx-auto max-w-3xl pb-24">
      {blocks.map((block, index) => renderBlock(block, index))}
    </article>
  );
}
