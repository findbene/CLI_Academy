import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { getPublicSupabaseEnv } from "@/lib/env";

/** Routes that require authentication + onboarding checks */
const PROTECTED_PREFIXES = ["/dashboard", "/downloads", "/settings", "/learn", "/onboarding"];

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function setSecurityHeaders(response: NextResponse): void {
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:; " +
      "font-src 'self' data:; " +
      "connect-src 'self' https://*.supabase.co https://api.anthropic.com https://api.stripe.com; " +
      "frame-ancestors 'none'",
  );
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  if (process.env.NODE_ENV === "production") {
    response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ── Public routes: security headers only ──────────
  if (!isProtectedRoute(pathname)) {
    const response = NextResponse.next();
    setSecurityHeaders(response);
    return response;
  }

  // ── Protected routes: auth + onboarding + headers ──
  const env = getPublicSupabaseEnv();
  if (!env) {
    const response = NextResponse.next();
    setSecurityHeaders(response);
    return response;
  }

  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll().map(({ name, value }) => ({ name, value }));
      },
      setAll(cookiesToSet, headers) {
        response = NextResponse.next({
          request: { headers: request.headers },
        });

        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }

        for (const [key, value] of Object.entries(headers)) {
          response.headers.set(key, value);
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`);
    const redirect = NextResponse.redirect(loginUrl);
    setSecurityHeaders(redirect);
    return redirect;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed")
    .eq("id", user.id)
    .maybeSingle();

  const onboardingCompleted = Boolean(profile?.onboarding_completed);
  const isOnboardingRoute = pathname.startsWith("/onboarding");

  if (!onboardingCompleted && !isOnboardingRoute) {
    const redirect = NextResponse.redirect(new URL("/onboarding", request.url));
    setSecurityHeaders(redirect);
    return redirect;
  }

  if (onboardingCompleted && isOnboardingRoute) {
    const redirect = NextResponse.redirect(new URL("/dashboard", request.url));
    setSecurityHeaders(redirect);
    return redirect;
  }

  setSecurityHeaders(response);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
