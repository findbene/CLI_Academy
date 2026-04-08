import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface ViewerProfile {
  onboarding_answers: Record<string, unknown> | null;
  onboarding_completed: boolean;
  stripe_customer_id: string | null;
  subscription_status: string | null;
  tier: "free" | "pro";
}

export interface ServerViewerResult {
  profile: ViewerProfile | null;
  supabaseConfigured: boolean;
  supabaseContext: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  user: { email: string | null; id: string } | null;
}

export async function getServerViewer(options?: { requireAuth?: boolean }): Promise<ServerViewerResult> {
  const supabaseContext = await createSupabaseServerClient();

  if (!supabaseContext) {
    return {
      profile: null,
      supabaseConfigured: false,
      supabaseContext: null,
      user: null,
    };
  }

  const {
    data: { user },
  } = await supabaseContext.supabase.auth.getUser();

  if (!user) {
    if (options?.requireAuth) {
      redirect("/login");
    }

    return {
      profile: null,
      supabaseConfigured: true,
      supabaseContext,
      user: null,
    };
  }

  const { data: profile } = await supabaseContext.supabase
    .from("profiles")
    .select("onboarding_answers, onboarding_completed, stripe_customer_id, subscription_status, tier")
    .eq("id", user.id)
    .maybeSingle();

  return {
    profile: {
      onboarding_answers:
        profile?.onboarding_answers && typeof profile.onboarding_answers === "object"
          ? (profile.onboarding_answers as Record<string, unknown>)
          : null,
      onboarding_completed: Boolean(profile?.onboarding_completed),
      stripe_customer_id: profile?.stripe_customer_id ?? null,
      subscription_status: profile?.subscription_status ?? null,
      tier: profile?.tier === "pro" || (user.email && process.env.ADMIN_EMAIL && user.email === process.env.ADMIN_EMAIL) ? "pro" : "free",
    },
    supabaseConfigured: true,
    supabaseContext,
    user: {
      email: user.email ?? null,
      id: user.id,
    },
  };
}
