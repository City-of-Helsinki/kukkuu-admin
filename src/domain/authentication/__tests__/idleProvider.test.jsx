/* eslint-disable @vitest/no-conditional-expect */
import { MessageChannel } from 'worker_threads';

import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import authService from '../authService';
import IdleTimer from '../IdleTimer';

const navigateMock = vi.fn();
const VITE_IDLE_TIMEOUT_IN_MS = 1000 * 60 * 60;
beforeEach(() => {
  global.MessageChannel = MessageChannel;
  vi.stubEnv('VITE_IDLE_TIMEOUT_IN_MS', String(VITE_IDLE_TIMEOUT_IN_MS));
  vi.useFakeTimers();
  Object.defineProperty(window, 'location', {
    value: {
      assign: navigateMock,
    },
  });
});

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  vi.useRealTimers();
  vi.clearAllMocks();
});

test.each([
  { advancedTimeMs: VITE_IDLE_TIMEOUT_IN_MS + 1, logoutExpected: true },
  { advancedTimeMs: VITE_IDLE_TIMEOUT_IN_MS, logoutExpected: true },
  { advancedTimeMs: VITE_IDLE_TIMEOUT_IN_MS - 1, logoutExpected: false },
])(
  'check automatic logout expected after $advancedTimeMs -> $logoutExpected',
  async ({ advancedTimeMs, logoutExpected }) => {
    vi.spyOn(authService, 'isAuthenticated').mockImplementation(() => true);
    const logoutSpy = vi.spyOn(authService, 'logout');

    render(<IdleTimer />);

    vi.advanceTimersByTime(advancedTimeMs);

    fireEvent.focus(document);

    if (logoutExpected) {
      expect(logoutSpy).toHaveBeenCalled();
    } else {
      expect(logoutSpy).not.toHaveBeenCalled();
    }
  }
);
