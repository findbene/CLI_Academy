import { AlertCircle } from "lucide-react";

interface ModelNoteProps {
  date: string;
  children: React.ReactNode;
}

export function ModelNote({ date, children }: ModelNoteProps) {
  return (
    <aside className="my-6 flex gap-3 rounded-[var(--radius-lg)] border border-[var(--color-accent-primary)] bg-[var(--color-accent-subtle)] px-4 py-3">
      <AlertCircle className="size-4 mt-0.5 shrink-0 text-[var(--color-accent-primary)]" />
      <div className="text-sm text-[var(--color-fg-default)]">
        <span className="font-semibold">Model note ({date}):</span> {children}
      </div>
    </aside>
  );
}
