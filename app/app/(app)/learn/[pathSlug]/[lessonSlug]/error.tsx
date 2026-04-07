"use client";

import Link from "next/link";

export default function LessonError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="page-shell flex min-h-[60vh] items-center justify-center">
      <div className="panel max-w-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-[var(--color-fg-default)]">
          Lesson failed to load
        </h2>
        <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
          We had trouble rendering this lesson. The content may be temporarily
          unavailable — try refreshing or return to the learning path.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={reset} className="button-primary">
            Try again
          </button>
          <Link href="/dashboard" className="button-secondary">
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
