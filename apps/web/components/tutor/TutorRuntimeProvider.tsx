"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { LearningMode } from "@/components/lesson/LearningModeSelector";

interface TutorRuntimeState {
  clawClassification?: string;
  deliverable?: string;
  groupId?: string;
  learningMode?: LearningMode;
  lessonTitle?: string;
  pathSlug?: string;
  lessonSlug?: string;
  rubricCriteria?: string[];
  tutorPreload?: string;
}

interface TutorRuntimeContextValue extends TutorRuntimeState {
  clearLessonContext: () => void;
  setLessonContext: (next: TutorRuntimeState) => void;
}

const TutorRuntimeContext = createContext<TutorRuntimeContextValue | null>(null);

export function TutorRuntimeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<TutorRuntimeState>({});
  const clearLessonContext = useCallback(() => {
    setState({});
  }, []);
  const setLessonContext = useCallback((next: TutorRuntimeState) => {
    setState(next);
  }, []);

  return (
    <TutorRuntimeContext.Provider
      value={{
        ...state,
        clearLessonContext,
        setLessonContext,
      }}
    >
      {children}
    </TutorRuntimeContext.Provider>
  );
}

export function useTutorRuntime() {
  const context = useContext(TutorRuntimeContext);

  if (!context) {
    throw new Error("useTutorRuntime must be used inside TutorRuntimeProvider.");
  }

  return context;
}

export function TutorContextBridge({
  clawClassification,
  deliverable,
  groupId,
  learningMode,
  lessonSlug,
  lessonTitle,
  pathSlug,
  rubricCriteria,
  tutorPreload,
}: TutorRuntimeState) {
  const { clearLessonContext, setLessonContext } = useTutorRuntime();

  useEffect(() => {
    setLessonContext({
      clawClassification,
      deliverable,
      groupId,
      learningMode,
      lessonSlug,
      lessonTitle,
      pathSlug,
      rubricCriteria,
      tutorPreload,
    });

    return () => {
      clearLessonContext();
    };
  }, [
    clawClassification,
    clearLessonContext,
    deliverable,
    groupId,
    learningMode,
    lessonSlug,
    lessonTitle,
    pathSlug,
    rubricCriteria,
    setLessonContext,
    tutorPreload,
  ]);

  return null;
}
