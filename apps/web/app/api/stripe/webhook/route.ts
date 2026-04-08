import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripeWebhookSecret } from "@/lib/env";
import { getStripeInstance } from "@/lib/stripe";
import { getSupabaseServiceClient } from "@/lib/supabase/service";

function subscriptionGrantsPro(status: string | null | undefined) {
  return status === "active" || status === "trialing" || status === "past_due";
}

async function updateProfileFromStripeLookup(input: {
  customerId?: string | null;
  status?: string | null;
  subscriptionId?: string | null;
  userId?: string | null;
}) {
  const serviceClient = getSupabaseServiceClient();
  if (!serviceClient) {
    return;
  }

  const updatePayload = {
    stripe_customer_id: input.customerId ?? null,
    stripe_subscription_id: input.subscriptionId ?? null,
    subscription_status: input.status ?? null,
    tier: subscriptionGrantsPro(input.status) ? "pro" : "free",
  };

  if (input.userId) {
    await serviceClient.from("profiles").update(updatePayload).eq("id", input.userId);
    return;
  }

  if (input.subscriptionId) {
    const { data } = await serviceClient
      .from("profiles")
      .update(updatePayload)
      .eq("stripe_subscription_id", input.subscriptionId)
      .select("id")
      .maybeSingle();

    if (data) {
      return;
    }
  }

  if (input.customerId) {
    await serviceClient.from("profiles").update(updatePayload).eq("stripe_customer_id", input.customerId);
  }
}

export async function POST(request: Request) {
  const stripe = getStripeInstance();
  const webhookSecret = getStripeWebhookSecret();
  const serviceClient = getSupabaseServiceClient();

  if (!stripe || !webhookSecret || !serviceClient) {
    return NextResponse.json(
      {
        message: "Stripe webhook handling is not fully configured yet.",
        ok: false,
      },
      { status: 503 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      {
        message: "Missing Stripe signature header.",
        ok: false,
      },
      { status: 400 },
    );
  }

  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch {
    return NextResponse.json(
      {
        message: "Invalid webhook signature.",
        ok: false,
      },
      { status: 400 },
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerId =
        typeof session.customer === "string" ? session.customer : session.customer?.id ?? null;
      const subscriptionId =
        typeof session.subscription === "string"
          ? session.subscription
          : session.subscription?.id ?? null;
      const userId = session.metadata?.user_id ?? session.client_reference_id ?? null;

      await updateProfileFromStripeLookup({
        customerId,
        status: "active",
        subscriptionId,
        userId,
      });
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId =
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer?.id ?? null;
      const userId = subscription.metadata?.user_id ?? null;

      await updateProfileFromStripeLookup({
        customerId,
        status: subscription.status,
        subscriptionId: subscription.id,
        userId,
      });
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ ok: true, received: true });
}
