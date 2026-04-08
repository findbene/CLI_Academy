"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getPublicSupabaseConfigMessage, getPublicSupabaseEnv } from "@/lib/env";

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient() {
  const env = getPublicSupabaseEnv();

  if (!env) {
    throw new Error(getPublicSupabaseConfigMessage() ?? "Supabase browser client is not configured.");
  }

  browserClient ??= createBrowserClient(env.url, env.anonKey);
  return browserClient;
}
