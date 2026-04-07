"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);

    try {
      const supabase = getSupabaseBrowserClient();
      await supabase.auth.signOut();

      startTransition(() => {
        router.push("/login");
        router.refresh();
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button type="button" className="button-secondary w-full" onClick={handleSignOut} disabled={loading}>
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}
