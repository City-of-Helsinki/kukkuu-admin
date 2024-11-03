import { MessageChannel } from 'worker_threads';

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import App from '../App';

// Ignore unpreventable act errors
let console: any;

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.MessageChannel = MessageChannel;
  console = global.console;
  global.console = {
    ...console,
    error: () => {
      // ignore
    },
  };
});

afterAll(() => {
  global.console = console;
  cleanup();
});

test('renders without crashing', () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});
