import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | CLI Academy",
  description: "Terms of Service for CLI Academy — rules, limitations, and usage policies for the platform.",
};

export default function TermsPage() {
  return (
    <main className="page-shell">
      <div className="panel mx-auto max-w-3xl p-8">
        <h1 className="text-4xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-4 text-sm text-[var(--color-fg-muted)]">Last updated: July 2025</p>

        <div className="mt-8 space-y-6 text-[var(--color-fg-muted)] leading-7">
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-fg-default)]">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By accessing or using CLI Academy (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-fg-default)]">2. Description of Service</h2>
            <p className="mt-2">
              CLI Academy provides educational content, guided learning paths, downloadable assets, and an AI-powered tutor to help learners become productive with Claude Code and secure AI agent workflows.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-fg-default)]">3. Accounts</h2>
            <p className="mt-2">
              You are responsible for maintaining the security of your account credentials. You must provide accurate information when creating an account. CLI Academy reserves the right to suspend or terminate accounts that violate these terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-fg-default)]">4. Subscriptions &amp; Payments</h2>
            <p className="mt-2">
              Pro subscriptions are billed through Stripe. You may cancel at any time. Refunds are handled on a case-by-case basis within 14 days of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-fg-default)]">5. Acceptable Use</h2>
            <p className="mt-2">
              You agree not to misuse the Service, including but not limited to: reverse engineering the platform, scraping content for redistribution, sharing account access, or using the AI tutor to generate harmful content.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-fg-default)]">6. Intellectual Property</h2>
            <p className="mt-2">
              All content, lesson materials, downloadable assets, and design elements are owned by CLI Academy. Personal use is permitted. Redistribution, resale, or commercial reuse requires written permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-fg-default)]">7. Disclaimers</h2>
            <p className="mt-2">
              CLI Academy provides educational content on an &quot;as is&quot; basis. While we strive for accuracy and freshness, commands, APIs, and tools referenced may change. Always verify in official documentation before deploying to production.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-fg-default)]">8. Limitation of Liability</h2>
            <p className="mt-2">
              CLI Academy shall not be liable for any indirect, incidental, or consequential damages arising from use of the Service, including but not limited to data loss, system damage, or security incidents resulting from following lesson content.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-fg-default)]">9. Changes to Terms</h2>
            <p className="mt-2">
              We may update these terms from time to time. Continued use of the Service after changes constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-fg-default)]">10. Contact</h2>
            <p className="mt-2">
              Questions about these terms can be directed to our support channels accessible from the platform.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
