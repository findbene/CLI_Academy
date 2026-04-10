"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { LearningMode } from "@/components/lesson/LearningModeSelector";

interface TutorRuntimeState {
  learningMode?: LearningMode;
  lessonTitle?: string;
  tutorPreload?: string;
}

interface TutorHelpRequest {
  autoSend: boolean;
  prompt: string;
  title?: string;
}

interface TutorRuntimeContextValue extends TutorRuntimeState {
  clearLessonContext: () => void;
  clearPendingHelpRequest: () => void;
  pendingHelpRequest: TutorHelpRequest | null;
  requestHelp: (request: TutorHelpRequest) => void;
  setLessonContext: (next: TutorRuntimeState) => void;
}

const TutorRuntimeContext = createContext<TutorRuntimeContextValue | null>(null);

export function TutorRuntimeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<TutorRuntimeState>({});
  const [pendingHelpRequest, setPendingHelpRequest] = useState<TutorHelpRequest | null>(null);
  const clearLessonContext = useCallback(() => {
    setState({});
  }, []);
  const clearPendingHelpRequest = useCallback(() => {
    setPendingHelpRequest(null);
  }, []);
  const requestHelp = useCallback((request: TutorHelpRequest) => {
    setPendingHelpRequest(request);
  }, []);
  const setLessonContext = useCallback((next: TutorRuntimeState) => {
    setState(next);
  }, []);

  return (
    <TutorRuntimeContext.Provider
      value={{
        ...state,
        clearLessonContext,
        clearPendingHelpRequest,
        pendingHelpRequest,
        requestHelp,
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

export function useOptionalTutorRuntime() {
  return useContext(TutorRuntimeContext);
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
