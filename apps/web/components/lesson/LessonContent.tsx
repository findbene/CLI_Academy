import Link from "next/link";
import { Fragment } from "react";
import { buildAssetDownloadHref, getAssetBySlug, getAssetFormatLabel } from "@/lib/assets";
import { CodeBlock } from "@/components/lesson/CodeBlock";
import { LessonStepCard, type LessonStepMeta, type LessonStepSupport } from "@/components/lesson/LessonStepCard";
import { VerificationBlock } from "@/components/lesson/VerificationBlock";
import { getLesson } from "@/lib/mdx";

interface LessonContentProps {
  pathSlug: string;
  lessonSlug: string;
}

type LessonSectionKind = "objective" | "reference" | "verification" | "walkthrough";

interface LessonSection {
  blocks: string[];
  kind: LessonSectionKind;
  slug: string;
  title: string;
}

interface LessonStep {
  blocks: string[];
  meta?: LessonStepMeta;
  title: string;
  tone: "default" | "warning";
}

function parseStepMeta(block: string): LessonStepMeta | null {
  const match = block.match(/^<StepMeta\b([\s\S]*?)\/>$/);
  if (!match) {
    return null;
  }

  const attributes = new Map<string, string>();
  const attributePattern = /([A-Za-z][A-Za-z0-9]*)="([^"]*)"/g;

  for (const attributeMatch of match[1].matchAll(attributePattern)) {
    attributes.set(attributeMatch[1], attributeMatch[2].trim());
  }

  const meta: LessonStepMeta = {
    action: attributes.get("action") ?? "",
    askTutor: attributes.get("askTutor") ?? "",
    expectedResult: attributes.get("expectedResult") ?? "",
    nextStep: attributes.get("nextStep") ?? "",
    purpose: attributes.get("purpose") ?? "",
    whyItMatters: attributes.get("whyItMatters") ?? "",
  };

  if (Object.values(meta).some((value) => !value)) {
    return null;
  }

  return meta;
}

function stripInlineMarkdown(text: string) {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getPlainTextBlock(block: string) {
  if (block.startsWith("```") || block.startsWith("<") || block.startsWith("#") || block === "---") {
    return null;
  }

  const trimmedLines = block.split("\n").map((line) => line.trim()).filter(Boolean);
  if (!trimmedLines.length) {
    return null;
  }

  if (trimmedLines.every((line) => line.startsWith("- ")) || trimmedLines.every((line) => /^\d+\.\s/.test(line))) {
    return null;
  }

  if (isTableBlock(trimmedLines)) {
    return null;
  }

  const platformLabelMatch = block.match(/^\*\*([^*]+?)\*\*\s*$/);
  if (platformLabelMatch) {
    return null;
  }

  return stripInlineMarkdown(trimmedLines.join(" "));
}

function inferStepSupport(
  lessonTitle: string,
  stepTitle: string,
  blocks: string[],
  nextStepTitle?: string,
): LessonStepSupport {
  const paragraphs = blocks.map(getPlainTextBlock).filter((value): value is string => Boolean(value));
  const action = paragraphs[0] ?? `Complete this step: ${stepTitle}.`;
  const expectedResult =
    paragraphs.find((paragraph, index) =>
      index > 0 && /^(you|the file|the terminal|the command|git|output|your prompt)\b/i.test(paragraph),
    ) ?? undefined;

  return {
    action,
    askTutor: `I'm on the step "${stepTitle}" in the lesson "${lessonTitle}". Help me understand what to do, what result I should expect, and the safest way to continue from here.`,
    expectedResult,
    nextStep: nextStepTitle ? `After this step, continue to ${nextStepTitle}.` : undefined,
    schemaStatus: "inferred",
  };
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

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

function getSectionKind(title: string): LessonSectionKind {
  const normalizedTitle = title.trim().toLowerCase();

  if (normalizedTitle.includes("objective")) {
    return "objective";
  }

  if (normalizedTitle.includes("walkthrough")) {
    return "walkthrough";
  }

  if (normalizedTitle.includes("verify")) {
    return "verification";
  }

  return "reference";
}

function getSectionKicker(kind: LessonSectionKind) {
  if (kind === "objective") {
    return "Learning outcome";
  }

  if (kind === "walkthrough") {
    return "Do the work";
  }

  if (kind === "verification") {
    return "Check your result";
  }

  return "Keep in view";
}

function getSectionSummary(kind: LessonSectionKind) {
  if (kind === "objective") {
    return "Start by understanding what you should be able to do by the end of this lesson.";
  }

  if (kind === "walkthrough") {
    return "Work through each step in order. Pause when something looks unfamiliar and verify before moving on.";
  }

  if (kind === "verification") {
    return "Use this check to confirm you produced the right artifact and can explain what happened.";
  }

  return "Keep this section nearby while you work. It provides the context you will refer back to during the lesson.";
}

function normalizeLessonBlocks(blocks: string[], lessonTitle: string) {
  if (!blocks.length) {
    return blocks;
  }

  const firstBlock = blocks[0].trim();
  if (firstBlock.startsWith("# ") && firstBlock.slice(2).trim().toLowerCase() === lessonTitle.trim().toLowerCase()) {
    return blocks.slice(1);
  }

  return blocks;
}

function splitVerificationBlocks(blocks: string[]) {
  const contentBlocks: string[] = [];
  const verificationBlocks: string[] = [];

  for (const block of blocks) {
    if (block.includes("<VerificationBlock")) {
      verificationBlocks.push(block);
      continue;
    }

    contentBlocks.push(block);
  }

  return { contentBlocks, verificationBlocks };
}

function groupLessonSections(blocks: string[]) {
  const sections: LessonSection[] = [];
  let currentSection: LessonSection | null = null;

  for (const block of blocks) {
    if (block.startsWith("## ")) {
      if (currentSection) {
        sections.push(currentSection);
      }

      const title = block.slice(3).trim();
      currentSection = {
        blocks: [],
        kind: getSectionKind(title),
        slug: slugify(title),
        title,
      };
      continue;
    }

    if (!currentSection) {
      currentSection = {
        blocks: [],
        kind: "reference",
        slug: "overview",
        title: "Overview",
      };
    }

    currentSection.blocks.push(block);
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

function groupWalkthroughBlocks(blocks: string[]) {
  const leadBlocks: string[] = [];
  const steps: LessonStep[] = [];
  let currentStep: LessonStep | null = null;

  for (const block of blocks) {
    if (block.startsWith("### ")) {
      if (currentStep) {
        steps.push(currentStep);
      }

      const title = block.slice(4).trim();
      currentStep = {
        blocks: [],
        title,
        tone: title.trim().toLowerCase().includes("what can go wrong") ? "warning" : "default",
      };
      continue;
    }

    const stepMeta = parseStepMeta(block);
    if (stepMeta && currentStep) {
      currentStep.meta = stepMeta;
      continue;
    }

    if (!currentStep) {
      leadBlocks.push(block);
      continue;
    }

    currentStep.blocks.push(block);
  }

  if (currentStep) {
    steps.push(currentStep);
  }

  return { leadBlocks, steps };
}

function getStepLabel(stepTitle: string, stepIndex: number) {
  const match = stepTitle.match(/^Step\s+(\d+)\s+[—-]\s+(.+)$/i);
  if (match) {
    return {
      badge: `Step ${match[1]}`,
      title: match[2].trim(),
    };
  }

  if (stepTitle.trim().toLowerCase().includes("what can go wrong")) {
    return {
      badge: "Troubleshooting",
      title: stepTitle.trim(),
    };
  }

  return {
    badge: `Step ${stepIndex + 1}`,
    title: stepTitle.trim(),
  };
}

function splitLessonBlocks(body: string) {
  const blocks: string[] = [];
  const currentBlock: string[] = [];
  let inCodeFence = false;

  for (const line of body.split("\n")) {
    const trimmedLine = line.trim();
    const isCodeFence = trimmedLine.startsWith("```");

    if (isCodeFence) {
      if (!inCodeFence && currentBlock.length) {
        blocks.push(currentBlock.join("\n").trim());
        currentBlock.length = 0;
      }

      currentBlock.push(line);
      inCodeFence = !inCodeFence;

      if (!inCodeFence) {
        blocks.push(currentBlock.join("\n").trim());
        currentBlock.length = 0;
      }

      continue;
    }

    if (!inCodeFence && trimmedLine === "") {
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

function renderContentBlock(block: string, index: number) {
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

  const blockQuoteLines = block.split("\n").map((line) => line.trim());
  if (blockQuoteLines.every((line) => line.startsWith(">"))) {
    const quoteContent = blockQuoteLines.map((line) => line.replace(/^>\s?/, "")).join(" ").trim();
    const quoteTitleMatch = quoteContent.match(/^\*\*([^*]+)\*\*\s*(.*)$/);
    const quoteTitle = quoteTitleMatch?.[1].trim();
    const quoteBody = (quoteTitleMatch?.[2].trim() || quoteContent).trim();
    const warningTone = /danger|warning|caution/i.test(quoteTitle ?? quoteBody) ? "warning" : "tip";

    return (
      <section key={index} className="lesson-blockquote" data-tone={warningTone === "warning" ? "warning" : undefined}>
        {quoteTitle ? <h3 className="lesson-blockquote-title">{quoteTitle}</h3> : null}
        <p>{renderInlineContent(quoteBody)}</p>
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

  const verifyMatch = block.match(/<VerificationBlock[\s\S]*?deliverable="([^"]*)"[\s\S]*?verifyCheck="([^"]*)"[\s\S]*?\/>/);
  if (verifyMatch) {
    return <VerificationBlock key={index} deliverable={verifyMatch[1]} verifyCheck={verifyMatch[2]} />;
  }

  if (block.startsWith("```")) {
    const langMatch = block.match(/^```(\w+)/);
    const language = langMatch?.[1] ?? undefined;
    const code = block.replace(/^```[^\n]*\n?/, "").replace(/\n```$/, "");

    return <CodeBlock key={index} language={language}>{code}</CodeBlock>;
  }

  if (block === "---") {
    return <hr key={index} className="my-2 border-[var(--color-border-subtle)]" />;
  }

  if (block.startsWith("# ")) {
    return null;
  }

  if (block.startsWith("## ")) {
    return <h3 key={index}>{block.slice(3).trim()}</h3>;
  }

  if (block.startsWith("### ")) {
    return <h3 key={index}>{block.slice(4).trim()}</h3>;
  }

  const platformLabelMatch = block.match(/^\*\*([^*]+?)\*\*\s*$/);
  if (platformLabelMatch) {
    return <div key={index} className="lesson-platform-label">{platformLabelMatch[1].trim().replace(/:$/, "")}</div>;
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
      <div key={index} className="lesson-table-wrapper">
        <table className="lesson-table">
          <thead>
            <tr>
              {header.map((cell) => (
                <th key={`${index}-${cell}`}>
                  {renderInlineContent(cell)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`${index}-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`${index}-${rowIndex}-${cellIndex}`}>
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

function renderModule(
  section: LessonSection,
  content: React.ReactNode,
  key: string,
) {
  return (
    <section key={key} className="lesson-module" data-kind={section.kind}>
      <div className="lesson-module-header">
        <span className="lesson-module-kicker">{getSectionKicker(section.kind)}</span>
        <div className="lesson-module-heading">
          <h2 id={section.slug} data-lesson-section-heading>
            {section.title}
          </h2>
          <p className="lesson-module-summary">{getSectionSummary(section.kind)}</p>
        </div>
      </div>
      <div className="lesson-module-content">{content}</div>
    </section>
  );
}

function renderWalkthroughSection(section: LessonSection, sectionIndex: number, lessonTitle: string) {
  const { leadBlocks, steps } = groupWalkthroughBlocks(section.blocks);

  return renderModule(
    section,
    <>
      {leadBlocks.map((block, index) => renderContentBlock(block, sectionIndex * 100 + index))}
      {steps.map((step, stepIndex) => {
        const label = getStepLabel(step.title, stepIndex);
        const nextLabel = steps[stepIndex + 1] ? getStepLabel(steps[stepIndex + 1].title, stepIndex + 1) : null;
        const support: LessonStepSupport = step.meta
          ? {
              action: step.meta.action,
              askTutor: step.meta.askTutor,
              expectedResult: step.meta.expectedResult,
              nextStep: step.meta.nextStep,
              schemaStatus: "explicit",
            }
          : inferStepSupport(lessonTitle, label.title, step.blocks, nextLabel?.title);

        return (
          <LessonStepCard
            key={`${section.slug}-step-${stepIndex}`}
            badge={label.badge}
            meta={step.meta}
            support={support}
            title={label.title}
            tone={step.tone}
          >
            {step.blocks.map((block, blockIndex) =>
              renderContentBlock(block, sectionIndex * 1000 + stepIndex * 100 + blockIndex),
            )}
          </LessonStepCard>
        );
      })}
    </>,
    `${section.slug}-module`,
  );
}

function renderLessonSection(section: LessonSection, sectionIndex: number) {
  if (section.kind === "walkthrough") {
    throw new Error("Walkthrough sections require lesson context.");
  }

  return renderModule(
    section,
    <>
      {section.blocks.map((block, index) => renderContentBlock(block, sectionIndex * 100 + index))}
    </>,
    `${section.slug}-module`,
  );
}

export async function LessonContent({ pathSlug, lessonSlug }: LessonContentProps) {
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

  const normalizedBlocks = normalizeLessonBlocks(splitLessonBlocks(lesson.body), lesson.title);
  const { contentBlocks, verificationBlocks } = splitVerificationBlocks(normalizedBlocks);
  const sections = groupLessonSections(contentBlocks);
  const verificationSection: LessonSection | null = verificationBlocks.length
    ? {
        blocks: verificationBlocks,
        kind: "verification",
        slug: "verify-your-result",
        title: "Verify your result",
      }
    : null;

  return (
    <article className="lesson-prose" data-lesson-body>
      {lesson.description ? (
        <section className="lesson-intro">
          <span className="lesson-module-kicker">Lesson overview</span>
          <p>{lesson.description}</p>
        </section>
      ) : null}
      {sections.map((section, index) =>
        section.kind === "walkthrough"
          ? renderWalkthroughSection(section, index, lesson.title)
          : renderLessonSection(section, index),
      )}
      {verificationSection
        ? renderModule(
            verificationSection,
            <>{verificationBlocks.map((block, index) => renderContentBlock(block, 10000 + index))}</>,
            verificationSection.slug,
          )
        : null}
    </article>
  );
}
