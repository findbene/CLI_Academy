"use client";

import { Download } from "lucide-react";
import { CheckoutButton } from "@/components/billing/CheckoutButton";
import type { DownloadSurfaceAsset } from "@/lib/assets";

interface AssetCardProps {
  asset: DownloadSurfaceAsset;
}

export function AssetCard({ asset }: AssetCardProps) {
  return (
    <article className="panel p-5 transition hover:shadow-md">
      <div className="flex flex-wrap gap-2">
        {asset.downloads.map((download) => (
          <span key={`${asset.slug}-${download.formatLabel}`} className="badge" data-tone="accent">
            {download.formatLabel}
          </span>
        ))}
        <span className="badge" data-tone={asset.tier === "free" ? "accent" : "warning"}>
          {asset.tier === "free" ? "Free" : "Pro"}
        </span>
        <span className="badge">{asset.categoryLabel}</span>
        {asset.versionLabel ? <span className="badge">{asset.versionLabel}</span> : null}
      </div>

      <h3 className="mt-4 text-xl font-semibold">{asset.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{asset.summary}</p>

      <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">
        <span>Updated {asset.updatedAt}</span>
        {asset.printable ? <span>Print-friendly</span> : null}
      </div>

      {asset.previewBullets?.length ? (
        <ul className="mt-4 space-y-2 text-sm text-[var(--color-fg-muted)]">
          {asset.previewBullets.slice(0, 3).map((bullet) => (
            <li key={bullet}>• {bullet}</li>
          ))}
        </ul>
      ) : null}

      {asset.compatibility?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {asset.compatibility.slice(0, 4).map((item) => (
            <span key={item} className="badge">
              {item}
            </span>
          ))}
        </div>
      ) : null}

      {asset.locked ? (
        <div className="mt-5">
          <CheckoutButton className="button-primary" label="Unlock with Pro" />
        </div>
      ) : asset.downloads.length ? (
        <div className="mt-5 flex flex-wrap gap-3">
          {asset.downloads.map((download, index) => (
            <a
              key={`${asset.slug}-${download.formatLabel}-link`}
              href={download.href}
              target={download.external ? "_blank" : undefined}
              rel={download.external ? "noreferrer" : undefined}
              className={index === 0 ? "button-primary inline-flex items-center gap-2" : "button-secondary inline-flex items-center gap-2"}
            >
              <Download className="size-3.5" />
              Download {download.formatLabel}
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-5">
          <button type="button" className="button-secondary" disabled>
            Download coming soon
          </button>
        </div>
      )}
    </article>
  );
}
