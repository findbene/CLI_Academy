import Link from "next/link";

const labTracks = [
  {
    title: "Week 1 terminal sandbox",
    summary: "Resettable workspace for install, auth, doctor checks, and first-run validation.",
    environment: "CLI + file tree + hints",
  },
  {
    title: "Cowork briefing lab",
    summary: "Starter folder, source bundle, and deliverable rubric for the folder-to-briefing workflow.",
    environment: "Files + compare-to-reference + export",
  },
  {
    title: "Runtime boundary lab",
    summary: "A safer sandbox for testing permission boundaries, logs, and rollback behavior before live runtime work.",
    environment: "Docker or simulated runtime + logs + reset",
  },
];

const labFeatures = [
  "Starter repos and seeded files",
  "Reset environment button",
  "Hints and compare-to-reference",
  "Tutor panel with path-aware context",
  "Export bundle when the artifact is complete",
];

export default function LabsPage() {
  return (
    <main className="page-shell py-12">
      <section className="panel p-6">
        <div className="eyebrow">Live Labs and terminal sandbox</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">A practice environment that behaves like a real builder workspace</h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-[var(--color-fg-muted)]">
          Live Labs are where the academy stops feeling like content and starts feeling like an operating environment.
          Each lab is designed around starter state, reset, hints, compare-to-reference, tutor help, and exportable
          artifacts that feed the spine project.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/learn" className="button-primary">
            Open the fast path
          </Link>
          <Link href="/workflow-studio" className="button-secondary">
            Open Workflow Studio
          </Link>
          <Link href="/runtime-lab" className="button-ghost">
            Open Runtime Lab
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="panel p-6">
          <div className="eyebrow">Core capabilities</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">What every academy lab should support</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-fg-muted)]">
            {labFeatures.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
        </article>

        <article className="panel p-6">
          <div className="eyebrow">Mode-aware support</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Guided, Hint-Based, Independent</h2>
          <p className="mt-4 text-sm leading-6 text-[var(--color-fg-muted)]">
            The same lab should support step-by-step coaching for new learners, checkpoints and nudges for advancing
            learners, and rubric-only validation for independent runs. The scaffolding fades, but the environment stays
            the same.
          </p>
        </article>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {labTracks.map((track) => (
          <article key={track.title} className="panel p-5">
            <div className="eyebrow">{track.environment}</div>
            <h2 className="mt-3 text-2xl font-semibold">{track.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{track.summary}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
