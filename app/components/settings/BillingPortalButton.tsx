"use client";

import { useState } from "react";

export function BillingPortalButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/stripe/portal", { method: "POST" });
      const data = (await response.json()) as { message?: string; url?: string };

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error(data.message ?? "Billing portal wiring is still being restored.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Billing portal wiring is still being restored.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button type="button" className="button-secondary" onClick={handleClick} disabled={loading}>
        {loading ? "Opening..." : "Open billing portal"}
      </button>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  );
}
