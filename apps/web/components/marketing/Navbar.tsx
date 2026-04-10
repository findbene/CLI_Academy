"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LogoMark } from "@/components/ui/LogoMark";

interface NavbarProps {
  signedIn?: boolean;
}

export function Navbar({ signedIn = false }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close drawer when navigating to a new route (setState during render avoids setState-in-effect)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  async function handleSignOut() {
    await fetch("/api/auth/signout", { method: "POST" });
    window.location.href = "/";
  }

  const links = signedIn
    ? [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/learn", label: "Learn" },
        { href: "/setup-academy", label: "Setup Academy" },
        { href: "/prompt-context-studio", label: "Prompt & Context" },
        { href: "/runtime-lab", label: "Runtime Lab" },
        { href: "/asset-vault", label: "Asset Vault" },
        { href: "/paths", label: "Live Paths" },
        { href: "/pricing", label: "Pricing" },
        { label: "Sign out", isAction: true },
      ]
    : [
        { href: "/learn", label: "Learn" },
        { href: "/setup-academy", label: "Setup Academy" },
        { href: "/prompt-context-studio", label: "Prompt & Context" },
        { href: "/runtime-lab", label: "Runtime Lab" },
        { href: "/asset-vault", label: "Asset Vault" },
        { href: "/paths", label: "Live Paths" },
        { href: "/pricing", label: "Pricing" },
        { href: "/login", label: "Log in" },
      ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-page)]/88 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[80rem] items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark size={36} />
          <span className="text-[15px] font-semibold uppercase tracking-[0.1em] text-[var(--color-fg-default)]">
            CLI Academy
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-3 md:flex">
          {links.map((link) => {
            if ("isAction" in link && link.label === "Sign out") {
              return (
                <button
                  key={link.label}
                  onClick={handleSignOut}
                  className="rounded-full px-4 py-2 text-sm transition text-[var(--color-fg-muted)] hover:bg-white/5 hover:text-red-400 font-medium"
                >
                  {link.label}
                </button>
              );
            }

            const active = link.href && (pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/")));

            return (
              <Link
                key={link.label}
                href={link.href!}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? "bg-[var(--color-bg-panel-subtle)] text-[var(--color-fg-default)]"
                    : "text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-panel-subtle)] hover:text-[var(--color-fg-default)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <ThemeToggle />

          <Link href={signedIn ? "/dashboard" : "/signup"} className="button-primary">
            {signedIn ? "Open app" : "Start free"}
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex size-10 items-center justify-center rounded-xl text-[var(--color-fg-muted)] transition hover:bg-[var(--color-bg-panel-subtle)] hover:text-[var(--color-fg-default)] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-[var(--color-bg-inverse)]/40 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <nav className="fixed inset-x-0 top-[73px] z-50 max-h-[calc(100dvh-73px)] overflow-y-auto border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] px-6 pb-6 pt-4 shadow-lg md:hidden">
            <div className="grid gap-1">
              {links.map((link) => {
                if ("isAction" in link && link.label === "Sign out") {
                  return (
                    <button
                      key={link.label}
                      onClick={() => {
                        setMobileOpen(false);
                        handleSignOut();
                      }}
                      className="rounded-xl px-4 py-3 text-left text-base font-medium transition text-[var(--color-fg-muted)] hover:bg-white/5 hover:text-red-400"
                    >
                      {link.label}
                    </button>
                  );
                }

                const active = link.href && (pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/")));

                return (
                  <Link
                    key={link.label}
                    href={link.href!}
                    className={`rounded-xl px-4 py-3 text-base transition ${
                      active
                        ? "bg-[var(--color-bg-panel-subtle)] font-medium text-[var(--color-fg-default)]"
                        : "text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-panel-subtle)] hover:text-[var(--color-fg-default)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--color-border-subtle)] pt-4">
              <ThemeToggle />
              <Link
                href={signedIn ? "/dashboard" : "/signup"}
                className="button-primary flex-1 text-center"
              >
                {signedIn ? "Open app" : "Start free"}
              </Link>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
