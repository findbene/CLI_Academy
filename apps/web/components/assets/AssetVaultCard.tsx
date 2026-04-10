"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { buildAssetDownloadHref, getAssetCategoryLabel, getAssetFormatLabel, type LearningAsset } from "@/lib/assets";

interface AssetVaultCardProps {
  asset: LearningAsset;
}

export function AssetVaultCard({ asset }: AssetVaultCardProps) {
  return (
    <article className="panel panel-lift p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="badge" data-tone={asset.tier === "free" ? "accent" : "warning"}>
          {asset.tier.toUpperCase()}
        </span>
        <span className="badge">{getAssetCategoryLabel(asset.category)}</span>
        {asset.versionLabel ? <span className="badge">{asset.versionLabel}</span> : null}
      </div>

      <h3 className="mt-4 text-2xl font-semibold">{asset.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{asset.summary}</p>

      {asset.bestFor ? (
        <div className="mt-4 rounded-[var(--radius-lg)] bg-[var(--color-bg-panel-subtle)] p-4 text-sm">
          <div className="font-semibold text-[var(--color-fg-default)]">Best for</div>
          <div className="mt-1 text-[var(--color-fg-muted)]">{asset.bestFor}</div>
        </div>
      ) : null}

      {asset.previewBullets?.length ? (
        <div className="mt-4">
          <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Includes</div>
          <ul className="mt-2 space-y-2 text-sm text-[var(--color-fg-muted)]">
            {asset.previewBullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {asset.installSteps?.length ? (
        <div className="mt-4">
          <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">How to use it</div>
          <ol className="mt-2 space-y-2 text-sm text-[var(--color-fg-muted)]">
            {asset.installSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      ) : null}

      {asset.compatibility?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {asset.compatibility.map((item) => (
            <span key={item} className="badge">
              {item}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-3">
        {asset.formats.map((variant, index) => (
          <Link
            key={`${asset.slug}-${variant.format}`}
            href={buildAssetDownloadHref(asset.slug, variant.format)}
            className={index === 0 ? "button-primary inline-flex items-center gap-2" : "button-secondary inline-flex items-center gap-2"}
          >
            <Download className="size-3.5" />
            Download {getAssetFormatLabel(variant.format)}
          </Link>
        ))}
      </div>
    </article>
  );
}
