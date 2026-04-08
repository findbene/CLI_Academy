export default function AppLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border-subtle)] border-t-[var(--color-accent-primary)]" />
        <p className="text-sm text-[var(--color-fg-muted)]">Loading…</p>
      </div>
    </div>
  );
}
