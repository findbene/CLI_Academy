import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { isTrustedWriteOrigin } from "../request-origin";

function makeRequest(origin: string | null): Request {
  const headers = new Headers();
  if (origin !== null) {
    headers.set("origin", origin);
  }
  return new Request("https://example.com/api/test", { method: "POST", headers });
}

describe("isTrustedWriteOrigin", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    delete process.env.NEXT_PUBLIC_APP_URL;
    delete process.env.VERCEL_URL;
    delete process.env.VERCEL_BRANCH_URL;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("allows when Origin header is absent", () => {
    expect(isTrustedWriteOrigin(makeRequest(null))).toBe(true);
  });

  it("allows when Origin matches NEXT_PUBLIC_APP_URL exactly", () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://cli-academy.com";
    expect(isTrustedWriteOrigin(makeRequest("https://cli-academy.com"))).toBe(true);
  });

  it("allows when NEXT_PUBLIC_APP_URL has trailing slash but browser sends without", () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://cli-academy.com/";
    expect(isTrustedWriteOrigin(makeRequest("https://cli-academy.com"))).toBe(true);
  });

  it("rejects when Origin does not match any allowed origin", () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://cli-academy.com";
    expect(isTrustedWriteOrigin(makeRequest("https://attacker.example"))).toBe(false);
  });

  it("allows when Origin matches VERCEL_URL preview URL", () => {
    process.env.VERCEL_URL = "cli-academy-git-feature-team.vercel.app";
    expect(isTrustedWriteOrigin(makeRequest("https://cli-academy-git-feature-team.vercel.app"))).toBe(true);
  });

  it("allows when Origin matches VERCEL_BRANCH_URL", () => {
    process.env.VERCEL_BRANCH_URL = "cli-academy-main.vercel.app";
    expect(isTrustedWriteOrigin(makeRequest("https://cli-academy-main.vercel.app"))).toBe(true);
  });

  it("allows localhost:3000 in non-production", () => {
    const savedNodeEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, "NODE_ENV", { value: "development", writable: true });
    expect(isTrustedWriteOrigin(makeRequest("http://localhost:3000"))).toBe(true);
    Object.defineProperty(process.env, "NODE_ENV", { value: savedNodeEnv, writable: true });
  });
});
