"use client";

import { useState } from "react";

interface CheckoutButtonProps {
  billingInterval?: "monthly" | "annual";
  className?: string;
  label?: string;
}

export function CheckoutButton({
  billingInterval = "monthly",
  className = "button-primary",
  label,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/stripe/checkout", {
        body: JSON.stringify({ billingInterval }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const data = (await response.json().catch(() => ({}))) as { message?: string; url?: string };

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error(data.message ?? "Checkout is not ready yet.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout is not ready yet.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button type="button" className={className} onClick={handleCheckout} disabled={loading}>
        {loading ? "Opening..." : (label ?? (billingInterval === "annual" ? "Choose annual" : "Choose Pro"))}
      </button>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  );
}
