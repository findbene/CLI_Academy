const encoder = new TextEncoder();

function sse(payload: unknown) {
  return encoder.encode(`data: ${JSON.stringify(payload)}\n\n`);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    message?: string;
    lessonTitle?: string;
  };

  const question = body.message?.trim() || "general question";
  const lessonTitle = body.lessonTitle?.trim();

  const answer =
    `Tutor recovery mode is active. The frontend shell has been restored, but the full Anthropic-backed tutor ` +
    `wiring is still being rebuilt. ${lessonTitle ? `Current lesson: ${lessonTitle}. ` : ""}` +
    `Your question was: "${question}". Start with the current lesson steps, check the troubleshooting path if a ` +
    `command fails, and treat risky commands carefully until the full source-backed tutor is back online.`;

  const stream = new ReadableStream({
    start(controller) {
      for (const chunk of answer.split(" ")) {
        controller.enqueue(sse({ type: "delta", text: `${chunk} ` }));
      }

      controller.enqueue(sse({ type: "done" }));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
