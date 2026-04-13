"use client";

import { useState } from "react";
import { PlayCircle } from "lucide-react";

interface VideoBlockProps {
  src: string;
  title: string;
  transcript?: string;
  duration?: string;
  caption?: string;
}

export function VideoBlock({ src, title, transcript, duration, caption }: VideoBlockProps) {
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <figure className="my-8 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] overflow-hidden">
      <div className="border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-4 py-3 flex gap-2 items-center">
        <PlayCircle className="size-4 text-[var(--color-accent-primary)]" />
        <span className="text-sm font-medium text-[var(--color-fg-default)]">{title}</span>
        {duration ? (
          <span className="ml-auto text-xs text-[var(--color-fg-muted)]">{duration}</span>
        ) : null}
      </div>
      <div className="aspect-video w-full bg-black">
        <iframe
          src={src}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {caption ? (
        <div className="px-4 py-2 text-xs text-[var(--color-fg-muted)] border-t border-[var(--color-border-subtle)]">
          {caption}
        </div>
      ) : null}
      {transcript ? (
        <div className="border-t border-[var(--color-border-subtle)]">
          <button
            type="button"
            className="w-full px-4 py-2 text-xs text-[var(--color-fg-muted)] hover:text-[var(--color-fg-default)] text-left"
            onClick={() => setShowTranscript((v) => !v)}
          >
            {showTranscript ? "Hide transcript" : "Show transcript"}
          </button>
          {showTranscript ? (
            <div className="px-4 pb-4 text-sm text-[var(--color-fg-default)] leading-6 whitespace-pre-wrap border-t border-[var(--color-border-subtle)] pt-3">
              {transcript}
            </div>
          ) : null}
        </div>
      ) : null}
    </figure>
  );
}
