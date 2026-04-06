const guides = [
  {
    title: "Claude command not found",
    likelyCause: "Global install missing, PATH not updated, or the shell needs restarting.",
    nextStep: "Check `node --version`, `npm --version`, then reinstall Claude Code and restart the terminal.",
  },
  {
    title: "Authentication failed",
    likelyCause: "Invalid or expired API key, or the wrong account context.",
    nextStep: "Create a fresh key, run `claude auth` again, and verify the account you are using.",
  },
  {
    title: "Windows path and permission weirdness",
    likelyCause: "Mixing WSL paths with Windows paths, or shell-specific permission differences.",
    nextStep: "Confirm whether you are in WSL2 or PowerShell first, then use the matching path conventions.",
  },
  {
    title: "Claude CoWork is not visible",
    likelyCause: "Feature rollout limits, missing account tier, or region/account access delay.",
    nextStep: "Check Pro status, current rollout notes, and try the supported access path again later.",
  },
];

export default function TroubleshootingPage() {
  return (
    <main className="page-shell">
      <div className="max-w-3xl">
        <div className="eyebrow">Troubleshooting center</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Start with the symptom, not the panic</h1>
        <p className="mt-4 text-lg leading-8 text-[var(--color-fg-muted)]">
          CLI Academy should treat troubleshooting as part of the curriculum, not a support afterthought. This rebuilt
          page restores that surface so the product has a proper home for common failure patterns and next-step guidance.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {guides.map((guide) => (
          <article key={guide.title} className="panel p-5">
            <h2 className="text-xl font-semibold">{guide.title}</h2>
            <div className="mt-4 text-sm font-medium">Likely cause</div>
            <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{guide.likelyCause}</p>
            <div className="mt-4 text-sm font-medium">Next safest step</div>
            <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{guide.nextStep}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
