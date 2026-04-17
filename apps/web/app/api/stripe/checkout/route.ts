import { NextResponse } from "next/server";
import { applySupabaseHeaders, createSupabaseServerClient } from "@/lib/supabase/server";
import { isTrustedWriteOrigin } from "@/lib/security/request-origin";
import {
  type BillingInterval,
  getStripeCancelUrl,
  getStripeCheckoutPriceId,
  getStripeInstance,
  getStripeSuccessUrl,
} from "@/lib/stripe";

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
        message: "Sign in before starting checkout.",
        ok: false,
      },
      { status: 401 },
    );

    return applySupabaseHeaders(response, supabaseContext.responseHeaders);
  }

  const body = (await request.json().catch(() => ({}))) as { billingInterval?: BillingInterval };
  const billingInterval = body.billingInterval === "annual" ? "annual" : "monthly";
  const priceId = getStripeCheckoutPriceId(billingInterval);

  if (!priceId) {
    const response = NextResponse.json(
      {
        message: `The Stripe ${billingInterval} price is not configured yet.`,
        ok: false,
      },
      { status: 503 },
    );

    return applySupabaseHeaders(response, supabaseContext.responseHeaders);
  }

  const { data: profile } = await supabaseContext.supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .maybeSingle();

  let customerId = profile?.stripe_customer_id ?? null;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email ?? undefined,
      metadata: { user_id: user.id },
    });

    customerId = customer.id;
    await supabaseContext.supabase
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id);
  }

  const session = await stripe.checkout.sessions.create({
    allow_promotion_codes: true,
    cancel_url: getStripeCancelUrl(),
    client_reference_id: user.id,
    customer: customerId ?? undefined,
    customer_email: customerId ? undefined : user.email ?? undefined,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: {
      billing_interval: billingInterval,
      user_id: user.id,
    },
    mode: "subscription",
    subscription_data: {
      metadata: {
        billing_interval: billingInterval,
        user_id: user.id,
      },
    },
    success_url: getStripeSuccessUrl(),
  });

  const response = NextResponse.json({
    ok: true,
    url: session.url,
  });

  return applySupabaseHeaders(response, supabaseContext.responseHeaders);
}
