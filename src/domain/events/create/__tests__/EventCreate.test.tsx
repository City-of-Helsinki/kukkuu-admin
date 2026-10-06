import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import {
  AdminContext,
  testDataProvider,
  ResourceContextProvider,
} from 'react-admin';
import { vi } from 'vitest';

import EventCreate from '../EventCreate';

// Mock KukkuuCreatePage to intercept reactAdminProps.transform
vi.mock(
  '../../../application/layout/kukkuuCreatePage/KukkuuCreatePage',
  () => ({
    default: ({ reactAdminProps, children }: any) => {
      // We render a button that calls transform to verify its logic
      return (
        <div data-testid="kukkuu-create-page">
          <button
            data-testid="transform-button"
            onClick={() => {
              const result = reactAdminProps.transform({
                name: 'Test Event',
                projectId: 'project-1',
                eventGroupId: 'group-1',
              });
              // Expose result on a DOM element for assertion
              document.body.dataset.transformResult = JSON.stringify(result);
            }}
          >
            Transform
          </button>
          {children}
        </div>
      );
    },
  })
);

const useLocationMock = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<any>();
  return {
    ...actual,
    useLocation: () => useLocationMock(),
  };
});

describe('EventCreate', () => {
  beforeEach(() => {
    document.body.dataset.transformResult = '';
  });

  const dataProvider = {
    ...testDataProvider(),
    getOne: () => Promise.resolve({ data: { id: 'event-id' } }),
  } as any;

  it('uses data.eventGroupId from the form when copying an event', async () => {
    // SCENARIO 1: Copying an event.
    // The user clicks "Copy" on an event, which navigates to `/events/create?copyFrom=event-id`.
    // In this mode, the EventForm renders `<CopyTargetFields>`, allowing the user to select
    // a target Project and Event Group. The selected Event Group is submitted as `data.eventGroupId`.
    useLocationMock.mockReturnValue({ search: '?copyFrom=event-id' });

    render(
      <AdminContext dataProvider={dataProvider}>
        <ResourceContextProvider value="events">
          <EventCreate />
        </ResourceContextProvider>
      </AdminContext>
    );

    await waitFor(() => {
      expect(screen.getByTestId('transform-button')).toBeInTheDocument();
    });

    const button = screen.getByTestId('transform-button');
    button.click();

    const result = JSON.parse(document.body.dataset.transformResult || '{}');
    expect(result.projectId).toBe('project-1');
    expect(result.eventGroupId).toBe('group-1'); // Comes from form data (mocked as 'group-1')
  });

  it('uses url eventGroupId when not copying (e.g. adding directly to an event group)', async () => {
    // SCENARIO 2: Creating a completely new event inside a specific event group.
    // The user goes to an Event Group's page and clicks "Add Event".
    // This navigates to `/events/create?eventGroupId=group-from-url`.
    // In this mode, the `<CopyTargetFields>` are NOT rendered, so the form has no event group input.
    // Instead, the `eventGroupId` is extracted directly from the URL query params.
    useLocationMock.mockReturnValue({ search: '?eventGroupId=group-from-url' });

    render(
      <AdminContext dataProvider={dataProvider}>
        <ResourceContextProvider value="events">
          <EventCreate />
        </ResourceContextProvider>
      </AdminContext>
    );

    await waitFor(() => {
      expect(screen.getByTestId('transform-button')).toBeInTheDocument();
    });

    const button = screen.getByTestId('transform-button');
    button.click();

    const result = JSON.parse(document.body.dataset.transformResult || '{}');
    expect(result.eventGroupId).toBe('group-from-url'); // Comes from the URL parameter
  });
});
