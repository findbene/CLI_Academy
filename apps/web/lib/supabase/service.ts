import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getPublicSupabaseEnv, getServiceRoleKey } from "@/lib/env";

let serviceClient: SupabaseClient | null = null;

export function getSupabaseServiceClient() {
  const env = getPublicSupabaseEnv();
  const serviceRoleKey = getServiceRoleKey();

  if (!env || !serviceRoleKey) {
    return null;
  }

  serviceClient ??= createClient(env.url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return serviceClient;
}
