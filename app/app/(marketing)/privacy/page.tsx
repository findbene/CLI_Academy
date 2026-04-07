import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | CLI Academy",
  description: "How CLI Academy collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <main className="page-shell">
      <div className="panel mx-auto max-w-3xl p-8">
        <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-sm text-[var(--color-fg-muted)]">Last updated: July 2025</p>

        <div className="mt-8 space-y-6 text-[var(--color-fg-muted)] leading-7">
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-fg-default)]">1. Information We Collect</h2>
            <p className="mt-2">
              We collect information you provide directly: email address, display name, onboarding answers, and lesson progress. We also collect usage data such as pages visited and features used through anonymized telemetry.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-fg-default)]">2. How We Use Your Information</h2>
            <p className="mt-2">We use your data to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Provide and personalize the learning experience</li>
              <li>Track lesson progress and path completion</li>
              <li>Power the AI tutor with relevant lesson context</li>
              <li>Process payments through Stripe</li>
              <li>Improve the platform based on aggregated usage patterns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-fg-default)]">3. AI Tutor Data</h2>
            <p className="mt-2">
              Messages sent to the AI tutor are processed by Anthropic&apos;s Claude API. We send your question and relevant lesson context. We do not store tutor conversation history beyond your active session. Anthropic&apos;s data usage policies apply to API interactions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-fg-default)]">4. Data Storage &amp; Security</h2>
            <p className="mt-2">
              Your data is stored in Supabase (hosted on AWS). Authentication uses Supabase Auth with secure session management. Payments are processed by Stripe — we never store your full card details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-fg-default)]">5. Third-Party Services</h2>
            <p className="mt-2">We use the following third-party services:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li><strong>Supabase</strong> — authentication, database, and storage</li>
              <li><strong>Stripe</strong> — payment processing</li>
              <li><strong>Anthropic</strong> — AI tutor (Claude API)</li>
              <li><strong>Vercel</strong> — hosting and deployment</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-fg-default)]">6. Cookies</h2>
            <p className="mt-2">
              We use essential cookies for authentication and session management. We do not use advertising or tracking cookies. Analytics are anonymized and aggregated.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-fg-default)]">7. Your Rights</h2>
            <p className="mt-2">
              You may request access to, correction of, or deletion of your personal data at any time. To delete your account and associated data, contact us through the platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-fg-default)]">8. Data Retention</h2>
            <p className="mt-2">
              Account data is retained while your account is active. Progress data is retained for the duration of your membership. Upon account deletion, personal data is removed within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-fg-default)]">9. Changes to This Policy</h2>
            <p className="mt-2">
              We may update this policy as the platform evolves. Material changes will be communicated via email or in-app notification.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-fg-default)]">10. Contact</h2>
            <p className="mt-2">
              For privacy-related inquiries, reach out through the support channels available in the platform.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
