import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical } from "lucide-react";

export const metadata: Metadata = {
  title: "Labs",
  description:
    "Hands-on project challenges for CLI Academy learners — interactive builds, real projects, and applied agentic workflows. Coming soon.",
};

export default function LabsPage() {
  return (
    <main className="page-shell">
      <section className="panel p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent-subtle)]">
            <FlaskConical className="size-6 text-[var(--color-accent-primary)]" />
          </div>
          <div>
            <div className="eyebrow">Coming soon</div>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">Labs</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--color-fg-muted)]">
              Hands-on project challenges — coming soon.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 panel p-6">
        <h2 className="text-xl font-semibold">What Labs will be</h2>
        <div className="mt-4 grid gap-4 text-sm leading-7 text-[var(--color-fg-muted)] sm:grid-cols-2">
          <p>
            Labs will give you real, scoped projects to build using the tools and techniques from the
            learning paths. Each challenge starts with a clear goal, working code, and a way to verify
            your result — no vague prompts, no dead ends.
          </p>
          <p>
            Expect quick 15-minute drills to sharpen specific skills, multi-hour builds for deeper
            practice, and community challenges where you can compare approaches with other learners.
          </p>
        </div>
      </section>

      <section className="mt-6">
        <Link href="/paths" className="button-secondary">
          Browse learning paths
        </Link>
      </section>
    </main>
  );
}
