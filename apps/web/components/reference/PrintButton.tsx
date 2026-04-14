"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] px-4 py-2 text-sm font-medium text-[var(--color-fg-default)] transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-panel-subtle)] print:hidden"
    >
      <Printer className="size-4" />
      Print / Save as PDF
    </button>
  );
}
