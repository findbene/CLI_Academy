import { NextRequest, NextResponse } from "next/server";
import { applySupabaseHeaders, createSupabaseServerClient } from "@/lib/supabase/server";
import { ensurePublishedCurriculumSynced } from "@/lib/supabase/curriculum-sync";

type ProgressBody = {
  completionData?: Record<string, unknown>;
  lessonSlug?: string;
  pathSlug?: string;
};

async function getAuthedSupabaseContext() {
  const supabaseContext = await createSupabaseServerClient();

  if (!supabaseContext) {
    return {
      errorResponse: NextResponse.json(
        {
          message: "Supabase is not configured yet.",
          ok: false,
        },
        { status: 503 },
      ),
      supabaseContext: null,
      user: null,
    };
  }

  const {
    data: { user },
  } = await supabaseContext.supabase.auth.getUser();

  if (!user) {
    return {
      errorResponse: applySupabaseHeaders(
        NextResponse.json(
          {
            message: "Sign in to save and sync lesson progress.",
            ok: false,
          },
          { status: 401 },
        ),
        supabaseContext.responseHeaders,
      ),
      supabaseContext,
      user: null,
    };
  }

  return { errorResponse: null, supabaseContext, user };
}

async function resolveLesson(
  supabaseContext: NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>,
  pathSlug?: string,
  lessonSlug?: string,
) {
  if (!pathSlug || !lessonSlug) {
    return null;
  }

  const resolved = await resolveLessonFromDatabase(supabaseContext, pathSlug, lessonSlug);
  if (resolved) {
    return resolved;
  }

  await ensurePublishedCurriculumSynced();
  return resolveLessonFromDatabase(supabaseContext, pathSlug, lessonSlug);
}

async function resolveLessonFromDatabase(
  supabaseContext: NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>,
  pathSlug: string,
  lessonSlug: string,
) {
  const { data: path } = await supabaseContext.supabase
    .from("paths")
    .select("id, slug, tier_required")
    .eq("slug", pathSlug)
    .eq("is_published", true)
    .maybeSingle();

  if (!path) {
    return null;
  }

  const { data: lesson } = await supabaseContext.supabase
    .from("lessons")
    .select("id, slug, tier_required, path_id")
    .eq("path_id", path.id)
    .eq("slug", lessonSlug)
    .eq("is_published", true)
    .maybeSingle();

  if (!lesson) {
    return null;
  }

  return { lesson, path };
}

export async function GET(request: NextRequest) {
  const auth = await getAuthedSupabaseContext();
  if (auth.errorResponse || !auth.supabaseContext || !auth.user) {
    return auth.errorResponse;
  }

  const pathSlug = request.nextUrl.searchParams.get("pathSlug") ?? undefined;
  const lessonSlug = request.nextUrl.searchParams.get("lessonSlug") ?? undefined;

  if (pathSlug && lessonSlug) {
    const resolved = await resolveLesson(auth.supabaseContext, pathSlug, lessonSlug);

    if (!resolved) {
      return applySupabaseHeaders(
        NextResponse.json(
          {
            completed: false,
            ok: false,
            progress: null,
          },
          { status: 404 },
        ),
        auth.supabaseContext.responseHeaders,
      );
    }

    const { data: progress } = await auth.supabaseContext.supabase
      .from("lesson_progress")
      .select("completed_at, completion_data, lesson_id")
      .eq("user_id", auth.user.id)
      .eq("lesson_id", resolved.lesson.id)
      .maybeSingle();

    return applySupabaseHeaders(
      NextResponse.json({
        completed: Boolean(progress),
        ok: true,
        progress,
      }),
      auth.supabaseContext.responseHeaders,
    );
  }

  const { data: progress, error } = await auth.supabaseContext.supabase
    .from("lesson_progress")
    .select("lesson_id, completed_at, completion_data")
    .eq("user_id", auth.user.id)
    .order("completed_at", { ascending: false });

  if (error) {
    return applySupabaseHeaders(
      NextResponse.json(
        {
          message: "Could not load progress.",
          ok: false,
          progress: [],
        },
        { status: 500 },
      ),
      auth.supabaseContext.responseHeaders,
    );
  }

  return applySupabaseHeaders(
    NextResponse.json({
      ok: true,
      progress: progress ?? [],
    }),
    auth.supabaseContext.responseHeaders,
  );
}

export async function POST(request: Request) {
  const auth = await getAuthedSupabaseContext();
  if (auth.errorResponse || !auth.supabaseContext || !auth.user) {
    return auth.errorResponse;
  }

  const body = (await request.json().catch(() => ({}))) as ProgressBody;
  const resolved = await resolveLesson(auth.supabaseContext, body.pathSlug, body.lessonSlug);

  if (!resolved) {
    return applySupabaseHeaders(
      NextResponse.json(
        {
          message: "The requested lesson could not be matched to a published path.",
          ok: false,
        },
        { status: 404 },
      ),
      auth.supabaseContext.responseHeaders,
    );
  }

  const { data: profile } = await auth.supabaseContext.supabase
    .from("profiles")
    .select("tier")
    .eq("id", auth.user.id)
    .maybeSingle();

  const userTier = profile?.tier === "pro" ? "pro" : "free";
  const requiresPro =
    resolved.path.tier_required === "pro" || resolved.lesson.tier_required === "pro";

  if (requiresPro && userTier !== "pro") {
    return applySupabaseHeaders(
      NextResponse.json(
        {
          message: "This lesson is part of a Pro track. Upgrade to save progress here.",
          ok: false,
        },
        { status: 403 },
      ),
      auth.supabaseContext.responseHeaders,
    );
  }

  await auth.supabaseContext.supabase.from("enrollments").upsert(
    {
      path_id: resolved.path.id,
      source: requiresPro ? "stripe" : "free",
      tier_at_enrollment: userTier,
      user_id: auth.user.id,
    },
    { onConflict: "user_id,path_id" },
  );

  const { error } = await auth.supabaseContext.supabase.from("lesson_progress").upsert(
    {
      completion_data: body.completionData ?? {},
      lesson_id: resolved.lesson.id,
      user_id: auth.user.id,
    },
    { onConflict: "user_id,lesson_id" },
  );

  if (error) {
    return applySupabaseHeaders(
      NextResponse.json(
        {
          message: "Could not save lesson progress.",
          ok: false,
        },
        { status: 500 },
      ),
      auth.supabaseContext.responseHeaders,
    );
  }

  await auth.supabaseContext.supabase.from("app_events").insert({
    event_data: {
      lesson_slug: body.lessonSlug,
      path_slug: body.pathSlug,
    },
    event_type: "lesson_completed",
    user_id: auth.user.id,
  });

  return applySupabaseHeaders(
    NextResponse.json({
      completed: true,
      message: "Progress saved.",
      ok: true,
      saved: true,
    }),
    auth.supabaseContext.responseHeaders,
  );
}
