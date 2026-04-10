import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Workflow Studio",
  description:
    "Map planner-worker-reviewer agent flows, approvals, retrieval, tools, and schedules in CLI Academy's Workflow Studio shell.",
};

const workflowNodes = [
  "Trigger",
  "Claude task",
  "Cowork task",
  "Retriever",
  "Review gate",
  "Approval",
  "Scheduler",
  "Export bundle",
];

const workflowPatterns = [
  {
    title: "Planner → worker → reviewer",
    summary: "The default multi-agent pattern for bounded execution with clear accountability.",
  },
  {
    title: "Retrieval → synthesis → approval",
    summary: "A grounded workflow for knowledge work where evidence quality matters as much as final output quality.",
  },
  {
    title: "Message → runtime → human checkpoint",
    summary: "A safe starter flow for channel-triggered actions and bounded runtime operations.",
  },
];

export default function WorkflowStudioPage() {
  return (
    <main className="page-shell py-12">
      <section className="panel p-6">
        <div className="eyebrow">Workflow Studio</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">Design the workflow before you automate the workflow</h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-[var(--color-fg-muted)]">
          Workflow Studio is the orchestration surface for beginner-first agent systems. It frames work the way an
          operator needs to think: trigger, task, tool, review, approval, replay, and export.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/prompt-context-studio" className="button-primary">
            Open Prompt Studio
          </Link>
          <Link href="/labs" className="button-secondary">
            Launch Live Labs
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="panel p-6">
          <div className="eyebrow">Node set</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">The first workflow nodes the academy needs</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {workflowNodes.map((node) => (
              <div key={node} className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] px-4 py-3 text-sm font-medium">
                {node}
              </div>
            ))}
          </div>
        </article>

        <article className="panel p-6">
          <div className="eyebrow">Run model</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Run, step, replay, inspect</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-fg-muted)]">
            <li>• Step through a single node before trusting the full chain</li>
            <li>• Replay the workflow with a changed prompt, context packet, or approval gate</li>
            <li>• Export the flow as a builder asset for reuse in the spine project</li>
            <li>• Keep every automation path explainable to a beginner operator</li>
          </ul>
        </article>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {workflowPatterns.map((pattern) => (
          <article key={pattern.title} className="panel p-5">
            <h2 className="text-2xl font-semibold">{pattern.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{pattern.summary}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
