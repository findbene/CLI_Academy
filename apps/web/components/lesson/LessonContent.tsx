import Link from "next/link";
import { Fragment } from "react";
import { buildAssetDownloadHref, getAssetBySlug, getAssetFormatLabel } from "@/lib/assets";
import { CodeBlock } from "@/components/lesson/CodeBlock";
import { DiagramBlock } from "@/components/content/DiagramBlock";
import { VerificationBlock } from "@/components/lesson/VerificationBlock";
import { getLesson } from "@/lib/mdx";

interface LessonContentProps {
  initialMastery?: { matchedCriteria: string[]; score: number } | null;
  pathSlug: string;
  lessonSlug: string;
  rubricCriteria?: string[];
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function renderInlineContent(text: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);

  return parts.map((part, index) => {
    const codeMatch = part.match(/^`([^`]+)`$/);
    if (codeMatch) {
      return <code key={index}>{codeMatch[1]}</code>;
    }

    const strongMatch = part.match(/^\*\*([\s\S]+)\*\*$/);
    if (strongMatch) {
      return <strong key={index}>{strongMatch[1]}</strong>;
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const external = href.startsWith("http://") || href.startsWith("https://");

      return (
        <a
          key={index}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
        >
          {label}
        </a>
      );
    }

    return <Fragment key={index}>{part}</Fragment>;
  });
}

function isTableBlock(lines: string[]) {
  return (
    lines.length >= 2 &&
    /^\|.*\|$/.test(lines[0].trim()) &&
    /^\|?(\s*:?-{3,}:?\s*\|)+\s*$/.test(lines[1].trim())
  );
}

function splitLessonBlocks(body: string) {
  const blocks: string[] = [];
  const currentBlock: string[] = [];
  let inCodeFence = false;
  // Track when we are inside an open-form VerificationBlock so that empty
  // lines between the opening tag and </VerificationBlock> don't cause a split.
  let inVerificationBlock = false;

  for (const line of body.split("\n")) {
    const trimmedLine = line.trim();
    const isCodeFence = trimmedLine.startsWith("```");

    if (isCodeFence) {
      currentBlock.push(line);
      inCodeFence = !inCodeFence;
      continue;
    }

    if (!inCodeFence) {
      // Detect the start of a VerificationBlock (first line of a multi-line component)
      if (trimmedLine.startsWith("<VerificationBlock")) {
        inVerificationBlock = true;
      }

      if (inVerificationBlock) {
        // Self-closing form ends on the line that contains only "/>"
        if (trimmedLine === "/>") {
          inVerificationBlock = false;
          currentBlock.push(line);
          blocks.push(currentBlock.join("\n").trim());
          currentBlock.length = 0;
          continue;
        }
        // Open-close form ends on the closing tag line
        if (trimmedLine === "</VerificationBlock>") {
          inVerificationBlock = false;
          currentBlock.push(line);
          blocks.push(currentBlock.join("\n").trim());
          currentBlock.length = 0;
          continue;
        }
      }
    }

    if (!inCodeFence && !inVerificationBlock && trimmedLine === "") {
      if (currentBlock.length) {
        blocks.push(currentBlock.join("\n").trim());
        currentBlock.length = 0;
      }
      continue;
    }

    currentBlock.push(line);
  }

  if (currentBlock.length) {
    blocks.push(currentBlock.join("\n").trim());
  }

  return blocks.filter(Boolean);
}

/** Extract the rubricCriteria string array from a VerificationBlock MDX block. */
function extractMdxRubricCriteria(block: string): string[] {
  const arrayMatch = block.match(/rubricCriteria=\{\[([\s\S]*?)\]\}/);
  if (!arrayMatch) return [];
  const criteria: string[] = [];
  const itemRegex = /"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = itemRegex.exec(arrayMatch[1])) !== null) {
    criteria.push(m[1]);
  }
  return criteria;
}

/**
 * Extract a plain-text verification task from the children of an open-close
 * VerificationBlock. Returns the first non-empty text paragraph (ignoring code
 * blocks and blank lines) so it can be displayed as the verifyCheck label.
 */
function extractVerifyCheckFromChildren(block: string): string | undefined {
  const childrenMatch = block.match(/>\s*([\s\S]*?)\s*<\/VerificationBlock>/);
  if (!childrenMatch) return undefined;
  const children = childrenMatch[1];
  // Strip code fences and their content
  const stripped = children.replace(/```[\s\S]*?```/g, "").trim();
  // Return the first non-empty line as the task description
  const firstLine = stripped
    .split("\n")
    .map((l) => l.trim())
    .find((l) => l.length > 0);
  return firstLine ?? undefined;
}

function renderBlock(
  block: string,
  index: number,
  context?: {
    initialMastery?: { matchedCriteria: string[]; score: number } | null;
    lessonSlug: string;
    pathSlug: string;
    rubricCriteria?: string[];
  },
) {
  const warnMatch = block.match(/^<WarnBlock title="([^"]+)">\s*([\s\S]*?)\s*<\/WarnBlock>$/);
  if (warnMatch) {
    return (
      <section key={index} className="callout" data-tone="warning">
        <h3>{warnMatch[1]}</h3>
        <p>{renderInlineContent(warnMatch[2].trim())}</p>
      </section>
    );
  }

  const tipMatch = block.match(/^<TipBlock(?: title="([^"]+)")?>\s*([\s\S]*?)\s*<\/TipBlock>$/);
  if (tipMatch) {
    return (
      <section key={index} className="callout" data-tone="tip">
        <h3>{tipMatch[1] || "Tip"}</h3>
        <p>{renderInlineContent(tipMatch[2].trim())}</p>
      </section>
    );
  }

  const downloadCardMatch = block.match(/^<DownloadCard slug="([^"]+)"(?: title="([^"]+)")?\s*\/>$/);
  if (downloadCardMatch) {
    const asset = getAssetBySlug(downloadCardMatch[1]);
    if (!asset) {
      return null;
    }

    return (
      <section key={index} className="panel p-5">
        <div className="flex flex-wrap gap-2">
          {asset.formats.map((variant) => (
            <span key={`${asset.slug}-${variant.format}`} className="badge" data-tone="accent">
              {getAssetFormatLabel(variant.format)}
            </span>
          ))}
          <span className="badge" data-tone={asset.tier === "free" ? "accent" : "warning"}>
            {asset.tier === "free" ? "Free" : "Pro"}
          </span>
        </div>
        <h3 className="mt-4 text-xl font-semibold">{downloadCardMatch[2] || asset.title}</h3>
        <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{asset.summary}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {asset.formats.map((variant, variantIndex) => (
            <a
              key={`${asset.slug}-${variant.format}-download`}
              href={buildAssetDownloadHref(asset.slug, variant.format)}
              className={variantIndex === 0 ? "button-primary" : "button-secondary"}
            >
              Download {getAssetFormatLabel(variant.format)}
            </a>
          ))}
          <Link href="/downloads" className="button-ghost">
            More downloads
          </Link>
        </div>
      </section>
    );
  }

  const diagramMatch = block.match(/<DiagramBlock[\s\S]*?src="([^"]*)"[\s\S]*?alt="([^"]*)"(?:[\s\S]*?caption="([^"]*)")?[\s\S]*?\/>/);
  if (diagramMatch) {
    return (
      <DiagramBlock
        key={index}
        src={diagramMatch[1]}
        alt={diagramMatch[2]}
        caption={diagramMatch[3]}
      />
    );
  }

  // Render any block that opens with <VerificationBlock.
  // Handles three formats used across the curriculum:
  //   1. Self-closing with deliverable + verifyCheck + rubricCriteria
  //   2. Open-close with deliverable + verifyCheck + rubricCriteria + children
  //   3. Open-close with rubricCriteria + children only (no deliverable/verifyCheck)
  if (block.startsWith("<VerificationBlock")) {
    const deliverableMatch = block.match(/deliverable="([^"]*)"/);
    const verifyCheckMatch = block.match(/verifyCheck="([^"]*)"/);
    // Prefer rubricCriteria embedded in the MDX over the generic academy rubric.
    const mdxRubric = extractMdxRubricCriteria(block);
    // For open-close blocks without verifyCheck, extract a summary from children.
    const childrenVerifyCheck = verifyCheckMatch ? undefined : extractVerifyCheckFromChildren(block);
    return (
      <VerificationBlock
        key={index}
        deliverable={deliverableMatch?.[1]}
        initialMastery={context?.initialMastery}
        lessonSlug={context?.lessonSlug}
        pathSlug={context?.pathSlug}
        rubricCriteria={mdxRubric.length ? mdxRubric : context?.rubricCriteria}
        verifyCheck={verifyCheckMatch?.[1] ?? childrenVerifyCheck}
      />
    );
  }

  if (block.startsWith("```")) {
    const langMatch = block.match(/^```(\w+)/);
    const language = langMatch?.[1] ?? undefined;
    const code = block.replace(/^```[^\n]*\n?/, "").replace(/\n```$/, "");

    return <CodeBlock key={index} language={language}>{code}</CodeBlock>;
  }

  if (block === "---") {
    return <hr key={index} className="my-6 border-[var(--color-border)]" />;
  }

  if (block.startsWith("## ")) {
    const heading = block.slice(3).trim();
    return <h2 key={index} id={slugifyHeading(heading)}>{heading}</h2>;
  }

  if (block.startsWith("### ")) {
    const heading = block.slice(4).trim();
    return <h3 key={index} id={slugifyHeading(heading)}>{heading}</h3>;
  }

  if (block.split("\n").every((line) => line.trim().startsWith("- "))) {
    return (
      <ul key={index}>
        {block
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line, lineIndex) => (
            <li key={`${index}-${lineIndex}`}>{renderInlineContent(line.replace(/^- /, "").trim())}</li>
          ))}
      </ul>
    );
  }

  if (block.split("\n").every((line) => /^\d+\.\s/.test(line.trim()))) {
    return (
      <ol key={index}>
        {block
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line, lineIndex) => (
            <li key={`${index}-${lineIndex}`}>{renderInlineContent(line.replace(/^\d+\.\s/, "").trim())}</li>
          ))}
      </ol>
    );
  }

  const lines = block.split("\n").map((line) => line.trim());
  if (isTableBlock(lines)) {
    const header = lines[0]
      .split("|")
      .map((cell) => cell.trim())
      .filter(Boolean);
    const rows = lines.slice(2).map((line) =>
      line
        .split("|")
        .map((cell) => cell.trim())
        .filter(Boolean),
    );

    return (
      <div key={index} className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {header.map((cell) => (
                <th key={`${index}-${cell}`} className="border-b border-[var(--color-border)] px-3 py-2 text-left font-semibold">
                  {renderInlineContent(cell)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`${index}-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${index}-${rowIndex}-${cellIndex}`}
                    className="border-b border-[var(--color-border)] px-3 py-2 align-top text-[var(--color-fg-muted)]"
                  >
                    {renderInlineContent(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <p key={index}>{renderInlineContent(block)}</p>;
}

export async function LessonContent({ initialMastery = null, pathSlug, lessonSlug, rubricCriteria }: LessonContentProps) {
  const lesson = await getLesson(pathSlug, lessonSlug);

  if (!lesson) {
    return (
      <div className="panel p-6">
        <h2 className="text-2xl font-semibold">Lesson not available</h2>
        <p className="mt-3 text-[var(--color-fg-muted)]">
          This lesson could not be loaded. It may not be published yet or the content file is missing.
        </p>
      </div>
    );
  }

  const blocks = splitLessonBlocks(lesson.body);

  return (
    <article className="lesson-prose" data-lesson-body>
      {lesson.description ? <p>{lesson.description}</p> : null}
      {blocks.map((block, index) =>
        renderBlock(block, index, { initialMastery, lessonSlug, pathSlug, rubricCriteria }),
      )}
    </article>
  );
}
