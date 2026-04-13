"use client";

import Link from "next/link";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { getPublicSupabaseConfigMessage } from "@/lib/env";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { Eye, EyeOff, Shield, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { Spotlight } from "@/components/ui/spotlight";

// Three.js is ~150KB gzipped — lazy-load it so it does not block the auth page
// initial paint. The visual is decorative and appears beside the form.
const GenerativeArtScene = dynamic(
  () => import("@/components/ui/anomalous-matter-hero").then((m) => ({ default: m.GenerativeArtScene })),
  { ssr: false, loading: () => <div className="h-full w-full bg-[var(--color-bg-panel)]" /> },
);

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
  const emailInputId = `${mode}-email`;
  const passwordInputId = `${mode}-password`;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const isSignup = mode === "signup";
  const safeNextHref = sanitizeNextPath(nextHref);
  const configurationMessage = getPublicSupabaseConfigMessage();
  const authUnavailable = Boolean(configurationMessage);
  
  const title = isSignup ? "Create an account" : "Welcome back";
  const subtitle = isSignup ? "Start your journey to AI-assisted productivity." : "Enter your details to continue your learning path.";
  
  async function handleEmailPasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (authUnavailable) {
      setMessage(configurationMessage);
      return;
    }

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
    if (authUnavailable) {
      setMessage(configurationMessage);
      return;
    }

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

  async function handleGithubAuth() {
    if (authUnavailable) {
      setMessage(configurationMessage);
      return;
    }

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
        provider: "github",
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "GitHub sign-in is unavailable right now.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-white font-sans text-[var(--color-fg-default)]">
      
      {/* ── Left Side: Form ────────────────────────────────────── */}
      <div className="flex w-full flex-col justify-center lg:w-[45%] xl:w-[40%] bg-white px-8 sm:px-12 md:px-16 xl:px-24">
        
        <div className="mx-auto flex w-full max-w-[420px] flex-col">

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-[#111827]">{title}</h1>
            <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{subtitle}</p>
          </div>

          {/* Social Auth */}
          <div className="mb-6 flex gap-3">
            <button
              type="button"
              className="group flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-offset-2"
              onClick={handleGoogleAuth}
              disabled={loading || authUnavailable}
              aria-label="Continue with Google"
            >
              <svg className="h-5 w-5 transition-transform group-hover:scale-105" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="group flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#24292F] font-medium text-white shadow-sm transition hover:bg-[#1b1f24] focus:outline-none focus:ring-2 focus:ring-[#24292F] focus:ring-offset-2"
              onClick={handleGithubAuth}
              disabled={loading || authUnavailable}
              aria-label="Continue with GitHub"
            >
              <svg height="20" viewBox="0 0 16 16" width="20" className="fill-current text-white transition-transform group-hover:scale-105"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
              GitHub
            </button>
          </div>

          <div className="mb-6 flex w-full items-center gap-4">
            <div className="flex-1 border-t border-gray-100"></div>
            <span className="text-xs uppercase tracking-wide text-gray-400">or continue with email</span>
            <div className="flex-1 border-t border-gray-100"></div>
          </div>

          {configurationMessage ? (
             <div className="mb-6 w-full rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 shadow-sm flex items-center gap-2">
               <Shield className="h-4 w-4 shrink-0" />
               <p>{configurationMessage}</p>
             </div>
          ) : null}

          {/* Email/Pass Form */}
          <form className="flex flex-col gap-4" onSubmit={handleEmailPasswordSubmit}>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={emailInputId} className="text-sm font-medium text-gray-700">Email</label>
              <input
                id={emailInputId}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--color-accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-all"
                placeholder="developer@example.com"
                disabled={loading || authUnavailable}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor={passwordInputId} className="text-sm font-medium text-gray-700">Password</label>
                {!isSignup && (
                  <Link href="/forgot-password" className="text-xs font-semibold text-[var(--color-accent-primary)] hover:underline">
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <input
                  id={passwordInputId}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-4 pr-11 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--color-accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-all"
                  placeholder={isSignup ? "Create a strong password" : "Enter your password"}
                  disabled={loading || authUnavailable}
                  required
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-gray-400 transition hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {message && (
              <div className="rounded-xl bg-gray-50 border border-gray-200 p-3 text-sm text-gray-600 shadow-sm leading-relaxed">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="group mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent-primary)] text-sm font-semibold text-white shadow-md shadow-[var(--color-accent-primary)]/20 transition-all hover:bg-[var(--color-accent-emphasis)] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-offset-2 active:scale-[0.98]"
              disabled={loading || authUnavailable}
            >
              {loading ? "Processing..." : isSignup ? "Create your account" : "Sign in"}
              {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            {isSignup ? "Already have an account?" : "Don't have an account yet?"}{" "}
            <Link
              href={safeNextHref ? `${isSignup ? "/login" : "/signup"}?next=${encodeURIComponent(safeNextHref)}` : isSignup ? "/login" : "/signup"}
              className="font-semibold text-[var(--color-accent-primary)] hover:underline transition-all"
            >
              {isSignup ? "Sign in" : "Sign up"}
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right Side: Marketing Bit ────────────────────────────── */}
      <div className="hidden lg:flex w-full lg:w-[55%] xl:w-[60%] p-4 lg:p-6 lg:pl-0">
        <div className="relative flex-1 w-full rounded-3xl overflow-hidden bg-[#0A0D14] shadow-2xl border border-gray-100/10">
        
        {/* Render the Three.js Generative Art Scene */}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="var(--color-accent-primary)" />
        
        <div className="absolute inset-0 z-0 overflow-hidden mix-blend-screen pointer-events-none">
           <GenerativeArtScene />
        </div>
        
        {/* Soft bottom-up gradient to heavily ground the text */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/20 to-transparent pointer-events-none opacity-80" />

        {/* Minimalist Centered Typographic Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end items-center text-center p-12 xl:p-24 pb-24">
          
          <div className="max-w-xl px-4 animate-fade-in duration-700">
             <h1 className="text-xs font-mono tracking-[0.25em] text-teal-400 uppercase opacity-90 mb-6 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
               The Standard for AI Coding
             </h1>
             
             <p className="text-3xl md:text-[2.75rem] font-bold tracking-tight text-white leading-[1.15] drop-shadow-xl">
                Build with <span className="font-extralight italic text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 drop-shadow-sm">confidence.</span>
             </p>
             
             <p className="mt-6 max-w-md mx-auto text-[15px] leading-relaxed text-white/50 font-light mix-blend-plus-lighter">
                Transition seamlessly into an expert workflow that executes, debugs, and deploys autonomously.
             </p>
          </div>

        </div>

        </div>
      </div>

    </div>
  );
}
