# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Auth surfaces >> auth callback preserves intended next destination when login is required
- Location: e2e\smoke.spec.ts:178:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/api/auth/callback?next=%2Fdashboard
Call log:
  - navigating to "http://localhost:3000/api/auth/callback?next=%2Fdashboard", waiting until "load"

```

# Test source

```ts
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
  128 |     await expect(page.getByRole("link", { name: "Sign up" }).first()).toBeVisible();
  129 |     await expect(page.getByRole("link", { name: /forgot password\?/i })).toHaveAttribute("href", "/forgot-password");
  130 | 
  131 |     const emailInput = page.getByLabel("Email");
  132 |     const passwordInput = page.getByLabel("Password");
  133 |     const submitButton = page.getByRole("button", { name: /sign in/i });
  134 |     const googleButton = page.getByRole("button", { name: /continue with google/i });
  135 |     const authUnavailable = (await page.getByText(/authentication is unavailable until/i).count()) > 0;
  136 | 
  137 |     if (!authUnavailable) {
  138 |       await expect(emailInput).toBeEnabled();
  139 |       await expect(passwordInput).toBeEnabled();
  140 |       await expect(submitButton).toBeEnabled();
  141 |       await expect(googleButton).toBeEnabled();
  142 |       await expect(page.getByText(/authentication is unavailable until/i)).toHaveCount(0);
  143 |     } else {
  144 |       await expect(emailInput).toBeDisabled();
  145 |       await expect(passwordInput).toBeDisabled();
  146 |       await expect(submitButton).toBeDisabled();
  147 |       await expect(googleButton).toBeDisabled();
  148 |       await expect(page.getByText(/authentication is unavailable until/i)).toBeVisible();
  149 |     }
  150 |   });
  151 | 
  152 |   test("signup page reflects auth availability", async ({ page }) => {
  153 |     await page.goto("/signup");
  154 | 
  155 |     await expect(page.getByRole("link", { name: "Log in" }).first()).toBeVisible();
  156 | 
  157 |     const emailInput = page.getByLabel("Email");
  158 |     const passwordInput = page.getByLabel("Password");
  159 |     const submitButton = page.getByRole("button", { name: /create your account/i });
  160 |     const googleButton = page.getByRole("button", { name: /continue with google/i });
  161 |     const authUnavailable = (await page.getByText(/authentication is unavailable until/i).count()) > 0;
  162 | 
  163 |     if (!authUnavailable) {
  164 |       await expect(emailInput).toBeEnabled();
  165 |       await expect(passwordInput).toBeEnabled();
  166 |       await expect(submitButton).toBeEnabled();
  167 |       await expect(googleButton).toBeEnabled();
  168 |       await expect(page.getByText(/authentication is unavailable until/i)).toHaveCount(0);
  169 |     } else {
  170 |       await expect(emailInput).toBeDisabled();
  171 |       await expect(passwordInput).toBeDisabled();
  172 |       await expect(submitButton).toBeDisabled();
  173 |       await expect(googleButton).toBeDisabled();
  174 |       await expect(page.getByText(/authentication is unavailable until/i)).toBeVisible();
  175 |     }
  176 |   });
  177 | 
  178 |   test("auth callback preserves intended next destination when login is required", async ({ page }) => {
> 179 |     const response = await page.goto("/api/auth/callback?next=%2Fdashboard");
      |                                 ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/api/auth/callback?next=%2Fdashboard
  180 |     expect(response?.status()).toBeLessThan(500);
  181 |     await expect(page).toHaveURL(/\/login\?next=%2Fdashboard$/);
  182 |   });
  183 | });
  184 | 
  185 | test.describe("404 handling", () => {
  186 |   test("unknown route shows 404 page", async ({ page }) => {
  187 |     const response = await page.goto("/this-page-does-not-exist");
  188 |     expect(response?.status()).toBe(404);
  189 |   });
  190 | });
  191 | 
```