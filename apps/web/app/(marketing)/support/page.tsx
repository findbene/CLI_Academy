import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support | CLI Academy",
  description: "Get help with CLI Academy — troubleshooting guides, common issues, and contact options.",
};

const supportOptions = [
  {
    title: "Troubleshooting Guides",
    description: "Step-by-step fixes for common setup and configuration issues across Windows, macOS, and Linux.",
    href: "/troubleshooting",
    label: "Browse guides",
  },
  {
    title: "AI Tutor",
    description: "Ask the in-app AI tutor questions about any lesson, concept, or error you encounter while learning.",
    href: "/dashboard",
    label: "Open dashboard",
  },
  {
    title: "Resource Hub",
    description: "Browse curated tools, MCP servers, skills, and community resources for Claude Code.",
    href: "/resources",
    label: "Explore resources",
  },
];

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "Use the 'Forgot password' link on the login page. You'll receive a reset email within a few minutes.",
  },
  {
    question: "Can I switch between Free and Pro?",
    answer: "Yes. You can upgrade to Pro at any time from the Pricing page. If you cancel, you retain access until the end of your billing period.",
  },
  {
    question: "The AI tutor isn't responding",
    answer: "The tutor requires an active internet connection and may be temporarily unavailable during high demand. Try refreshing the page or checking back in a few minutes.",
  },
  {
    question: "I found an error in a lesson",
    answer: "We review all lesson content regularly. If you notice an error, use the AI tutor to flag it or reach out through the platform — we take content accuracy seriously.",
  },
  {
    question: "How do I delete my account?",
    answer: "Contact us through the platform to request account deletion. Your data will be removed within 30 days per our Privacy Policy.",
  },
];

export default function SupportPage() {
  return (
    <main className="page-shell">
      <section className="text-center">
        <div className="eyebrow">Support</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">How can we help?</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-fg-muted)]">
          Browse our self-service options or check the FAQ below. We&apos;re building toward more direct support channels as CLI Academy grows.
        </p>
      </section>

      <section className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {supportOptions.map((option) => (
          <Link
            key={option.href}
            href={option.href}
            className="panel flex flex-col gap-3 p-6 transition-colors hover:border-[var(--color-accent-primary)]"
          >
            <h2 className="text-lg font-semibold">{option.title}</h2>
            <p className="text-sm leading-6 text-[var(--color-fg-muted)]">{option.description}</p>
            <span className="mt-auto text-sm font-medium text-[var(--color-accent-primary)]">
              {option.label} &rarr;
            </span>
          </Link>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="mt-6 grid gap-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="panel p-5">
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
