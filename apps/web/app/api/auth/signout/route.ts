import { NextResponse } from "next/server";
import { createSupabaseServerClient, applySupabaseHeaders } from "@/lib/supabase/server";

export async function POST() {
  const context = await createSupabaseServerClient();
  
  if (context) {
    await context.supabase.auth.signOut();
  }

  // Create redirect response clearing the cache implicitly
  const response = NextResponse.redirect(
    new URL("/", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")
  );

  if (context) {
    return applySupabaseHeaders(response, context.responseHeaders);
  }

  return response;
}
