import type { Metadata } from "next";
import Link from "next/link";
import { compatibilityEntries } from "@/lib/support";

export const metadata: Metadata = {
  title: "Runtime Lab",
  description:
    "Compare Claude Code surfaces, OpenClaw-style runtimes, sandbox choices, and maturity tiers with honest beginner-first guidance.",
};

const maturityTiers = [
  {
    title: "Strong default",
    summary: "Safe enough for beginners to start with when they want the least surprising route.",
  },
  {
    title: "Proceed with guidance",
    summary: "Useful, but requires more setup awareness, rollback discipline, or extra review.",
  },
  {
    title: "Advanced only",
    summary: "Powerful or flexible, but not where a beginner should begin without strong operator habits.",
  },
];

export default function RuntimeLabPage() {
  return (
    <main className="page-shell py-12">
      <section className="panel p-6">
        <div className="eyebrow">Runtime Lab</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">Choose the right runtime before you overbuild the system</h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-[var(--color-fg-muted)]">
          Runtime Lab is the honest comparison layer for local execution, Docker sandboxes, cloud environments, Claude
          surfaces, and Claw-verse-style runtimes. The goal is not hype. The goal is choosing the smallest safe setup
          that still gets the job done.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/setup-academy" className="button-primary">
            Start with Setup Academy
          </Link>
          <Link href="/compatibility" className="button-secondary">
            Open compatibility matrix
          </Link>
          <Link href="/asset-vault" className="button-ghost">
            Get runtime field manuals
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {maturityTiers.map((tier) => (
          <article key={tier.title} className="panel p-5">
            <h2 className="text-2xl font-semibold">{tier.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{tier.summary}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 panel p-6">
        <div className="eyebrow">2026 freshness layer</div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Short updates keep the lab current without bloating the beginner path</h2>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-[var(--color-fg-muted)]">
          Course 4 and Course 19 now carry a compact 2026 update module covering Claude 4.6 changes, Agent SDK
          enhancements, NemoClaw-style security posture, and MCP v2 patterns. It stays small on purpose: one short
          video, one comparison graphic, one Mini Notes PDF, and one practical checklist.
        </p>
      </section>

      <section className="mt-8 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] shadow-[var(--shadow-1)]">
        <div className="border-b border-[var(--color-border-subtle)] px-6 py-5">
          <div className="eyebrow">Runtime matrix</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Best-for guidance, support maturity, and rollback clarity</h2>
        </div>
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-[var(--color-bg-panel-subtle)] text-[var(--color-fg-muted)]">
            <tr>
              <th className="px-4 py-3 font-medium">Tool</th>
              <th className="px-4 py-3 font-medium">Environment</th>
              <th className="px-4 py-3 font-medium">Maturity</th>
              <th className="px-4 py-3 font-medium">Best for</th>
              <th className="px-4 py-3 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {compatibilityEntries.map((row) => (
              <tr key={row.slug} className="border-t border-[var(--color-border-subtle)] align-top">
                <td className="px-4 py-4 font-medium">{row.tool}</td>
                <td className="px-4 py-4 text-[var(--color-fg-muted)]">
                  <div>{row.environment}</div>
                  <div className="mt-1 text-xs">{row.osFamily} · {row.shellFamily}</div>
                </td>
                <td className="px-4 py-4">
                  <span
                    className="badge"
                    data-tone={
                      row.status === "strong-default"
                        ? "accent"
                        : row.status === "advanced-only"
                          ? "danger"
                          : "warning"
                    }
                  >
                    {row.status.replaceAll("-", " ")}
                  </span>
                </td>
                <td className="px-4 py-4 text-[var(--color-fg-muted)]">{row.bestFor}</td>
                <td className="px-4 py-4 text-[var(--color-fg-muted)]">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
