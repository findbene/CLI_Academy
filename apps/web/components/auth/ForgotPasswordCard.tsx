"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Mail, Shield } from "lucide-react";
import { getPublicSupabaseConfigMessage } from "@/lib/env";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export function ForgotPasswordCard() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const configurationMessage = getPublicSupabaseConfigMessage();
  const authUnavailable = Boolean(configurationMessage);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (authUnavailable) {
      setMessage(configurationMessage);
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      setSuccess(true);
      setMessage("If an account exists for that email, we sent a reset link. Check your inbox and spam folder, then open the link in this browser.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Password reset is unavailable right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-page)] px-6 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-[var(--color-border-subtle)] bg-white p-8 shadow-sm sm:p-10">
        <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[rgba(22,176,168,0.12)] text-[var(--color-accent-primary)]">
          <Mail className="size-5" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-[var(--color-fg-default)]">Reset your password</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
          Enter the email address you use for CLI Academy. We&apos;ll send a recovery link so you can choose a new password.
        </p>

        {configurationMessage ? (
          <div className="mt-6 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <Shield className="mt-0.5 size-4 shrink-0" />
            <p>{configurationMessage}</p>
          </div>
        ) : null}

        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="forgot-password-email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              id="forgot-password-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--color-accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-primary)]"
              placeholder="developer@example.com"
              disabled={loading || authUnavailable}
              required
            />
          </div>

          {message ? (
            <div className={`rounded-2xl border p-4 text-sm leading-6 ${success ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-gray-200 bg-gray-50 text-gray-700"}`}>
              {message}
            </div>
          ) : null}

          <button
            type="submit"
            className="group mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent-primary)] text-sm font-semibold text-white shadow-md shadow-[var(--color-accent-primary)]/20 transition-all hover:bg-[var(--color-accent-emphasis)] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading || authUnavailable}
          >
            {loading ? "Sending reset link..." : "Email me a reset link"}
            {!loading ? <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /> : null}
          </button>
        </form>

        <div className="mt-8 flex flex-col gap-2 text-sm text-[var(--color-fg-muted)]">
          <p>Open the reset link on this device so CLI Academy can attach the recovery session to your browser.</p>
          <Link href="/login" className="font-semibold text-[var(--color-accent-primary)] hover:underline">
            Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
}