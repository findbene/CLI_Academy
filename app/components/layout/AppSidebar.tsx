"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { SearchTrigger } from "@/components/ui/search-dialog";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/downloads", label: "Downloads" },
  { href: "/settings", label: "Settings" },
];

interface AppSidebarProps {
  tier?: "free" | "pro";
  tutorMessagesRemaining?: number | null;
  userEmail?: string | null;
}

export function AppSidebar({ tier = "free", tutorMessagesRemaining, userEmail }: AppSidebarProps) {
  const pathname = usePathname();
  const dailyLimit = tier === "pro" ? 100 : 10;

  return (
    <aside className="desktop-only sticky top-0 flex h-screen flex-col border-r border-[var(--color-border-subtle)] bg-[rgba(255,255,255,0.88)] p-5 backdrop-blur">
      <Link href="/" className="mb-8 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-2xl bg-[var(--color-accent-primary)] text-sm font-semibold text-white">
          CLI
        </span>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-primary-hover)]">
            CLI Academy
          </div>
          <div className="text-sm text-[var(--color-fg-muted)]">Learn &middot; Build &middot; Ship</div>
        </div>
      </Link>

      <div className="mb-4 text-xs uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
        Learn
      </div>

      <div className="mb-4">
        <SearchTrigger />
      </div>

      <nav className="grid gap-2">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-2xl px-4 py-3 text-sm transition ${
                active
                  ? "bg-[var(--color-bg-panel-subtle)] font-medium text-[var(--color-fg-default)]"
                  : "text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-panel-subtle)] hover:text-[var(--color-fg-default)]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          href="/paths"
          className="rounded-2xl px-4 py-3 text-sm text-[var(--color-fg-muted)] transition hover:bg-[var(--color-bg-panel-subtle)] hover:text-[var(--color-fg-default)]"
        >
          Browse paths
        </Link>
      </nav>

      <div className="mt-auto rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] p-4">
        <div className="text-sm font-medium">{userEmail ?? "Signed-in learner"}</div>
        <div className="mt-2 text-sm text-[var(--color-fg-muted)]">
          {tier === "pro" ? "Pro learner" : "Free learner"} · {dailyLimit} tutor messages daily
          {typeof tutorMessagesRemaining === "number" ? ` · ${tutorMessagesRemaining} left today` : ""}
        </div>
        {userEmail ? (
          <div className="mt-4">
            <SignOutButton />
          </div>
        ) : null}
      </div>
    </aside>
  );
}
