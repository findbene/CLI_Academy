import { NextResponse } from "next/server";
import { applySupabaseHeaders, createSupabaseServerClient } from "@/lib/supabase/server";

const VALID_EVENT_TYPES = new Set([
  "lesson_complete",
  "lesson_start",
  "page_view",
  "path_enroll",
  "tutor_message",
]);

const MAX_EVENT_DATA_BYTES = 4096;

function badRequest(message: string) {
  return NextResponse.json({ message, ok: false }, { status: 400 });
}

function serverUnavailable() {
  return NextResponse.json(
    {
      message: "Telemetry is not configured yet. Add the Supabase public keys to enable event ingestion.",
      ok: false,
    },
    { status: 503 },
  );
}

export async function POST(request: Request) {
  const supabaseContext = await createSupabaseServerClient();

  if (!supabaseContext) {
    return serverUnavailable();
  }

  const body = (await request.json().catch(() => ({}))) as {
    eventData?: Record<string, unknown>;
    eventType?: string;
  };

  const eventType = body.eventType?.trim();
  if (!eventType) {
    return badRequest("eventType is required.");
  }

  if (!VALID_EVENT_TYPES.has(eventType)) {
    return badRequest(`Invalid eventType. Allowed: ${[...VALID_EVENT_TYPES].join(", ")}`);
  }

  const serializedData = JSON.stringify(body.eventData ?? {});
  if (serializedData.length > MAX_EVENT_DATA_BYTES) {
    return badRequest(`eventData exceeds the ${MAX_EVENT_DATA_BYTES}-byte limit.`);
  }

  const {
    data: { user },
  } = await supabaseContext.supabase.auth.getUser();

  if (!user) {
    const response = NextResponse.json(
      { message: "Authentication required for event tracking.", ok: false },
      { status: 401 },
    );
    return applySupabaseHeaders(response, supabaseContext.responseHeaders);
  }

  const { error } = await supabaseContext.supabase.from("app_events").insert({
    event_data: body.eventData ?? {},
    event_type: eventType,
    user_id: user.id,
  });

  if (error) {
    const response = NextResponse.json(
      {
        message: "Event ingestion failed.",
        ok: false,
      },
      { status: 500 },
    );

    return applySupabaseHeaders(response, supabaseContext.responseHeaders);
  }

  const response = NextResponse.json({ ok: true, saved: true });
  return applySupabaseHeaders(response, supabaseContext.responseHeaders);
}
