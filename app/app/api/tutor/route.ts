import { NextResponse } from "next/server";
import { buildTutorSupportContext } from "@/lib/support";
import { applySupabaseHeaders, createSupabaseServerClient } from "@/lib/supabase/server";
import { buildTutorSystemPrompt, getAnthropicClient, getTutorModel } from "@/lib/tutor";

const encoder = new TextEncoder();

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

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    lessonTitle?: string;
    message?: string;
    tutorPreload?: string;
    learningMode?: string;
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

  const tier = profile?.tier === "pro" ? "pro" : "free";
  const dailyLimit = tier === "pro" ? 100 : 10;
  const today = new Date().toISOString().slice(0, 10);

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
          const anthropicStream = anthropic.messages.stream({
            max_tokens: 900,
            messages: [{ role: "user", content: question }],
            model: getTutorModel(),
            system: buildTutorSystemPrompt({
              lessonTitle,
              supportContext,
              tier,
              tutorPreload: body.tutorPreload,
              learningMode: body.learningMode,
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
