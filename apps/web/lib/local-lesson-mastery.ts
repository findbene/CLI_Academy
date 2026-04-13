interface LocalLessonMasteryEntry {
  lessonSlug: string;
  matchedCriteria: string[];
  pathSlug: string;
  score: number;
  verifiedAt: string;
}

interface LocalLessonMasteryState {
  entries: Record<string, LocalLessonMasteryEntry>;
  version: 1;
}

const STORAGE_KEY = "cli-academy-lesson-mastery";

function getLessonKey(pathSlug: string, lessonSlug: string) {
  return `${pathSlug}::${lessonSlug}`;
}

function getEmptyState(): LocalLessonMasteryState {
  return {
    entries: {},
    version: 1,
  };
}

function readState(): LocalLessonMasteryState {
  if (typeof window === "undefined") {
    return getEmptyState();
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return getEmptyState();
    }

    const parsed = JSON.parse(stored) as Partial<LocalLessonMasteryState>;
    if (parsed.version === 1 && parsed.entries && typeof parsed.entries === "object") {
      return {
        entries: parsed.entries,
        version: 1,
      };
    }

    return getEmptyState();
  } catch {
    return getEmptyState();
  }
}

function writeState(state: LocalLessonMasteryState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function saveLessonMastery(input: {
  lessonSlug: string;
  matchedCriteria: string[];
  pathSlug: string;
  score: number;
}) {
  const state = readState();
  state.entries[getLessonKey(input.pathSlug, input.lessonSlug)] = {
    lessonSlug: input.lessonSlug,
    matchedCriteria: input.matchedCriteria,
    pathSlug: input.pathSlug,
    score: input.score,
    verifiedAt: new Date().toISOString(),
  };
  writeState(state);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("lesson-mastery-updated"));
  }
}

export function getLessonMastery(pathSlug: string, lessonSlug: string) {
  return readState().entries[getLessonKey(pathSlug, lessonSlug)] ?? null;
}

export function getVerifiedLessonCountForPath(pathSlug: string) {
  return Object.values(readState().entries).filter((entry) => entry.pathSlug === pathSlug).length;
}
