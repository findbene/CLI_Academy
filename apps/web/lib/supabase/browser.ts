"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getPublicSupabaseConfigMessage, getPublicSupabaseEnv } from "@/lib/env";

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
  const env = getPublicSupabaseEnv();

  if (!env) {
    throw new Error(getPublicSupabaseConfigMessage() ?? "Supabase browser client is not configured.");
  }

  browserClient ??= createBrowserClient(env.url, env.anonKey, {
    db: {
      schema: "public",
    },
  });
  return browserClient;
}
