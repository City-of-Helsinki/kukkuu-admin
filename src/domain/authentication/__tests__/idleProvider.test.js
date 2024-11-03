import { MessageChannel } from 'worker_threads';

import React from 'react';
import {
  render,
  cleanup,
  act,
  fireEvent,
  waitFor,
} from '@testing-library/react';

import authService from '../../authentication/authService';
import IdleTimer from '../IdleTimer';

const originalEnv = process.env;

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.MessageChannel = MessageChannel;
  process.env = {
    ...originalEnv,
    REACT_APP_IDLE_TIMEOUT_IN_MS: '3600000',
  };
  jest.useFakeTimers();
});

afterAll(() => {
  cleanup();
  process.env = originalEnv;
  jest.useFakeTimers();
});

test('check idle timer has logged out after 60min and 1s', async () => {
  render(<IdleTimer />);
  const start = Date.now();

  act(() => {
    jest.setSystemTime(start + 1000 * 60 * 60 + 1);
    fireEvent.focus(document);
  });

  jest.spyOn(authService, 'isAuthenticated').mockReturnValueOnce(true);
  jest.spyOn(authService, 'logout');
  await waitFor(() => {
    expect(authService.logout()).resolves.toEqual(1);
  });
});

test('check idle timer has not logged out after 50min', async () => {
  render(<IdleTimer />);
  const start = Date.now();

  act(() => {
    jest.setSystemTime(start + 1000 * 60 * 50);
    fireEvent.focus(document);
  });

  jest.spyOn(authService, 'isAuthenticated').mockReturnValueOnce(true);
  jest.spyOn(authService, 'logout');
  expect(authService.logout()).resolves.toEqual(0);
});
