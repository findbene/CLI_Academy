import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="page-shell">
      <div className="mx-auto max-w-xl panel p-8">
        <div className="eyebrow">Start free</div>
        <h1 className="mt-4 text-3xl font-semibold">The account flow is next in the rebuild queue</h1>
        <p className="mt-4 text-[var(--color-fg-muted)]">
          We have the intended auth and onboarding architecture from the recovery notes. This placeholder keeps the route
          and CTA flow alive while the full Supabase integration is restored.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/onboarding" className="button-primary">
            Preview onboarding
          </Link>
          <Link href="/pricing" className="button-secondary">
            Compare plans
          </Link>
        </div>
      </div>
    </main>
  );
}
