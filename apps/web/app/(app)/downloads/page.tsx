import Link from "next/link";
import { Download, FileText, Package } from "lucide-react";
import { DownloadsFilter } from "@/components/assets/DownloadsFilter";
import {
  getAllLocalAssets,
  getAssetFormatLabel,
  toDownloadSurfaceAsset,
  type DownloadSurfaceAsset,
} from "@/lib/assets";
import { getServerViewer } from "@/lib/viewer";

export default async function DownloadsPage() {
  const viewer = await getServerViewer();
  const learnerTier = viewer.profile?.tier ?? "free";
  const downloads: DownloadSurfaceAsset[] = getAllLocalAssets().map((asset) =>
    toDownloadSurfaceAsset(asset, learnerTier),
  );

  if (viewer.supabaseConfigured && viewer.supabaseContext) {
    const { data: assets } = await viewer.supabaseContext.supabase
      .from("assets")
      .select("title, description, file_url, asset_type, tier_required, version_label")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (assets?.length) {
      downloads.push(
        ...assets.map((asset, index) => ({
          categoryLabel: "Library asset",
          downloads: asset.file_url
            ? [
                {
                  external: true,
                  formatLabel: getAssetFormatLabel(asset.asset_type),
                  href: asset.file_url,
                },
              ]
            : [],
          locked: asset.tier_required === "pro" && learnerTier !== "pro",
          printable: asset.asset_type === "pdf" || asset.asset_type === "md" || asset.asset_type === "docx",
          slug: `supabase-asset-${index}`,
          summary: asset.description ?? "Published asset from the CLI Academy library.",
          tier: asset.tier_required === "pro" ? ("pro" as const) : ("free" as const),
          title: asset.title ?? "Untitled asset",
          updatedAt: "Published",
          versionLabel: asset.version_label ?? undefined,
        })),
      );
    }
  }

  const freeCount = downloads.filter((d) => d.tier === "free").length;
  const proCount = downloads.filter((d) => d.tier === "pro").length;

  return (
    <main className="page-shell">
      <section className="panel p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[rgba(22,176,168,0.12)]">
            <Download className="size-6 text-[var(--color-accent-primary)]" />
          </div>
          <div>
            <div className="eyebrow">Asset Vault</div>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">Builder assets, field manuals, and starter packs</h1>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-[var(--color-fg-muted)]">
              Keep the most useful setup playbooks, field manuals, prompt packs, templates, and troubleshooting references open while you work.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/asset-vault" className="button-secondary">
                Public vault overview
              </Link>
              <Link href="/prompt-doctor" className="button-secondary">
                Prompt Doctor
              </Link>
              <Link href="/runtime-lab" className="button-ghost">
                Runtime Lab
              </Link>
              <Link href="/resources" className="button-ghost">
                Ecosystem directory
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(22,176,168,0.10)] px-3 py-1.5 text-sm text-[var(--color-accent-primary)]">
            <FileText className="size-3.5" />
            {freeCount} free assets
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(201,134,18,0.10)] px-3 py-1.5 text-sm text-[var(--color-accent-warning)]">
            <Package className="size-3.5" />
            {proCount} pro assets
          </div>
        </div>
      </section>

      <div className="mt-8">
        <DownloadsFilter downloads={downloads} />
      </div>
    </main>
  );
}
