import { AcademyStandardsPanel } from "@/components/academy/AcademyStandardsPanel";
import { FlagshipCourseCard } from "@/components/academy/FlagshipCourseCard";
import { AssetVaultCard } from "@/components/assets/AssetVaultCard";
import { getAllLocalAssets } from "@/lib/assets";
import { CHAPTER_MEDIA_REQUIREMENTS, MASTERY_TRACKS, PROMPT_STUDIO_TRACKS } from "@/lib/academy";

export default function PromptContextStudioPage() {
  const studioAssets = getAllLocalAssets().filter((asset) =>
    [
      "prompt-context-studio-starter-pack",
      "builder-extension-pack-blueprint",
      "cost-engineering-multi-provider-playbook",
      "chapter-mini-notes-series",
    ].includes(asset.slug),
  );

  return (
    <main className="page-shell py-12">
      <section className="panel p-6">
        <div className="eyebrow">Prompt &amp; Context Studio</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">Prompt engineering is only half the job. Context, harnesses, and repair workflows complete it.</h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-[var(--color-fg-muted)]">
          This studio teaches prompting fundamentals, structured templates, context engineering, token discipline,
          Prompt Doctor workflows, and harness thinking as one connected system.
        </p>
      </section>

      <section id="fundamentals" className="mt-8 grid gap-4 xl:grid-cols-3">
        {PROMPT_STUDIO_TRACKS.map((course) => (
          <FlagshipCourseCard key={course.title} course={course} />
        ))}
      </section>

      <section id="mastery-track" className="mt-8">
        <div>
          <div className="eyebrow">Mastery track</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">Add cost, scaling, and multi-provider resilience after the capstone</h2>
        </div>
        <div className="mt-8 grid gap-4 xl:grid-cols-2">
          {MASTERY_TRACKS.map((course) => (
            <FlagshipCourseCard key={course.title} course={course} />
          ))}
        </div>
      </section>

      <section id="workflow-studio" className="mt-8 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <article id="context-track" className="panel p-6">
          <div className="eyebrow">Context track</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Move from prompts to well-bounded working context</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-fg-muted)]">
            <li>• Build context packets for code, Cowork, and runtime work</li>
            <li>• Budget tokens before prompts start to drift</li>
            <li>• Decide what belongs in retrieval, memory, or the prompt body</li>
          </ul>
        </article>

        <article id="prompt-doctor" className="panel p-6">
          <div className="eyebrow">Prompt Doctor seed</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Paste a rough prompt, get a stronger version, and understand why it improved</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-fg-muted)]">
            <li>• rewrite into task, XML, or reusable template variants</li>
            <li>• call out missing constraints and quality gaps</li>
            <li>• prepare prompts for evaluation harnesses instead of one-off luck</li>
          </ul>
        </article>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <article id="memory-track" className="panel p-6">
          <div className="eyebrow">Memory and persistence seed</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Persistent context should stay useful, reviewable, and easy to correct</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-fg-muted)]">
            <li>• decide what deserves memory versus what belongs in a session packet</li>
            <li>• create retention, correction, and overwrite rules</li>
            <li>• treat memory as auditable state, not magic background context</li>
          </ul>
        </article>

        <article id="rag-track" className="panel p-6">
          <div className="eyebrow">RAG seed</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Grounded answers, retrieval quality, and evidence-backed workflows</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-fg-muted)]">
            <li>• move from prompt-only answers to grounded responses over trusted documents</li>
            <li>• separate retrieval quality from final answer quality</li>
            <li>• prepare the bridge into RAG and Agentic RAG course tracks</li>
          </ul>
        </article>
      </section>

      <section className="mt-8">
        <div>
          <div className="eyebrow">Studio assets</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">Start with reusable prompt and context packs</h2>
        </div>
        <div className="mt-8 grid gap-4 xl:grid-cols-2">
          {studioAssets.map((asset) => (
            <AssetVaultCard key={asset.slug} asset={asset} />
          ))}
        </div>
      </section>

      <div className="mt-8">
        <AcademyStandardsPanel
          standards={CHAPTER_MEDIA_REQUIREMENTS}
          eyebrow="Studio standard"
          title="Prompt and context lessons stay visual, printable, and beginner-readable"
        />
      </div>
    </main>
  );
}
