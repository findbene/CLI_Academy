import Link from "next/link";
import { getPathBySlug } from "@/lib/data/paths";
import { getLessonsForPath } from "@/lib/mdx";

interface PathDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PathDetailPage({ params }: PathDetailPageProps) {
  const { slug } = await params;
  const path = getPathBySlug(slug);

  if (!path) {
    return (
      <main className="page-shell">
        <div className="panel p-6">
          <h1 className="text-3xl font-semibold">Path not found</h1>
          <p className="mt-3 text-[var(--color-fg-muted)]">
            This recovered path slug does not match the current catalog.
          </p>
        </div>
      </main>
    );
  }

  const lessons = path.status === "available" ? await getLessonsForPath(path.slug) : [];

  return (
    <main className="page-shell">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="panel p-6">
          <div className="flex flex-wrap gap-2">
            <span className="badge" data-tone={path.tier === "free" ? "accent" : "warning"}>
              {path.tier.toUpperCase()}
            </span>
            <span className="badge" data-tone={path.status === "available" ? "accent" : "warning"}>
              {path.status === "available" ? "Available" : "Coming soon"}
            </span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{path.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-fg-muted)]">{path.summary}</p>
          <div className="metadata-bar mt-5">
            <span>{path.section}</span>
            <span>{path.lessonCount} lessons</span>
            <span>{path.estimatedHours}</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={path.status === "available" ? `/learn/${path.slug}` : "/signup"}
              className="button-primary"
            >
              {path.status === "available" ? "Open learner view" : "Get notified"}
            </Link>
            <Link href="/paths" className="button-secondary">
              Back to catalog
            </Link>
          </div>
        </div>

        <aside className="panel p-6">
          <div className="text-sm font-semibold">Status note</div>
          <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
            The rebuilt frontend catalog is intentionally honest. Paths marked coming soon may already have lesson files
            or draft content, but they stay gated until the content and UX are ready to trust publicly.
          </p>
        </aside>
      </section>

      {lessons.length > 0 ? (
        <section className="mt-10 grid gap-4">
          <h2 className="text-2xl font-semibold">Recovered lesson list</h2>
          {lessons.map((lesson) => (
            <article key={lesson.slug} className="panel flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm text-[var(--color-fg-muted)]">Lesson {lesson.lessonNumber}</div>
                <h3 className="mt-1 text-lg font-semibold">{lesson.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{lesson.description}</p>
              </div>
              <Link href={`/learn/${path.slug}/${lesson.slug}`} className="button-secondary">
                Open lesson
              </Link>
            </article>
          ))}
        </section>
      ) : null}
    </main>
  );
}
