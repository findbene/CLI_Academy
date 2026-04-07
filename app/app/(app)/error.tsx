"use client";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="page-shell flex min-h-[60vh] items-center justify-center">
      <div className="panel max-w-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-[var(--color-fg-default)]">
          Something went wrong
        </h2>
        <p className="mt-3 text-sm text-[var(--color-fg-muted)]">
          We hit an unexpected error. You can try again or head to your dashboard.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={reset} className="button-primary">
            Try again
          </button>
          <a href="/dashboard" className="button-secondary">
            Back to dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
