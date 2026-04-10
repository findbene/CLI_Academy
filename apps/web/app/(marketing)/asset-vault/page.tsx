import Link from "next/link";
import { AssetVaultCard } from "@/components/assets/AssetVaultCard";
import { getAllLocalAssets } from "@/lib/assets";

export default function AssetVaultPage() {
  const assets = getAllLocalAssets();
  const freeCount = assets.filter((asset) => asset.tier === "free").length;
  const proCount = assets.filter((asset) => asset.tier === "pro").length;
  const installReadyAssets = assets.filter((asset) => (asset.installSteps?.length ?? 0) > 0);
  const courseLinkedAssets = assets.filter((asset) => asset.recommendedPaths.length > 0);
  const spotlightAssets = assets.filter((asset) =>
    [
      "chapter-mini-notes-series",
      "2026-runtime-and-deployment-update-brief",
      "cost-engineering-multi-provider-playbook",
      "capstone-showcase-submission-kit",
    ].includes(asset.slug),
  );

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
          <Link href="/prompt-doctor" className="button-secondary">
            Open Prompt Doctor
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

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <article className="panel p-6">
          <div className="eyebrow">Install-ready packs</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Assets with setup steps and operational guidance</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
            These are the packs learners can use while a terminal, runtime, or workflow is actively open. They carry
            install steps, compatibility notes, or practical usage guidance instead of just generic download labels.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {installReadyAssets.slice(0, 6).map((asset) => (
              <span key={asset.slug} className="badge">{asset.title}</span>
            ))}
          </div>
        </article>

        <article className="panel p-6">
          <div className="eyebrow">Course-linked packs</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Every serious pack should point back to a course or path</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
            The vault is part of the learning flow. Assets are now tied back to fast-path weeks, flagship courses, and
            the live path catalog so learners know when and why to use each pack.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {courseLinkedAssets.slice(0, 6).map((asset) => (
              <span key={asset.slug} className="badge">{asset.title}</span>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-8">
        <div>
          <div className="eyebrow">New in this pass</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">Mini Notes, 2026 update briefs, mastery playbooks, and showcase packs</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {spotlightAssets.map((asset) => (
            <AssetVaultCard key={asset.slug} asset={asset} />
          ))}
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
