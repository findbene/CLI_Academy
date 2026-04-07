import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const ALLOWED_KEYS = ["primary_goal", "host_os", "target_env", "primary_role", "skill_level"];

export async function PATCH(request: NextRequest) {
  const ctx = await createSupabaseServerClient();
  if (!ctx) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const {
    data: { user },
  } = await ctx.supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Only allow known keys with string values
  const updates: Record<string, string> = {};
  for (const [key, value] of Object.entries(body)) {
    if (ALLOWED_KEYS.includes(key) && typeof value === "string" && value.length <= 200) {
      updates[key] = value;
    }
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  // Merge with existing answers
  const { data: existing } = await ctx.supabase
    .from("profiles")
    .select("onboarding_answers")
    .eq("id", user.id)
    .maybeSingle();

  const current =
    existing?.onboarding_answers && typeof existing.onboarding_answers === "object"
      ? (existing.onboarding_answers as Record<string, unknown>)
      : {};

  const merged = { ...current, ...updates };

  const { error } = await ctx.supabase
    .from("profiles")
    .update({ onboarding_answers: merged })
    .eq("id", user.id);

  if (error) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, answers: merged });
}
