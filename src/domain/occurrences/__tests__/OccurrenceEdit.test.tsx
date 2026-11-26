import { render, screen } from '@testing-library/react';
import {
  AdminContext,
  RecordContextProvider,
  ResourceContextProvider,
  testDataProvider,
} from 'react-admin';
import { describe, it, expect, vi } from 'vitest';

import { OccurrenceEditForm } from '../OccurrenceEdit';
import { TicketSystem } from '../../api/generatedTypes/graphql';
import i18nProvider from '../../../common/translation/i18nProvider';

const venue = { id: 'venue-1', translations: { FI: { name: 'Paikka' } } };

const getVenuesOnly = (resource: string) =>
  resource === 'venues' ? [venue] : [];

const dataProvider = testDataProvider({
  getList: vi.fn().mockImplementation((resource: string) => {
    const data = getVenuesOnly(resource);
    return Promise.resolve({ data, total: data.length });
  }),
  getMany: vi
    .fn()
    .mockImplementation((resource: string) =>
      Promise.resolve({ data: getVenuesOnly(resource) })
    ),
});

const renderOccurrenceEditForm = (ticketSystemType: TicketSystem) =>
  render(
    <AdminContext dataProvider={dataProvider} i18nProvider={i18nProvider}>
      <ResourceContextProvider value="occurrences">
        <RecordContextProvider
          value={{
            id: 'occurrence-1',
            time: '2027-02-01T10:00:00Z',
            event: {
              id: 'event-1',
              publishedAt: null,
              ticketSystem: { type: ticketSystemType },
            },
            venue: { id: venue.id },
            languages: [{ id: 'lang-1', alpha3Code: 'fin', name: 'suomi' }],
            accessibilities: [],
          }}
        >
          <OccurrenceEditForm />
        </RecordContextProvider>
      </ResourceContextProvider>
    </AdminContext>
  );

const venueHelperText = /^Mikäli valikosta ei löydy/;
const capacityOverrideLabel = /^Esiintymäkohtainen kapasiteetti/;

describe('OccurrenceEditForm', () => {
  it('has the venue, the capacity override and the delete button for an internal event', async () => {
    renderOccurrenceEditForm(TicketSystem.Internal);

    expect(await screen.findByText(venueHelperText)).toBeInTheDocument();
    expect(screen.getByLabelText(capacityOverrideLabel)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Poista' })).toBeInTheDocument();
  });

  it('only allows editing the time, languages and accessibilities for an external event', async () => {
    renderOccurrenceEditForm(TicketSystem.Ticketmaster);

    expect(
      await screen.findByRole('combobox', { name: /^Kielet/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: /^Saavutettavuus/ })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/^Päivämäärä/)).toBeInTheDocument();
    expect(screen.queryByText(venueHelperText)).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(capacityOverrideLabel)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Poista' })
    ).not.toBeInTheDocument();
  });
});
