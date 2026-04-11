import Link from "next/link";
import type { AcademyAsset, AcademyLab, AcademyRuntime } from "@/lib/academy-content";

interface LessonRelatedResourcesProps {
  assets: Array<AcademyAsset & { note?: string }>;
  labs: Array<AcademyLab & { note?: string }>;
  runtimes: Array<AcademyRuntime & { note?: string }>;
}

export function LessonRelatedResources({ assets, labs, runtimes }: LessonRelatedResourcesProps) {
  if (!assets.length && !labs.length && !runtimes.length) {
    return null;
  }

  return (
    <section className="grid gap-4">
      <div>
        <div className="eyebrow">Related Resources</div>
        <h2 className="mt-3 text-2xl font-semibold">Use the right asset, lab, or runtime at the right moment</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {assets.map((asset) => (
          <article key={`asset-${asset.slug}`} className="panel p-5">
            <div className="flex flex-wrap gap-2">
              <span className="badge">{asset.type}</span>
              <span className="badge" data-tone={asset.supportTier === "free" ? "accent" : "warning"}>
                {asset.supportTier}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold">{asset.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{asset.summary}</p>
            {asset.note ? <p className="mt-3 text-sm leading-6">{asset.note}</p> : null}
            <div className="mt-4">
              <Link href={`/asset-vault/${asset.slug}`} className="button-secondary">
                Open asset
              </Link>
            </div>
          </article>
        ))}

        {labs.map((lab) => (
          <article key={`lab-${lab.slug}`} className="panel p-5">
            <div className="flex flex-wrap gap-2">
              <span className="badge">{lab.labType}</span>
              <span className="badge">~{lab.estimatedMinutes} min</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold">{lab.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{lab.summary}</p>
            {lab.note ? <p className="mt-3 text-sm leading-6">{lab.note}</p> : null}
            <div className="mt-3 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-4 py-3 text-sm">
              Expected output: {lab.expectedOutput}
            </div>
            <div className="mt-4">
              <Link href={`/live-labs/${lab.slug}`} className="button-secondary">
                Launch lab
              </Link>
            </div>
          </article>
        ))}

        {runtimes.map((runtime) => {
          const compareTarget = runtime.slug === "openclaw" ? "hermes-agent" : "openclaw";

          return (
            <article key={`runtime-${runtime.slug}`} className="panel p-5">
              <div className="flex flex-wrap gap-2">
                <span
                  className="badge"
                  data-tone={
                    runtime.supportTier === "stable"
                      ? "accent"
                      : runtime.supportTier === "emerging"
                        ? "warning"
                        : "danger"
                  }
                >
                  {runtime.supportTier}
                </span>
                <span className="badge">Setup: {runtime.setupComplexity}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{runtime.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{runtime.summary}</p>
              {runtime.note ? <p className="mt-3 text-sm leading-6">{runtime.note}</p> : null}
              <div className="mt-3 text-sm text-[var(--color-fg-muted)]">Best for: {runtime.bestFor.join(", ")}</div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href={`/runtime-lab/${runtime.slug}`} className="button-secondary">
                  View runtime
                </Link>
                <Link href={`/runtime-lab/compare?runtimes=${runtime.slug},${compareTarget}`} className="button-ghost">
                  Compare
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
