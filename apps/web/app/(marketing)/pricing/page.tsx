import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Two plans. One serious curriculum. Start free with Claude Code and Cowork foundations. Upgrade to Pro for the full OpenClaw track, Claw-Verse, and 30 paths of production-ready training.",
};

import {
  BookOpen,
  Check,
  MessageCircle,
  Minus,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import { CheckoutButton } from "@/components/billing/CheckoutButton";
import { BillingPortalButton } from "@/components/settings/BillingPortalButton";
import { getServerViewer } from "@/lib/viewer";

// ─── Feature comparison data ────────────────────────────────────────────────

const comparisonRows: { label: string; free: string | boolean; pro: string | boolean }[] = [
  { label: "Claude Code paths (Foundations)", free: "Paths 1–3", pro: "Paths 1–10" },
  { label: "Claude Cowork paths", free: "Path 8 (intro)", pro: "Full track" },
  { label: "OpenClaw paths", free: false, pro: "Paths 11, 28–30" },
  { label: "Claw-Verse (ZeroClaw, NanoClaw, AutoClaw)", free: false, pro: true },
  { label: "Advanced tracks (Safety, Observability, TDD)", free: false, pro: true },
  { label: "Career pathway (Job-Ready Brief)", free: false, pro: "Path 27" },
  { label: "Daily AI tutor messages", free: "10 / day", pro: "100 / day" },
  { label: "Printable reference cards", free: "5 free cards", pro: "All 8 cards" },
  { label: "Full download library", free: false, pro: true },
  { label: "Setup guides (macOS, Windows/WSL2, Linux)", free: true, pro: true },
];

// ─── FAQ data ────────────────────────────────────────────────────────────────

const faqs: { q: string; a: string }[] = [
  {
    q: "Can I install Claude Code for free?",
    a: "Yes. Claude Code is Anthropic's free CLI — you install it yourself following the setup guide included in the free tier. CLI Academy teaches you how to use it effectively, starting from your very first session.",
  },
  {
    q: "What is OpenClaw and why does it matter?",
    a: "OpenClaw is a self-hosted operational layer that sits on top of the Anthropic API. It gives you a persistent memory system, a Logic Spine for chaining agent steps, a YES gate for safety review, and a heartbeat monitor for production uptime. It is the difference between running a demo and running a production agent. The full track is in Paths 11 and 28–30.",
  },
  {
    q: "Can I try everything before paying?",
    a: "Yes. The free tier gives you full access to Claude Code Foundations (Paths 1–3), the Cowork intro (Path 8), setup guides, 5 reference cards, and 10 daily tutor messages. Pro only unlocks depth — not the door.",
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
    a: "Yes — choose annual billing at checkout and save 17% compared to monthly. The annual option appears on the Pro card.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function PricingPage() {
  const viewer = await getServerViewer();
  const currentTier = viewer.profile?.tier ?? "free";

  return (
    <main className="page-shell">
      {/* Hero */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="eyebrow">Pricing</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Two plans. One serious curriculum.
        </h1>
        <p className="mt-4 text-lg leading-8 text-[var(--color-fg-muted)]">
          30 paths. 194+ lessons. From first terminal command to production-ready OpenClaw deployments.
          The free tier is a real foundation — not a teaser.
        </p>
        {viewer.user ? (
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-bg-panel)] px-4 py-2 text-sm text-[var(--color-fg-muted)] border border-[var(--color-border-subtle)]">
            Signed in as {viewer.user.email ?? "learner"} ·{" "}
            <span className="font-medium capitalize text-[var(--color-fg-default)]">
              {currentTier}
            </span>{" "}
            plan
          </p>
        ) : null}
      </div>

      {/* Plan cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {/* Free plan */}
        <article className="panel relative p-6 transition">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--color-accent-subtle)]">
              <Terminal className="size-5 text-[var(--color-accent-primary)]" />
            </div>
            <div className="eyebrow">Free</div>
          </div>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-bold">$0</span>
            <span className="text-lg text-[var(--color-fg-muted)]">forever</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
            For learners who want a real first win before committing. The foundations are complete —
            no artificial gates.
          </p>
          <ul className="mt-6 grid gap-3 text-sm">
            {[
              "Claude Code Foundations — Paths 1–3: first win, terminal basics, core loop",
              "Claude Cowork intro — Path 8: session briefs and task framing",
              "Setup guides for macOS, Windows/WSL2, and Linux",
              "5 printable reference cards (cheat sheets)",
              "10 AI tutor messages per day",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-accent-primary)]" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link
              href={viewer.user ? "/dashboard" : "/signup"}
              className="button-primary w-full text-center"
            >
              {viewer.user ? "Open dashboard" : "Start free"}
            </Link>
          </div>
        </article>

        {/* Pro plan */}
        <article className="panel relative p-6 transition border-[var(--color-accent-primary)] shadow-lg ring-1 ring-[var(--color-accent-subtle-strong)]">
          <div className="absolute -top-3 left-6 rounded-full bg-[var(--color-accent-primary)] px-3 py-1 text-xs font-semibold text-white">
            Most popular
          </div>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--color-accent-subtle)]">
              <Sparkles className="size-5 text-[var(--color-accent-primary)]" />
            </div>
            <div className="eyebrow">Pro</div>
          </div>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-bold">$29</span>
            <span className="text-lg text-[var(--color-fg-muted)]">/mo</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
            For learners going all the way — Claude Code mastery, full OpenClaw production track,
            the Claw-Verse, and every advanced path.
          </p>
          <ul className="mt-6 grid gap-3 text-sm">
            {[
              "Everything in Free",
              "Complete Claude Code Mastery — Paths 4–10: repo workflows, debugging, Git/GitHub, research, mental models",
              "Full OpenClaw track — Paths 11, 28–30: install, config, skills, security, production ops",
              "Claw-Verse — ZeroClaw (low-latency), NanoClaw (ARM/edge), AutoClaw (CI/CD)",
              "Advanced tracks: Agent Safety, Observability, Test-Driven Agentic Dev",
              "Career pathway: Job-Ready Brief (Path 27)",
              "All 8 printable reference cards (including Pro OpenClaw cards)",
              "Full download library",
              "100 AI tutor messages per day",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-accent-primary)]" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            {currentTier === "pro" ? (
              <div className="grid gap-3">
                <BillingPortalButton />
                <Link href="/dashboard" className="button-secondary">
                  Back to dashboard
                </Link>
              </div>
            ) : (
              <div className="grid gap-3">
                <CheckoutButton label="Choose Pro monthly — $29/mo" />
                <CheckoutButton
                  billingInterval="annual"
                  className="button-secondary"
                  label="Choose Pro annual — $290/yr (save 17%)"
                />
              </div>
            )}
          </div>
        </article>
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
          <p className="text-xs text-[var(--color-fg-muted)]">
            194+ lessons. Every path earns its place.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MessageCircle className="size-6 text-[var(--color-accent-primary)]" />
          <div className="text-sm font-medium">AI tutor included</div>
          <p className="text-xs text-[var(--color-fg-muted)]">Get help in every lesson, every tier.</p>
        </div>
      </div>

      {/* Comparison table */}
      <section className="mx-auto mt-16 max-w-3xl">
        <h2 className="text-center text-2xl font-semibold">Free vs Pro at a glance</h2>
        <div className="mt-6 panel overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border-subtle)]">
                <th className="py-3 px-4 text-left font-medium text-[var(--color-fg-muted)]">
                  Feature
                </th>
                <th className="py-3 px-4 text-center font-medium text-[var(--color-fg-muted)] w-28">
                  Free
                </th>
                <th className="py-3 px-4 text-center font-medium text-[var(--color-accent-primary)] w-28">
                  Pro
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.label}
                  className={
                    i < comparisonRows.length - 1
                      ? "border-b border-[var(--color-border-subtle)]"
                      : ""
                  }
                >
                  <td className="py-3 px-4 text-[var(--color-fg-default)]">{row.label}</td>
                  <td className="py-3 px-4 text-center text-[var(--color-fg-muted)]">
                    {row.free === true ? (
                      <Check className="mx-auto size-4 text-[var(--color-accent-primary)]" />
                    ) : row.free === false ? (
                      <Minus className="mx-auto size-4 text-[var(--color-fg-subtle)]" />
                    ) : (
                      row.free
                    )}
                  </td>
                  <td className="py-3 px-4 text-center text-[var(--color-fg-default)]">
                    {row.pro === true ? (
                      <Check className="mx-auto size-4 text-[var(--color-accent-primary)]" />
                    ) : row.pro === false ? (
                      <Minus className="mx-auto size-4 text-[var(--color-fg-subtle)]" />
                    ) : (
                      row.pro
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

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
