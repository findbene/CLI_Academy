import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-6xl font-bold text-[var(--color-accent-primary)]">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-[var(--color-fg-default)]">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Try checking the URL, or head back to a familiar spot.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="button-primary">
            Go home
          </Link>
          <Link href="/paths" className="button-secondary">
            Browse paths
          </Link>
        </div>
      </div>
    </main>
  );
}
