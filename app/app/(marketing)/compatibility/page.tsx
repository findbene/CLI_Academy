const rows = [
  {
    tool: "Claude Code",
    environment: "Windows + WSL2",
    status: "Strong default",
    notes: "Recommended for most Windows learners who want the smoothest Unix-like setup path.",
  },
  {
    tool: "Claude Code",
    environment: "Windows + PowerShell",
    status: "Supported with quirks",
    notes: "Useful when WSL2 is not available, but path and permission behavior needs more explanation.",
  },
  {
    tool: "Claude Code",
    environment: "macOS + Homebrew",
    status: "Strong default",
    notes: "Best-supported beginner path for macOS, including Apple Silicon.",
  },
  {
    tool: "Claude CoWork",
    environment: "Browser interface",
    status: "Access-dependent",
    notes: "Availability depends on account tier and rollout state, so this must stay freshness-aware.",
  },
  {
    tool: "OpenClaw",
    environment: "Self-hosted Linux",
    status: "Advanced only",
    notes: "Not a beginner entry point. Requires stronger warnings, prerequisites, and hardening guidance.",
  },
];

export default function CompatibilityPage() {
  return (
    <main className="page-shell">
      <div className="max-w-3xl">
        <div className="eyebrow">Compatibility matrix</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Show people what has been tested, not just what is possible</h1>
        <p className="mt-4 text-lg leading-8 text-[var(--color-fg-muted)]">
          This is one of the clearest trust surfaces in the product. Learners should be able to see which tool,
          platform, and environment combinations are the safest defaults and which ones deserve stronger caution.
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] shadow-[var(--shadow-1)]">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-[var(--color-bg-panel-subtle)] text-[var(--color-fg-muted)]">
            <tr>
              <th className="px-4 py-3 font-medium">Tool</th>
              <th className="px-4 py-3 font-medium">Environment</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.tool}-${row.environment}`} className="border-t border-[var(--color-border-subtle)] align-top">
                <td className="px-4 py-4 font-medium">{row.tool}</td>
                <td className="px-4 py-4 text-[var(--color-fg-muted)]">{row.environment}</td>
                <td className="px-4 py-4">
                  <span
                    className="badge"
                    data-tone={
                      row.status === "Strong default"
                        ? "accent"
                        : row.status === "Advanced only"
                          ? "danger"
                          : "warning"
                    }
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-[var(--color-fg-muted)]">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
