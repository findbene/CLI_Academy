import { CheckoutButton } from "@/components/billing/CheckoutButton";
import { BillingPortalButton } from "@/components/settings/BillingPortalButton";
import { ProfileEditor } from "@/components/settings/ProfileEditor";
import { getServerViewer } from "@/lib/viewer";

export default async function SettingsPage() {
  const viewer = await getServerViewer();
  const answers = viewer.profile?.onboarding_answers ?? {};

  return (
    <main className="page-shell">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="panel p-6">
          <div className="eyebrow">Settings</div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Account and billing</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--color-fg-muted)]">
            Your learner profile, onboarding answers, and billing state now have a real server-backed home in this rebuild.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] p-4">
              <div className="text-sm font-medium">Email</div>
              <div className="mt-2 text-sm text-[var(--color-fg-muted)]">{viewer.user?.email ?? "Not signed in"}</div>
            </div>
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] p-4">
              <div className="text-sm font-medium">Plan</div>
              <div className="mt-2 text-sm capitalize text-[var(--color-fg-muted)]">
                {viewer.profile?.tier ?? "free"} {viewer.profile?.subscription_status ? `· ${viewer.profile.subscription_status}` : ""}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <ProfileEditor
              initialGoal={typeof answers.primary_goal === "string" ? answers.primary_goal : ""}
              initialOS={typeof answers.host_os === "string" ? answers.host_os : ""}
            />
          </div>
        </section>

        <section className="panel p-6">
          <div className="text-sm font-semibold">Billing</div>
          <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
            Manage your subscription, update payment methods, or view invoices through the Stripe billing portal.
          </p>
          <div className="mt-5 grid gap-3">
            <BillingPortalButton />
            {viewer.profile?.tier !== "pro" ? (
              <CheckoutButton className="button-primary" label="Upgrade to Pro" />
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
