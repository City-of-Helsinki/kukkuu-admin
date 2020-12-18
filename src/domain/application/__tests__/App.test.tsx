import React from 'react';
import ReactDOM from 'react-dom';

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
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
