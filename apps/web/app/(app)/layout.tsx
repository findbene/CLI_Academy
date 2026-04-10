import type { ReactNode } from "react";
import Link from "next/link";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { LocalProgressBackfill } from "@/components/progress/LocalProgressBackfill";
import { PageTransition } from "@/components/ui/page-transition";
import { getServerViewer } from "@/lib/viewer";

export default async function AuthenticatedAppLayout({ children }: { children: ReactNode }) {
  const viewer = await getServerViewer({ requireAuth: true });
  const dailyLimit = viewer.profile?.tier === "pro" ? 100 : 10;
  let tutorMessagesRemaining: number | null = null;

  if (viewer.supabaseContext && viewer.user) {
    const today = new Date().toISOString().slice(0, 10);
    const { data: usage } = await viewer.supabaseContext.supabase
      .from("tutor_usage")
      .select("message_count")
      .eq("user_id", viewer.user.id)
      .eq("used_at", today)
      .maybeSingle();

    tutorMessagesRemaining = Math.max(0, dailyLimit - (usage?.message_count ?? 0));
  }

  return (
    <div className="app-shell">
      <AppSidebar
        tier={viewer.profile?.tier}
        tutorMessagesRemaining={tutorMessagesRemaining}
        userEmail={viewer.user?.email}
      />
      <div id="main-content" className="min-h-screen">
        <div className="mobile-only border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-page)]/88 px-4 py-3 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary-hover)]">
                CLI Academy
              </div>
              <div className="text-sm text-[var(--color-fg-muted)]">
                {viewer.user?.email ?? "Guest"}
              </div>
            </div>
            <Link href="/learn" className="button-secondary">
              Learn
            </Link>
          </div>
        </div>
        {!viewer.supabaseConfigured ? (
          <div className="mx-4 mt-4 rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] px-4 py-3 text-sm text-[var(--color-fg-muted)]">
            Some features require authentication. Configure your environment to unlock full functionality.
          </div>
        ) : null}
        <LocalProgressBackfill userId={viewer.user?.id} />
        <PageTransition>{children}</PageTransition>
      </div>
    </div>
  );
}
