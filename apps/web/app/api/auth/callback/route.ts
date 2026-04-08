import { NextRequest, NextResponse } from "next/server";
import { getAppUrl } from "@/lib/env";
import { applySupabaseHeaders, createSupabaseServerClient } from "@/lib/supabase/server";

function sanitizeNextPath(nextValue: string | null) {
  if (!nextValue || !nextValue.startsWith("/") || nextValue.startsWith("//")) {
    return null;
  }

  return nextValue;
}

function getLoginDestination(nextValue: string | null) {
  const loginUrl = new URL("/login", getAppUrl());

  if (nextValue) {
    loginUrl.searchParams.set("next", nextValue);
  }

  return loginUrl;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const requestedNext = sanitizeNextPath(url.searchParams.get("next"));
  const supabaseContext = await createSupabaseServerClient();

  if (!supabaseContext) {
    return NextResponse.redirect(getLoginDestination(requestedNext));
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
    return applySupabaseHeaders(NextResponse.redirect(getLoginDestination(requestedNext)), supabaseContext.responseHeaders);
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
