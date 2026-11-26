import { render, screen, waitFor } from '@testing-library/react';
import {
  AdminContext,
  RecordContextProvider,
  ResourceContextProvider,
  testDataProvider,
} from 'react-admin';

import i18nProvider from '../../../common/translation/i18nProvider';
import { withRouter } from '../../../common/testUtils';
import OccurrenceShow, {
  withGuardian,
  getGuardianFullName,
  getGuardianLanguage,
  getGuardianPhoneNumber,
  getBreadCrumbs,
  getTitle,
  withEnrolment,
  getEnrolmentTotalSeats,
  getEnrolmentRowClick,
  getAccessibilityNames,
} from '../OccurrenceShow';
import Occurrence from '../Occurrence';

describe('OccurrenceShow utils', () => {
  const guardian = {
    firstName: 'Leo',
    lastName: 'Garri',
    language: 'FI',
    phoneNumber: '555-1234567',
  };
  const enrollment = {
    node: {
      child: {
        guardians: {
          edges: [
            {
              node: guardian,
            },
          ],
        },
      },
    },
  };
  const occurrence = {
    time: '2020-10-7',
    event: {
      duration: 30,
    },
  };

  describe('getTitle', () => {
    it('should return correct title', () => {
      expect(getTitle(occurrence)).toMatchInlineSnapshot(
        `"Esiintymä 7.10.2020 00.00 - 00.30"`
      );
    });
  });

  describe('getBreadcrumbs', () => {
    it('should call Occurrence.breadcrumbs', () => {
      const occurrenceBreadcrumbsSpy = vi.spyOn(
        Occurrence.prototype,
        'breadcrumbs',
        'get'
      );

      getBreadCrumbs(occurrence);

      expect(occurrenceBreadcrumbsSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('withEnrolment', () => {
    it('should call otherwise if guardian does not exist', () => {
      const otherwise = vi.fn();

      withEnrolment(vi.fn(), otherwise)(null);

      expect(otherwise).toHaveBeenCalledTimes(1);
    });

    it('should call hasRecord function with a record if one exists', () => {
      const renderFunction = vi.fn();

      withEnrolment(renderFunction, vi.fn())(enrollment);

      expect(renderFunction).toHaveBeenCalledTimes(1);
      expect(renderFunction).toHaveBeenCalledWith(enrollment);
    });
  });

  describe('withGuardian', () => {
    it('should call otherwise if guardian does not exist', () => {
      const otherwise = vi.fn();

      withGuardian(vi.fn(), otherwise)({ node: null });

      expect(otherwise).toHaveBeenCalledTimes(1);
    });

    it('should call hasGuardian function with a guardian if one exists', () => {
      const renderFunction = vi.fn();

      withGuardian(renderFunction, vi.fn())(enrollment);

      expect(renderFunction).toHaveBeenCalledTimes(1);
      expect(renderFunction).toHaveBeenCalledWith(guardian);
    });
  });

  describe('getGuardianFullName', () => {
    it('should return the full name of the guardian', () => {
      expect(getGuardianFullName(guardian)).toMatchInlineSnapshot(
        `"Leo Garri"`
      );
    });
  });

  describe('getGuardianLanguage', () => {
    it('should return the translated language of the guardian', () => {
      expect(getGuardianLanguage(guardian)).toMatchInlineSnapshot(`"suomi"`);
    });
  });

  describe('getGuardianPhoneNumber', () => {
    it('should return the phone number of the guardian', () => {
      expect(getGuardianPhoneNumber(guardian)).toMatchInlineSnapshot(
        `"555-1234567"`
      );
    });
  });

  describe('getEnrolmentTotalSeats', () => {
    it('should return total seats when present', () => {
      expect(getEnrolmentTotalSeats({ node: { totalSeats: 4 } })).toBe(4);
    });

    it('should return "-" fallback when totalSeats is missing or null', () => {
      expect(getEnrolmentTotalSeats({ node: {} })).toBe('-');
      expect(getEnrolmentTotalSeats({ node: { totalSeats: null } })).toBe('-');
    });
  });

  describe('getAccessibilityNames', () => {
    it('should return the names joined with commas', () => {
      expect(
        getAccessibilityNames({
          accessibilities: [
            { id: 'a-1', slug: 'vision', name: 'Näkemisen tuki' },
            { id: 'a-2', slug: 'hearing', name: 'Kuulemisen tuki' },
          ],
        })
      ).toBe('Näkemisen tuki, Kuulemisen tuki');
    });

    it('should return an empty string when there are none', () => {
      expect(getAccessibilityNames({ accessibilities: [] })).toBe('');
      expect(getAccessibilityNames({})).toBe('');
    });
  });

  describe('getEnrolmentRowClick', () => {
    it('should return false when canViewFamilies is false', () => {
      expect(getEnrolmentRowClick(false)).toBe(false);
    });

    it('should return a RowClickFunction when canViewFamilies is true', () => {
      const rowClick = getEnrolmentRowClick(true);
      expect(typeof rowClick).toBe('function');
    });

    it('should return child details path when child id exists', () => {
      const rowClick = getEnrolmentRowClick(true);
      const edge = {
        node: {
          child: {
            id: 'c-1',
          },
        },
      };
      expect(rowClick('dummy', 'occurrences', edge)).toBe('/children/c-1/show');
    });

    it('should return false when child id is missing', () => {
      const rowClick = getEnrolmentRowClick(true);
      expect(rowClick('dummy', 'occurrences', { node: {} })).toBe(false);
      expect(rowClick('dummy', 'occurrences', {})).toBe(false);
    });
  });
});

describe('<OccurrenceShow />', () => {
  const occurrenceRecord = {
    id: 'occ-1',
    time: '2026-10-30T10:00:00Z',
    capacity: 10,
    seatCount: 4,
    enrolmentCount: 1,
    attendedEnrolmentCount: 0,
    handledEnrolmentCount: 1,
    attendedSeats: 0,
    calculatedAttendedSeats: 0,
    attendedCountOverride: null,
    attendedChildrenCountOverride: null,
    attendedAdultsCountOverride: null,
    pendingArrivalSeats: 0,
    remainingEmptySeats: 10,
    languages: [{ id: 'lang-1', alpha3Code: 'fin', name: 'suomi' }],
    event: {
      id: 'ev-1',
      name: 'Test Event',
      duration: 30,
      eventGroup: null,
    },
    venue: {
      id: 'ven-1',
    },
    enrolments: {
      edges: [
        {
          node: {
            id: 'enr-1',
            attended: false,
            arrivedChildrenCount: 0,
            arrivedGuardiansCount: 0,
            bookedChildrenCount: 2,
            bookedGuardiansCount: 2,
            arrivedSeats: 0,
            totalSeats: 4,
            child: {
              id: 'c-1',
              name: 'Test Child',
              birthyear: 2024,
              guardians: {
                edges: [
                  {
                    node: {
                      id: 'g-1',
                      firstName: 'Guardian',
                      lastName: 'Test',
                      language: 'FI',
                      phoneNumber: '12345678',
                    },
                  },
                ],
              },
            },
          },
        },
      ],
    },
    freeSpotNotificationSubscriptions: {
      edges: [],
    },
  };

  const renderOccurrenceShow = (record = occurrenceRecord) => {
    const wrapper = ({ children }) => (
      <AdminContext
        dataProvider={testDataProvider({
          getOne: () => Promise.resolve({ data: record }),
          getMany: () => Promise.resolve({ data: [] }),
        })}
        i18nProvider={i18nProvider}
      >
        <ResourceContextProvider value="occurrences">
          <RecordContextProvider value={record}>
            {children}
          </RecordContextProvider>
        </ResourceContextProvider>
      </AdminContext>
    );

    return render(<OccurrenceShow />, {
      wrapper: withRouter(wrapper, '/occurrences/:id/show', [
        `/occurrences/${record.id}/show`,
      ]),
    });
  };

  it('renders enrolments table with totalSeats', async () => {
    renderOccurrenceShow();

    await waitFor(() => {
      expect(screen.getByRole('cell', { name: '4' })).toBeInTheDocument();
    });
  });

  it('renders enrolments table title with enrolment count label', async () => {
    renderOccurrenceShow();

    await waitFor(() => {
      expect(
        screen.getByText('Ilmoittautumisten lukumäärä')
      ).toBeInTheDocument();
    });
  });

  it('renders the languages field with the names of the languages', async () => {
    renderOccurrenceShow({
      ...occurrenceRecord,
      languages: [
        { id: 'lang-1', alpha3Code: 'fin', name: 'suomi' },
        { id: 'lang-2', alpha3Code: 'eng', name: 'englanti' },
      ],
    });

    expect(await screen.findByText('Kielet')).toBeInTheDocument();
    expect(await screen.findByText('suomi, englanti')).toBeInTheDocument();
  });

  it('renders the accessibilities field with the names of the accessibilities', async () => {
    renderOccurrenceShow({
      ...occurrenceRecord,
      accessibilities: [
        { id: 'a-1', slug: 'vision', name: 'Näkemisen tuki' },
        { id: 'a-2', slug: 'hearing', name: 'Kuulemisen tuki' },
      ],
    });

    expect(await screen.findByText('Saavutettavuus')).toBeInTheDocument();
    expect(
      await screen.findByText('Näkemisen tuki, Kuulemisen tuki')
    ).toBeInTheDocument();
  });

  it('renders the accessibilities field with the not set text when there are none', async () => {
    renderOccurrenceShow({ ...occurrenceRecord, accessibilities: [] });

    expect(await screen.findByText('Saavutettavuus')).toBeInTheDocument();
    expect(
      await screen.findByText('Ei saavutettavuustietoja')
    ).toBeInTheDocument();
  });

  it('renders explicit arrival summary and override indicator when overridden', async () => {
    renderOccurrenceShow({
      ...occurrenceRecord,
      attendedCountOverride: 8,
      attendedChildrenCountOverride: 3,
      attendedAdultsCountOverride: 5,
      attendedSeats: 8,
      calculatedAttendedSeats: 2,
    });

    expect(await screen.findByText('Saapuneet henkilöt')).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Saapujamäärä on korvattu manuaalisesti arvoon 8 \(3 lasta, 5 aikuista/
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Tämän ilmoittautumistaulukon saapujamääriä EI lasketa/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Saapuneiden lasten ja aikuisten määrät kertovat/)
    ).toBeInTheDocument();
    // Combined into a single warning alert above the enrolments table
    // (plus the summary alert = 2 alerts total, no info alert)
    expect(document.querySelectorAll('.MuiAlert-standardWarning')).toHaveLength(
      2
    );
    expect(document.querySelectorAll('.MuiAlert-standardInfo')).toHaveLength(0);
    expect(await screen.findByText('Tilaa jäljellä')).toBeInTheDocument();
    expect(await screen.findByText('Vielä odotettavissa')).toBeInTheDocument();
    expect(await screen.findByText('Lippuja käsitelty')).toBeInTheDocument();
  });

  it('renders a single info alert above the enrolments table when no override is set', async () => {
    renderOccurrenceShow();

    expect(
      await screen.findByText(/Saapuneiden lasten ja aikuisten määrät kertovat/)
    ).toBeInTheDocument();
    expect(document.querySelectorAll('.MuiAlert-standardInfo')).toHaveLength(1);
    expect(document.querySelectorAll('.MuiAlert-standardWarning')).toHaveLength(
      0
    );
  });

  it('hides arrival metrics and enrolments table for external ticket system events', async () => {
    renderOccurrenceShow({
      ...occurrenceRecord,
      event: {
        ...occurrenceRecord.event,
        ticketSystem: { type: 'TICKETMASTER' },
      },
    });

    expect(await screen.findByText('Saavutettavuus')).toBeInTheDocument();
    expect(screen.queryByText('Saapuneet henkilöt')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Ilmoittautumisten lukumäärä')
    ).not.toBeInTheDocument();
  });
});
