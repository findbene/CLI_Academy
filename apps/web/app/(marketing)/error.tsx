"use client";

import Link from "next/link";

export default function MarketingError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="page-shell flex min-h-[60vh] items-center justify-center">
      <div className="panel max-w-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-[var(--color-fg-default)]">
          Something went wrong
        </h2>
        <p className="mt-3 text-sm text-[var(--color-fg-muted)]">
          We hit an unexpected error loading this page. You can try again or head back to the home
          page.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={reset} className="button-primary">
            Try again
          </button>
          <Link href="/" className="button-secondary">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
