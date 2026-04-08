import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { getPublicSupabaseEnv } from "@/lib/env";

export interface SupabaseServerContext {
  responseHeaders: Headers;
  supabase: SupabaseClient;
}

export async function createSupabaseServerClient(): Promise<SupabaseServerContext | null> {
  const env = getPublicSupabaseEnv();

  if (!env) {
    return null;
  }

  const cookieStore = await cookies();
  const responseHeaders = new Headers();
  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll().map(({ name, value }) => ({ name, value }));
      },
      setAll(cookiesToSet, headers) {
        for (const { name, value, options } of cookiesToSet) {
          try {
            cookieStore.set(name, value, options);
          } catch {
            // Server components may not allow cookie mutation.
          }
        }

        for (const [key, value] of Object.entries(headers)) {
          responseHeaders.set(key, value);
        }
      },
    },
  });

  return { responseHeaders, supabase };
}

export function applySupabaseHeaders(response: Response, responseHeaders: Headers) {
  responseHeaders.forEach((value, key) => {
    response.headers.set(key, value);
  });

  return response;
}
