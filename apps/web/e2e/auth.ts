import { existsSync } from "node:fs";
import path from "node:path";

import { expect, type Page } from "@playwright/test";

const qaEmail = process.env.E2E_USER_EMAIL?.trim();
const qaPassword = process.env.E2E_USER_PASSWORD?.trim();
const requestedAuthStatePath = process.env.E2E_AUTH_STORAGE_STATE?.trim();

const defaultAuthStatePath = path.join(__dirname, ".auth", "learner.json");

export const e2eAuthStatePath = requestedAuthStatePath
  ? path.isAbsolute(requestedAuthStatePath)
    ? requestedAuthStatePath
    : path.resolve(process.cwd(), requestedAuthStatePath)
  : defaultAuthStatePath;

export const hasE2EAuthState = existsSync(e2eAuthStatePath);
export const hasE2ELoginCredentials = Boolean(qaEmail && qaPassword);
export const e2eAuthSkipMessage = `Set E2E_USER_EMAIL and E2E_USER_PASSWORD or provide a Playwright storage state at ${e2eAuthStatePath} to run authenticated lesson regressions.`;

export async function loginToAuthenticatedRoute(page: Page, nextPath: string, routeLabel: string) {
  await page.goto(nextPath);
  await page.waitForLoadState("domcontentloaded");

  if (page.url().includes("/onboarding")) {
    throw new Error(
      `The configured authenticated learner for ${routeLabel} is not fully onboarded. Use a confirmed learner account that can access app routes directly.`,
    );
  }

  if (!page.url().includes("/login")) {
    return;
  }

  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();

  if ((await page.getByText(/authentication is unavailable until/i).count()) > 0) {
    throw new Error(`Auth is unavailable in this environment, so the authenticated ${routeLabel} regression cannot run.`);
  }

  if (!qaEmail || !qaPassword) {
    throw new Error(
      `No E2E credentials are configured for ${routeLabel}. Provide E2E_USER_EMAIL and E2E_USER_PASSWORD or refresh the Playwright storage state at ${e2eAuthStatePath}.`,
    );
  }

  await page.getByLabel("Email").fill(qaEmail);
  await page.getByLabel("Password").fill(qaPassword);
  await page.getByRole("button", { name: /^sign in$/i }).click();

  await page.waitForURL((url: URL) => !url.pathname.startsWith("/login"), { timeout: 15_000 });

  if (page.url().includes("/onboarding")) {
    throw new Error(
      `The configured E2E user for ${routeLabel} is not fully onboarded. Use a confirmed learner account that can access app routes directly.`,
    );
  }

  await page.goto(nextPath);
}