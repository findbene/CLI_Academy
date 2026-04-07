import Link from "next/link";
import { compatibilityEntries } from "@/lib/support";

function statusLabel(status: string) {
  return status.replaceAll("-", " ");
}

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
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/trust" className="button-secondary">
            Open trust center
          </Link>
          <Link href="/troubleshooting" className="button-primary">
            Troubleshoot a problem
          </Link>
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] shadow-[var(--shadow-1)]">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-[var(--color-bg-panel-subtle)] text-[var(--color-fg-muted)]">
            <tr>
              <th className="px-4 py-3 font-medium">Tool</th>
              <th className="px-4 py-3 font-medium">Environment</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Tested on</th>
              <th className="px-4 py-3 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {compatibilityEntries.map((row) => (
              <tr key={row.slug} className="border-t border-[var(--color-border-subtle)] align-top">
                <td className="px-4 py-4 font-medium">{row.tool}</td>
                <td className="px-4 py-4 text-[var(--color-fg-muted)]">
                  <div>{row.environment}</div>
                  <div className="mt-1 text-xs">{row.osFamily} · {row.shellFamily}</div>
                </td>
                <td className="px-4 py-4">
                  <span
                    className="badge"
                    data-tone={
                      row.status === "strong-default"
                        ? "accent"
                        : row.status === "advanced-only"
                          ? "danger"
                          : "warning"
                    }
                  >
                    {statusLabel(row.status)}
                  </span>
                </td>
                <td className="px-4 py-4 text-[var(--color-fg-muted)]">{row.testedOn}</td>
                <td className="px-4 py-4 text-[var(--color-fg-muted)]">
                  <div>{row.notes}</div>
                  <div className="mt-2 text-xs">Best for: {row.bestFor}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
