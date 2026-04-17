import { NextRequest } from "next/server";

function normalizeOrigin(url: string): string {
  return url.trim().replace(/\/$/, "");
}

function getAllowedOrigins(): Set<string> {
  const allowed = new Set<string>();

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (appUrl) {
    allowed.add(normalizeOrigin(appUrl));
  }

  // Vercel preview deployments have dynamic URLs that won't match NEXT_PUBLIC_APP_URL.
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    allowed.add(`https://${vercelUrl.replace(/\/$/, "")}`);
  }

  const vercelBranchUrl = process.env.VERCEL_BRANCH_URL;
  if (vercelBranchUrl) {
    allowed.add(`https://${vercelBranchUrl.replace(/\/$/, "")}`);
  }

  if (process.env.NODE_ENV !== "production") {
    allowed.add("http://localhost:3000");
    allowed.add("http://127.0.0.1:3000");
  }

  return allowed;
}

/**
 * Minimal CSRF guard for cookie-authenticated writes.
 * When Origin is absent we allow: server-side fetches and same-origin form posts
 * legitimately omit the header on older Safari and some proxy configurations.
 */
export function isTrustedWriteOrigin(request: Request | NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }

  return getAllowedOrigins().has(normalizeOrigin(origin));
}
