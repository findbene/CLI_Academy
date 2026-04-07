export function getEnv(name: string) {
  const value = process.env[name];
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

export function getAppUrl() {
  return getEnv("NEXT_PUBLIC_APP_URL") ?? "http://localhost:3000";
}

export function getPublicSupabaseEnv() {
  const url = getEnv("NEXT_PUBLIC_SUPABASE_URL");
  const anonKey = getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

export function getServiceRoleKey() {
  return getEnv("SUPABASE_SERVICE_ROLE_KEY");
}

export function getStripeSecretKey() {
  return getEnv("STRIPE_SECRET_KEY");
}

export function getStripeWebhookSecret() {
  return getEnv("STRIPE_WEBHOOK_SECRET");
}

export function getStripePriceId(interval: "monthly" | "annual") {
  return getEnv(interval === "annual" ? "STRIPE_PRO_ANNUAL_PRICE_ID" : "STRIPE_PRO_MONTHLY_PRICE_ID");
}

export function getAnthropicApiKey() {
  return getEnv("ANTHROPIC_API_KEY");
}

export function getAnthropicModel() {
  return getEnv("ANTHROPIC_MODEL") ?? "claude-sonnet-4-6";
}
