"use client";

import { useState } from "react";

interface TutorMessage {
  role: "user" | "assistant";
  content: string;
}

interface FloatingTutorProps {
  lessonTitle?: string;
}

export function FloatingTutor({ lessonTitle }: FloatingTutorProps) {
  const [open, setOpen] = useState(false);
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
        className="fixed right-5 bottom-5 z-40 rounded-full bg-[var(--color-accent-primary)] px-5 py-3 text-sm font-medium text-white shadow-[var(--shadow-2)]"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close AI tutor" : "Open AI tutor"}
      >
        {open ? "Close tutor" : "Open tutor"}
      </button>

      {open ? (
        <aside
          className="fixed right-5 bottom-20 z-40 flex h-[34rem] w-[min(100vw-2.5rem,24rem)] flex-col overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] shadow-[var(--shadow-3)]"
          role="dialog"
          aria-label="AI Tutor"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
            }
          }}
        >
          <div className="border-b border-[var(--color-border-subtle)] p-4">
            <div className="text-sm font-semibold">CLI Academy Tutor</div>
            <div className="mt-1 text-sm text-[var(--color-fg-muted)]">
              {lessonTitle ? `Lesson context: ${lessonTitle}` : "Ask me anything"}
            </div>
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
                  {message.content || (loading && message.role === "assistant" ? "..." : "")}
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
