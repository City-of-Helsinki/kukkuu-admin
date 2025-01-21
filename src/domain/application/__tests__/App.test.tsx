import { MessageChannel } from 'worker_threads';

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import App from '../App';
import dataProvider from '../../../api/dataProvider';

// Ignore unpreventable act errors
let console: any;

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
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
  vi.spyOn(dataProvider, 'getMyAdminProfile').mockResolvedValue({
    data: {
      id: 'project-id',
      projects: {
        edges: [
          {
            node: {
              id: '123',
              myPermissions: {
                publish: true,
                manageEventGroups: true,
                canSendToAllInProject: true,
                viewFamilies: true,
              },
              year: 2024,
              name: 'project',
            },
          },
        ],
      },
    },
  });

  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});
