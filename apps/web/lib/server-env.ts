import "server-only";

import fs from "node:fs";
import path from "node:path";

type EnvSource = "process" | "file" | null;

interface ServerEnvValue {
  filePath: string | null;
  source: EnvSource;
  value: string | null;
}

export interface AnthropicServerConfig {
  apiKey: string | null;
  apiKeyLocation: string | null;
  apiKeySource: EnvSource;
  message: string | null;
  model: string;
  ready: boolean;
}

function buildEnvFileCandidates() {
  const mode = process.env.NODE_ENV === "production" ? "production" : "development";
  const cwd = process.cwd();

  return Array.from(
    new Set(
      [
        path.join(/* turbopackIgnore: true */ cwd, `.env.${mode}.local`),
        path.join(/* turbopackIgnore: true */ cwd, ".env.local"),
        path.join(/* turbopackIgnore: true */ cwd, `.env.${mode}`),
        path.join(/* turbopackIgnore: true */ cwd, ".env"),
        path.join(/* turbopackIgnore: true */ cwd, "apps", "web", `.env.${mode}.local`),
        path.join(/* turbopackIgnore: true */ cwd, "apps", "web", ".env.local"),
        path.join(/* turbopackIgnore: true */ cwd, "apps", "web", `.env.${mode}`),
        path.join(/* turbopackIgnore: true */ cwd, "apps", "web", ".env"),
        path.join(/* turbopackIgnore: true */ cwd, "..", "..", `.env.${mode}.local`),
        path.join(/* turbopackIgnore: true */ cwd, "..", "..", ".env.local"),
        path.join(/* turbopackIgnore: true */ cwd, "..", "..", `.env.${mode}`),
        path.join(/* turbopackIgnore: true */ cwd, "..", "..", ".env"),
      ],
    ),
  );
}

function normalizeEnvValue(rawValue: string) {
  const trimmed = rawValue.trim();

  if (!trimmed) {
    return null;
  }

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    const unquoted = trimmed.slice(1, -1).trim();
    return unquoted.length ? unquoted : null;
  }

  return trimmed;
}

function readEnvValueFromFile(filePath: string, name: string) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const match = trimmed.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match || match[1] !== name) {
      continue;
    }

    return normalizeEnvValue(match[2]);
  }

  return null;
}

function toRepoRelativePath(filePath: string) {
  const cwd = process.cwd();
  const repoRoot = cwd.replace(/\\/g, "/").endsWith("/apps/web")
    ? path.join(/* turbopackIgnore: true */ cwd, "..", "..")
    : cwd;
  const relativePath = path.relative(repoRoot, filePath).replace(/\\/g, "/");
  return relativePath || path.basename(filePath);
}

export function getServerEnvValue(name: string): ServerEnvValue {
  const runtimeValue = normalizeEnvValue(process.env[name] ?? "");

  if (runtimeValue) {
    return {
      filePath: null,
      source: "process",
      value: runtimeValue,
    };
  }

  for (const filePath of buildEnvFileCandidates()) {
    const fileValue = readEnvValueFromFile(filePath, name);
    if (fileValue) {
      return {
        filePath,
        source: "file",
        value: fileValue,
      };
    }
  }

  return {
    filePath: null,
    source: null,
    value: null,
  };
}

export function getAnthropicServerConfig(): AnthropicServerConfig {
  const apiKey = getServerEnvValue("ANTHROPIC_API_KEY");
  const model = getServerEnvValue("ANTHROPIC_MODEL");

  return {
    apiKey: apiKey.value,
    apiKeyLocation: apiKey.filePath ? toRepoRelativePath(apiKey.filePath) : null,
    apiKeySource: apiKey.source,
    message:
      apiKey.value == null
        ? "Tutor live mode needs ANTHROPIC_API_KEY in apps/web/.env.local or the repo root .env."
        : null,
    model: model.value ?? "claude-3-5-sonnet-latest",
    ready: Boolean(apiKey.value),
  };
}