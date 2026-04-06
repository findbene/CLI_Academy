import type { ReactNode } from "react";
import { Navbar } from "@/components/marketing/Navbar";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
      <footer className="border-t border-[var(--color-border-subtle)] bg-[rgba(255,255,255,0.82)]">
        <div className="mx-auto flex w-full max-w-[80rem] flex-col gap-3 px-6 py-8 text-sm text-[var(--color-fg-muted)] md:flex-row md:items-center md:justify-between">
          <span>CLI Academy is being rebuilt from recovered architecture notes and curriculum assets.</span>
          <span>The core promise stays the same: safer setup, calmer troubleshooting, faster first wins.</span>
        </div>
      </footer>
    </div>
  );
}
