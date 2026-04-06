import Link from "next/link";
import { getPathBySlug } from "@/lib/data/paths";
import { getLessonsForPath } from "@/lib/mdx";

interface LearnPathPageProps {
  params: Promise<{ pathSlug: string }>;
}

export default async function LearnPathPage({ params }: LearnPathPageProps) {
  const { pathSlug } = await params;
  const path = getPathBySlug(pathSlug);

  if (!path) {
    return (
      <main className="page-shell">
        <div className="panel p-6">
          <h1 className="text-3xl font-semibold">Path not found</h1>
          <p className="mt-3 text-[var(--color-fg-muted)]">
            The learner route exists again, but this path slug is not currently in the recovered catalog.
          </p>
        </div>
      </main>
    );
  }

  if (path.status !== "available") {
    return (
      <main className="page-shell">
        <div className="panel p-6">
          <h1 className="text-3xl font-semibold">{path.title}</h1>
          <p className="mt-3 max-w-3xl text-[var(--color-fg-muted)]">
            This path is intentionally held in a coming-soon state while content quality and trust surfaces are rebuilt.
          </p>
          <div className="mt-6">
            <Link href={`/paths/${path.slug}`} className="button-secondary">
              Back to path detail
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const lessons = await getLessonsForPath(pathSlug);

  return (
    <main className="page-shell">
      <section className="panel p-6">
        <div className="eyebrow">Learner path</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">{path.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-fg-muted)]">{path.summary}</p>
        <div className="metadata-bar mt-4">
          <span>{lessons.length} recovered lessons</span>
          <span>{path.estimatedHours}</span>
          <span>{path.tier.toUpperCase()}</span>
        </div>
      </section>

      <section className="mt-8 grid gap-4">
        {lessons.map((lesson) => (
          <article key={lesson.slug} className="panel flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm text-[var(--color-fg-muted)]">
                Lesson {lesson.lessonNumber} · {lesson.estimatedMinutes} min
              </div>
              <h2 className="mt-1 text-xl font-semibold">{lesson.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{lesson.description}</p>
            </div>
            <Link href={`/learn/${path.slug}/${lesson.slug}`} className="button-primary">
              Open lesson
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
