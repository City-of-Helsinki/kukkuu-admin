import React from 'react';
import { render } from '@testing-library/react';

import App from '../App';

// Ignore unpreventable act errors
let console: any;

beforeAll(() => {
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
});

test('renders without crashing', () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});
