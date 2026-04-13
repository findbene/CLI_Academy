import { NextRequest, NextResponse } from "next/server";

type VerificationBody = {
  deliverable?: string;
  output?: string;
  rubricCriteria?: string[];
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
  const rubricCriteria = Array.isArray(body.rubricCriteria)
    ? body.rubricCriteria.filter((criterion): criterion is string => typeof criterion === "string" && criterion.trim().length > 0)
    : [];

  if (output.length < 20) {
    return NextResponse.json(
      {
        message: "Add more concrete evidence. Paste at least one real command result, diff, or explanation.",
        matchedCriteria: [] as string[],
        ok: false,
        score: 0,
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
  const matchedCriteria = rubricCriteria.filter((criterion) => {
    const criterionKeywords = tokenize(criterion);
    if (!criterionKeywords.length) {
      return false;
    }

    const criterionMatches = criterionKeywords.filter((keyword) => normalizedOutput.includes(keyword));
    return criterionMatches.length >= Math.min(2, criterionKeywords.length);
  });
  const totalChecks = Math.max(rubricCriteria.length || 0, 3);
  const evidenceScore = Math.min(40, matchedKeywords.length * 12 + (hasStructure ? 10 : 0) + (hasEnoughDetail ? 10 : 0));
  const rubricScore = rubricCriteria.length ? Math.round((matchedCriteria.length / rubricCriteria.length) * 60) : 35;
  const score = Math.min(100, evidenceScore + rubricScore);
  const passed = hasEnoughDetail && (matchedKeywords.length >= Math.min(2, expectedKeywords.length || 2) || hasStructure);

  if (passed) {
    const detail = matchedKeywords.length
      ? `Matched evidence: ${matchedKeywords.slice(0, 3).join(", ")}.`
      : "The submission includes structured evidence instead of a placeholder.";

    return NextResponse.json({
      matchedCriteria,
      message: `${detail} This looks specific enough to count as a real attempt.${rubricCriteria.length ? ` Mastery score: ${score}/${100}.` : ""}`,
      ok: true,
      score,
      totalChecks,
    });
  }

  const hint = expectedKeywords.length
    ? `Include evidence tied to: ${expectedKeywords.slice(0, 3).join(", ")}.`
    : "Include a command result, file path, diff summary, or short explanation of what changed.";

  return NextResponse.json({
    matchedCriteria,
    message: `${hint} Right now this looks too generic to verify confidently.${rubricCriteria.length ? ` Current score: ${score}/${100}.` : ""}`,
    ok: false,
    score,
    totalChecks,
  });
}
