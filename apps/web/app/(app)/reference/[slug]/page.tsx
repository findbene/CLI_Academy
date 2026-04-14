import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getReferenceBySlug,
  getReferenceCategoryLabel,
  REFERENCE_CARDS,
} from "@/lib/data/references";
import { getServerViewer } from "@/lib/viewer";
import { PrintButton } from "@/components/reference/PrintButton";
import {
  ClaudeCodeSetupCard,
  SlashCommandsCard,
  ClaudeCodeQuickRefCard,
  OpenClawSetupCard,
  ClawVariantsCard,
  SkillsReferenceCard,
  MCPsReferenceCard,
  CoworkSetupCard,
} from "@/components/reference/cards";

export async function generateStaticParams() {
  return REFERENCE_CARDS.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = getReferenceBySlug(slug);
  if (!card) return {};
  return {
    title: card.title,
    description: card.subtitle,
  };
}

function getCardContent(slug: string) {
  switch (slug) {
    case "claude-code-setup":    return <ClaudeCodeSetupCard />;
    case "slash-commands":       return <SlashCommandsCard />;
    case "claude-code-quick-ref": return <ClaudeCodeQuickRefCard />;
    case "openclaw-setup":       return <OpenClawSetupCard />;
    case "claw-variants":        return <ClawVariantsCard />;
    case "skills-reference":     return <SkillsReferenceCard />;
    case "mcps-reference":       return <MCPsReferenceCard />;
    case "cowork-setup":         return <CoworkSetupCard />;
    default:                     return null;
  }
}

export default async function ReferenceCardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = getReferenceBySlug(slug);

  if (!card) notFound();

  const viewer = await getServerViewer();
  const isPro = viewer.profile?.tier === "pro";

  if (card.tier === "pro" && !isPro) {
    redirect("/reference");
  }

  const content = getCardContent(slug);
  if (!content) notFound();

  return (
    <>
      {/* Screen-only nav bar */}
      <div className="print:hidden sticky top-0 z-10 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] px-6 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/reference"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-fg-muted)] transition hover:text-[var(--color-fg-default)]"
          >
            <ArrowLeft className="size-4" />
            Reference center
          </Link>
          <div className="flex items-center gap-3">
            <span className="badge" data-tone={card.tier === "free" ? "accent" : "warning"}>
              {card.tier === "free" ? "Free" : "Pro"}
            </span>
            <span className="badge">{getReferenceCategoryLabel(card.category)}</span>
            <PrintButton />
          </div>
        </div>
      </div>

      {/* Reference card — screen + print */}
      <div className="ref-page-wrapper">
        {/* Header */}
        <header className="ref-page-header">
          <div className="ref-page-header-top">
            <span className="ref-page-eyebrow">CLI Academy · Reference Card</span>
            <span className="ref-page-meta">Updated {card.updatedAt} · {card.readMinutes} min read</span>
          </div>
          <h1 className="ref-page-title">{card.title}</h1>
          <p className="ref-page-subtitle">{card.subtitle}</p>
          <div className="ref-page-tags">
            {card.topics.map((t) => (
              <span key={t} className="ref-tag">{t}</span>
            ))}
          </div>
        </header>

        {/* Content body */}
        {content}

        {/* Print footer */}
        <footer className="ref-page-footer">
          <span>cliacademy.com/reference/{card.slug}</span>
          <span>·</span>
          <span>CLI Academy · {card.tier === "free" ? "Free" : "Pro"} · {getReferenceCategoryLabel(card.category)}</span>
          <span>·</span>
          <span>Updated {card.updatedAt}</span>
        </footer>
      </div>
    </>
  );
}
