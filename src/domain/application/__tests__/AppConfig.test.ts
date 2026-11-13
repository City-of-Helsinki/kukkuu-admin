import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import AppConfig from '../AppConfig';

describe('AppConfig', () => {
  let env: typeof process.env;

  beforeEach(() => {
    env = { ...process.env };
  });

  afterEach(() => {
    process.env = env;
  });

  describe('timezone', () => {
    it('defaults to Europe/Helsinki when VITE_TIMEZONE is not set', () => {
      delete process.env.VITE_TIMEZONE;
      expect(AppConfig.timezone).toBe('Europe/Helsinki');
    });

    it('reads VITE_TIMEZONE when set', () => {
      process.env.VITE_TIMEZONE = 'UTC';
      expect(AppConfig.timezone).toBe('UTC');
    });
  });
});
