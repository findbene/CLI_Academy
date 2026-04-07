"use client";

import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

interface OnboardingAnswers {
  host_os: string;
  primary_goal: string;
  primary_role: string;
  skill_level: string;
  target_env: string;
}

const defaultAnswers: OnboardingAnswers = {
  host_os: "windows",
  primary_goal: "setup-and-first-success",
  primary_role: "beginner",
  skill_level: "new",
  target_env: "local-laptop",
};

const stepOrder = ["machine", "confidence", "goal"] as const;

export function OnboardingWizard() {
  const router = useRouter();
  const [answers, setAnswers] = useState<OnboardingAnswers>(defaultAnswers);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        const supabase = getSupabaseBrowserClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          if (!cancelled) {
            setSignedIn(false);
            setMessage("Sign in first so CLI Academy can save your setup path and tutor context.");
          }
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("onboarding_answers, onboarding_completed")
          .eq("id", user.id)
          .maybeSingle();

        if (!cancelled) {
          setSignedIn(true);
          if (profile?.onboarding_completed) {
            startTransition(() => {
              router.replace("/dashboard");
              router.refresh();
            });
            return;
          }

          if (profile?.onboarding_answers && typeof profile.onboarding_answers === "object") {
            setAnswers((current) => ({
              ...current,
              ...(profile.onboarding_answers as Partial<OnboardingAnswers>),
            }));
          }
        }
      } catch (error) {
        if (!cancelled) {
          setMessage(error instanceof Error ? error.message : "Could not load onboarding data.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [router]);

  function updateAnswer<K extends keyof OnboardingAnswers>(key: K, value: OnboardingAnswers[K]) {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleFinish() {
    setSaving(true);
    setMessage(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Sign in before saving onboarding.");
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          onboarding_answers: answers,
          onboarding_completed: true,
        })
        .eq("id", user.id);

      if (error) {
        throw error;
      }

      startTransition(() => {
        router.push("/dashboard");
        router.refresh();
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save onboarding yet.");
    } finally {
      setSaving(false);
    }
  }

  const stepKey = stepOrder[currentStep];

  return (
    <div className="grid gap-8">
      <div className="panel p-6">
        <div className="eyebrow">Onboarding wizard</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Tell CLI Academy about your setup and goals</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-fg-muted)]">
          This is how the product decides which setup path, troubleshooting guidance, and next lessons to prioritize.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {stepOrder.map((step, index) => (
            <span
              key={step}
              className="badge"
              data-tone={index === currentStep ? "accent" : "default"}
            >
              Step {index + 1}
            </span>
          ))}
        </div>
      </div>

      {!signedIn && !loading ? (
        <div className="panel p-6">
          <p className="text-sm leading-6 text-[var(--color-fg-muted)]">{message}</p>
          <div className="mt-5 flex gap-3">
            <Link href="/login" className="button-primary">
              Log in
            </Link>
            <Link href="/signup" className="button-secondary">
              Create account
            </Link>
          </div>
        </div>
      ) : (
        <div className="panel p-6">
          {stepKey === "machine" ? (
            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm">
                <span className="font-medium">Operating system</span>
                <select
                  value={answers.host_os}
                  onChange={(event) => updateAnswer("host_os", event.target.value)}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-lesson)] px-4 py-3"
                >
                  <option value="windows">Windows</option>
                  <option value="macos">macOS</option>
                  <option value="linux">Linux</option>
                </select>
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-medium">Target environment</span>
                <select
                  value={answers.target_env}
                  onChange={(event) => updateAnswer("target_env", event.target.value)}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-lesson)] px-4 py-3"
                >
                  <option value="local-laptop">Local laptop or desktop</option>
                  <option value="vps">VPS</option>
                  <option value="mac-mini">Mac mini or dedicated machine</option>
                </select>
              </label>
            </div>
          ) : null}

          {stepKey === "confidence" ? (
            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm">
                <span className="font-medium">Skill level</span>
                <select
                  value={answers.skill_level}
                  onChange={(event) => updateAnswer("skill_level", event.target.value)}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-lesson)] px-4 py-3"
                >
                  <option value="new">Completely new</option>
                  <option value="beginner">Beginner but trying</option>
                  <option value="intermediate">Comfortable with terminals</option>
                </select>
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-medium">Primary role</span>
                <select
                  value={answers.primary_role}
                  onChange={(event) => updateAnswer("primary_role", event.target.value)}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-lesson)] px-4 py-3"
                >
                  <option value="beginner">Beginner learner</option>
                  <option value="founder">Founder</option>
                  <option value="marketer">Marketer</option>
                  <option value="student">Student</option>
                  <option value="developer">Developer</option>
                  <option value="analyst">Analyst</option>
                </select>
              </label>
            </div>
          ) : null}

          {stepKey === "goal" ? (
            <div className="grid gap-5">
              <label className="grid gap-2 text-sm">
                <span className="font-medium">What do you want help with first?</span>
                <select
                  value={answers.primary_goal}
                  onChange={(event) => updateAnswer("primary_goal", event.target.value)}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-lesson)] px-4 py-3"
                >
                  <option value="setup-and-first-success">Set up Claude Code and get a first win</option>
                  <option value="troubleshooting">Fix my setup and troubleshoot errors</option>
                  <option value="cowork">Learn Claude CoWork</option>
                  <option value="automation">Build workflows and automation later</option>
                </select>
              </label>

              <div className="callout" data-tone="accent">
                <h3>What happens next</h3>
                <p>
                  CLI Academy will use these answers to steer you toward the safest setup path, the right troubleshooting
                  guides, and the most useful first lessons.
                </p>
              </div>
            </div>
          ) : null}

          {message ? (
            <p className="mt-5 text-sm leading-6 text-[var(--color-fg-muted)]">{message}</p>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            {currentStep > 0 ? (
              <button type="button" className="button-secondary" onClick={() => setCurrentStep((step) => step - 1)}>
                Back
              </button>
            ) : null}

            {currentStep < stepOrder.length - 1 ? (
              <button
                type="button"
                className="button-primary"
                onClick={() => setCurrentStep((step) => step + 1)}
                disabled={loading || !signedIn}
              >
                Next step
              </button>
            ) : (
              <button type="button" className="button-primary" onClick={handleFinish} disabled={saving || !signedIn}>
                {saving ? "Saving..." : "Finish onboarding"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
