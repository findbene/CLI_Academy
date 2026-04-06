import Link from "next/link";
import { PATHS } from "@/lib/data/paths";

const recommended = PATHS.filter((path) => path.status === "available");

export default function DashboardPage() {
  return (
    <main className="page-shell">
      <div className="grid gap-6">
        <section className="panel p-6">
          <div className="eyebrow">Dashboard</div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Recovery dashboard</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-fg-muted)]">
            The original app persisted learner progress in Supabase. This rebuilt shell restores the dashboard surface
            first, then the live data wiring comes next.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <article className="panel p-5">
            <div className="text-sm font-medium">Current focus</div>
            <div className="mt-3 text-2xl font-semibold">Frontend recovery</div>
            <p className="mt-2 text-sm text-[var(--color-fg-muted)]">Route groups, lesson player, tutor shell, and page scaffolds are back in place.</p>
          </article>
          <article className="panel p-5">
            <div className="text-sm font-medium">Best next move</div>
            <div className="mt-3 text-2xl font-semibold">Finish the foundation paths</div>
            <p className="mt-2 text-sm text-[var(--color-fg-muted)]">The strongest surviving product asset is the free setup curriculum.</p>
          </article>
          <article className="panel p-5">
            <div className="text-sm font-medium">Tutor limits</div>
            <div className="mt-3 text-2xl font-semibold">10 free / 100 pro</div>
            <p className="mt-2 text-sm text-[var(--color-fg-muted)]">The shell is back. Server-side enforcement still needs to be restored.</p>
          </article>
        </section>

        <section className="grid gap-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold">Recommended paths</h2>
            <Link href="/paths" className="button-secondary">
              Browse all
            </Link>
          </div>
          {recommended.map((path) => (
            <article key={path.slug} className="panel flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm text-[var(--color-fg-muted)]">{path.section}</div>
                <h3 className="mt-1 text-xl font-semibold">{path.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{path.summary}</p>
              </div>
              <Link href={`/learn/${path.slug}`} className="button-primary">
                Continue
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
