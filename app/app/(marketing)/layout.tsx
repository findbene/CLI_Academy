import type { ReactNode } from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { PageTransition } from "@/components/ui/page-transition";
import { getServerViewer } from "@/lib/viewer";

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const viewer = await getServerViewer();

  return (
    <div className="min-h-screen">
      <Navbar signedIn={Boolean(viewer.user)} />
      <PageTransition>{children}</PageTransition>
      <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-default)]">
        <div className="mx-auto grid w-full max-w-[80rem] gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 text-[var(--color-fg-default)] font-semibold text-lg">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent-primary)] text-xs font-bold text-white">
                CLI
              </span>
              Academy
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
              The safest, most beginner-friendly way to learn Claude Code and AI agent workflows.
            </p>
          </div>

          {/* Product column */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-fg-default)]">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-fg-muted)]">
              <li><a href="/paths" className="hover:text-[var(--color-accent-primary)] transition-colors">Learning Paths</a></li>
              <li><a href="/downloads" className="hover:text-[var(--color-accent-primary)] transition-colors">Downloads</a></li>
              <li><a href="/pricing" className="hover:text-[var(--color-accent-primary)] transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-fg-default)]">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-fg-muted)]">
              <li><a href="/trust" className="hover:text-[var(--color-accent-primary)] transition-colors">Trust &amp; Safety</a></li>
              <li><a href="/troubleshooting" className="hover:text-[var(--color-accent-primary)] transition-colors">Troubleshooting</a></li>
              <li><a href="/support" className="hover:text-[var(--color-accent-primary)] transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-fg-default)]">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-fg-muted)]">
              <li><a href="/terms" className="hover:text-[var(--color-accent-primary)] transition-colors">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-[var(--color-accent-primary)] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--color-border-subtle)]">
          <div className="mx-auto flex w-full max-w-[80rem] items-center justify-between px-6 py-4 text-xs text-[var(--color-fg-muted)]">
            <span>&copy; {new Date().getFullYear()} CLI Academy. All rights reserved.</span>
            <span>Safety-first teaching &middot; Real-machine tested</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
