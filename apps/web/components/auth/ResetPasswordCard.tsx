"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, KeyRound, Shield } from "lucide-react";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { getPublicSupabaseConfigMessage } from "@/lib/env";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export function ResetPasswordCard() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [recoveryReady, setRecoveryReady] = useState(false);
  const configurationMessage = getPublicSupabaseConfigMessage();
  const authUnavailable = Boolean(configurationMessage);

  useEffect(() => {
    if (authUnavailable) {
      return;
    }

    const supabase = getSupabaseBrowserClient();
    let alive = true;

    const initialize = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (alive && session) {
        setRecoveryReady(true);
      }
    };

    void initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      if (!alive) {
        return;
      }

      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setRecoveryReady(Boolean(session));
        setMessage(null);
      }
    });

    return () => {
      alive = false;
      subscription.unsubscribe();
    };
  }, [authUnavailable]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (authUnavailable) {
      setMessage(configurationMessage);
      return;
    }

    if (!recoveryReady) {
      setMessage("Open the recovery link from your email first. Once the recovery session is active in this browser, you can choose a new password here.");
      return;
    }

    if (password.length < 8) {
      setMessage("Use at least 8 characters for your new password.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("The passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        throw error;
      }

      await supabase.auth.signOut();
      setSuccess(true);
      setRecoveryReady(false);
      setMessage("Password updated. Sign in with your new password.");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not update your password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-page)] px-6 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-[var(--color-border-subtle)] bg-white p-8 shadow-sm sm:p-10">
        <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[rgba(22,176,168,0.12)] text-[var(--color-accent-primary)]">
          <KeyRound className="size-5" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-[var(--color-fg-default)]">Choose a new password</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
          This page finishes the recovery flow after you open the reset link from your email. If you landed here directly, request a new reset email first.
        </p>

        {configurationMessage ? (
          <div className="mt-6 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <Shield className="mt-0.5 size-4 shrink-0" />
            <p>{configurationMessage}</p>
          </div>
        ) : null}

        {!authUnavailable && !recoveryReady && !success ? (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Recovery session not detected yet. Open the email link first, then return here in the same browser.
          </div>
        ) : null}

        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="reset-password" className="text-sm font-medium text-gray-700">New password</label>
            <input
              id="reset-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--color-accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-primary)]"
              placeholder="Choose a new password"
              disabled={loading || authUnavailable || success}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="reset-password-confirm" className="text-sm font-medium text-gray-700">Confirm password</label>
            <input
              id="reset-password-confirm"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--color-accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-primary)]"
              placeholder="Repeat your new password"
              disabled={loading || authUnavailable || success}
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
            disabled={loading || authUnavailable || success}
          >
            {loading ? "Saving new password..." : "Save new password"}
            {!loading ? <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /> : null}
          </button>
        </form>

        <div className="mt-8 flex flex-col gap-2 text-sm text-[var(--color-fg-muted)]">
          <Link href="/forgot-password" className="font-semibold text-[var(--color-accent-primary)] hover:underline">
            Need a new reset email?
          </Link>
          <Link href="/login" className="font-semibold text-[var(--color-accent-primary)] hover:underline">
            Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
}
