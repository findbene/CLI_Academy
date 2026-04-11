"use client";

import Link from "next/link";
import type { AcademyRuntime } from "@/lib/academy-content";

interface RuntimeMatrixProps {
  runtimes: AcademyRuntime[];
}

function toneForSupportTier(tier: AcademyRuntime["supportTier"]) {
  if (tier === "stable") {
    return "accent";
  }

  if (tier === "emerging") {
    return "warning";
  }

  return "danger";
}

export function RuntimeMatrix({ runtimes }: RuntimeMatrixProps) {
  return (
    <section className="grid gap-4">
      <div>
        <div className="eyebrow">Matrix View</div>
        <h2 className="mt-3 text-2xl font-semibold">Scan the full runtime landscape before you dive deeper</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--color-fg-muted)]">
          This matrix is for quick judgment: support risk, beginner fit, setup burden, deployment options, and the safest next action.
        </p>
      </div>

      <div className="panel overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-[var(--color-bg-panel-subtle)] text-left">
            <tr className="border-b border-[var(--color-border-subtle)]">
              <th className="px-4 py-4 font-semibold">Runtime</th>
              <th className="px-4 py-4 font-semibold">Support</th>
              <th className="px-4 py-4 font-semibold">Beginner fit</th>
              <th className="px-4 py-4 font-semibold">Setup</th>
              <th className="px-4 py-4 font-semibold">Deployments</th>
              <th className="px-4 py-4 font-semibold">Best for</th>
              <th className="px-4 py-4 font-semibold">Safest next move</th>
            </tr>
          </thead>
          <tbody>
            {runtimes.map((runtime) => {
              const compareTarget = runtime.slug === "openclaw" ? "hermes-agent" : "openclaw";

              return (
                <tr key={runtime.slug} className="border-b border-[var(--color-border-subtle)] align-top last:border-b-0">
                  <td className="px-4 py-4">
                    <div className="font-semibold">{runtime.title}</div>
                    <div className="mt-1 text-xs text-[var(--color-fg-muted)]">{runtime.maturityLabel}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="badge" data-tone={toneForSupportTier(runtime.supportTier)}>
                      {runtime.supportTier}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="badge">Beginner: {runtime.beginnerFriendliness}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div>{runtime.setupComplexity}</div>
                    <div className="mt-1 text-xs text-[var(--color-fg-muted)]">{runtime.setupTime}</div>
                  </td>
                  <td className="px-4 py-4 text-[var(--color-fg-muted)]">{runtime.deploymentPaths.join(", ")}</td>
                  <td className="px-4 py-4 text-[var(--color-fg-muted)]">{runtime.bestFor.join(", ")}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/runtime-lab/${runtime.slug}`} className="button-secondary">
                        View detail
                      </Link>
                      <Link href={`/runtime-lab/compare?runtimes=${runtime.slug},${compareTarget}`} className="button-ghost">
                        Compare
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
