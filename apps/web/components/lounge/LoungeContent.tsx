import Image from "next/image";
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
          className="text-[var(--color-fg-link)] hover:text-[var(--color-accent-primary)] underline underline-offset-2"
        >
          {label}
        </a>
      );
    }

    return <Fragment key={index}>{part}</Fragment>;
  });
}

function renderBlock(block: string, index: number) {
  const getTagAttributes = (source: string) => {
    const attributes: Record<string, string> = {};
    for (const match of source.matchAll(/(\w+)="([^"]*)"/g)) {
      attributes[match[1]] = match[2];
    }
    return attributes;
  };

  if (block.startsWith("<Screenshot")) {
    const attrs = getTagAttributes(block);
    return (
      <figure key={index} className="my-10 overflow-hidden rounded-[1.5rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] shadow-[var(--shadow-2)]">
        <Image
          src={attrs.src}
          alt={attrs.alt || "Article illustration"}
          width={1200}
          height={700}
          className="h-auto w-full object-cover"
        />
        {attrs.caption ? (
          <figcaption className="border-t border-[var(--color-border-subtle)] p-3 text-center text-xs italic text-[var(--color-fg-muted)]">
            {attrs.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (block.startsWith("<TerminalSimulation")) {
    const attrs = getTagAttributes(block);
    return (
      <div key={index} className="my-8 overflow-hidden rounded-[1.5rem] border border-[rgba(22,176,168,0.18)] bg-[var(--color-bg-code)] shadow-[var(--shadow-2)]">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-primary)]">Terminal</span>
          <span className="rounded-full bg-[rgba(22,176,168,0.15)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-primary)]">
            {attrs.status || "success"}
          </span>
        </div>
        <div className="space-y-3 p-4 font-mono text-sm text-[var(--color-fg-inverse)]">
          <div className="text-[var(--color-accent-primary)]">$ {attrs.command}</div>
          <div className="text-white/75">{attrs.output}</div>
        </div>
      </div>
    );
  }

  // Catch custom Lounge CTAs
  const ctaMatch = block.match(/<div className="tavern-cta">([\s\S]*?)<\/div>/);
  if (ctaMatch) {
    return (
      <div key={index} className="my-8 rounded-[1.5rem] border border-[rgba(22,176,168,0.24)] bg-[var(--color-accent-subtle)] p-6 text-center">
        <p className="text-lg text-[var(--color-fg-default)]">{renderInlineContent(ctaMatch[1].trim())}</p>
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
        className="my-8 overflow-hidden rounded-[1.5rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] shadow-[var(--shadow-2)]"
        dangerouslySetInnerHTML={{ __html: block }} 
      />
    );
  }

  // Markdown Images: ![alt](url)
  const imageMatch = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (imageMatch) {
    const [, alt, src] = imageMatch;
    return (
      <figure key={index} className="my-10 relative overflow-hidden rounded-[1.5rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] shadow-[var(--shadow-2)]">
        <Image
          src={src}
          alt={alt || "Article illustration"}
          width={1200}
          height={700}
          className="h-auto w-full object-cover"
        />
        {alt && (
          <figcaption className="border-t border-[var(--color-border-subtle)] p-3 text-center text-xs italic text-[var(--color-fg-muted)]">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  }

  if (block === "---") {
    return <hr key={index} className="my-8 border-[var(--color-border-subtle)]" />;
  }

  if (block.startsWith("## ")) {
    return <h2 key={index} className="mb-4 mt-12 text-2xl font-bold text-[var(--color-fg-default)]">{block.slice(3).trim()}</h2>;
  }

  if (block.startsWith("### ")) {
    return <h3 key={index} className="mb-3 mt-8 text-xl font-semibold text-[var(--color-fg-default)]">{block.slice(4).trim()}</h3>;
  }

  if (block.split("\n").every((line) => line.trim().startsWith("- "))) {
    return (
      <ul key={index} className="my-4 ml-6 list-disc space-y-2 text-[var(--color-fg-muted)]">
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
  return <p key={index} className="my-4 text-[1.1rem] leading-relaxed text-[var(--color-fg-muted)]">{renderInlineContent(block)}</p>;
}

export async function LoungeContent({ slug }: LoungeContentProps) {
  const article = await getLoungeArticle(slug);

  if (!article) {
    return (
      <div className="rounded-[1.5rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-6 shadow-[var(--shadow-1)]">
        <h2 className="text-2xl font-semibold text-[var(--color-fg-default)]">Item not found</h2>
        <p className="mt-3 text-[var(--color-fg-muted)]">
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
