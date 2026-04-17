import { NextResponse } from "next/server";
import { createSupabaseServerClient, applySupabaseHeaders } from "@/lib/supabase/server";
import { isTrustedWriteOrigin } from "@/lib/security/request-origin";

export async function POST(request: Request) {
  if (!isTrustedWriteOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 400 });
  }

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
