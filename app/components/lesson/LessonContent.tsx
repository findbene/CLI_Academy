import { getLesson } from "@/lib/mdx";

interface LessonContentProps {
  pathSlug: string;
  lessonSlug: string;
}

function renderBlock(block: string, index: number) {
  const warnMatch = block.match(/^<WarnBlock title="([^"]+)">\s*([\s\S]*?)\s*<\/WarnBlock>$/);
  if (warnMatch) {
    return (
      <section key={index} className="callout" data-tone="warning">
        <h3>{warnMatch[1]}</h3>
        <p>{warnMatch[2].trim()}</p>
      </section>
    );
  }

  const tipMatch = block.match(/^<TipBlock(?: title="([^"]+)")?>\s*([\s\S]*?)\s*<\/TipBlock>$/);
  if (tipMatch) {
    return (
      <section key={index} className="callout" data-tone="tip">
        <h3>{tipMatch[1] || "Tip"}</h3>
        <p>{tipMatch[2].trim()}</p>
      </section>
    );
  }

  if (block.startsWith("```")) {
    return (
      <pre key={index}>
        <code>{block.replace(/^```[^\n]*\n?/, "").replace(/\n```$/, "")}</code>
      </pre>
    );
  }

  if (block.startsWith("## ")) {
    return <h2 key={index}>{block.slice(3).trim()}</h2>;
  }

  if (block.startsWith("### ")) {
    return <h3 key={index}>{block.slice(4).trim()}</h3>;
  }

  if (block.split("\n").every((line) => line.trim().startsWith("- "))) {
    return (
      <ul key={index}>
        {block
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => (
            <li key={line}>{line.replace(/^- /, "").trim()}</li>
          ))}
      </ul>
    );
  }

  return <p key={index}>{block}</p>;
}

export async function LessonContent({ pathSlug, lessonSlug }: LessonContentProps) {
  const lesson = await getLesson(pathSlug, lessonSlug);

  if (!lesson) {
    return (
      <div className="panel p-6">
        <h2 className="text-2xl font-semibold">Lesson recovery in progress</h2>
        <p className="mt-3 text-[var(--color-fg-muted)]">
          This lesson route has been restored, but the exact source file could not be loaded yet.
        </p>
      </div>
    );
  }

  const blocks = lesson.body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <article className="lesson-prose">
      {lesson.description ? <p>{lesson.description}</p> : null}
      {blocks.map((block, index) => renderBlock(block, index))}
    </article>
  );
}
