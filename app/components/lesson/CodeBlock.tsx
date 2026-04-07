"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  children: string;
  language?: string;
}

export function CodeBlock({ children, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API may not be available in all contexts.
    }
  }

  return (
    <div className="group relative">
      {language ? (
        <div className="absolute top-0 left-0 rounded-br-lg rounded-tl-[var(--radius-lg)] bg-[var(--color-bg-panel-subtle)] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">
          {language}
        </div>
      ) : null}
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-md bg-[var(--color-bg-panel)] text-[var(--color-fg-muted)] opacity-0 shadow-sm transition hover:text-[var(--color-fg-default)] group-hover:opacity-100"
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? <Check className="size-3.5 text-[var(--color-accent-primary)]" /> : <Copy className="size-3.5" />}
      </button>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}
