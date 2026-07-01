import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import {
  usePermissions,
  AdminContext,
  ResourceContextProvider,
  testDataProvider,
} from 'react-admin';
import { vi } from 'vitest';

import i18nProvider from '../../../../common/translation/i18nProvider';
import { withRouter } from '../../../../common/testUtils';
import EventsAndEventGroupsList from '../EventsAndEventGroupsList';
import projectService from '../../../projects/projectService';

vi.mock('react-admin', async () => {
  const actual =
    await vi.importActual<typeof import('react-admin')>('react-admin');
  return {
    ...actual,
    usePermissions: vi.fn(),
  };
});

const CURRENT_PROJECT_ID = 'project-1';

const event = {
  id: 'evt-1',
  name: 'Kesäjuhla 2026',
  publishedAt: null,
  capacityPerOccurrence: 5,
  occurrences: {
    edges: [
      { node: { capacityOverride: null } },
      { node: { capacityOverride: null } },
    ],
  },
};

const eventGroup = {
  id: 'grp-1',
  name: 'Kesäryhmä 2026',
  publishedAt: null,
  events: {
    edges: [
      {
        node: {
          id: 'sub-evt-1',
          capacityPerOccurrence: 3,
          occurrences: {
            edges: [{ node: { capacityOverride: null } }],
          },
        },
      },
    ],
  },
};

const listPathname = '/events-and-event-groups';

const buildDataProvider = (records: any[]) =>
  testDataProvider({
    // @ts-ignore
    getList: () => Promise.resolve({ data: records, total: records.length }),
    // @ts-ignore
    getOne: () =>
      Promise.resolve({
        data: { id: CURRENT_PROJECT_ID, singleEventsAllowed: true },
      }),
  });

const buildWrapper = (records: any[]) => {
  const dataProvider = buildDataProvider(records);
  const RaWrapper = ({ children }: { children: React.ReactNode }) => (
    <AdminContext dataProvider={dataProvider} i18nProvider={i18nProvider}>
      <ResourceContextProvider value="events-and-event-groups">
        {children as React.ReactElement}
      </ResourceContextProvider>
    </AdminContext>
  );
  return withRouter(RaWrapper, listPathname, [listPathname]);
};

const renderList = (records: any[] = [event, eventGroup]) =>
  render(<EventsAndEventGroupsList />, { wrapper: buildWrapper(records) });

describe('<EventsAndEventGroupsList />', () => {
  beforeEach(() => {
    projectService.projectId = CURRENT_PROJECT_ID;
    (usePermissions as ReturnType<typeof vi.fn>).mockReturnValue({
      permissions: {
        canManageEventGroupsWithinProject: () => true,
      },
    });
  });

  afterEach(() => {
    projectService.clear();
    vi.clearAllMocks();
  });

  it('renders both a plain event row and an event-group row', async () => {
    renderList();

    await waitFor(() =>
      expect(screen.getByText(event.name)).toBeInTheDocument()
    );
    expect(screen.getByText(eventGroup.name)).toBeInTheDocument();
  });

  it('renders capacity for a plain event (2 occurrences × 5 per occurrence = 10)', async () => {
    renderList([event]);

    await waitFor(() =>
      expect(screen.getByText(event.name)).toBeInTheDocument()
    );
    expect(screen.getByRole('cell', { name: '10' })).toBeInTheDocument();
  });

  it('renders capacity for an event-group aggregated from its child events (1 occurrence × 3 = 3)', async () => {
    renderList([eventGroup]);

    await waitFor(() =>
      expect(screen.getByText(eventGroup.name)).toBeInTheDocument()
    );
    expect(screen.getByRole('cell', { name: '3' })).toBeInTheDocument();
  });

  it('renders the occurrence count computed by countOccurrences for a plain event', async () => {
    renderList([event]);

    await waitFor(() =>
      expect(screen.getByText(event.name)).toBeInTheDocument()
    );
    // Plain event has 2 occurrences → the countOccurrences cell shows "2".
    expect(screen.getByRole('cell', { name: '2' })).toBeInTheDocument();
  });

  it('renders localized row type labels for events and event-groups', async () => {
    renderList();

    await waitFor(() =>
      expect(screen.getByText(event.name)).toBeInTheDocument()
    );
    expect(screen.getByRole('cell', { name: 'Tapahtuma' })).toBeInTheDocument();
    expect(
      screen.getByRole('cell', { name: 'Tapahtumaryhmä' })
    ).toBeInTheDocument();
  });

  it('renders the empty state with the create-event-group action when the list is empty', async () => {
    renderList([]);

    await waitFor(() =>
      expect(
        screen.getByRole('link', { name: 'Uusi tapahtumaryhmä' })
      ).toBeInTheDocument()
    );
  });
});
