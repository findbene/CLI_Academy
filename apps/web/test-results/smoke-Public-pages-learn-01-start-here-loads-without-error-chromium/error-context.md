# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Public pages >> /learn/01-start-here loads without error
- Location: e2e\smoke.spec.ts:26:9

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/learn/01-start-here
Call log:
  - navigating to "http://localhost:3000/learn/01-start-here", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | // ---------------------------------------------------------------------------
  4   | // Smoke tests — validates the critical public and protected surfaces load
  5   | // without 500s and that auth gating redirects unauthenticated users.
  6   | // ---------------------------------------------------------------------------
  7   | 
  8   | test.describe("Public pages", () => {
  9   |   const publicRoutes = [
  10  |     { path: "/", title: "CLI Academy" },
  11  |     { path: "/paths", title: "Learning Paths" },
  12  |     { path: "/paths/01-start-here", title: "Start Here: Safety, Confidence, and First Success" },
  13  |     { path: "/learn/01-start-here", title: "Start Here: Safety, Confidence, and First Success" },
  14  |     { path: "/learn/01-start-here/lesson-1-1-1-create-the-cli-academy-workspace", title: "Create the CLI Academy workspace" },
  15  |     { path: "/pricing", title: "Pricing" },
  16  |     { path: "/login", title: "Log in" },
  17  |     { path: "/signup", title: "Sign up" },
  18  |     { path: "/forgot-password", title: "Reset your password" },
  19  |     { path: "/reset-password", title: "Choose a new password" },
  20  |     { path: "/trust", title: "Trust" },
  21  |     { path: "/resources", title: "Resource Hub" },
  22  |     { path: "/support", title: "Support" },
  23  |   ];
  24  | 
  25  |   for (const route of publicRoutes) {
  26  |     test(`${route.path} loads without error`, async ({ page }) => {
> 27  |       const response = await page.goto(route.path);
      |                                   ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/learn/01-start-here
  28  |       expect(response?.status()).toBeLessThan(500);
  29  |       await expect(page).toHaveTitle(new RegExp(route.title, "i"));
  30  |     });
  31  |   }
  32  | });
  33  | 
  34  | test.describe("Learning discovery", () => {
  35  |   test("search surfaces richer path context", async ({ page }) => {
  36  |     await page.goto("/paths");
  37  |     await page.waitForFunction(() => {
  38  |       window.dispatchEvent(new Event("open-search"));
  39  |       return Boolean(document.querySelector('input[aria-label="Search"]'));
  40  |     });
  41  | 
  42  |     const searchInput = page.locator('input[aria-label="Search"]');
  43  |     await expect(searchInput).toBeVisible();
  44  | 
  45  |     await searchInput.fill("start here");
  46  | 
  47  |     await expect(page.locator("body")).toContainText(/Foundations/i);
  48  |     await expect(page.locator("body")).toContainText(/Starter/i);
  49  |     await expect(page.locator("body")).toContainText(/Best for:/i);
  50  |   });
  51  | 
  52  |   test("lesson route exposes guided-learning controls", async ({ page }) => {
  53  |     await page.goto("/learn/01-start-here/lesson-1-1-1-create-the-cli-academy-workspace");
  54  | 
  55  |     await expect(page.getByText("Mission outcome")).toBeVisible();
  56  |     await expect(page.getByText("Guided checklist")).toBeVisible();
  57  |     await expect(page.getByText("Mastery checkpoint")).toBeVisible();
  58  |     await expect(page.getByRole("button", { name: /mark complete/i })).toBeVisible();
  59  |   });
  60  | 
  61  |   test("path detail page exposes freshness and outcomes", async ({ page }) => {
  62  |     await page.goto("/paths/01-start-here");
  63  | 
  64  |     await expect(page.getByText("Path guidance")).toBeVisible();
  65  |     await expect(page.getByText("Freshness:")).toBeVisible();
  66  |     await expect(page.getByText("You will leave with")).toBeVisible();
  67  |   });
  68  | 
  69  |   test("path learner page exposes path mastery", async ({ page }) => {
  70  |     await page.goto("/learn/01-start-here");
  71  | 
  72  |     await expect(page.getByText("Path mastery")).toBeVisible();
  73  |   });
  74  | 
  75  |   test("dashboard page renders mastery-aware sections when available", async ({ page }) => {
  76  |     await page.goto("/dashboard");
  77  | 
  78  |     if (page.url().includes("/login")) {
  79  |       await expect(page).toHaveURL(/\/login/);
  80  |       return;
  81  |     }
  82  | 
  83  |     await expect(page.getByText("Mastery-based next paths")).toBeVisible();
  84  |     await expect(page.getByText("Mastery signals")).toBeVisible();
  85  |   });
  86  | 
  87  |   test("trust page exposes freshness summary", async ({ page }) => {
  88  |     await page.goto("/trust");
  89  | 
  90  |     await expect(page.getByText(/fresh .* review due .* stale/i)).toBeVisible();
  91  |   });
  92  | });
  93  | 
  94  | test.describe("Security headers", () => {
  95  |   test("response includes security headers", async ({ page }) => {
  96  |     const response = await page.goto("/");
  97  |     const headers = response?.headers() ?? {};
  98  | 
  99  |     expect(headers["x-content-type-options"]).toBe("nosniff");
  100 |     expect(headers["x-frame-options"]).toBe("DENY");
  101 |     expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  102 |     expect(headers["permissions-policy"]).toContain("camera=()");
  103 |   });
  104 | });
  105 | 
  106 | test.describe("Protected surfaces", () => {
  107 |   const protectedRoutes = ["/dashboard", "/settings", "/downloads"];
  108 | 
  109 |   for (const route of protectedRoutes) {
  110 |     test(`${route} handles unauthenticated users without a server error`, async ({ page }) => {
  111 |       const response = await page.goto(route);
  112 |       expect(response?.status()).toBeLessThan(500);
  113 | 
  114 |       if (page.url().includes(`/login?next=${encodeURIComponent(route)}`)) {
  115 |         await expect(page).toHaveURL(new RegExp(`/login\\?next=${encodeURIComponent(route).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
  116 |       } else {
  117 |         await expect(page).not.toHaveURL(/\/login/);
  118 |         await expect(page.locator("body")).not.toContainText(/application error|server error/i);
  119 |       }
  120 |     });
  121 |   }
  122 | });
  123 | 
  124 | test.describe("Auth surfaces", () => {
  125 |   test("login page reflects auth availability", async ({ page }) => {
  126 |     await page.goto("/login");
  127 | 
```