import Link from "next/link";
import { PATH_SECTIONS, getPathsBySection } from "@/lib/data/paths";

export default function PathsCatalogPage() {
  return (
    <main className="page-shell">
      <div className="max-w-3xl">
        <div className="eyebrow">Path catalog</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Recovered curriculum ladder</h1>
        <p className="mt-4 text-lg leading-8 text-[var(--color-fg-muted)]">
          The frontend source was lost, but the curriculum inventory and content files survived. This page restores
          the six-section architecture so we can rebuild on top of real product structure again.
        </p>
      </div>

      <div className="mt-10 grid gap-10">
        {PATH_SECTIONS.map((section) => {
          const paths = getPathsBySection(section);

          return (
            <section key={section} className="grid gap-5">
              <div>
                <h2 className="text-2xl font-semibold">{section}</h2>
                <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
                  {section === "Foundations"
                    ? "The strongest current material. These are the first surfaces worth shipping again."
                    : "Visible in the catalog, but held to honest status until content and UX are truly ready."}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {paths.map((path) => (
                  <article key={path.slug} className="panel p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge" data-tone={path.tier === "free" ? "accent" : "warning"}>
                        {path.tier.toUpperCase()}
                      </span>
                      <span
                        className="badge"
                        data-tone={path.status === "available" ? "accent" : "warning"}
                      >
                        {path.status === "available" ? "Available" : "Coming soon"}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">{path.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{path.summary}</p>
                    <div className="metadata-bar mt-4">
                      <span>{path.lessonCount} lessons</span>
                      <span>{path.estimatedHours}</span>
                    </div>
                    <div className="mt-5">
                      <Link href={`/paths/${path.slug}`} className="button-secondary">
                        View path
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
