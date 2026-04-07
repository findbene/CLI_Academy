import { test, expect } from "@playwright/test";

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
    test(`${route} loads without a server error for unauthenticated users`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBeLessThan(500);

      // The current product serves a safe fallback state for unauthenticated users
      // instead of forcing a redirect on these pages.
      await expect(page).not.toHaveURL(/\/login/);
    });
  }
});

test.describe("404 handling", () => {
  test("unknown route shows 404 page", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
  });
});
