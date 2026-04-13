"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Library, Download, Settings, Compass, Menu, Newspaper, X } from "lucide-react";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { SearchTrigger } from "@/components/ui/search-dialog";
import { LogoMark } from "@/components/ui/LogoMark";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/lounge", label: "Agentic Era", icon: Newspaper },
  { href: "/resources", label: "Resources", icon: Library },
  { href: "/downloads", label: "Downloads", icon: Download },
  { href: "/settings", label: "Settings", icon: Settings },
];

interface AppSidebarProps {
  groupId?: string;
  tier?: "free" | "pro";
  tutorMessagesRemaining?: number | null;
  userEmail?: string | null;
}

export function AppSidebar({ groupId, tier = "free", tutorMessagesRemaining, userEmail }: AppSidebarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dailyLimit = tier === "pro" ? 100 : 10;
  const usagePercent =
    typeof tutorMessagesRemaining === "number"
      ? Math.min(100, Math.max(0, (tutorMessagesRemaining / dailyLimit) * 100))
      : null;

  return (
    <>
      <aside className="desktop-only sticky top-0 flex h-screen flex-col border-r border-[var(--color-border-subtle)] bg-[var(--color-bg-page)]/88 p-5 backdrop-blur">
        <Link href="/" className="mb-8 flex items-center gap-3">
          <LogoMark size={36} />
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-fg-default)]">
              CLI Academy
            </div>
            <div className="text-xs text-[var(--color-fg-subtle)]">Learn · Build · Ship</div>
          </div>
        </Link>

        {groupId ? (
          <div className="px-3 pt-0 pb-3">
            <span className="text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
              Group {groupId}
            </span>
          </div>
        ) : null}

        <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
          Navigation
        </div>

        <div className="mb-3">
          <SearchTrigger />
        </div>

        <nav className="grid gap-0.5">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-150 ${
                  active
                    ? "bg-[var(--color-accent-subtle)] font-medium text-[var(--color-fg-default)]"
                    : "text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-panel-subtle)] hover:text-[var(--color-fg-default)]"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-[var(--color-accent-primary)]" />
                )}
                <Icon className="h-4 w-4 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/paths"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[var(--color-fg-muted)] transition-all duration-150 hover:bg-[var(--color-bg-panel-subtle)] hover:text-[var(--color-fg-default)]"
          >
            <Compass className="h-4 w-4 flex-shrink-0" />
            Browse Paths
          </Link>
        </nav>

        <div className="mt-auto space-y-3">
          {usagePercent !== null && (
            <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-4 py-3">
              <div className="flex items-center justify-between text-xs text-[var(--color-fg-muted)]">
                <span>Tutor messages</span>
                <span className="font-medium tabular-nums text-[var(--color-fg-default)]">
                  {tutorMessagesRemaining}/{dailyLimit}
                </span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-[var(--color-border-subtle)]">
                <div
                  className="h-full rounded-full bg-[var(--color-accent-primary)] transition-all duration-500"
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
            </div>
          )}

          <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0 text-sm font-medium truncate">
                {userEmail ?? "Signed-in learner"}
              </div>
              <span className="badge flex-shrink-0" data-tone={tier === "pro" ? "warning" : "accent"}>
                {tier.toUpperCase()}
              </span>
            </div>
            <div className="mt-1 text-xs text-[var(--color-fg-subtle)]">
              {dailyLimit} tutor messages / day
            </div>
            {userEmail && (
              <div className="mt-3">
                <SignOutButton />
              </div>
            )}
          </div>
        </div>
      </aside>

      <div className="mobile-only pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-4">
        <div className="pointer-events-auto rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)]/96 p-2 shadow-lg backdrop-blur">
          <div className="grid grid-cols-5 gap-1">
            {navItems.slice(0, 4).map((item) => {
              const active = pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-1 rounded-[var(--radius-lg)] px-2 py-2 text-[11px] ${
                    active
                      ? "bg-[var(--color-accent-subtle)] text-[var(--color-fg-default)]"
                      : "text-[var(--color-fg-muted)]"
                  }`}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex flex-col items-center gap-1 rounded-[var(--radius-lg)] px-2 py-2 text-[11px] text-[var(--color-fg-muted)]"
            >
              {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
              <span>Menu</span>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="mobile-only fixed inset-0 z-50 bg-black/45 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="absolute inset-x-3 bottom-24 rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <LogoMark size={30} />
                <div>
                  <div className="text-sm font-semibold">CLI Academy</div>
                  <div className="text-xs text-[var(--color-fg-subtle)]">{userEmail ?? "Signed-in learner"}</div>
                </div>
              </div>
              <button type="button" className="button-ghost" onClick={() => setMobileMenuOpen(false)}>
                Close
              </button>
            </div>

            <div className="mb-4">
              <SearchTrigger />
            </div>

            <div className="grid gap-2">
              {navItems.map((item) => {
                const active = pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm ${
                      active
                        ? "bg-[var(--color-accent-subtle)] text-[var(--color-fg-default)]"
                        : "text-[var(--color-fg-muted)]"
                    }`}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/paths"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[var(--color-fg-muted)]"
              >
                <Compass className="size-4" />
                Browse Paths
              </Link>
            </div>

            {usagePercent !== null ? (
              <div className="mt-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-4 py-3">
                <div className="flex items-center justify-between text-xs text-[var(--color-fg-muted)]">
                  <span>Tutor messages</span>
                  <span className="font-medium tabular-nums text-[var(--color-fg-default)]">
                    {tutorMessagesRemaining}/{dailyLimit}
                  </span>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-[var(--color-border-subtle)]">
                  <div
                    className="h-full rounded-full bg-[var(--color-accent-primary)] transition-all duration-500"
                    style={{ width: `${usagePercent}%` }}
                  />
                </div>
              </div>
            ) : null}

            {userEmail ? (
              <div className="mt-4">
                <SignOutButton />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
