import type { ReactNode } from "react";
import Link from "next/link";
import { AppSidebar } from "@/components/layout/AppSidebar";

export default function AuthenticatedAppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <AppSidebar />
      <div className="min-h-screen">
        <div className="mobile-only border-b border-[var(--color-border-subtle)] bg-[rgba(255,255,255,0.88)] px-4 py-3 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary-hover)]">
                CLI Academy
              </div>
              <div className="text-sm text-[var(--color-fg-muted)]">Recovered app shell</div>
            </div>
            <Link href="/paths" className="button-secondary">
              Paths
            </Link>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
