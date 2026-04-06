"use client";

import { useState } from "react";

export function BillingPortalButton() {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);

    try {
      const response = await fetch("/api/stripe/portal", { method: "POST" });
      const data = (await response.json()) as { url?: string };

      if (data.url) {
        window.location.href = data.url;
        return;
      }
    } catch {
      // Recovery scaffold: fall through to disabled state message.
    } finally {
      setLoading(false);
    }

    window.alert("Billing portal wiring is still being restored.");
  }

  return (
    <button type="button" className="button-secondary" onClick={handleClick} disabled={loading}>
      {loading ? "Opening..." : "Open billing portal"}
    </button>
  );
}
