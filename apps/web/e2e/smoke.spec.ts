import { test, expect } from "@playwright/test";

const authConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// ---------------------------------------------------------------------------
// Smoke tests — validates the critical public and protected surfaces load
// without 500s and that auth gating redirects unauthenticated users.
// ---------------------------------------------------------------------------

test.describe("Public pages", () => {
  const publicRoutes = [
    { path: "/", title: "CLI Academy" },
    { path: "/paths", title: "Learning Paths" },
    { path: "/pricing", title: "Pricing" },
    { path: "/login", title: "Log in" },
    { path: "/signup", title: "Sign up" },
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

      if (authConfigured) {
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

    const emailInput = page.getByLabel("Email");
    const passwordInput = page.getByLabel("Password");
    const submitButton = page.getByRole("button", { name: /log in/i });
    const googleButton = page.getByRole("button", { name: /continue with google/i });

    if (authConfigured) {
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
    const submitButton = page.getByRole("button", { name: /create account/i });
    const googleButton = page.getByRole("button", { name: /continue with google/i });

    if (authConfigured) {
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
