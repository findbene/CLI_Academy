import { NextResponse } from "next/server";
import { buildTutorSupportContext } from "@/lib/support";
import { applySupabaseHeaders, createSupabaseServerClient } from "@/lib/supabase/server";
import { isTrustedWriteOrigin } from "@/lib/security/request-origin";
import {
  FREE_DAILY_TUTOR_LIMIT,
  getTutorModeDefinition,
  isTutorMode,
  isTutorModeAllowed,
  mapLearningModeToTutorMode,
  PRO_DAILY_TUTOR_LIMIT,
  type TutorMode,
} from "@/lib/tutor-config";
import { buildTutorSystemPrompt, getAnthropicClient, getTutorModel } from "@/lib/tutor";

const encoder = new TextEncoder();

function resolveTierAndLimit(profileTier?: string | null): { tier: "free" | "pro"; dailyLimit: number } {
  const tier = profileTier === "pro" ? "pro" : "free";
  return { tier, dailyLimit: tier === "pro" ? PRO_DAILY_TUTOR_LIMIT : FREE_DAILY_TUTOR_LIMIT };
}

function sse(payload: unknown) {
  return encoder.encode(`data: ${JSON.stringify(payload)}\n\n`);
}

function streamFallback(text: string, responseHeaders?: Headers) {
  const normalized = text.trim() || "I could not generate a useful answer just yet.";

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(sse({ type: "delta", text: normalized }));
      controller.enqueue(sse({ type: "done" }));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  const response = new Response(stream, {
    headers: {
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Content-Type": "text/event-stream",
      "X-Accel-Buffering": "no",
    },
  });

  if (responseHeaders) {
    return applySupabaseHeaders(response, responseHeaders);
  }

  return response;
}

export async function GET() {
  const supabaseContext = await createSupabaseServerClient();

  if (!supabaseContext) {
    return NextResponse.json({
      configured: false,
      dailyLimit: null,
      remaining: null,
      signedIn: false,
      tier: null,
    });
  }

  const {
    data: { user },
  } = await supabaseContext.supabase.auth.getUser();

  if (!user) {
    const response = NextResponse.json({
      configured: true,
      dailyLimit: null,
      remaining: null,
      signedIn: false,
      tier: null,
    });

    return applySupabaseHeaders(response, supabaseContext.responseHeaders);
  }

  const { data: profile } = await supabaseContext.supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .maybeSingle();

  const { tier, dailyLimit } = resolveTierAndLimit(profile?.tier);
  const today = new Date().toISOString().slice(0, 10);

  const { data: usage } = await supabaseContext.supabase
    .from("tutor_usage")
    .select("message_count")
    .eq("user_id", user.id)
    .eq("used_at", today)
    .maybeSingle();

  const response = NextResponse.json({
    configured: true,
    dailyLimit,
    remaining: Math.max(0, dailyLimit - (usage?.message_count ?? 0)),
    signedIn: true,
    tier,
  });

  return applySupabaseHeaders(response, supabaseContext.responseHeaders);
}

export async function POST(request: Request) {
  if (!isTrustedWriteOrigin(request)) {
    return NextResponse.json(
      {
        message: "Invalid request origin.",
        ok: false,
      },
      { status: 400 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as {
    lessonTitle?: string;
    message?: string;
    tutorPreload?: string;
    learningMode?: string;
    tutorMode?: TutorMode;
    conversationHistory?: Array<{ role: "user" | "assistant"; content: string }>;
    rubricCriteria?: string[];
    deliverable?: string;
    groupId?: string;
    clawClassification?: string;
    tutorGuideMode?: boolean;
  };

  const question = body.message?.trim();
  if (!question) {
    return NextResponse.json(
      {
        message: "Please enter a question for the tutor.",
        ok: false,
      },
      { status: 400 },
    );
  }

  if (question.length > 2000) {
    return NextResponse.json(
      {
        message: "Question exceeds the 2 000‑character limit.",
        ok: false,
      },
      { status: 400 },
    );
  }

  const lessonTitle = body.lessonTitle?.trim()?.slice(0, 200);

  const supabaseContext = await createSupabaseServerClient();
  if (!supabaseContext) {
    return NextResponse.json(
      {
        message: "Tutor configuration is incomplete. Add the Supabase public keys first.",
        ok: false,
      },
      { status: 503 },
    );
  }

  const {
    data: { user },
  } = await supabaseContext.supabase.auth.getUser();

  if (!user) {
    const response = NextResponse.json(
      {
        message: "Sign in to use the tutor and keep your usage synced across lessons.",
        ok: false,
      },
      { status: 401 },
    );

    return applySupabaseHeaders(response, supabaseContext.responseHeaders);
  }

  const { data: profile } = await supabaseContext.supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .maybeSingle();

  const { tier, dailyLimit } = resolveTierAndLimit(profile?.tier);
  const today = new Date().toISOString().slice(0, 10);
  const tutorMode = isTutorMode(body.tutorMode)
    ? body.tutorMode
    : mapLearningModeToTutorMode(body.learningMode);

  if (!isTutorModeAllowed(tutorMode, tier)) {
    const modeMeta = getTutorModeDefinition(tutorMode);
    const response = NextResponse.json(
      {
        message: `${modeMeta.label} mode is available on the Pro plan. Choose a free tutor mode or upgrade for deeper planning help.`,
        ok: false,
      },
      { status: 403 },
    );

    return applySupabaseHeaders(response, supabaseContext.responseHeaders);
  }

  const { data: usage } = await supabaseContext.supabase
    .from("tutor_usage")
    .select("message_count")
    .eq("user_id", user.id)
    .eq("used_at", today)
    .maybeSingle();

  const usedCount = usage?.message_count ?? 0;
  if (usedCount >= dailyLimit) {
    const response = NextResponse.json(
      {
        message: `You have reached today's tutor limit for the ${tier} plan.`,
        ok: false,
      },
      { status: 429 },
    );

    return applySupabaseHeaders(response, supabaseContext.responseHeaders);
  }

  await supabaseContext.supabase.from("tutor_usage").upsert(
    {
      message_count: usedCount + 1,
      used_at: today,
      user_id: user.id,
    },
    { onConflict: "user_id,used_at" },
  );

  const anthropic = getAnthropicClient();
  const supportContext = buildTutorSupportContext(question, lessonTitle);
  if (!anthropic) {
    const fallback =
      `Tutor live mode is almost ready, but the Anthropic API key is missing. ` +
      `${lessonTitle ? `Lesson context: ${lessonTitle}. ` : ""}` +
      `Start with the current lesson steps, verify each expected output before moving on, ` +
      `and if something fails, compare the command, shell, working directory, and file paths first.`;

    return streamFallback(fallback, supabaseContext.responseHeaders);
  }

  try {
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const messageHistory = [
            ...(body.conversationHistory ?? []).slice(-9).map((turn) => ({
              role: turn.role as "user" | "assistant",
              content: turn.content,
            })),
            { role: "user" as const, content: question },
          ];

          const anthropicStream = anthropic.messages.stream({
            max_tokens: 900,
            messages: messageHistory,
            model: getTutorModel(),
            system: buildTutorSystemPrompt({
              clawClassification: body.clawClassification,
              deliverable: body.deliverable,
              groupId: body.groupId,
              learningMode: body.learningMode,
              lessonTitle,
              rubricCriteria: body.rubricCriteria,
              supportContext,
              tier,
              tutorGuideMode: body.tutorGuideMode,
              tutorMode,
              tutorPreload: body.tutorPreload,
            }),
          });

          for await (const event of anthropicStream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(sse({ type: "delta", text: event.delta.text }));
            }
          }

          controller.enqueue(sse({ type: "done" }));
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } catch (err) {
          console.error("[tutor] Anthropic stream error:", err);
          controller.enqueue(
            sse({
              type: "delta",
              text: "The tutor is temporarily having trouble reaching the model provider. Try again in a moment.",
            }),
          );
          controller.enqueue(sse({ type: "done" }));
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } finally {
          controller.close();
        }
      },
    });

    const response = new Response(stream, {
      headers: {
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "X-Accel-Buffering": "no",
      },
    });

    await supabaseContext.supabase.from("app_events").insert({
      event_data: {
        lesson_title: lessonTitle ?? null,
        model: getTutorModel(),
        tutor_mode: tutorMode,
      },
      event_type: "tutor_message",
      user_id: user.id,
    });

    return applySupabaseHeaders(response, supabaseContext.responseHeaders);
  } catch (err) {
    console.error("[tutor] Anthropic request failed:", err);

    const fallback =
      "The tutor is temporarily having trouble reaching the model provider. " +
      "Stay with the current lesson, check the troubleshooting path, and try again in a moment.";

    return streamFallback(fallback, supabaseContext.responseHeaders);
  }
}
