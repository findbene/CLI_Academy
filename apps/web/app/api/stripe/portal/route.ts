import { NextResponse } from "next/server";
import { applySupabaseHeaders, createSupabaseServerClient } from "@/lib/supabase/server";
import { getStripeInstance, getStripePortalReturnUrl } from "@/lib/stripe";
import { isTrustedWriteOrigin } from "@/lib/security/request-origin";

export async function POST(request: Request) {
  if (!isTrustedWriteOrigin(request)) {
    return NextResponse.json(
      {
        message: "Invalid request origin.",
        ok: false,
      },
      { status: 400 },
    );
  }

  const stripe = getStripeInstance();
  if (!stripe) {
    return NextResponse.json(
      {
        message: "Stripe is not configured yet.",
        ok: false,
      },
      { status: 503 },
    );
  }

  const supabaseContext = await createSupabaseServerClient();
  if (!supabaseContext) {
    return NextResponse.json(
      {
        message: "Supabase is not configured yet.",
        ok: false,
      },
      { status: 503 },
    );
  }

  const {
    data: { user },
  } = await supabaseContext.supabase.auth.getUser();

  if (!user) {
    const response = NextResponse.json(
      {
        message: "Sign in before opening the billing portal.",
        ok: false,
      },
      { status: 401 },
    );

    return applySupabaseHeaders(response, supabaseContext.responseHeaders);
  }

  const { data: profile } = await supabaseContext.supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.stripe_customer_id) {
    const response = NextResponse.json(
      {
        message: "No Stripe customer was found for this account yet.",
        ok: false,
      },
      { status: 400 },
    );

    return applySupabaseHeaders(response, supabaseContext.responseHeaders);
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: getStripePortalReturnUrl(),
  });

  const response = NextResponse.json({
    ok: true,
    url: session.url,
  });

  return applySupabaseHeaders(response, supabaseContext.responseHeaders);
}
