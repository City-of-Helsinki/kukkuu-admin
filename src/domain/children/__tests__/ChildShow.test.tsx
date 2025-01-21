import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import {
  AdminContext,
  RecordContextProvider,
  testDataProvider,
  usePermissions,
} from 'react-admin';
import { vi } from 'vitest';
import { ResourceContextProvider } from 'ra-core';
import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom';

import i18nProvider from '../../../common/translation/i18nProvider';
import ChildShow from '../ChildShow';
import { withRouter } from '../../../common/testUtils';

vi.mock('react-admin', async () => {
  const actual = await vi.importActual('react-admin');
  return {
    ...actual,
    usePermissions: vi.fn(),
  };
});

const guardian = {
  id: 'R3VhcmRpYW5Ob2RlOjE=',
  email: 'maija.meikalainen@test.org',
  language: 'FI',
  firstName: 'Maija',
  lastName: 'Meikäläinen',
  phoneNumber: '123456789',
  __typename: 'GuardianNode',
} as const;

const guardianName = `${guardian.firstName} ${guardian.lastName}`;
const localizedGuardianLanguage = 'suomi';

const child = {
  id: 'Q2hpbGROb2RlOjE=',
  name: 'Vauveliini',
  birthyear: 2025,
  postalCode: '00100',
  guardians: {
    edges: [
      {
        node: guardian,
        __typename: 'GuardianNodeEdge',
      },
    ],
    __typename: 'GuardianNodeConnection',
  },
  occurrences: {
    edges: [],
    __typename: 'OccurrenceNodeConnection',
  },
  __typename: 'ChildNode',
} as const;

const childrenShowPathname = `/children/${child.id}/show`;

const dataProviderWithMockedGetOne = testDataProvider({
  // @ts-ignore
  getOne: () => Promise.resolve({ data: child }),
});

const reactAdminWrapper = ({ children }: { children: React.ReactNode }) => (
  <AdminContext
    dataProvider={dataProviderWithMockedGetOne}
    i18nProvider={i18nProvider}
  >
    <ResourceContextProvider value="ChildNode">
      <RecordContextProvider value={child}>{children}</RecordContextProvider>
    </ResourceContextProvider>
  </AdminContext>
);

const renderChildShow = () =>
  render(<ChildShow />, {
    wrapper: withRouter(reactAdminWrapper, '/children/:id/show', [
      childrenShowPathname,
    ]),
  });

beforeEach(() => {
  vi.clearAllMocks();
});

describe('<ChildShow />', () => {
  it('should render child details when view families permission is enabled', async () => {
    (usePermissions as ReturnType<typeof vi.fn>).mockReturnValue({
      permissions: { canViewFamiliesWithinProject: () => true },
    });
    renderChildShow();

    // Title
    await waitFor(() =>
      expect(screen.getByText('Kummilapsi')).toBeInTheDocument()
    );

    // Field names
    await waitFor(() => expect(screen.getByText('Nimi')).toBeInTheDocument());
    expect(screen.getByText('Syntymävuosi')).toBeInTheDocument();
    expect(screen.getByText('Kieli')).toBeInTheDocument();
    expect(screen.getByText('Postinumero')).toBeInTheDocument();
    expect(screen.getByText('Huoltaja')).toBeInTheDocument();
    expect(screen.getByText('Sähköposti')).toBeInTheDocument();
    expect(screen.getByText('Puhelinnumero')).toBeInTheDocument();
    expect(screen.getByText('Tapahtumat')).toBeInTheDocument();

    // Field values
    await waitFor(() =>
      expect(screen.getByText(child.name)).toBeInTheDocument()
    );
    expect(screen.getByText(child.birthyear)).toBeInTheDocument();
    expect(screen.getByText(localizedGuardianLanguage)).toBeInTheDocument();
    expect(screen.getByText(child.postalCode)).toBeInTheDocument();
    expect(screen.getByText(guardianName)).toBeInTheDocument();
    expect(screen.getByText(guardian.email)).toBeInTheDocument();
    expect(screen.getByText(guardian.phoneNumber)).toBeInTheDocument();
  });
});
