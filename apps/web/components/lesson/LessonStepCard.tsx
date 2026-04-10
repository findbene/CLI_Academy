"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import type { LearningMode } from "@/components/lesson/LearningModeSelector";
import { useOptionalTutorRuntime } from "@/components/tutor/TutorRuntimeProvider";

export interface LessonStepMeta {
  action: string;
  askTutor: string;
  expectedResult: string;
  nextStep: string;
  purpose: string;
  whyItMatters: string;
}

export interface LessonStepSupport {
  action?: string;
  askTutor: string;
  expectedResult?: string;
  nextStep?: string;
  schemaStatus: "explicit" | "inferred";
}

interface LessonStepCardProps {
  badge: string;
  children: React.ReactNode;
  meta?: LessonStepMeta;
  support?: LessonStepSupport;
  title: string;
  tone?: "default" | "warning";
}

function getTutorButtonLabel(learningMode?: string) {
  if (learningMode === "hint") {
    return "Give me a hint";
  }

  if (learningMode === "independent") {
    return "Check my approach";
  }

  return "I'm stuck here";
}

function getVisibleMetaItems(meta: LessonStepMeta, learningMode?: LearningMode) {
  if (learningMode === "independent") {
    return [{ key: "expected", label: "Expected result", value: meta.expectedResult }];
  }

  if (learningMode === "hint") {
    return [
      { key: "purpose", label: "Goal", value: meta.purpose },
      { key: "expected", label: "Expected result", value: meta.expectedResult },
    ];
  }

  return [
    { key: "purpose", label: "Purpose", value: meta.purpose },
    { key: "action", label: "Do this", value: meta.action },
    { key: "expected", label: "Expected result", value: meta.expectedResult },
    { key: "why", label: "Why it matters", value: meta.whyItMatters },
  ];
}

function getVisibleFallbackItems(support: LessonStepSupport | undefined, learningMode?: LearningMode) {
  if (!support) {
    return [];
  }

  if (learningMode === "independent") {
    return support.expectedResult
      ? [{ key: "expected", label: "Checkpoint", value: support.expectedResult }]
      : [];
  }

  const items = [
    support.action ? { key: "action", label: "Step focus", value: support.action } : null,
    support.expectedResult ? { key: "expected", label: "Checkpoint", value: support.expectedResult } : null,
  ];

  return items.filter((item): item is { key: string; label: string; value: string } => Boolean(item));
}

export function LessonStepCard({ badge, children, meta, support, title, tone = "default" }: LessonStepCardProps) {
  const tutorRuntime = useOptionalTutorRuntime();
  const learningMode = tutorRuntime?.learningMode;
  const resolvedSupport = support ?? (meta
    ? {
        action: meta.action,
        askTutor: meta.askTutor,
        expectedResult: meta.expectedResult,
        nextStep: meta.nextStep,
        schemaStatus: "explicit" as const,
      }
    : undefined);
  const visibleMetaItems = meta ? getVisibleMetaItems(meta, learningMode) : [];
  const visibleFallbackItems = !meta ? getVisibleFallbackItems(resolvedSupport, learningMode) : [];
  const showNextStep = Boolean(meta?.nextStep || resolvedSupport?.nextStep) && learningMode === "guided";
  const helpCopy = resolvedSupport?.schemaStatus === "inferred"
    ? "Opens the tutor with this exact lesson step already loaded so you can get unstuck without restating the context."
    : "Opens the tutor with step-specific context so you do not have to restate where you got blocked.";

  return (
    <section
      className="lesson-step"
      data-learning-mode={learningMode ?? "guided"}
      data-schema-status={resolvedSupport?.schemaStatus}
      data-tone={tone === "warning" ? "warning" : undefined}
    >
      <div className="lesson-step-header">
        <span className="lesson-step-badge">{badge}</span>
        <h3 className="lesson-step-title">{title}</h3>
      </div>

      {visibleMetaItems.length ? (
        <div className="lesson-step-scaffold">
          <div className="lesson-step-scaffold-grid">
            {visibleMetaItems.map((item) => (
              <section key={item.key} className="lesson-step-summary-card" data-card-kind={item.key}>
                <span className="lesson-step-summary-label">{item.label}</span>
                <p>{item.value}</p>
              </section>
            ))}
          </div>
          {showNextStep ? (
            <section className="lesson-step-next">
              <span className="lesson-step-summary-label">Before you move on</span>
              <p>{meta?.nextStep ?? resolvedSupport?.nextStep}</p>
            </section>
          ) : null}
        </div>
      ) : visibleFallbackItems.length ? (
        <div className="lesson-step-scaffold" data-scaffold-kind="fallback">
          <div className="lesson-step-scaffold-grid">
            {visibleFallbackItems.map((item) => (
              <section key={item.key} className="lesson-step-summary-card" data-card-kind={item.key}>
                <span className="lesson-step-summary-label">{item.label}</span>
                <p>{item.value}</p>
              </section>
            ))}
          </div>
          {showNextStep ? (
            <section className="lesson-step-next">
              <span className="lesson-step-summary-label">Before you move on</span>
              <p>{resolvedSupport?.nextStep}</p>
            </section>
          ) : null}
        </div>
      ) : null}

      <div className="lesson-module-content">{children}</div>

      {resolvedSupport ? (
        <div className="lesson-step-support">
          <button
            type="button"
            className="lesson-step-help-button"
            onClick={() =>
              tutorRuntime?.requestHelp({
                autoSend: true,
                prompt: resolvedSupport.askTutor,
                title,
              })
            }
          >
            <Sparkles className="size-4" />
            {getTutorButtonLabel(learningMode)}
          </button>
          <span className="lesson-step-help-copy">
            {helpCopy}
          </span>
          {showNextStep ? (
            <span className="lesson-step-next-inline">
              <ArrowRight className="size-4" />
              {meta?.nextStep ?? resolvedSupport.nextStep}
            </span>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}