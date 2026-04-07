export default function LessonLoading() {
  return (
    <div className="page-shell animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="mb-6 flex items-center gap-2">
        <div className="h-4 w-20 rounded bg-[var(--color-bg-panel-subtle)]" />
        <div className="h-4 w-3 rounded bg-[var(--color-bg-panel-subtle)]" />
        <div className="h-4 w-32 rounded bg-[var(--color-bg-panel-subtle)]" />
      </div>

      {/* Title skeleton */}
      <div className="h-8 w-3/4 rounded bg-[var(--color-bg-panel-subtle)]" />
      <div className="mt-3 h-5 w-1/2 rounded bg-[var(--color-bg-panel-subtle)]" />

      {/* Meta bar skeleton */}
      <div className="mt-6 flex gap-4">
        <div className="h-6 w-24 rounded-full bg-[var(--color-bg-panel-subtle)]" />
        <div className="h-6 w-20 rounded-full bg-[var(--color-bg-panel-subtle)]" />
        <div className="h-6 w-16 rounded-full bg-[var(--color-bg-panel-subtle)]" />
      </div>

      {/* Content skeleton */}
      <div className="mt-8 space-y-4">
        <div className="h-4 w-full rounded bg-[var(--color-bg-panel-subtle)]" />
        <div className="h-4 w-5/6 rounded bg-[var(--color-bg-panel-subtle)]" />
        <div className="h-4 w-full rounded bg-[var(--color-bg-panel-subtle)]" />
        <div className="h-4 w-4/6 rounded bg-[var(--color-bg-panel-subtle)]" />
        <div className="mt-6 h-32 w-full rounded-xl bg-[var(--color-bg-panel-subtle)]" />
        <div className="h-4 w-full rounded bg-[var(--color-bg-panel-subtle)]" />
        <div className="h-4 w-3/4 rounded bg-[var(--color-bg-panel-subtle)]" />
      </div>
    </div>
  );
}
