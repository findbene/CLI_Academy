import Link from "next/link";
import { AssetVaultCard } from "@/components/assets/AssetVaultCard";
import { getAllLocalAssets } from "@/lib/assets";

export default function AssetVaultPage() {
  const assets = getAllLocalAssets();
  const freeCount = assets.filter((asset) => asset.tier === "free").length;
  const proCount = assets.filter((asset) => asset.tier === "pro").length;

  return (
    <main className="page-shell py-12">
      <section className="panel p-6">
        <div className="eyebrow">Asset Vault</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">Field manuals, prompt packs, templates, starter packs, and troubleshooting kits</h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-[var(--color-fg-muted)]">
          CLI Academy stays useful even when the learner is offline. The Asset Vault is the operational layer:
          printables, reusable packs, and practical builder scaffolds tied back to the academy flow.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/downloads" className="button-primary">
            Open signed-in vault
          </Link>
          <Link href="/resources" className="button-secondary">
            Browse ecosystem directory
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="badge" data-tone="accent">{freeCount} free assets</span>
          <span className="badge" data-tone="warning">{proCount} pro assets</span>
          <span className="badge">{assets.length} total vault entries</span>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {assets.map((asset) => (
          <AssetVaultCard key={asset.slug} asset={asset} />
        ))}
      </section>
    </main>
  );
}
