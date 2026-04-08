"use client";

import { CheckCircle2, ChevronRight, Terminal } from "lucide-react";
import { useState } from "react";

interface VerificationBlockProps {
  deliverable?: string;
  verifyCheck?: string;
}

export function VerificationBlock({ deliverable, verifyCheck }: VerificationBlockProps) {
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "fail">("idle");
  const [output, setOutput] = useState("");

  async function handleVerify() {
    setStatus("verifying");
    // Simulate AI verification
    setTimeout(() => {
      if (output.trim().length > 5) {
        setStatus("success");
      } else {
        setStatus("fail");
      }
    }, 1500);
  }

  return (
    <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] overflow-hidden">
      <div className="border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-4 py-3 flex gap-2 items-center">
        <CheckCircle2 className="size-5 text-[var(--color-accent-primary)]" />
        <span className="font-semibold text-[var(--color-fg-default)]">Lesson Verification</span>
      </div>
      
      <div className="p-5 grid gap-5">
        <div className="grid gap-2">
          <div className="text-sm font-medium text-[var(--color-fg-muted)] uppercase tracking-wider">Deliverable</div>
          <div className="text-[var(--color-fg-default)]">{deliverable || "Complete the task above."}</div>
        </div>

        <div className="grid gap-2">
          <div className="text-sm font-medium text-[var(--color-fg-muted)] uppercase tracking-wider">Verification Task</div>
          <div className="text-[var(--color-fg-default)]">{verifyCheck || "Tutor Agent will review your progress."}</div>
        </div>

        <div className="bg-[#1e1e1e] rounded-[var(--radius-md)] border border-[#333] shadow-inner mt-2">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-[#333] bg-[#2d2d2d] rounded-t-[var(--radius-md)]">
            <Terminal className="size-3.5 text-[#a3a3a3]" />
            <span className="text-xs text-[#a3a3a3] font-mono">Terminal Output</span>
          </div>
          <textarea 
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            disabled={status === "verifying" || status === "success"}
            placeholder="Paste your terminal output or code here to verify..."
            className="w-full bg-transparent text-[#d4d4d4] font-mono text-sm p-4 min-h-[120px] focus:outline-none resize-y"
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          {status === "success" && (
            <div className="flex items-center gap-2 text-[var(--color-accent-primary)] font-medium text-sm">
              <CheckCircle2 className="size-5" />
              Verification passed! You may proceed.
            </div>
          )}
          {status === "fail" && (
            <div className="flex items-center gap-2 text-[var(--color-accent-warning)] font-medium text-sm">
              <ChevronRight className="size-5" />
              Not quite right. Please check your output and try again.
            </div>
          )}
          {status === "idle" && <div />}

          <button
            onClick={handleVerify}
            disabled={status === "verifying" || status === "success" || !output.trim()}
            className="button-primary shrink-0 ml-auto"
          >
            {status === "verifying" ? "Verifying..." : status === "success" ? "Verified" : "Verify Work"}
          </button>
        </div>
      </div>
    </div>
  );
}
