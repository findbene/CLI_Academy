const downloads = [
  {
    title: "Claude Code setup checklist",
    format: "PDF",
    tier: "Free",
    summary: "A print-friendly checklist for installation, verification, and first-run sanity checks.",
  },
  {
    title: "Windows path and permissions quick reference",
    format: "Markdown",
    tier: "Free",
    summary: "A lightweight guide to path quirks, shell choices, and permission gotchas on Windows.",
  },
  {
    title: "CLAUDE.md starter pack",
    format: "Markdown + JSON",
    tier: "Pro",
    summary: "Starter templates for project instructions, memory hygiene, and practical agent guardrails.",
  },
];

export default function DownloadsPage() {
  return (
    <main className="page-shell">
      <section className="panel p-6">
        <div className="eyebrow">Downloads center</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Recovered download surface</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-fg-muted)]">
          The route is back. The next step is replacing placeholder entries with real, versioned assets and export
          flows. For now, this page restores the product shape and the value proposition around downloadable guides.
        </p>
      </section>

      <section className="mt-8 grid gap-4">
        {downloads.map((download) => (
          <article key={download.title} className="panel p-5">
            <div className="flex flex-wrap gap-2">
              <span className="badge" data-tone="accent">
                {download.format}
              </span>
              <span className="badge" data-tone={download.tier === "Free" ? "accent" : "warning"}>
                {download.tier}
              </span>
            </div>
            <h2 className="mt-4 text-xl font-semibold">{download.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{download.summary}</p>
            <div className="mt-5">
              <button type="button" className="button-secondary">
                Download placeholder
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
