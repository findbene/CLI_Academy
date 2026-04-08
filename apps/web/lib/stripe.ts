import Stripe from "stripe";
import { getAppUrl, getStripePriceId, getStripeSecretKey } from "@/lib/env";

export type BillingInterval = "monthly" | "annual";

let stripe: Stripe | null = null;

export function getStripeInstance() {
  const secretKey = getStripeSecretKey();

  if (!secretKey) {
    return null;
  }

  stripe ??= new Stripe(secretKey);
  return stripe;
}

export function getStripeCheckoutPriceId(interval: BillingInterval) {
  return getStripePriceId(interval);
}

export function getStripeSuccessUrl() {
  return new URL("/dashboard?checkout=success", getAppUrl()).toString();
}

export function getStripeCancelUrl() {
  return new URL("/pricing?checkout=canceled", getAppUrl()).toString();
}

export function getStripePortalReturnUrl() {
  return new URL("/settings", getAppUrl()).toString();
}
