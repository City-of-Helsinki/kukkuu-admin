/**
 * Get an environment variable's value with a three-tier fallback:
 *   1. Runtime-injected values for browser deployments (globalThis.window._env_,
 *      written by public/env-config.js — generated at build time by
 *      scripts/update-runtime-env.ts and overwritten at container start by the
 *      base image's env.sh with the real runtime values).
 *   2. Node process env (used by Vitest and server-side tooling).
 *   3. Build-time Vite replacement (import.meta.env) as a last resort.
 */
function toEnvString(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value;
  }

  if (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'bigint'
  ) {
    return value.toString();
  }

  return undefined;
}

export function getEnvValue(key: string): string | undefined {
  // Runtime-injected env values for browser deployments.
  const runtimeEnvValue = toEnvString(globalThis.window?._env_?.[key]);
  if (runtimeEnvValue !== undefined) {
    return runtimeEnvValue;
  }

  // Node test/runtime fallback (used by Vitest and server-side tooling).
  const processEnv = (
    globalThis as typeof globalThis & {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process?.env;
  const processValue = processEnv?.[key];
  if (processValue !== undefined) {
    return processValue;
  }

  // Build-time fallback for environments still relying on Vite replacement.
  const value = (import.meta.env as Record<string, unknown>)[key];
  const normalizedValue = toEnvString(value);
  if (normalizedValue !== undefined) {
    return normalizedValue;
  }

  return undefined;
}
