"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { AcademyAsset } from "@/lib/academy-content";

interface AssetVaultBrowserProps {
  assets: AcademyAsset[];
}

export function AssetVaultBrowser({ assets }: AssetVaultBrowserProps) {
  const categories = useMemo(() => ["all", ...new Set(assets.map((asset) => asset.type))], [assets]);
  const tiers = useMemo(() => ["all", ...new Set(assets.map((asset) => asset.supportTier))], [assets]);

  const [category, setCategory] = useState("all");
  const [tier, setTier] = useState("all");

  const filteredAssets = useMemo(
    () =>
      assets.filter((asset) => {
        const categoryMatch = category === "all" || asset.type === category;
        const tierMatch = tier === "all" || asset.supportTier === tier;
        return categoryMatch && tierMatch;
      }),
    [assets, category, tier],
  );

  return (
    <div className="grid gap-6">
      <div className="panel p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Filter by category</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((entry) => (
                <button
                  key={entry}
                  type="button"
                  onClick={() => setCategory(entry)}
                  className={`badge ${category === entry ? "" : ""}`}
                  data-tone={category === entry ? "accent" : undefined}
                >
                  {entry}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Filter by tier</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {tiers.map((entry) => (
                <button
                  key={entry}
                  type="button"
                  onClick={() => setTier(entry)}
                  className="badge"
                  data-tone={tier === entry ? "warning" : undefined}
                >
                  {entry}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {filteredAssets.map((asset) => (
          <article key={asset.slug} className="panel p-6">
            <div className="flex flex-wrap gap-2">
              <span className="badge">{asset.type}</span>
              <span className="badge" data-tone={asset.supportTier === "free" ? "accent" : "warning"}>
                {asset.supportTier.toUpperCase()}
              </span>
            </div>
            <h2 className="mt-4 text-xl font-semibold">{asset.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{asset.summary}</p>
            {asset.whoItsFor ? <p className="mt-3 text-sm">{asset.whoItsFor}</p> : null}
            <div className="mt-4 text-sm">Compatibility: {asset.compatibility.join(", ")}</div>
            <div className="mt-5">
              <Link href={`/asset-vault/${asset.slug}`} className="button-secondary">
                View asset detail
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
