import Link from "next/link";

const steps = [
  {
    title: "1. Your machine",
    body: "Capture operating system, device, shell, and environment so the app can send you down the right setup path.",
  },
  {
    title: "2. Your confidence",
    body: "Ask how technical you feel, what makes you nervous, and how guided you want the experience to be.",
  },
  {
    title: "3. Your goal",
    body: "Choose whether you want setup help, first useful wins, role-based use cases, or advanced infrastructure later.",
  },
];

export default function OnboardingPage() {
  return (
    <main className="page-shell">
      <div className="max-w-3xl">
        <div className="eyebrow">Onboarding wizard</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Recovered onboarding flow</h1>
        <p className="mt-4 text-lg leading-8 text-[var(--color-fg-muted)]">
          The original app used a 3-step onboarding wizard to personalize the experience. This rebuild brings that flow
          back as a scaffold first so the routing and product logic have a real home again.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map((step) => (
          <article key={step.title} className="panel p-6">
            <h2 className="text-xl font-semibold">{step.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{step.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/dashboard" className="button-primary">
          Continue to dashboard
        </Link>
        <Link href="/paths" className="button-secondary">
          Browse paths first
        </Link>
      </div>
    </main>
  );
}
