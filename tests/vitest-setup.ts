/* eslint-disable import/first */
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
require('dotenv').config({ path: './.env.test' });
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import 'vitest-localstorage-mock';

vi.mock('@sentry/browser', () => ({
  captureException: vi.fn(),
  captureMessage: vi.fn(),
  withScope: vi.fn(),
}));

afterEach(() => {
  cleanup();
});

beforeAll(() => {
  vi.mock('react-admin', async (importOriginal: any) => {
    const mod = await importOriginal();
    return {
      ...mod,
    };
  });
});

afterAll(() => {
  cleanup();
});
