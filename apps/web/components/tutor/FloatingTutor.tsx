"use client";

import { useState } from "react";
import { Bot, X, Sparkles } from "lucide-react";

interface TutorMessage {
  role: "user" | "assistant";
  content: string;
}

interface FloatingTutorProps {
  lessonTitle?: string;
  tutorPreload?: string;
  learningMode?: string;
}

export function FloatingTutor({ lessonTitle, tutorPreload, learningMode = "guided" }: FloatingTutorProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(learningMode);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI tutor. I can help you understand concepts, debug issues, and figure out what to learn next.",
    },
  ]);

  async function handleSend() {
    const question = input.trim();
    if (!question || loading) {
      return;
    }

    setMessages((current) => [...current, { role: "user", content: question }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question,
          lessonTitle,
          tutorPreload,
          learningMode: mode,
        }),
      });

      const contentType = response.headers.get("content-type") ?? "";
      if (!response.ok || contentType.includes("application/json")) {
        const data = (await response.json().catch(() => ({}))) as { message?: string };
        throw new Error(data.message ?? "The tutor is unavailable right now.");
      }

      if (!response.body) {
        throw new Error("Missing response stream");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistant = "";

      setMessages((current) => [...current, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
          if (!line.startsWith("data:")) {
            continue;
          }

          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") {
            continue;
          }

          try {
            const parsed = JSON.parse(payload) as { type: string; text?: string };
            if (parsed.type === "delta" && parsed.text) {
              assistant += parsed.text;
              setMessages((current) => {
                const next = [...current];
                next[next.length - 1] = { role: "assistant", content: assistant };
                return next;
              });
            }
          } catch {
            // Ignore malformed chunks.
          }
        }
      }
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "The tutor is temporarily unavailable. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className={`fixed right-6 bottom-6 z-40 flex h-14 w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full text-white shadow-[0_0_25px_rgba(45,212,191,0.5)] transition-all duration-300 ease-out hover:scale-105 active:scale-95 ${
          open ? "bg-slate-800 rotate-90 shadow-none border border-white/10" : "bg-gradient-to-tr from-emerald-400 to-teal-500 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
        }`}
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close AI tutor" : "Open AI tutor"}
      >
        {open ? <X className="h-6 w-6 lg:h-7 lg:w-7" /> : <Bot className="h-7 w-7 lg:h-8 lg:w-8" />}
      </button>

      {open ? (
        <aside
          className="fixed right-0 bottom-16 z-40 flex h-[min(34rem,calc(100dvh-5rem))] w-full flex-col overflow-hidden border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] shadow-[var(--shadow-3)] md:right-5 md:bottom-20 md:w-[24rem] md:rounded-[var(--radius-2xl)] md:border"
          role="dialog"
          aria-label="AI Tutor"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
            }
          }}
        >
          <div className="border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-4 flex justify-between items-center rounded-t-[inherit]">
            <div>
              <div className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-emerald-400 inline-flex items-center gap-1.5">
                 <Sparkles className="h-4 w-4 text-emerald-400" /> AI Tutor
              </div>
              <div className="mt-1 text-[11px] text-[var(--color-fg-muted)] tracking-wide uppercase font-semibold">
                {lessonTitle ? `Context: ${lessonTitle}` : "Ask me anything"}
              </div>
            </div>
            
            <select 
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="text-xs border border-teal-500/30 rounded-md px-2 py-1.5 bg-teal-500/10 backdrop-blur-md text-white font-medium focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer hover:bg-teal-500/20 transition-colors shadow-[0_0_10px_rgba(45,212,191,0.15)]"
            >
               <option value="guided" className="bg-[#0A0D14] text-white">Guided Learning</option>
               <option value="hint" className="bg-[#0A0D14] text-white">Hint Based</option>
               <option value="autonomous" className="bg-[#0A0D14] text-white">Autonomous Mode</option>
            </select>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid gap-3">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[90%] rounded-[var(--radius-lg)] px-4 py-3 text-sm leading-6 ${
                    message.role === "assistant"
                      ? "bg-[var(--color-bg-panel-subtle)] text-[var(--color-fg-default)]"
                      : "ml-auto bg-[var(--color-accent-primary)] text-white"
                  }`}
                >
                  {message.content || (loading && message.role === "assistant" ? (
                    <span className="inline-flex items-center gap-1">
                      <span className="size-1.5 animate-bounce rounded-full bg-[var(--color-fg-muted)] [animation-delay:0ms]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-[var(--color-fg-muted)] [animation-delay:150ms]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-[var(--color-fg-muted)] [animation-delay:300ms]" />
                    </span>
                  ) : "")}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[var(--color-border-subtle)] p-4">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about setup, troubleshooting, or what to learn next."
              className="min-h-24 w-full rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-lesson)] px-3 py-2 text-sm"
              aria-label="Your question for the AI tutor"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-xs text-[var(--color-fg-muted)]">Free: 10/day · Pro: 100/day</span>
              <button type="button" className="button-primary" onClick={handleSend} disabled={loading}>
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </aside>
      ) : null}
    </>
  );
}
