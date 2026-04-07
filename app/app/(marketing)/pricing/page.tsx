import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, honest pricing for CLI Academy. Start free with 10 daily tutor messages. Upgrade to Pro for deeper paths, 100 messages/day, and full download access.",
};

import {
  BookOpen,
  Check,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import { CheckoutButton } from "@/components/billing/CheckoutButton";
import { BillingPortalButton } from "@/components/settings/BillingPortalButton";
import { getServerViewer } from "@/lib/viewer";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    summary: "For cautious beginners who need a real first success before paying.",
    icon: Terminal,
    features: [
      "Foundation paths",
      "10 tutor messages per day",
      "Basic downloads",
      "Setup and troubleshooting entry points",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    summary: "For learners who want deeper practical tracks, richer downloads, and more tutor headroom.",
    icon: Sparkles,
    features: [
      "Everything in Free",
      "100 tutor messages per day",
      "Pro technical and role-based tracks",
      "Deeper guides, templates, and reference packs",
    ],
    highlighted: true,
  },
];

const faqs = [
  {
    q: "Can I try everything before paying?",
    a: "Yes. The free tier gives you full access to foundation paths, setup guides, and 10 daily tutor messages. Pro only unlocks depth — not the door.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We use Stripe for payments. All major credit and debit cards are supported, along with Apple Pay and Google Pay where available.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. Cancel from your billing portal at any time. You keep Pro access through the end of your paid period.",
  },
  {
    q: "Is there an annual plan?",
    a: "Yes — choose annual billing at checkout and save compared to monthly. The annual option appears on the Pro card.",
  },
];

export default async function PricingPage() {
  const viewer = await getServerViewer();
  const currentTier = viewer.profile?.tier ?? "free";

  return (
    <main className="page-shell">
      <div className="mx-auto max-w-3xl text-center">
        <div className="eyebrow">Pricing</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Honest pricing for a trust-first learning product</h1>
        <p className="mt-4 text-lg leading-8 text-[var(--color-fg-muted)]">
          CLI Academy only charges for depth that is actually ready. The free foundation should be good enough to help
          a beginner get unstuck, not just tease an upsell.
        </p>
        {viewer.user ? (
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-bg-panel)] px-4 py-2 text-sm text-[var(--color-fg-muted)] border border-[var(--color-border-subtle)]">
            Signed in as {viewer.user.email ?? "learner"} · <span className="font-medium capitalize text-[var(--color-fg-default)]">{currentTier}</span> plan
          </p>
        ) : null}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <article
              key={plan.name}
              className={`panel relative p-6 transition ${
                plan.highlighted
                  ? "border-[var(--color-accent-primary)] shadow-lg ring-1 ring-[var(--color-accent-subtle-strong)]"
                  : ""
              }`}
            >
              {plan.highlighted ? (
                <div className="absolute -top-3 left-6 rounded-full bg-[var(--color-accent-primary)] px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </div>
              ) : null}
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--color-accent-subtle)]">
                  <Icon className="size-5 text-[var(--color-accent-primary)]" />
                </div>
                <div className="eyebrow">{plan.name}</div>
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-lg text-[var(--color-fg-muted)]">{plan.period}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{plan.summary}</p>
              <ul className="mt-6 grid gap-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-accent-primary)]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                {plan.name === "Free" ? (
                  <Link href={viewer.user ? "/dashboard" : "/signup"} className="button-primary w-full">
                    {viewer.user ? "Open dashboard" : "Start free"}
                  </Link>
                ) : currentTier === "pro" ? (
                  <div className="grid gap-3">
                    <BillingPortalButton />
                    <Link href="/dashboard" className="button-secondary">
                      Back to dashboard
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    <CheckoutButton label="Choose Pro monthly — $29/mo" />
                    <CheckoutButton billingInterval="annual" className="button-secondary" label="Choose Pro annual — $290/yr (save 17%)" />
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Value props bar */}
      <div className="mt-12 grid gap-4 text-center sm:grid-cols-3">
        <div className="flex flex-col items-center gap-2">
          <ShieldCheck className="size-6 text-[var(--color-accent-primary)]" />
          <div className="text-sm font-medium">No lock-in</div>
          <p className="text-xs text-[var(--color-fg-muted)]">Cancel anytime. No contracts.</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <BookOpen className="size-6 text-[var(--color-accent-primary)]" />
          <div className="text-sm font-medium">Real content only</div>
          <p className="text-xs text-[var(--color-fg-muted)]">We only charge for depth that is ready.</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MessageCircle className="size-6 text-[var(--color-accent-primary)]" />
          <div className="text-sm font-medium">AI tutor included</div>
          <p className="text-xs text-[var(--color-fg-muted)]">Get help in every lesson, every tier.</p>
        </div>
      </div>

      {/* FAQ section */}
      <section className="mx-auto mt-16 max-w-2xl">
        <h2 className="text-center text-2xl font-semibold">Frequently asked questions</h2>
        <div className="mt-8 grid gap-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="panel p-5">
              <h3 className="font-semibold">{faq.q}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
