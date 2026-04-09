"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { LearningMode } from "@/components/lesson/LearningModeSelector";

interface TutorRuntimeState {
  learningMode?: LearningMode;
  lessonTitle?: string;
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
  learningMode,
  lessonTitle,
  tutorPreload,
}: TutorRuntimeState) {
  const { clearLessonContext, setLessonContext } = useTutorRuntime();

  useEffect(() => {
    setLessonContext({ learningMode, lessonTitle, tutorPreload });

    return () => {
      clearLessonContext();
    };
  }, [clearLessonContext, learningMode, lessonTitle, setLessonContext, tutorPreload]);

  return null;
}
