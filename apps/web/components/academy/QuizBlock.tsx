"use client";

import { useMemo, useState } from "react";
import type { AcademyQuiz } from "@/lib/academy-content";

interface QuizBlockProps {
  quiz: AcademyQuiz;
}

export function QuizBlock({ quiz }: QuizBlockProps) {
  const questions = quiz.questions ?? [];
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!questions.length) {
      return 0;
    }

    const correct = questions.filter((question, index) => selectedAnswers[index] === question.answerIndex).length;
    return Math.round((correct / questions.length) * 100);
  }, [questions, selectedAnswers]);

  return (
    <article className="panel p-6">
      <div className="flex flex-wrap gap-2">
        <span className="badge" data-tone="accent">Quiz</span>
        <span className="badge">{quiz.questionCount} questions</span>
        <span className="badge">Pass threshold {quiz.passThreshold}%</span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold">{quiz.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{quiz.summary}</p>

      {questions.length ? (
        <div className="mt-6 grid gap-5">
          {questions.map((question, questionIndex) => (
            <div key={`${quiz.slug}-question-${questionIndex}`} className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] p-4">
              <div className="text-sm font-semibold">Question {questionIndex + 1}</div>
              <p className="mt-2 text-sm leading-6">{question.prompt}</p>
              <div className="mt-4 grid gap-2">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selectedAnswers[questionIndex] === optionIndex;
                  const isCorrect = submitted && question.answerIndex === optionIndex;
                  const isIncorrectSelection = submitted && isSelected && !isCorrect;

                  return (
                    <button
                      key={`${quiz.slug}-question-${questionIndex}-option-${optionIndex}`}
                      type="button"
                      disabled={submitted}
                      onClick={() =>
                        setSelectedAnswers((current) => ({
                          ...current,
                          [questionIndex]: optionIndex,
                        }))
                      }
                      className={`rounded-[var(--radius-lg)] border px-4 py-3 text-left text-sm transition ${
                        isCorrect
                          ? "border-[var(--color-accent-primary)] bg-[var(--color-accent-subtle)]"
                          : isIncorrectSelection
                            ? "border-[var(--color-status-danger)] bg-[rgba(214,90,70,0.10)]"
                            : isSelected
                              ? "border-[var(--color-border-strong)] bg-[var(--color-bg-panel)]"
                              : "border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] hover:border-[var(--color-border-strong)]"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {submitted && question.explanation ? (
                <p className="mt-3 text-xs leading-5 text-[var(--color-fg-muted)]">{question.explanation}</p>
              ) : null}
            </div>
          ))}

          <div className="flex flex-wrap items-center gap-3">
            {!submitted ? (
              <button type="button" className="button-primary" onClick={() => setSubmitted(true)}>
                Submit quiz
              </button>
            ) : (
              <button
                type="button"
                className="button-secondary"
                onClick={() => {
                  setSubmitted(false);
                  setSelectedAnswers({});
                }}
              >
                Reset quiz
              </button>
            )}
            {submitted ? (
              <div className="text-sm">
                Score: <span className="font-semibold">{score}%</span> {score >= quiz.passThreshold ? "— pass" : "— keep practicing"}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] p-4 text-sm text-[var(--color-fg-muted)]">
          Structured questions will be attached here as the quiz catalog expands.
        </div>
      )}
    </article>
  );
}
