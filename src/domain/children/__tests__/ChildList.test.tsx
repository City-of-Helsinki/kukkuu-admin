import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { usePermissions, AdminContext, testDataProvider } from 'react-admin';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ResourceContextProvider } from 'ra-core';

import i18nProvider from '../../../common/translation/i18nProvider';
import ChildList from '../ChildList';
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
} as const;

const childrenListPathname = `/children`;

const dataProviderWithMockedGetList = testDataProvider({
  // @ts-ignore
  getList: () => Promise.resolve({ data: [child], total: 1 }),
});

const reactAdminWrapper = ({ children }: { children: React.ReactNode }) => (
  <AdminContext
    dataProvider={dataProviderWithMockedGetList}
    i18nProvider={i18nProvider}
  >
    <ResourceContextProvider value="ChildNode">
      {children as React.ReactElement}
    </ResourceContextProvider>
  </AdminContext>
);

const renderChildList = () =>
  render(<ChildList />, {
    wrapper: withRouter(reactAdminWrapper, childrenListPathname, [
      childrenListPathname,
    ]),
  });

const expectColumnHeader = (name: string) =>
  expect(screen.getByRole('columnheader', { name })).toBeInTheDocument();

const expectCellValue = (cellValue: string) =>
  expect(screen.getByRole('cell', { name: cellValue })).toBeInTheDocument();

const expectNotCellValue = (cellValue: string) =>
  expect(
    screen.queryByRole('cell', { name: cellValue })
  ).not.toBeInTheDocument();

beforeEach(() => {
  vi.clearAllMocks();
});

describe('<ChildList />', () => {
  it('should render children list when view families permission is enabled', async () => {
    (usePermissions as ReturnType<typeof vi.fn>).mockReturnValue({
      permissions: { canViewFamiliesWithinProject: () => true },
    });

    renderChildList();

    // Title
    await waitFor(() =>
      expect(screen.getByText('Kummilapset')).toBeInTheDocument()
    );

    // List column names
    await waitFor(() => expectColumnHeader('Nimi'));
    expectColumnHeader('Syntymävuosi');
    expectColumnHeader('Postinumero');
    expectColumnHeader('Huoltaja');
    expectColumnHeader('Kieli');

    // List column data
    await waitFor(() => expectCellValue(child.name));
    expectCellValue(child.birthyear.toString());
    expectCellValue(child.postalCode);
    expectCellValue(guardian.email);
    expectCellValue(localizedGuardianLanguage);
  });
});
