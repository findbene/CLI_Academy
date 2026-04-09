import { NextRequest, NextResponse } from "next/server";

type VerificationBody = {
  deliverable?: string;
  output?: string;
  verifyCheck?: string;
};

const STOPWORDS = new Set([
  "about",
  "above",
  "after",
  "agent",
  "and",
  "check",
  "complete",
  "deliverable",
  "from",
  "have",
  "into",
  "just",
  "lesson",
  "make",
  "output",
  "paste",
  "please",
  "review",
  "show",
  "that",
  "the",
  "then",
  "this",
  "verify",
  "with",
  "work",
  "your",
]);

function tokenize(text: string) {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length >= 4 && !STOPWORDS.has(token));
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as VerificationBody;
  const output = body.output?.trim() ?? "";

  if (output.length < 20) {
    return NextResponse.json(
      {
        message: "Add more concrete evidence. Paste at least one real command result, diff, or explanation.",
        ok: false,
      },
      { status: 200 },
    );
  }

  const guidanceText = `${body.deliverable ?? ""} ${body.verifyCheck ?? ""}`.trim();
  const expectedKeywords = [...new Set(tokenize(guidanceText))].slice(0, 8);
  const normalizedOutput = output.toLowerCase();
  const matchedKeywords = expectedKeywords.filter((keyword) => normalizedOutput.includes(keyword));
  const hasStructure = /\n/.test(output) || /[:\\/._-]/.test(output);
  const hasEnoughDetail = output.split(/\s+/).filter(Boolean).length >= 8;
  const passed = hasEnoughDetail && (matchedKeywords.length >= Math.min(2, expectedKeywords.length || 2) || hasStructure);

  if (passed) {
    const detail = matchedKeywords.length
      ? `Matched evidence: ${matchedKeywords.slice(0, 3).join(", ")}.`
      : "The submission includes structured evidence instead of a placeholder.";

    return NextResponse.json({
      message: `${detail} This looks specific enough to count as a real attempt.`,
      ok: true,
    });
  }

  const hint = expectedKeywords.length
    ? `Include evidence tied to: ${expectedKeywords.slice(0, 3).join(", ")}.`
    : "Include a command result, file path, diff summary, or short explanation of what changed.";

  return NextResponse.json({
    message: `${hint} Right now this looks too generic to verify confidently.`,
    ok: false,
  });
}