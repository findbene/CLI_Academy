"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  signedIn?: boolean;
}

export function Navbar({ signedIn = false }: NavbarProps) {
  const pathname = usePathname();
  const links = signedIn
    ? [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/paths", label: "Paths" },
        { href: "/downloads", label: "Downloads" },
        { href: "/trust", label: "Trust" },
        { href: "/pricing", label: "Pricing" },
      ]
    : [
        { href: "/paths", label: "Paths" },
        { href: "/troubleshooting", label: "Troubleshooting" },
        { href: "/trust", label: "Trust" },
        { href: "/pricing", label: "Pricing" },
        { href: "/login", label: "Log in" },
      ];

  return (
    <header className="border-b border-[var(--color-border-subtle)] bg-[rgba(255,252,247,0.88)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-[80rem] items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-[var(--color-accent-primary)] text-sm font-semibold text-white">
            CLI
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-[0.18em] text-[var(--color-accent-primary-hover)] uppercase">
              CLI Academy
            </span>
            <span className="text-sm text-[var(--color-fg-muted)]">
              Setup, troubleshoot, and start strong
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
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

          <Link href={signedIn ? "/dashboard" : "/signup"} className="button-primary">
            {signedIn ? "Open app" : "Start free"}
          </Link>
        </nav>

        <div className="md:hidden">
          <Link href={signedIn ? "/dashboard" : "/signup"} className="button-primary">
            {signedIn ? "App" : "Start"}
          </Link>
        </div>
      </div>
    </header>
  );
}
