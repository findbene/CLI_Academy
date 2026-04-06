import { BillingPortalButton } from "@/components/settings/BillingPortalButton";

export default function SettingsPage() {
  return (
    <main className="page-shell">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="panel p-6">
          <div className="eyebrow">Settings</div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Account and billing shell</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--color-fg-muted)]">
            This page restores the settings and billing entry point so the product shell has its key operational routes
            again. The real Stripe portal and profile settings come after the frontend rebuild stabilizes.
          </p>
        </section>

        <section className="panel p-6">
          <div className="text-sm font-semibold">Billing</div>
          <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
            The original app had Stripe checkout, webhook handling, and a customer portal link. The route and button are
            back so the interaction contract survives the rebuild.
          </p>
          <div className="mt-5">
            <BillingPortalButton />
          </div>
        </section>
      </div>
    </main>
  );
}
