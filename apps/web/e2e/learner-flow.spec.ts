import { expect, test, type Page } from "@playwright/test";

import {
  e2eAuthSkipMessage,
  e2eAuthStatePath,
  hasE2EAuthState,
  hasE2ELoginCredentials,
  loginToAuthenticatedRoute,
} from "./auth";

const dashboardPath = "/dashboard";
const lessonPath = "/learn/01-start-here/lesson-1-2-1-make-a-personal-safety-checklist";
const lessonKey = "01-start-here::lesson-1-2-1-make-a-personal-safety-checklist";
const storageKey = "cli-academy-lesson-progress";

interface ProgressRequestBody {
  completionData?: {
    completedAt?: string;
    source?: string;
  };
  lessonSlug?: string;
  pathSlug?: string;
}

interface LocalProgressSeedEntry {
  completedAt: string;
  lessonSlug: string;
  pathSlug: string;
}

interface LocalProgressState {
  lessonsByScope: Record<string, Record<string, LocalProgressSeedEntry>>;
  version: number;
}

async function loginTo(page: Page, nextPath: string) {
  await loginToAuthenticatedRoute(page, nextPath, "learner-flow");
}

async function seedAnonymousLocalProgress(page: Page) {
  await seedAnonymousLocalProgressEntries(page, [
    {
      completedAt: "2026-04-10T00:00:00.000Z",
      lessonSlug: "lesson-1-2-1-make-a-personal-safety-checklist",
      pathSlug: "01-start-here",
    },
  ]);
}

async function seedAnonymousLocalProgressEntries(page: Page, entries: LocalProgressSeedEntry[]) {
  await page.evaluate(
    ([key, nextEntries]) => {
      const emptyState: LocalProgressState = {
        lessonsByScope: {},
        version: 2,
      };

      let parsed = emptyState;
      const raw = window.localStorage.getItem(key);

      if (raw) {
        try {
          parsed = JSON.parse(raw) as typeof emptyState;
        } catch {
          parsed = emptyState;
        }
      }

      const lessonsByScope: LocalProgressState["lessonsByScope"] = parsed.lessonsByScope ?? {};
      const anonymousLessons = lessonsByScope.anonymous ?? {};

      for (const entry of nextEntries) {
        anonymousLessons[`${entry.pathSlug}::${entry.lessonSlug}`] = entry;
      }

      lessonsByScope.anonymous = anonymousLessons;

      window.localStorage.setItem(
        key,
        JSON.stringify({
          lessonsByScope,
          version: 2,
        }),
      );
    },
    [storageKey, entries] as const,
  );
}

async function getCompletedLessonsCount(page: Page) {
  const completedCard = page.locator("article").filter({
    has: page.getByText("Completed lessons", { exact: true }),
  });
  const text = await completedCard.textContent();
  const match = text?.match(/Completed lessons\s*(\d+)/i);

  if (!match) {
    throw new Error(`Could not parse completed lesson count from dashboard card: ${text ?? "<empty>"}`);
  }

  return Number(match[1]);
}

async function getContinueLearningState(page: Page) {
  const continueLearningCard = page.locator("article").filter({
    has: page.getByRole("heading", { name: "Continue learning" }),
  });
  const resumeLink = continueLearningCard.getByRole("link").first();

  await expect(resumeLink).toBeVisible();

  const href = await resumeLink.getAttribute("href");
  const title = await resumeLink.locator("h3").textContent();
  const progressText = await resumeLink.locator("p").first().textContent();

  if (!href || !title || !progressText) {
    throw new Error("Continue learning card is missing href, title, or progress text.");
  }

  return {
    href,
    progressText,
    title,
  };
}

async function storageContainsLesson(page: Page) {
  return page.evaluate(
    ([key, lessonEntryKey]) => {
      const raw = window.localStorage.getItem(key);
      if (!raw) {
        return false;
      }

      try {
        const parsed = JSON.parse(raw) as {
          lessonsByScope?: Record<string, Record<string, unknown>>;
        };

        return Object.values(parsed.lessonsByScope ?? {}).some((scopeLessons) => lessonEntryKey in scopeLessons);
      } catch {
        return false;
      }
    },
    [storageKey, lessonKey] as const,
  );
}

test.describe("Learner flow regressions", () => {
  test.skip(!hasE2EAuthState && !hasE2ELoginCredentials, e2eAuthSkipMessage);

  if (hasE2EAuthState) {
    test.use({ storageState: e2eAuthStatePath });
  }

  test("falls back to browser-local lesson progress when hosted save returns 404", async ({ page }) => {
    const progressRequests: ProgressRequestBody[] = [];

    await page.route("**/api/progress*", async (route) => {
      const request = route.request();

      if (request.method() === "GET" && request.url().includes("pathSlug=01-start-here") && request.url().includes("lesson-1-2-1-make-a-personal-safety-checklist")) {
        await route.fulfill({
          body: JSON.stringify({ completed: false, ok: false, progress: null }),
          contentType: "application/json",
          status: 404,
        });
        return;
      }

      if (request.method() === "POST" && request.url().endsWith("/api/progress")) {
        progressRequests.push(request.postDataJSON() as ProgressRequestBody);
        await route.fulfill({
          body: JSON.stringify({ message: "The requested lesson could not be matched to a published path.", ok: false }),
          contentType: "application/json",
          status: 404,
        });
        return;
      }

      await route.fallback();
    });

    await loginTo(page, lessonPath);

    const markCompleteButton = page.getByRole("button", { name: /mark complete/i });

    await expect(markCompleteButton).toBeVisible();
    await markCompleteButton.click();

    await expect(page.getByText("Progress saved on this device while lesson sync catches up.")).toBeVisible();
    await expect(page.getByRole("button", { name: /completed/i })).toBeDisabled();
    await expect.poll(() => progressRequests.length).toBe(1);
    await expect.poll(() => storageContainsLesson(page)).toBe(true);
  });

  test("backfills anonymous local progress and clears the local entry after a hosted save succeeds", async ({ page }) => {
    const progressRequests: ProgressRequestBody[] = [];

    await page.route("**/api/progress", async (route) => {
      const request = route.request();

      if (request.method() === "POST") {
        progressRequests.push(request.postDataJSON() as ProgressRequestBody);
        await route.fulfill({
          body: JSON.stringify({ completed: true, message: "Progress saved.", ok: true, saved: true }),
          contentType: "application/json",
          status: 200,
        });
        return;
      }

      await route.fallback();
    });

    await loginTo(page, dashboardPath);
    await seedAnonymousLocalProgress(page);
    await page.reload();

    await expect.poll(() => progressRequests.length).toBe(1);
    await expect.poll(() => progressRequests[0]?.completionData?.source ?? "").toBe("local-backfill");
    await expect.poll(() => storageContainsLesson(page)).toBe(false);
  });

  test("merges browser-local progress into the dashboard completed count during hydration", async ({ page }) => {
    await loginTo(page, dashboardPath);

    const baselineCount = await getCompletedLessonsCount(page);

    await seedAnonymousLocalProgressEntries(page, [
      {
        completedAt: "2026-04-10T12:00:00.000Z",
        lessonSlug: "local-hydration-proof",
        pathSlug: "hydration-proof-path",
      },
    ]);

    await page.reload();

    await expect.poll(() => getCompletedLessonsCount(page)).toBe(baselineCount + 1);
  });

  test("advances the continue-learning card when the current next lesson is completed locally", async ({ page }) => {
    await loginTo(page, dashboardPath);

    const initialCard = await getContinueLearningState(page);
    const hrefMatch = initialCard.href.match(/^\/learn\/([^/]+)\/([^/]+)$/);

    if (!hrefMatch) {
      throw new Error(`Could not parse continue-learning href: ${initialCard.href}`);
    }

    await seedAnonymousLocalProgressEntries(page, [
      {
        completedAt: "2026-04-10T12:30:00.000Z",
        lessonSlug: hrefMatch[2],
        pathSlug: hrefMatch[1],
      },
    ]);

    await page.reload();

    await expect.poll(async () => (await getContinueLearningState(page)).href).not.toBe(initialCard.href);
    await expect.poll(async () => (await getContinueLearningState(page)).title).not.toBe(initialCard.title);
  });
});