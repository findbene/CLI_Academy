import { expect, test, type Page } from "@playwright/test";

import {
  e2eAuthSkipMessage,
  e2eAuthStatePath,
  hasE2EAuthState,
  hasE2ELoginCredentials,
  loginToAuthenticatedRoute,
} from "./auth";

const lessonPath = "/learn/01-start-here/lesson-1-2-1-make-a-personal-safety-checklist";

interface TutorApiRequest {
  learningMode?: string;
  lessonTitle?: string;
  message?: string;
  tutorMode?: string;
  tutorPreload?: string;
}

interface TutorApiOptions {
  dailyLimit?: number;
  remaining?: number;
  tier?: "free" | "pro";
}

async function loginToLesson(page: Page) {
  await loginToAuthenticatedRoute(page, lessonPath, "lesson tutor");
}

function getStepCard(page: Page, title: string) {
  return page.locator("section.lesson-step").filter({
    has: page.getByRole("heading", { name: title }),
  });
}

async function mockTutorApi(page: Page, options: TutorApiOptions = {}) {
  let lastRequest: TutorApiRequest | null = null;
  const {
    dailyLimit = options.tier === "pro" ? 100 : 25,
    remaining = options.tier === "pro" ? 99 : 24,
    tier = "free",
  } = options;

  await page.route("**/api/tutor", async (route) => {
    const request = route.request();

    if (request.method() === "GET") {
      await route.fulfill({
        contentType: "application/json",
        body: JSON.stringify({
          configured: true,
          dailyLimit,
          remaining,
          runtimeReady: true,
          signedIn: true,
          tier,
        }),
        status: 200,
      });
      return;
    }

    if (request.method() === "POST") {
      lastRequest = request.postDataJSON() as TutorApiRequest;
      await route.fulfill({
        body: 'data: {"type":"delta","text":"Mock tutor response for the current lesson step."}\n\ndata: [DONE]\n\n',
        contentType: "text/event-stream",
        status: 200,
      });
      return;
    }

    await route.fallback();
  });

  return {
    getLastRequest: () => lastRequest,
  };
}

test.describe("Lesson tutor", () => {
  test.skip(!hasE2EAuthState && !hasE2ELoginCredentials, e2eAuthSkipMessage);

  if (hasE2EAuthState) {
    test.use({ storageState: e2eAuthStatePath });
  }

  test("renders walkthrough code blocks without duplicating the lesson heading", async ({ page }) => {
    await loginToLesson(page);

    await expect(page.getByRole("heading", { name: "Make a personal safety checklist", level: 1 })).toHaveCount(1);

    const stepCard = getStepCard(page, "Create safety-checklist.md");
    await expect(stepCard).toBeVisible();
    await expect(stepCard.getByText("bash", { exact: true })).toBeVisible();
    await expect(stepCard.getByText("powershell", { exact: true })).toBeVisible();
    await expect(stepCard.getByRole("button", { name: /copy code/i }).first()).toBeVisible();
  });

  test("switches step scaffolding across guided, hint-based, and independent modes", async ({ page }) => {
    await loginToLesson(page);

    await expect(page.getByRole("heading", { name: "Make a personal safety checklist" })).toBeVisible();

    const stepCard = getStepCard(page, "Navigate to your notes folder");
    await expect(stepCard).toBeVisible();

    await expect(stepCard.getByText("Purpose", { exact: true })).toBeVisible();
    await expect(stepCard.getByText("Do this", { exact: true })).toBeVisible();
    await expect(stepCard.getByText("Expected result", { exact: true })).toBeVisible();
    await expect(stepCard.getByText("Why it matters", { exact: true })).toBeVisible();
    await expect(stepCard.getByText("Before you move on", { exact: true })).toBeVisible();
    await expect(stepCard.getByRole("button", { name: "I'm stuck here" })).toBeVisible();

    await page.getByRole("button", { name: /^Hint-based/i }).click();

    await expect(stepCard.getByText("Goal", { exact: true })).toBeVisible();
    await expect(stepCard.getByText("Expected result", { exact: true })).toBeVisible();
    await expect(stepCard.getByText("Purpose", { exact: true })).toHaveCount(0);
    await expect(stepCard.getByText("Do this", { exact: true })).toHaveCount(0);
    await expect(stepCard.getByText("Why it matters", { exact: true })).toHaveCount(0);
    await expect(stepCard.getByText("Before you move on", { exact: true })).toHaveCount(0);
    await expect(stepCard.getByRole("button", { name: "Give me a hint" })).toBeVisible();

    await page.getByRole("button", { name: /^Independent/i }).click();

    await expect(stepCard.getByText("Expected result", { exact: true })).toBeVisible();
    await expect(stepCard.getByText("Goal", { exact: true })).toHaveCount(0);
    await expect(stepCard.getByText("Purpose", { exact: true })).toHaveCount(0);
    await expect(stepCard.getByText("Do this", { exact: true })).toHaveCount(0);
    await expect(stepCard.getByText("Why it matters", { exact: true })).toHaveCount(0);
    await expect(stepCard.getByText("Before you move on", { exact: true })).toHaveCount(0);
    await expect(stepCard.getByRole("button", { name: "Check my approach" })).toBeVisible();
  });

  test("opens the tutor from a lesson step with step-specific context and mode-aware routing", async ({ page }) => {
    const tutorApi = await mockTutorApi(page);

    await loginToLesson(page);

    await expect(page.getByRole("heading", { name: "Make a personal safety checklist" })).toBeVisible();

    const stepCard = getStepCard(page, "Navigate to your notes folder");
    await expect(stepCard).toBeVisible();

    await page.getByRole("button", { name: /^Independent/i }).click();
    await stepCard.getByRole("button", { name: "Check my approach" }).click();

    const dialog = page.getByRole("dialog", { name: /cli academy ai tutor/i });

    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("Mock tutor response for the current lesson step.")).toBeVisible();
    await expect(dialog.getByText(/I'm on Step 1 of Make a personal safety checklist\./i)).toBeVisible();
    await expect.poll(() => tutorApi.getLastRequest()?.message ?? "").toContain(
      "I'm on Step 1 of Make a personal safety checklist.",
    );
    await expect.poll(() => tutorApi.getLastRequest()?.learningMode ?? "").toBe("independent");
    await expect.poll(() => tutorApi.getLastRequest()?.tutorMode ?? "").toBe("explain");
    await expect.poll(() => tutorApi.getLastRequest()?.lessonTitle ?? "").toBe("Make a personal safety checklist");
  });

  test("opens as a chat-first panel and keeps helper controls in the tools drawer", async ({ page }) => {
    await loginToLesson(page);

    await expect(page.getByRole("heading", { name: "Make a personal safety checklist" })).toBeVisible();

    await page.getByRole("button", { name: /open ai tutor/i }).click();

    const dialog = page.getByRole("dialog", { name: /cli academy ai tutor/i });
    const textbox = dialog.getByLabel("Your question for the AI tutor");

    await expect(dialog).toBeVisible();
    await expect(page.getByRole("button", { name: /open ai tutor/i })).toHaveCount(0);
    await expect(textbox).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Tools" }).first()).toBeVisible();
    await expect(dialog.getByText(/Ask a concrete question, paste an error/i)).toBeVisible();
    await expect(dialog.getByText("Tutor mode")).toHaveCount(0);
    await expect(dialog.getByText("Starter prompts")).toHaveCount(0);
    await expect(dialog.getByText(/Good first question/i)).toHaveCount(0);

    await dialog.getByRole("button", { name: "Tools" }).first().click();

    await expect(page.getByText("Tutor mode")).toBeVisible();
    await expect(page.getByText("Starter prompts")).toBeVisible();
    await expect(page.getByRole("button", { name: /Troubleshooting Diagnose symptoms/i })).toBeVisible();

    await page.getByRole("button", { name: /Troubleshooting Diagnose symptoms/i }).click();
    await expect(textbox).toHaveAttribute("placeholder", "Describe the symptom, error, or step that failed.");

    await dialog
      .getByRole("button", { name: /What should I expect to see if this works correctly\?/i })
      .click({ force: true });
    await expect(textbox).toHaveValue("What should I expect to see if this works correctly?");

    const closeToolsButton = dialog.getByLabel("Close tutor tools");

    await expect(closeToolsButton).toBeVisible();
    await closeToolsButton.click({ force: true });
    await expect(closeToolsButton).toHaveCount(0);
    await expect(page.getByText("Tutor mode")).toHaveCount(0);
    await expect(textbox).toBeVisible();
  });

  test("keeps Pro tutor modes gated when the learner is on the free tier", async ({ page }) => {
    await mockTutorApi(page, { dailyLimit: 10, remaining: 7, tier: "free" });

    await loginToLesson(page);

    await page.getByRole("button", { name: /open ai tutor/i }).click();

    const dialog = page.getByRole("dialog", { name: /cli academy ai tutor/i });
    await expect(dialog).toBeVisible();

    await dialog.getByRole("button", { name: "Tools" }).first().click();

    await expect(page.getByRole("button", { name: /Compare Options/i })).toBeDisabled();
    await expect(page.getByRole("button", { name: /Planning/i })).toBeDisabled();
    await expect(page.getByRole("button", { name: /Export Helper/i })).toBeDisabled();
    await expect(dialog.getByText("Guided lesson · Free · 7/10 left today")).toBeVisible();
  });
});