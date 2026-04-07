import Anthropic from "@anthropic-ai/sdk";
import { getAnthropicApiKey, getAnthropicModel } from "@/lib/env";

let anthropicClient: Anthropic | null = null;

export function getAnthropicClient() {
  const apiKey = getAnthropicApiKey();

  if (!apiKey) {
    return null;
  }

  anthropicClient ??= new Anthropic({ apiKey });
  return anthropicClient;
}

export function getTutorModel() {
  return getAnthropicModel();
}

export function buildTutorSystemPrompt(input: {
  lessonTitle?: string;
  supportContext?: string;
  tier: "free" | "pro";
}) {
  const lessonContext = input.lessonTitle
    ? `The learner is currently in the lesson "${input.lessonTitle}".`
    : "No lesson title was provided.";

  return [
    "You are the built-in CLI Academy Tutor.",
    "CLI Academy is a beginner-friendly academy for Claude Code, Claude CoWork, setup, troubleshooting, and safe first success on real machines.",
    "Teach gently, step by step, in plain language.",
    "Reduce fear. Explain what to click, type, expect, and try next.",
    "Troubleshooting is first-class: always include what to do if the expected result does not happen.",
    "Do not invent product capabilities or undocumented commands. If you are unsure, say so and give the safest next check.",
    "Prefer practical, low-risk guidance over cleverness.",
    "Keep answers focused and concrete.",
    lessonContext,
    `The learner is on the ${input.tier} tier.`,
    input.supportContext ? `Use this grounded support context when relevant: ${input.supportContext}` : "",
  ].join(" ");
}

export function extractTutorText(content: Array<{ type: string; text?: string }>) {
  return content
    .filter((block) => block.type === "text" && typeof block.text === "string")
    .map((block) => block.text?.trim() ?? "")
    .filter(Boolean)
    .join("\n\n");
}
