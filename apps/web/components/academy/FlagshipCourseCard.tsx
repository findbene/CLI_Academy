import Link from "next/link";
import type { FlagshipCourseSeed } from "@/lib/academy";

interface FlagshipCourseCardProps {
  course: FlagshipCourseSeed;
}

export function FlagshipCourseCard({ course }: FlagshipCourseCardProps) {
  return (
    <article className="panel panel-lift p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="badge" data-tone="accent">{course.difficulty}</span>
        <span className="badge">{course.duration}</span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold">{course.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{course.summary}</p>
      <div className="mt-4 rounded-[var(--radius-lg)] bg-[var(--color-bg-panel-subtle)] p-4 text-sm">
        <div className="font-semibold text-[var(--color-fg-default)]">Main project</div>
        <div className="mt-1 text-[var(--color-fg-muted)]">{course.project}</div>
      </div>
      <div className="mt-4">
        <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Chapter flow</div>
        <ul className="mt-2 space-y-2 text-sm text-[var(--color-fg-muted)]">
          {course.chapters.map((chapter) => (
            <li key={chapter}>• {chapter}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {course.downloads.map((download) => (
          <span key={download} className="badge">{download}</span>
        ))}
      </div>
      <div className="mt-5">
        <Link href={course.href} className="button-secondary">
          Open related path
        </Link>
      </div>
    </article>
  );
}
