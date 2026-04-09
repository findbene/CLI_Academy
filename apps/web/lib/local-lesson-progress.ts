export interface LocalLessonProgressEntry {
  completedAt: string;
  lessonSlug: string;
  pathSlug: string;
}

interface LegacyLocalLessonProgressState {
  lessons: Record<string, LocalLessonProgressEntry>;
  version: 1;
}

interface LocalLessonProgressState {
  lessonsByScope: Record<string, Record<string, LocalLessonProgressEntry>>;
  version: 2;
}

const STORAGE_KEY = "cli-academy-lesson-progress";
const ANONYMOUS_SCOPE = "anonymous";

function getLessonKey(pathSlug: string, lessonSlug: string) {
  return `${pathSlug}::${lessonSlug}`;
}

function getProgressScope(userId?: string | null) {
  return userId ? `user:${userId}` : ANONYMOUS_SCOPE;
}

function getReadableScopes(state: LocalLessonProgressState, userId?: string | null) {
  if (!userId) {
    return [ANONYMOUS_SCOPE];
  }

  const userScope = getProgressScope(userId);
  const hasLegacyAnonymousLessons = Boolean(Object.keys(state.lessonsByScope[ANONYMOUS_SCOPE] ?? {}).length);
  const otherUserScopes = Object.keys(state.lessonsByScope).filter(
    (scope) => scope !== ANONYMOUS_SCOPE && scope !== userScope,
  );

  if (hasLegacyAnonymousLessons && otherUserScopes.length === 0) {
    return [ANONYMOUS_SCOPE, userScope];
  }

  return [userScope];
}

function getMergedLessons(state: LocalLessonProgressState, userId?: string | null) {
  const mergedLessons = new Map<string, LocalLessonProgressEntry>();

  for (const scope of getReadableScopes(state, userId)) {
    for (const [lessonKey, entry] of Object.entries(state.lessonsByScope[scope] ?? {})) {
      mergedLessons.set(lessonKey, entry);
    }
  }

  return mergedLessons;
}

function getEmptyState(): LocalLessonProgressState {
  return {
    lessonsByScope: {},
    version: 2,
  };
}

export function readLocalLessonProgress(): LocalLessonProgressState {
  if (typeof window === "undefined") {
    return getEmptyState();
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return getEmptyState();
    }

    const parsed = JSON.parse(stored) as Partial<LocalLessonProgressState>;
    if (parsed.version === 2 && parsed.lessonsByScope && typeof parsed.lessonsByScope === "object") {
      return {
        lessonsByScope: parsed.lessonsByScope,
        version: 2,
      };
    }

    const legacy = parsed as Partial<LegacyLocalLessonProgressState>;
    if (legacy.version === 1 && legacy.lessons && typeof legacy.lessons === "object") {
      return {
        lessonsByScope: {
          [ANONYMOUS_SCOPE]: legacy.lessons,
        },
        version: 2,
      };
    }

    return getEmptyState();
  } catch {
    return getEmptyState();
  }
}

function writeLocalLessonProgress(state: LocalLessonProgressState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getLessonsForScope(state: LocalLessonProgressState, userId?: string | null) {
  const scope = getProgressScope(userId);
  const lessons = state.lessonsByScope[scope];

  if (lessons) {
    return { lessons, scope };
  }

  state.lessonsByScope[scope] = {};
  return { lessons: state.lessonsByScope[scope], scope };
}

export function markLessonCompletedLocally(pathSlug: string, lessonSlug: string, userId?: string | null) {
  const state = readLocalLessonProgress();
  const { lessons } = getLessonsForScope(state, userId);
  lessons[getLessonKey(pathSlug, lessonSlug)] = {
    completedAt: new Date().toISOString(),
    lessonSlug,
    pathSlug,
  };
  writeLocalLessonProgress(state);
}

export function removeLessonCompletedLocally(pathSlug: string, lessonSlug: string, userId?: string | null) {
  const state = readLocalLessonProgress();
  const lessonKey = getLessonKey(pathSlug, lessonSlug);

  for (const scope of getReadableScopes(state, userId)) {
    const lessons = state.lessonsByScope[scope];
    if (!lessons) {
      continue;
    }

    delete lessons[lessonKey];
    if (!Object.keys(lessons).length) {
      delete state.lessonsByScope[scope];
    }
  }

  writeLocalLessonProgress(state);
}

export function isLessonCompletedLocally(pathSlug: string, lessonSlug: string, userId?: string | null) {
  const state = readLocalLessonProgress();
  return getMergedLessons(state, userId).has(getLessonKey(pathSlug, lessonSlug));
}

export function getCompletedLessonCountLocally(userId?: string | null) {
  return getMergedLessons(readLocalLessonProgress(), userId).size;
}

export function getCompletedLessonKeysLocally(userId?: string | null) {
  return Array.from(getMergedLessons(readLocalLessonProgress(), userId).keys());
}

export function getCompletedLessonEntriesLocally(userId?: string | null) {
  return Array.from(getMergedLessons(readLocalLessonProgress(), userId).values()).sort((left, right) =>
    left.completedAt.localeCompare(right.completedAt),
  );
}

export function getCompletedLessonSlugsForPathLocally(pathSlug: string, userId?: string | null) {
  return Array.from(getMergedLessons(readLocalLessonProgress(), userId).values())
    .filter((entry) => entry.pathSlug === pathSlug)
    .map((entry) => entry.lessonSlug);
}
