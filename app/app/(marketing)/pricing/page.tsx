import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    summary: "For cautious beginners who need a real first success before paying.",
    features: [
      "Foundation paths",
      "10 tutor messages per day",
      "Basic downloads",
      "Setup and troubleshooting entry points",
    ],
  },
  {
    name: "Pro",
    price: "$29/mo",
    summary: "For learners who want deeper practical tracks, richer downloads, and more tutor headroom.",
    features: [
      "Everything in Free",
      "100 tutor messages per day",
      "Pro technical and role-based tracks",
      "Deeper guides, templates, and reference packs",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="page-shell">
      <div className="mx-auto max-w-3xl text-center">
        <div className="eyebrow">Pricing</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Honest pricing for a trust-first learning product</h1>
        <p className="mt-4 text-lg leading-8 text-[var(--color-fg-muted)]">
          CLI Academy only charges for depth that is actually ready. The free foundation should be good enough to help
          a beginner get unstuck, not just tease an upsell.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <article key={plan.name} className="panel p-6">
            <div className="eyebrow">{plan.name}</div>
            <div className="mt-4 text-4xl font-semibold">{plan.price}</div>
            <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{plan.summary}</p>
            <ul className="mt-6 grid gap-3 text-sm">
              {plan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
            <div className="mt-6">
              <Link href={plan.name === "Free" ? "/signup" : "/signup"} className="button-primary">
                {plan.name === "Free" ? "Start free" : "Choose Pro"}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
