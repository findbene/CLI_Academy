"use client";

import Link from "next/link";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

type AuthMode = "login" | "signup";

interface AuthCardProps {
  mode: AuthMode;
  nextHref?: string | null;
}

function sanitizeNextPath(nextValue?: string | null) {
  if (!nextValue || !nextValue.startsWith("/") || nextValue.startsWith("//")) {
    return null;
  }

  return nextValue;
}

async function getPostAuthDestination(nextHref?: string | null) {
  const supabase = getSupabaseBrowserClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return "/login";
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.onboarding_completed) {
    return "/onboarding";
  }

  return sanitizeNextPath(nextHref) ?? "/dashboard";
}

export function AuthCard({ mode, nextHref }: AuthCardProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const isSignup = mode === "signup";
  const safeNextHref = sanitizeNextPath(nextHref);
  const title = isSignup ? "Create your CLI Academy account" : "Log in to CLI Academy";
  const description = isSignup
    ? "Start free, save your progress, and unlock the setup-first learning flow across devices."
    : "Pick up where you left off, reopen your saved paths, and use the tutor with synced context.";

  async function handleEmailPasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const supabase = getSupabaseBrowserClient();

      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: safeNextHref
              ? `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(safeNextHref)}`
              : `${window.location.origin}/api/auth/callback`,
          },
        });

        if (error) {
          throw error;
        }

        if (!data.session) {
          setMessage("Account created. Check your email to confirm your address, then come back to log in.");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }
      }

      const destination = await getPostAuthDestination(safeNextHref);
      startTransition(() => {
        router.push(destination);
        router.refresh();
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleAuth() {
    setLoading(true);
    setMessage(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const callbackUrl = safeNextHref
        ? `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(safeNextHref)}`
        : `${window.location.origin}/api/auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        options: {
          redirectTo: callbackUrl,
        },
        provider: "google",
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Google sign-in is unavailable right now.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl panel p-8">
      <div className="eyebrow">{isSignup ? "Start free" : "Log in"}</div>
      <h1 className="mt-4 text-3xl font-semibold">{title}</h1>
      <p className="mt-4 text-[var(--color-fg-muted)]">{description}</p>

      <form className="mt-8 grid gap-4" onSubmit={handleEmailPasswordSubmit}>
        <label className="grid gap-2 text-sm">
          <span className="font-medium">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-lesson)] px-4 py-3"
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-lesson)] px-4 py-3"
            placeholder={isSignup ? "Create a password" : "Enter your password"}
            required
          />
        </label>

        {message ? (
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-lesson)] px-4 py-3 text-sm text-[var(--color-fg-muted)]">
            {message}
          </div>
        ) : null}

        <button type="submit" className="button-primary mt-2" disabled={loading}>
          {loading ? "Working..." : isSignup ? "Create account" : "Log in"}
        </button>
      </form>

      <div className="mt-4">
        <button type="button" className="button-secondary w-full" onClick={handleGoogleAuth} disabled={loading}>
          Continue with Google
        </button>
      </div>

      <div className="mt-6 text-sm text-[var(--color-fg-muted)]">
        {isSignup ? "Already have an account?" : "Need an account?"}{" "}
        <Link
          href={safeNextHref ? `${isSignup ? "/login" : "/signup"}?next=${encodeURIComponent(safeNextHref)}` : isSignup ? "/login" : "/signup"}
          className="font-medium text-[var(--color-accent-primary)]"
        >
          {isSignup ? "Log in" : "Create one"}
        </Link>
      </div>
    </div>
  );
}
