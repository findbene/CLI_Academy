import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="page-shell">
      <div className="mx-auto max-w-xl panel p-8">
        <div className="eyebrow">Log in</div>
        <h1 className="mt-4 text-3xl font-semibold">Auth wiring is being restored</h1>
        <p className="mt-4 text-[var(--color-fg-muted)]">
          The original frontend had Supabase SSR auth and Google OAuth. This recovery scaffold restores the route and
          the product flow first, then the full auth wiring comes next.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/onboarding" className="button-primary">
            Continue to onboarding
          </Link>
          <Link href="/signup" className="button-secondary">
            Create an account
          </Link>
        </div>
      </div>
    </main>
  );
}
