"use client";

import { motion } from "framer-motion";
import type { LoungeItem } from "./AgentLounge";
import { BookOpen, Clock, PlayCircle, Wrench } from "lucide-react";
import Link from "next/link";

interface ContentCardProps {
  item: LoungeItem;
}

export function ContentCard({ item }: ContentCardProps) {
  const isVideo = item.category === "Visual Explainers";
  const accentColor = isVideo
    ? "var(--color-status-info)"
    : item.category === "Tool Spotlights"
      ? "var(--color-accent-warning)"
      : "var(--color-accent-primary)";

  const MetaIcon =
    item.category === "Visual Explainers"
      ? PlayCircle
      : item.category === "Tool Spotlights"
        ? Wrench
        : BookOpen;

  const card = (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] shadow-[var(--shadow-1)] transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-2)] ${item.href ? "cursor-pointer" : "cursor-default"}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-70"
        style={{
          background: `linear-gradient(180deg, color-mix(in srgb, ${accentColor} 14%, transparent) 0%, transparent 100%)`,
        }}
      />

      <div className="relative h-48 w-full overflow-hidden bg-[var(--color-bg-panel-subtle)]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ backgroundColor: "var(--color-bg-panel-subtle)", backgroundImage: `url(${item.heroImage})` }}
        />
        <div
          className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] shadow-[var(--shadow-1)]"
          style={{
            background: "var(--color-bg-page)",
            color: accentColor,
          }}
        >
          {isVideo && <PlayCircle className="h-3.5 w-3.5" />}
          {!isVideo && item.category === "Agentic Articles" && <BookOpen className="h-3.5 w-3.5" />}
          {item.category === "Tool Spotlights" && <Wrench className="h-3.5 w-3.5" />}
          <span>{item.category}</span>
        </div>

        {isVideo ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[rgba(12,19,36,0.12)] transition-colors duration-300 group-hover:bg-[rgba(12,19,36,0.06)]">
            <div className="rounded-full bg-white/88 p-3 text-[var(--color-status-info)] shadow-[var(--shadow-1)]">
              <PlayCircle className="h-8 w-8" />
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-medium text-[var(--color-fg-muted)]">
          <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.14em]" style={{ color: accentColor }}>
            <MetaIcon className="h-3.5 w-3.5" />
            <span>{item.category}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{item.readTime}</span>
          </span>
        </div>

        <h3 className="text-xl font-display font-semibold leading-snug text-[var(--color-fg-default)] transition-colors duration-300 group-hover:text-[var(--color-accent-primary)]">
          {item.title}
        </h3>

        <p className="mt-3 flex-grow text-sm leading-7 text-[var(--color-fg-muted)]">
          {item.teaser}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border-subtle)] pt-4 text-sm">
          <span className="text-[var(--color-fg-muted)]">By {item.author}</span>
          <span
            className="translate-x-[-6px] font-semibold opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            style={{ color: accentColor }}
          >
            {isVideo ? "Watch now" : "Read next"}
          </span>
        </div>
      </div>
    </motion.article>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="block h-full rounded-[1.75rem] outline-none">
        {card}
      </Link>
    );
  }

  return card;
}
