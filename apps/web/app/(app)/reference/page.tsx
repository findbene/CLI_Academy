import type { Metadata } from "next";
import Link from "next/link";
import { BookMarked, FileText, Map, Terminal } from "lucide-react";
import {
  REFERENCE_CARDS,
  getReferenceCategoryLabel,
  type ReferenceCard,
  type ReferenceCategory,
} from "@/lib/data/references";
import { getServerViewer } from "@/lib/viewer";

export const metadata: Metadata = {
  title: "Reference Center",
  description:
    "Single-page printable setup guides, command references, and cheat sheets for Claude Code, Cowork, OpenClaw, and the Claw ecosystem.",
};

function categoryIcon(category: ReferenceCategory) {
  switch (category) {
    case "setup-guide":   return <FileText className="size-4" />;
    case "command-ref":   return <Terminal className="size-4" />;
    case "cheatsheet":    return <BookMarked className="size-4" />;
    case "ecosystem-map": return <Map className="size-4" />;
  }
}

function categoryAccent(category: ReferenceCategory) {
  switch (category) {
    case "setup-guide":   return "rgba(22,176,168,0.12)";
    case "command-ref":   return "rgba(139,92,246,0.12)";
    case "cheatsheet":    return "rgba(245,158,11,0.12)";
    case "ecosystem-map": return "rgba(59,130,246,0.12)";
  }
}

function categoryTextColor(category: ReferenceCategory) {
  switch (category) {
    case "setup-guide":   return "var(--color-accent-primary)";
    case "command-ref":   return "#8b5cf6";
    case "cheatsheet":    return "var(--color-accent-warning)";
    case "ecosystem-map": return "#3b82f6";
  }
}

function ReferenceCardItem({ card, locked }: { card: ReferenceCard; locked: boolean }) {
  const accent = categoryAccent(card.category);
  const text   = categoryTextColor(card.category);

  return (
    <article className="panel p-5 transition hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
          style={{ background: accent, color: text }}
        >
          {categoryIcon(card.category)}
          {getReferenceCategoryLabel(card.category)}
        </span>
        <span className="badge" data-tone={card.tier === "free" ? "accent" : "warning"}>
          {card.tier === "free" ? "Free" : "Pro"}
        </span>
      </div>

      <h3 className="mt-4 text-xl font-semibold">{card.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{card.subtitle}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {card.topics.map((t) => (
          <span key={t} className="rounded-md bg-[var(--color-bg-page)] px-2 py-0.5 text-xs text-[var(--color-fg-muted)]">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">
        {card.readMinutes} min read · Updated {card.updatedAt}
      </div>

      <div className="mt-5">
        {locked ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-4 py-2 text-sm text-[var(--color-fg-muted)]">
            Pro required
          </span>
        ) : (
          <Link
            href={`/reference/${card.slug}`}
            className="button-secondary text-sm"
          >
            View &amp; Print
          </Link>
        )}
      </div>
    </article>
  );
}

export default async function ReferencePage() {
  const viewer = await getServerViewer();
  const isPro = viewer.profile?.tier === "pro";

  const freeCards = REFERENCE_CARDS.filter((r) => r.tier === "free");
  const proCards  = REFERENCE_CARDS.filter((r) => r.tier === "pro");

  return (
    <main className="page-shell">
      {/* Hero */}
      <section className="panel p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[rgba(22,176,168,0.12)]">
            <BookMarked className="size-6 text-[var(--color-accent-primary)]" />
          </div>
          <div>
            <div className="eyebrow">Reference center</div>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">
              Everything you need, one page at a time
            </h1>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-[var(--color-fg-muted)]">
              Setup guides, command references, and cheat sheets designed for people who are always in a hurry.
              Each card fits on a single page — open it, print it, and keep it beside your terminal.
            </p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3 text-sm text-[var(--color-fg-muted)]">
          <span className="inline-flex items-center gap-1.5"><FileText className="size-3.5 text-[var(--color-accent-primary)]" /> Setup guides</span>
          <span className="text-[var(--color-border-subtle)]">·</span>
          <span className="inline-flex items-center gap-1.5"><Terminal className="size-3.5 text-purple-400" /> Command references</span>
          <span className="text-[var(--color-border-subtle)]">·</span>
          <span className="inline-flex items-center gap-1.5"><BookMarked className="size-3.5 text-amber-400" /> Cheat sheets</span>
          <span className="text-[var(--color-border-subtle)]">·</span>
          <span className="inline-flex items-center gap-1.5"><Map className="size-3.5 text-blue-400" /> Ecosystem maps</span>
        </div>
      </section>

      {/* Free references */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Free reference cards</h2>
        <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
          Available to everyone — no account needed once you&apos;re signed in.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {freeCards.map((card) => (
            <ReferenceCardItem key={card.slug} card={card} locked={false} />
          ))}
        </div>
      </section>

      {/* Pro references */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Pro reference cards</h2>
        <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
          OpenClaw, Claw variants, and advanced skill/MCP patterns — included with Pro.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {proCards.map((card) => (
            <ReferenceCardItem key={card.slug} card={card} locked={!isPro} />
          ))}
        </div>
      </section>

      {/* CTA */}
      {!isPro && (
        <div className="mt-12 panel p-6 text-center">
          <p className="text-sm font-medium text-[var(--color-fg-muted)]">
            Unlock Pro reference cards — OpenClaw, Claw variants, Skills, and more.
          </p>
          <Link href="/pricing" className="button-primary mt-4 inline-flex">
            Upgrade to Pro
          </Link>
        </div>
      )}
    </main>
  );
}
