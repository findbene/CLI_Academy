import Link from "next/link";
import type { CommunityShowcaseHighlight } from "@/lib/academy";

interface CommunityShowcasePanelProps {
  highlights: CommunityShowcaseHighlight[];
}

export function CommunityShowcasePanel({ highlights }: CommunityShowcasePanelProps) {
  return (
    <section className="panel p-6">
      <div className="eyebrow">Community</div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Optional capstone showcase, not noisy community pressure</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--color-fg-muted)]">
            Community is kept intentionally light. Learners can share finished work for motivation and proof, but the
            product still centers guided execution, safety, and artifacts.
          </p>
        </div>
        <Link href="/pricing" className="button-secondary">
          See portfolio path
        </Link>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {highlights.map((highlight) => (
          <article key={highlight.title} className="rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] p-4">
            <h3 className="text-lg font-semibold">{highlight.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{highlight.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
