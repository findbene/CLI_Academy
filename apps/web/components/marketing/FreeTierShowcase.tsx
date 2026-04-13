"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Lock, ArrowRight } from "lucide-react";

interface FreeTierShowcaseProps {
  userName: string;
}

const FREE_GROUPS = [
  {
    badge: "Group 0",
    title: "First Win",
    description:
      "7 lessons across Path 01. You will install Claude Code, run your first command, and complete a real beginner project — all in one session.",
    detail: "Path 01 — Start Here",
  },
  {
    badge: "Group 1",
    title: "Foundations",
    description:
      "Agentic mental models, CLI thinking patterns, and setup discipline. The conceptual layer that makes every later path click.",
    detail: "Paths 02–04",
  },
  {
    badge: "Group 2",
    title: "Setup Studio",
    description:
      "CLAUDE.md mastery, MCP server setup, and dev environment hardening. By the end you will have a fully configured agentic workspace.",
    detail: "Paths 05–10",
  },
];

const PRO_FEATURES = [
  "Advanced tool tracks — Cowork sessions, custom runtimes, multi-agent orchestration, and production deployment paths",
  "Agent runtime labs — hands-on sessions with OpenClaw, NanoClaw, HermesAgent, and cross-surface workflows",
  "Career pathways — capstone portfolio, job-ready brief, and alumni missions with employer-facing evidence",
];

export function FreeTierShowcase({ userName }: FreeTierShowcaseProps) {
  const displayName = userName.split("@")[0] || "Builder";

  return (
    <div className="flex flex-col gap-12">

      {/* Heading */}
      <header className="flex flex-col gap-3">
        <div className="eyebrow">Free Tier</div>
        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-fg-default)]">
          Start Free. Build Real.
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-[var(--color-fg-muted)]">
          Welcome, {displayName}. Your free access covers Groups 0, 1, and 2 — enough to go from
          zero to a fully configured agentic workspace without spending a cent. No time limit,
          no credit card required.
        </p>
      </header>

      {/* What's included */}
      <section>
        <h3 className="mb-5 text-lg font-semibold text-[var(--color-fg-default)]">
          What&apos;s included in Free
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {FREE_GROUPS.map((group) => (
            <div key={group.badge} className="panel p-6 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-primary)]/15">
                  <CheckCircle2 className="h-4 w-4 text-[var(--color-accent-primary)]" />
                </div>
                <div>
                  <span className="badge" data-tone="accent">
                    {group.badge}
                  </span>
                  <h4 className="mt-2 text-base font-semibold text-[var(--color-fg-default)]">
                    {group.title}
                  </h4>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">
                {group.description}
              </p>
              <span className="mt-auto text-xs font-medium uppercase tracking-wider text-[var(--color-accent-primary)]">
                {group.detail}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Pro upsell */}
      <section className="panel p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-4 sm:max-w-xl">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-[var(--color-fg-muted)]" />
              <span className="eyebrow">Pro</span>
            </div>
            <h3 className="text-xl font-semibold text-[var(--color-fg-default)]">
              What&apos;s in Pro
            </h3>
            <ul className="flex flex-col gap-3">
              {PRO_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm leading-relaxed text-[var(--color-fg-muted)]"
                >
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-primary)]" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="shrink-0">
            <Link href="/pricing" className="button-primary inline-flex items-center gap-2">
              Unlock Pro Access
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
