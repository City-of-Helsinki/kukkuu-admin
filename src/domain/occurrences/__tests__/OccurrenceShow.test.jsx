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
});

describe('<OccurrenceShow />', () => {
  const occurrenceRecord = {
    id: 'occ-1',
    time: '2026-10-30T10:00:00Z',
    capacity: 10,
    seatCount: 4,
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
});
