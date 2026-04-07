import { NextRequest, NextResponse } from "next/server";
import { getAppUrl } from "@/lib/env";
import { applySupabaseHeaders, createSupabaseServerClient } from "@/lib/supabase/server";

function sanitizeNextPath(nextValue: string | null) {
  if (!nextValue || !nextValue.startsWith("/") || nextValue.startsWith("//")) {
    return null;
  }

  return nextValue;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const requestedNext = sanitizeNextPath(url.searchParams.get("next"));
  const fallbackDestination = requestedNext ?? "/onboarding";
  const supabaseContext = await createSupabaseServerClient();

  if (!supabaseContext) {
    return NextResponse.redirect(new URL(fallbackDestination, getAppUrl()));
  }

  const code = url.searchParams.get("code");
  if (code) {
    await supabaseContext.supabase.auth.exchangeCodeForSession(code);
  }

  const {
    data: { user },
  } = await supabaseContext.supabase.auth.getUser();

  let destination = requestedNext ?? "/dashboard";

  if (!user) {
    destination = "/login";
  } else {
    const { data: profile } = await supabaseContext.supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("id", user.id)
      .maybeSingle();

    destination = profile?.onboarding_completed ? destination : "/onboarding";
  }

  const response = NextResponse.redirect(new URL(destination, getAppUrl()));
  return applySupabaseHeaders(response, supabaseContext.responseHeaders);
}
