"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Compass,
  Download,
  Lightbulb,
  SendHorizontal,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import { startTransition, useCallback, useDeferredValue, useEffect, useRef, useState } from "react";
import { useTutorRuntime } from "@/components/tutor/TutorRuntimeProvider";
import { getTutorSupportMatches } from "@/lib/support";
import {
  getTutorModeDefinition,
  mapLearningModeToTutorMode,
  TUTOR_MODE_DEFINITIONS,
  type TutorMode,
  type TutorTier,
} from "@/lib/tutor-config";

interface TutorMessage {
  content: string;
  id: string;
  role: "assistant" | "user";
}

interface TutorSessionState {
  configurationLocation: string | null;
  configurationMessage: string | null;
  configured: boolean;
  dailyLimit: number | null;
  loaded: boolean;
  loading: boolean;
  remaining: number | null;
  runtimeReady: boolean;
  signedIn: boolean;
  tier: TutorTier | null;
}

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function buildWelcomeMessage(lessonTitle?: string): TutorMessage {
  return {
    content: lessonTitle
      ? `I’m your CLI Academy tutor for "${lessonTitle}". I act like a calm setup coach, troubleshooting analyst, concept explainer, and safety-minded guide. I’ll help you understand what is happening, choose the next safest step, know what to expect, and know when to stop.`
      : "I’m your CLI Academy tutor. I act like a calm setup coach, troubleshooting analyst, concept explainer, and safety-minded guide. I’ll help you understand what is happening, choose the next safest step, know what to expect, and know when to stop.",
    id: makeId("assistant"),
    role: "assistant",
  };
}

function learningModeLabel(mode?: string) {
  if (mode === "hint") return "Hint-based lesson";
  if (mode === "independent") return "Independent lesson";
  return "Guided lesson";
}

function modeIcon(mode: TutorMode) {
  if (mode === "troubleshooting") return Wrench;
  if (mode === "planning" || mode === "compare_options") return Compass;
  if (mode === "export_helper") return Download;
  return Lightbulb;
}

function quickPrompts(mode: TutorMode, lessonTitle?: string) {
  const prompts = [
    getTutorModeDefinition(mode).quickPrompt,
    lessonTitle ? `Help me with the next safest step in "${lessonTitle}".` : "Help me choose the next safest thing to do.",
    "What should I expect to see if this works correctly?",
  ];

  if (mode === "troubleshooting") prompts[2] = "This failed. What should I check first?";
  if (mode === "planning") prompts[1] = "What should I learn next after this?";
  if (mode === "export_helper") prompts[1] = "Point me to the best checklist or download for this.";

  return prompts;
}

function buildCapabilityCards(tier: TutorTier | null) {
  return [
    {
      body: "Install, configure, verify, and recover without skipping the calm checks.",
      icon: Wrench,
      title: "Setup coach",
    },
    {
      body: "Match symptoms, name the likely cause, and recommend the next safest action.",
      icon: AlertTriangle,
      title: "Troubleshooting analyst",
    },
    {
      body: "Translate jargon into plain language with the level of an expert who teaches beginners well.",
      icon: Lightbulb,
      title: "Concept tutor",
    },
    {
      body:
        tier === "pro"
          ? "Compare paths, plan what to learn next, and point to the right assets."
          : "Planning, compare-options, and asset-finding unlock on Pro.",
      icon: tier === "pro" ? Compass : Download,
      title: tier === "pro" ? "Path and workflow guide" : "Deeper Pro modes",
    },
  ];
}

function buildActionLinks(mode: TutorMode, tier: TutorTier | null) {
  const links = [
    { href: "/troubleshooting", label: "Troubleshooting center" },
    { href: "/compatibility", label: "Compatibility matrix" },
    { href: mode === "export_helper" ? "/resources" : "/support", label: mode === "export_helper" ? "Resources and templates" : "Support hub" },
  ];

  if (tier !== "pro" && (mode === "planning" || mode === "compare_options" || mode === "export_helper")) {
    return [{ href: "/pricing", label: "Unlock Pro modes" }, ...links.slice(0, 2)];
  }

  return links;
}

export function FloatingTutor() {
  const { clearPendingHelpRequest, learningMode, lessonTitle, pendingHelpRequest, tutorPreload } = useTutorRuntime();
  const pathname = usePathname();
  const derivedMode = mapLearningModeToTutorMode(learningMode);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<TutorMode>(derivedMode);
  const [showToolkit, setShowToolkit] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<TutorMessage[]>([buildWelcomeMessage()]);
  const [session, setSession] = useState<TutorSessionState>({
    configurationLocation: null,
    configurationMessage: null,
    configured: true,
    dailyLimit: null,
    loaded: false,
    loading: false,
    remaining: null,
    runtimeReady: true,
    signedIn: false,
    tier: null,
  });
  const endRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const supportQuery = useDeferredValue(input.trim() || [...messages].reverse().find((message) => message.role === "user")?.content || "");
  const supportMatches = getTutorSupportMatches(supportQuery, lessonTitle);

  useEffect(() => {
    setMode(derivedMode);
    setInput("");
    setMessages([buildWelcomeMessage(lessonTitle)]);
  }, [derivedMode, lessonTitle, tutorPreload]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open]);

  useEffect(() => {
    if (session.loaded && session.tier !== "pro" && getTutorModeDefinition(mode).plan === "pro") {
      setMode(derivedMode);
    }
  }, [derivedMode, mode, session.loaded, session.tier]);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    async function loadSession() {
      setSession((current) => ({ ...current, loading: true }));
      try {
        const response = await fetch("/api/tutor");
        const data = (await response.json()) as Partial<TutorSessionState>;
        if (cancelled) return;
        setSession({
          configurationLocation: typeof data.configurationLocation === "string" ? data.configurationLocation : null,
          configurationMessage: typeof data.configurationMessage === "string" ? data.configurationMessage : null,
          configured: data.configured !== false,
          dailyLimit: typeof data.dailyLimit === "number" ? data.dailyLimit : null,
          loaded: true,
          loading: false,
          remaining: typeof data.remaining === "number" ? data.remaining : null,
          runtimeReady: data.runtimeReady !== false,
          signedIn: Boolean(data.signedIn),
          tier: data.tier === "pro" ? "pro" : data.tier === "free" ? "free" : null,
        });
      } catch {
        if (cancelled) return;
        setSession((current) => ({ ...current, loaded: true, loading: false }));
      }
    }

    void loadSession();
    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) {
      setShowToolkit(false);
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      textareaRef.current?.focus();
    }, 120);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [mode, open, session.configured, session.loaded, session.remaining, session.runtimeReady, session.signedIn]);

  function resetConversation() {
    setInput("");
    setMessages([buildWelcomeMessage(lessonTitle)]);
  }

  const handleSend = useCallback(async (prefilledQuestion?: string) => {
    const question = (prefilledQuestion ?? input).trim();
    if (!question || loading) return;

    const assistantId = makeId("assistant");
    startTransition(() => {
      setMessages((current) => [
        ...current,
        { content: question, id: makeId("user"), role: "user" },
        { content: "", id: assistantId, role: "assistant" },
      ]);
    });
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          learningMode,
          lessonTitle,
          message: question,
          tutorMode: mode,
          tutorPreload,
        }),
      });

      const contentType = response.headers.get("content-type") ?? "";
      if (!response.ok || contentType.includes("application/json")) {
        const data = (await response.json().catch(() => ({}))) as { message?: string };
        throw new Error(data.message ?? "The tutor is unavailable right now.");
      }

      if (!response.body) throw new Error("Missing response stream");

      setSession((current) =>
        current.remaining == null ? current : { ...current, remaining: Math.max(0, current.remaining - 1) },
      );

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistant = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const parsed = JSON.parse(payload) as { text?: string; type: string };
            if (parsed.type === "delta" && parsed.text) {
              assistant += parsed.text;
              startTransition(() => {
                setMessages((current) =>
                  current.map((message) => (message.id === assistantId ? { ...message, content: assistant } : message)),
                );
              });
            }
          } catch {
            // Ignore malformed chunks.
          }
        }
      }
    } catch (error) {
      startTransition(() => {
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId
              ? {
                  ...message,
                  content:
                    error instanceof Error
                      ? error.message
                      : "The tutor is temporarily unavailable. Please try again in a moment.",
                }
              : message,
          ),
        );
      });
    } finally {
      setLoading(false);
    }
  }, [input, learningMode, lessonTitle, loading, mode, tutorPreload]);

  useEffect(() => {
    if (!pendingHelpRequest || loading) {
      return;
    }

    setOpen(true);

    if (pendingHelpRequest.autoSend) {
      void handleSend(pendingHelpRequest.prompt);
    } else {
      setInput(pendingHelpRequest.prompt);
    }

    clearPendingHelpRequest();
  }, [clearPendingHelpRequest, handleSend, loading, pendingHelpRequest]);

  const selectedMode = getTutorModeDefinition(mode);
  const signedOut = session.loaded && !session.signedIn;
  const atLimit = typeof session.remaining === "number" && session.remaining <= 0;
  const runtimeUnavailable = session.loaded && !session.runtimeReady;
  const hasConversation = messages.length > 1;
  const capabilityCards = buildCapabilityCards(session.tier);
  const actionLinks = buildActionLinks(mode, session.tier);
  const starterPrompts = quickPrompts(mode, lessonTitle);
  const composerDisabled = loading || signedOut || atLimit || !session.configured || runtimeUnavailable;
  const configurationMessage = session.configurationMessage ?? "Tutor setup is incomplete. Add the required runtime configuration first.";
  const tutorEnabled = ["/dashboard", "/downloads", "/labs", "/learn", "/onboarding", "/settings"].some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  const queuePrompt = useCallback((prompt: string, closeToolkit?: boolean) => {
    setInput(prompt);
    if (closeToolkit) {
      setShowToolkit(false);
    }
    window.setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  }, []);

  if (!tutorEnabled) {
    return null;
  }

  const toolkitBody = (closeToolkitAfterAction: boolean) => (
    <>
      <section className="rounded-[1.2rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-4 shadow-[var(--shadow-1)]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-primary-hover)]">
          Tutor mode
        </div>
        <div className="mt-3 grid gap-2">
          {TUTOR_MODE_DEFINITIONS.map((modeDefinition) => {
            const Icon = modeIcon(modeDefinition.id);
            const disabled = modeDefinition.plan === "pro" && (!session.loaded || session.tier !== "pro");

            return (
              <button
                key={modeDefinition.id}
                type="button"
                disabled={disabled}
                onClick={() => {
                  setMode(modeDefinition.id);
                  if (closeToolkitAfterAction) {
                    setShowToolkit(false);
                  }
                }}
                className={`rounded-[1rem] border px-3 py-3 text-left transition ${
                  mode === modeDefinition.id
                    ? "border-[var(--color-accent-primary)] bg-[var(--color-accent-subtle)] text-[var(--color-fg-default)]"
                    : "border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] text-[var(--color-fg-default)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-panel)]"
                } ${disabled ? "cursor-not-allowed opacity-55" : ""}`}
              >
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Icon className="h-4 w-4 text-[var(--color-accent-primary)]" />
                  {modeDefinition.label}
                  {modeDefinition.plan === "pro" ? (
                    <span className="rounded-full bg-[var(--color-bg-panel)] px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
                      Pro
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-xs leading-5 text-[var(--color-fg-muted)]">{modeDefinition.description}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-[1.2rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-4 shadow-[var(--shadow-1)]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-primary-hover)]">
          Active mode
        </div>
        <div className="mt-2 text-sm font-semibold text-[var(--color-fg-default)]">{selectedMode.label}</div>
        <p className="mt-1 text-xs leading-5 text-[var(--color-fg-muted)]">{selectedMode.description}</p>
      </section>

      <section className="mt-3 rounded-[1.2rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-4 shadow-[var(--shadow-1)]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-primary-hover)]">
          Starter prompts
        </div>
        <div className="mt-3 grid gap-2">
          {starterPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => queuePrompt(prompt, closeToolkitAfterAction)}
              disabled={composerDisabled}
              className="rounded-[1rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-3 py-3 text-left text-sm leading-5 text-[var(--color-fg-default)] transition hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-panel)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {prompt}
            </button>
          ))}
        </div>
      </section>

      {supportQuery ? (
        <section className="mt-3 rounded-[1.2rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-4 shadow-[var(--shadow-1)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-primary-hover)]">
            Grounding
          </div>
          <div className="mt-3 grid gap-2">
            {supportMatches.guides.slice(0, 1).map((guide) => (
              <article key={guide.slug} className="rounded-[1rem] bg-[var(--color-bg-panel-subtle)] px-3 py-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-primary-hover)]">Guide</div>
                <div className="mt-1 text-sm font-semibold text-[var(--color-fg-default)]">{guide.title}</div>
                <p className="mt-1 text-xs leading-5 text-[var(--color-fg-muted)]">{guide.nextStep}</p>
              </article>
            ))}
            {supportMatches.compatibility.slice(0, 1).map((entry) => (
              <article key={entry.slug} className="rounded-[1rem] bg-[var(--color-bg-panel-subtle)] px-3 py-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-primary-hover)]">Compatibility</div>
                <div className="mt-1 text-sm font-semibold text-[var(--color-fg-default)]">{entry.environment}</div>
                <p className="mt-1 text-xs leading-5 text-[var(--color-fg-muted)]">{entry.notes}</p>
              </article>
            ))}
            {supportMatches.issues.slice(0, 1).map((issue) => (
              <article key={issue.slug} className="rounded-[1rem] bg-[rgba(201,134,18,0.08)] px-3 py-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-warning)]">Known issue</div>
                <div className="mt-1 text-sm font-semibold text-[var(--color-fg-default)]">{issue.title}</div>
                <p className="mt-1 text-xs leading-5 text-[var(--color-fg-muted)]">{issue.workaround}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-3 rounded-[1.2rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-4 shadow-[var(--shadow-1)]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-primary-hover)]">
          Capabilities
        </div>
        <div className="mt-3 grid gap-2">
          {capabilityCards.map((card) => (
            <div key={card.title} className="rounded-[1rem] bg-[var(--color-bg-panel-subtle)] px-3 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-fg-default)]">
                <card.icon className="h-4 w-4 text-[var(--color-accent-primary)]" />
                {card.title}
              </div>
              <p className="mt-1 text-xs leading-5 text-[var(--color-fg-muted)]">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-3 rounded-[1.2rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-4 shadow-[var(--shadow-1)]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-primary-hover)]">
          Quick links
        </div>
        <div className="mt-3 grid gap-2">
          {actionLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[1rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-3 py-3 text-sm font-medium text-[var(--color-fg-default)] transition hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-panel)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </>
  );

  return (
    <>
      {!open ? (
        <button
          type="button"
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-[1.55rem] border border-white/12 bg-[linear-gradient(145deg,rgba(12,19,36,0.98),rgba(20,32,58,0.96))] px-4 py-3.5 text-white shadow-[0_24px_70px_rgba(12,19,36,0.36)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_32px_86px_rgba(12,19,36,0.42)]"
          onClick={() => setOpen(true)}
          aria-label="Open AI tutor"
        >
          <span className="relative flex h-12 w-12 items-center justify-center rounded-[1.1rem] border border-white/10 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
            <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-accent-primary)] shadow-[0_0_0_4px_rgba(22,176,168,0.14)]" />
            <Bot className="h-5 w-5" />
          </span>
          <span className="hidden min-w-0 flex-col items-start text-left sm:flex">
            <span className="inline-flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-[var(--color-accent-primary)]" />
              AI Tutor
            </span>
            <span className="text-xs text-white/72">
              {lessonTitle ? "Lesson-aware help without losing context" : "Grounded setup and troubleshooting help"}
            </span>
          </span>
          <span className="hidden rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70 lg:inline-flex">
            {runtimeUnavailable ? "Config check" : selectedMode.shortLabel}
          </span>
        </button>
      ) : null}

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-[rgba(12,19,36,0.56)] backdrop-blur-[8px]"
              onClick={() => setOpen(false)}
              aria-label="Close AI tutor"
            />

            <motion.aside
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
              className="fixed inset-x-2 bottom-2 top-2 z-50 flex flex-col overflow-hidden rounded-[1.9rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] shadow-[0_30px_90px_rgba(12,19,36,0.28)] lg:bottom-6 lg:left-6 lg:right-6 lg:top-6 xl:bottom-6 xl:left-auto xl:right-6 xl:top-6 xl:h-[min(88vh,56rem)] xl:w-[min(96vw,82rem)]"
              role="dialog"
              aria-modal="true"
              aria-label="CLI Academy AI tutor"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(22,176,168,0.14),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.08),transparent_28%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(22,176,168,0.08),transparent)]" />
              <div className="relative flex h-full min-h-0 flex-col">
                <header className="border-b border-[var(--color-border-subtle)] px-5 py-4 md:px-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-primary-hover)]">
                        <Sparkles className="h-3.5 w-3.5" />
                        CLI Academy Tutor
                      </div>
                      <div className="mt-3 text-lg font-semibold text-[var(--color-fg-default)] md:text-[1.3rem]">
                        {hasConversation ? "Stay in the thread and ask the next thing." : "Ask what failed, what to do next, or why it matters."}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-[var(--color-fg-muted)]">
                        <span className="rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-3 py-1">
                          {lessonTitle ? lessonTitle : "General support context"}
                        </span>
                        <span className="rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-3 py-1">
                          {selectedMode.label}
                        </span>
                        <span
                          className={`rounded-full border px-3 py-1 ${
                            runtimeUnavailable
                              ? "border-[rgba(214,90,70,0.24)] bg-[rgba(214,90,70,0.08)] text-[var(--color-danger)]"
                              : "border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)]"
                          }`}
                        >
                          {runtimeUnavailable ? "Runtime needs attention" : "Runtime ready"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {messages.length > 1 ? (
                        <button
                          type="button"
                          className="hidden rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-3 py-2 text-xs font-medium text-[var(--color-fg-muted)] transition hover:border-[var(--color-border-hover)] hover:text-[var(--color-fg-default)] md:inline-flex"
                          onClick={resetConversation}
                        >
                          New thread
                        </button>
                      ) : null}
                      <button
                        type="button"
                        className={`rounded-full border px-3 py-2 text-xs font-medium transition ${
                          showToolkit
                            ? "border-[var(--color-accent-primary)] bg-[var(--color-accent-subtle)] text-[var(--color-fg-default)]"
                            : "border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] text-[var(--color-fg-muted)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-fg-default)]"
                        }`}
                        onClick={() => setShowToolkit((current) => !current)}
                      >
                        {showToolkit ? "Hide tools" : "Tools"}
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-2 text-[var(--color-fg-muted)] transition hover:border-[var(--color-border-hover)] hover:text-[var(--color-fg-default)]"
                        onClick={() => setOpen(false)}
                        aria-label="Close tutor panel"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                </header>

                <div className="relative flex min-h-0 flex-1 overflow-hidden">
                  <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                    <div className="flex-1 overflow-y-auto px-5 py-4 md:px-6">
                      {messages.length === 1 ? (
                        <div className="mb-4 rounded-[1.25rem] border border-[var(--color-border-subtle)] bg-[linear-gradient(145deg,rgba(234,241,247,0.42),rgba(255,255,255,0.96))] px-4 py-3 text-sm leading-6 text-[var(--color-fg-muted)] shadow-[var(--shadow-1)]">
                          Ask a concrete question, paste an error, or describe the step that feels risky. Use Tools for mode changes, prompt shortcuts, grounding, and support links.
                        </div>
                      ) : null}

                      <div className="grid gap-3 md:gap-4">
                        {messages.map((message) => (
                          <article
                            key={message.id}
                            className={`rounded-[1.45rem] px-4 py-3.5 shadow-[var(--shadow-1)] md:px-5 ${
                              message.role === "assistant"
                                ? "max-w-full border border-[var(--color-border-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(234,241,247,0.58))] text-[var(--color-fg-default)]"
                                : "ml-auto max-w-[86%] bg-[linear-gradient(135deg,var(--color-accent-primary)_0%,var(--color-accent-primary-hover)_100%)] text-white"
                            }`}
                          >
                            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] opacity-70">
                              {message.role === "assistant" ? `AI tutor · ${selectedMode.shortLabel}` : "You"}
                            </div>
                            <div className="whitespace-pre-wrap text-[15px] leading-7">
                              {message.content || (loading && message.role === "assistant" ? "Thinking through the safest next step..." : "")}
                            </div>
                          </article>
                        ))}
                        <div ref={endRef} />
                      </div>
                    </div>

                    <footer className="border-t border-[var(--color-border-subtle)] px-5 pb-4 pt-3 md:px-6 md:pb-5">
                      {!session.configured ? (
                        <div className="rounded-[1.3rem] border border-[rgba(214,90,70,0.22)] bg-[rgba(214,90,70,0.08)] p-4 text-sm text-[var(--color-fg-muted)]">
                          <div className="font-semibold text-[var(--color-fg-default)]">Tutor configuration needs attention</div>
                          <p className="mt-1 leading-6">{configurationMessage}</p>
                          {session.configurationLocation ? (
                            <p className="mt-2 text-xs leading-5 text-[var(--color-fg-muted)]">
                              Last detected config file: {session.configurationLocation}
                            </p>
                          ) : null}
                        </div>
                      ) : signedOut ? (
                        <div className="rounded-[1.3rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] p-4">
                          <div className="text-sm font-semibold text-[var(--color-fg-default)]">Sign in to activate your tutor</div>
                          <p className="mt-1 text-sm leading-6 text-[var(--color-fg-muted)]">
                            Your tutor uses lesson context, plan limits, and troubleshooting data tied to your account.
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Link href="/login" className="button-primary">
                              Log in
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link href="/pricing" className="button-secondary">View plans</Link>
                          </div>
                        </div>
                      ) : atLimit ? (
                        <div className="rounded-[1.3rem] border border-[rgba(201,134,18,0.28)] bg-[rgba(201,134,18,0.08)] p-4">
                          <div className="text-sm font-semibold text-[var(--color-fg-default)]">Daily tutor limit reached</div>
                          <p className="mt-1 text-sm leading-6 text-[var(--color-fg-muted)]">
                            You’ve used today’s tutor allocation. Keep learning with the lesson content and support center, or upgrade for more tutor depth.
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Link href="/support" className="button-secondary">Support center</Link>
                            <Link href="/pricing" className="button-primary">Upgrade</Link>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-[1.45rem] border border-[var(--color-border-subtle)] bg-[linear-gradient(180deg,rgba(234,241,247,0.42),rgba(255,255,255,0.96))] p-3.5 shadow-[var(--shadow-1)] md:p-4">
                          <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder={mode === "troubleshooting" ? "Describe the symptom, error, or step that failed." : "Ask about setup, concepts, troubleshooting, or what to learn next."}
                            className="min-h-[5.5rem] max-h-44 w-full resize-y bg-transparent px-2 py-2 text-[15px] leading-7 text-[var(--color-fg-default)] outline-none"
                            aria-label="Your question for the AI tutor"
                            onKeyDown={(event) => {
                              if (event.key === "Enter" && !event.shiftKey) {
                                event.preventDefault();
                                void handleSend();
                              }
                            }}
                          />
                          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border-subtle)] px-2 pt-3">
                            <div className="text-xs leading-5 text-[var(--color-fg-muted)]">
                              {session.loading
                                ? "Checking access..."
                                : session.signedIn
                                  ? `${learningModeLabel(learningMode)} · ${session.tier === "pro" ? "Pro" : "Free"}${typeof session.remaining === "number" && typeof session.dailyLimit === "number" ? ` · ${session.remaining}/${session.dailyLimit} left today` : ""}`
                                  : "Sign in to activate the tutor"}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                className="button-secondary"
                                onClick={() => setShowToolkit(true)}
                              >
                                Tools
                              </button>
                              {messages.length > 1 ? (
                                <button type="button" className="button-secondary" onClick={resetConversation}>
                                  New thread
                                </button>
                              ) : null}
                              <button type="button" className="button-primary" onClick={() => void handleSend()} disabled={loading || !input.trim() || composerDisabled}>
                                {loading ? "Sending..." : "Send to tutor"}
                                <SendHorizontal className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </footer>
                  </div>

                  <AnimatePresence>
                    {showToolkit ? (
                      <motion.aside
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
                        className="absolute inset-y-0 right-0 z-10 flex w-full flex-col border-l border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] shadow-[-16px_0_40px_rgba(12,19,36,0.12)] backdrop-blur sm:max-w-[24rem]"
                      >
                        <div className="border-b border-[var(--color-border-subtle)] px-4 py-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-sm font-semibold text-[var(--color-fg-default)]">Tutor tools</div>
                              <p className="mt-1 text-xs leading-5 text-[var(--color-fg-muted)]">
                                Keep shortcuts and support nearby without shrinking the chat.
                              </p>
                            </div>
                            <button
                              type="button"
                              className="rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-2 text-[var(--color-fg-muted)] transition hover:border-[var(--color-border-hover)] hover:text-[var(--color-fg-default)]"
                              onClick={() => setShowToolkit(false)}
                              aria-label="Close tutor tools"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-4">{toolkitBody(true)}</div>
                      </motion.aside>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
