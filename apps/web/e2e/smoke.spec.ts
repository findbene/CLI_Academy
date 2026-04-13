import { test, expect } from "@playwright/test";

// ---------------------------------------------------------------------------
// Smoke tests — validates the critical public and protected surfaces load
// without 500s and that auth gating redirects unauthenticated users.
// ---------------------------------------------------------------------------

test.describe("Public pages", () => {
  const publicRoutes = [
    { path: "/", title: "CLI Academy" },
    { path: "/paths", title: "Learning Paths" },
    { path: "/paths/01-start-here", title: "Start Here: Safety, Confidence, and First Success" },
    { path: "/learn/01-start-here", title: "Start Here: Safety, Confidence, and First Success" },
    { path: "/learn/01-start-here/lesson-1-1-1-create-the-cli-academy-workspace", title: "Create the CLI Academy workspace" },
    { path: "/pricing", title: "Pricing" },
    { path: "/login", title: "Log in" },
    { path: "/signup", title: "Sign up" },
    { path: "/forgot-password", title: "Reset your password" },
    { path: "/reset-password", title: "Choose a new password" },
    { path: "/trust", title: "Trust" },
    { path: "/resources", title: "Resource Hub" },
    { path: "/support", title: "Support" },
  ];

  for (const route of publicRoutes) {
    test(`${route.path} loads without error`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBeLessThan(500);
      await expect(page).toHaveTitle(new RegExp(route.title, "i"));
    });
  }
});

test.describe("Learning discovery", () => {
  test("search surfaces richer path context", async ({ page }) => {
    await page.goto("/paths");
    await page.waitForFunction(() => {
      window.dispatchEvent(new Event("open-search"));
      return Boolean(document.querySelector('input[aria-label="Search"]'));
    });

    const searchInput = page.locator('input[aria-label="Search"]');
    await expect(searchInput).toBeVisible();

    await searchInput.fill("start here");

    await expect(page.locator("body")).toContainText(/Foundations/i);
    await expect(page.locator("body")).toContainText(/Starter/i);
    await expect(page.locator("body")).toContainText(/Best for:/i);
  });

  test("lesson route exposes guided-learning controls", async ({ page }) => {
    await page.goto("/learn/01-start-here/lesson-1-1-1-create-the-cli-academy-workspace");

    await expect(page.getByText("Mission outcome")).toBeVisible();
    await expect(page.getByText("Guided checklist")).toBeVisible();
    await expect(page.getByText("Mastery checkpoint")).toBeVisible();
    await expect(page.getByRole("button", { name: /mark complete/i })).toBeVisible();
  });

  test("path detail page exposes freshness and outcomes", async ({ page }) => {
    await page.goto("/paths/01-start-here");

    await expect(page.getByText("Path guidance")).toBeVisible();
    await expect(page.getByText("Freshness:")).toBeVisible();
    await expect(page.getByText("You will leave with")).toBeVisible();
  });

  test("path learner page exposes path mastery", async ({ page }) => {
    await page.goto("/learn/01-start-here");

    await expect(page.getByText("Path mastery")).toBeVisible();
  });

  test("dashboard page renders mastery-aware sections when available", async ({ page }) => {
    await page.goto("/dashboard");

    if (page.url().includes("/login")) {
      await expect(page).toHaveURL(/\/login/);
      return;
    }

    await expect(page.getByText("Mastery-based next paths")).toBeVisible();
    await expect(page.getByText("Mastery signals")).toBeVisible();
  });

  test("trust page exposes freshness summary", async ({ page }) => {
    await page.goto("/trust");

    await expect(page.getByText(/fresh .* review due .* stale/i)).toBeVisible();
  });
});

test.describe("Security headers", () => {
  test("response includes security headers", async ({ page }) => {
    const response = await page.goto("/");
    const headers = response?.headers() ?? {};

    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["permissions-policy"]).toContain("camera=()");
  });
});

test.describe("Protected surfaces", () => {
  const protectedRoutes = ["/dashboard", "/settings", "/downloads"];

  for (const route of protectedRoutes) {
    test(`${route} handles unauthenticated users without a server error`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBeLessThan(500);

      if (page.url().includes(`/login?next=${encodeURIComponent(route)}`)) {
        await expect(page).toHaveURL(new RegExp(`/login\\?next=${encodeURIComponent(route).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
      } else {
        await expect(page).not.toHaveURL(/\/login/);
        await expect(page.locator("body")).not.toContainText(/application error|server error/i);
      }
    });
  }
});

test.describe("Auth surfaces", () => {
  test("login page reflects auth availability", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByRole("link", { name: "Sign up" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /forgot password\?/i })).toHaveAttribute("href", "/forgot-password");

    const emailInput = page.getByLabel("Email");
    const passwordInput = page.getByLabel("Password");
    const submitButton = page.getByRole("button", { name: /sign in/i });
    const googleButton = page.getByRole("button", { name: /continue with google/i });
    const authUnavailable = (await page.getByText(/authentication is unavailable until/i).count()) > 0;

    if (!authUnavailable) {
      await expect(emailInput).toBeEnabled();
      await expect(passwordInput).toBeEnabled();
      await expect(submitButton).toBeEnabled();
      await expect(googleButton).toBeEnabled();
      await expect(page.getByText(/authentication is unavailable until/i)).toHaveCount(0);
    } else {
      await expect(emailInput).toBeDisabled();
      await expect(passwordInput).toBeDisabled();
      await expect(submitButton).toBeDisabled();
      await expect(googleButton).toBeDisabled();
      await expect(page.getByText(/authentication is unavailable until/i)).toBeVisible();
    }
  });

  test("signup page reflects auth availability", async ({ page }) => {
    await page.goto("/signup");

    await expect(page.getByRole("link", { name: "Log in" }).first()).toBeVisible();

    const emailInput = page.getByLabel("Email");
    const passwordInput = page.getByLabel("Password");
    const submitButton = page.getByRole("button", { name: /create your account/i });
    const googleButton = page.getByRole("button", { name: /continue with google/i });
    const authUnavailable = (await page.getByText(/authentication is unavailable until/i).count()) > 0;

    if (!authUnavailable) {
      await expect(emailInput).toBeEnabled();
      await expect(passwordInput).toBeEnabled();
      await expect(submitButton).toBeEnabled();
      await expect(googleButton).toBeEnabled();
      await expect(page.getByText(/authentication is unavailable until/i)).toHaveCount(0);
    } else {
      await expect(emailInput).toBeDisabled();
      await expect(passwordInput).toBeDisabled();
      await expect(submitButton).toBeDisabled();
      await expect(googleButton).toBeDisabled();
      await expect(page.getByText(/authentication is unavailable until/i)).toBeVisible();
    }
  });

  test("auth callback preserves intended next destination when login is required", async ({ page }) => {
    const response = await page.goto("/api/auth/callback?next=%2Fdashboard");
    expect(response?.status()).toBeLessThan(500);
    await expect(page).toHaveURL(/\/login\?next=%2Fdashboard$/);
  });
});

test.describe("404 handling", () => {
  test("unknown route shows 404 page", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
  });
});
