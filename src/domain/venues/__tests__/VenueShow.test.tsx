import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import {
  AdminContext,
  RecordContextProvider,
  testDataProvider,
} from 'react-admin';
import { ResourceContextProvider } from 'ra-core';

import i18nProvider from '../../../common/translation/i18nProvider';
import VenueShow from '../VenueShow';
import { withRouter } from '../../../common/testUtils';

const venueWithFinnishName = {
  id: 'VmVudWVOb2RlOjE=',
  translations: {
    FI: {
      name: 'Musiikkitalo',
      address: 'Mannerheimintie 13a',
      description: 'Konserttitalo',
    },
  },
} as const;

// Every language in AdminUITranslation is optional, so a venue created outside
// the admin form can arrive without a Finnish translation.
const venueWithoutFinnishTranslation = {
  id: 'VmVudWVOb2RlOjI=',
  translations: {},
} as const;

const renderVenueShow = (record: Record<string, unknown>) => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AdminContext
      dataProvider={testDataProvider({
        // @ts-ignore - only getOne is exercised here
        getOne: () => Promise.resolve({ data: record }),
      })}
      i18nProvider={i18nProvider}
    >
      <ResourceContextProvider value="venues">
        <RecordContextProvider value={record}>{children}</RecordContextProvider>
      </ResourceContextProvider>
    </AdminContext>
  );

  return render(<VenueShow />, {
    wrapper: withRouter(wrapper, '/venues/:id/show', [
      `/venues/${record.id as string}/show`,
    ]),
  });
};

const cardHeaderTitle = () =>
  document.querySelector('.MuiCardHeader-title')?.textContent;

describe('<VenueShow />', () => {
  it('shows the Finnish venue name as the title', async () => {
    renderVenueShow(venueWithFinnishName);

    await waitFor(() => expect(cardHeaderTitle()).toBe('Musiikkitalo'));
  });

  it('renders an empty title instead of crashing when the Finnish translation is missing', async () => {
    renderVenueShow(venueWithoutFinnishTranslation);

    // The view still renders its fields; only the title is blank.
    await waitFor(() => expect(screen.getByText('Nimi')).toBeInTheDocument());
    expect(cardHeaderTitle()).toBe('');
  });
});
