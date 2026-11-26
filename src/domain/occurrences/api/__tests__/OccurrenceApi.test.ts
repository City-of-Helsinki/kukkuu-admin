import { describe, it, expect, vi, beforeEach } from 'vitest';
import moment from 'moment-timezone';

import * as apiUtils from '../../../../api/utils/apiUtils';
import {
  addOccurrence,
  updateOccurrence,
  normalizeTime,
} from '../OccurrenceApi';
import AppConfig from '../../../application/AppConfig';

describe('OccurrenceApi', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const mockMutationHandler = () =>
    vi.spyOn(apiUtils, 'mutationHandler').mockResolvedValue({
      data: {
        addOccurrence: { occurrence: { id: 'occurrence-1' } },
        updateOccurrence: { occurrence: { id: 'occurrence-1' } },
      },
    });

  describe('addOccurrence', () => {
    it('sends the accessibility IDs', async () => {
      const mutationHandlerSpy = mockMutationHandler();

      await addOccurrence({
        data: {
          date: '1.2.2027',
          timeField: '10:00',
          venueId: 'venue-1',
          eventId: 'event-1',
          accessibilityIds: ['acc-1'],
        },
      });

      expect(mutationHandlerSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            input: expect.objectContaining({ accessibilityIds: ['acc-1'] }),
          },
        })
      );
    });
  });

  describe('updateOccurrence', () => {
    it('sends the language IDs', async () => {
      const mutationHandlerSpy = mockMutationHandler();

      await updateOccurrence({
        data: {
          id: 'occurrence-1',
          date: '1.2.2027',
          timeField: '10:00',
          venue: { id: 'venue-1' },
          event: { id: 'event-1' },
          languageIds: ['lang-1', 'lang-2'],
        },
      });

      expect(mutationHandlerSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            input: expect.objectContaining({
              languageIds: ['lang-1', 'lang-2'],
            }),
          },
        })
      );
    });

    it.each([
      { description: 'some', accessibilityIds: ['acc-1', 'acc-2'] },
      { description: 'none', accessibilityIds: [] },
    ])(
      'sends the accessibility IDs when there are $description',
      async ({ accessibilityIds }) => {
        const mutationHandlerSpy = mockMutationHandler();

        await updateOccurrence({
          data: {
            id: 'occurrence-1',
            date: '1.2.2027',
            timeField: '10:00',
            venue: { id: 'venue-1' },
            event: { id: 'event-1' },
            accessibilityIds,
          },
        });

        expect(mutationHandlerSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            variables: {
              input: expect.objectContaining({
                accessibilityIds,
                attendedChildrenCountOverride: null,
                attendedAdultsCountOverride: null,
              }),
            },
          })
        );
      }
    );

    it('sends children and adults override fields when set and null when cleared', async () => {
      const mutationHandlerSpy = mockMutationHandler();

      await updateOccurrence({
        data: {
          id: 'occurrence-1',
          date: '1.2.2027',
          timeField: '10:00',
          venue: { id: 'venue-1' },
          event: { id: 'event-1' },
          attendedChildrenCountOverride: 6,
          attendedAdultsCountOverride: 9,
        },
      });

      expect(mutationHandlerSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            input: expect.objectContaining({
              attendedChildrenCountOverride: 6,
              attendedAdultsCountOverride: 9,
            }),
          },
        })
      );
    });

    it('omits capacityOverride and attended override fields for external ticket system events', async () => {
      const mutationHandlerSpy = mockMutationHandler();

      await updateOccurrence({
        data: {
          id: 'occurrence-1',
          date: '1.2.2027',
          timeField: '10:00',
          venue: { id: 'venue-1' },
          event: { id: 'event-1', ticketSystem: { type: 'TICKETMASTER' } },
          capacityOverride: 10,
          attendedChildrenCountOverride: 2,
          attendedAdultsCountOverride: 3,
        },
      });

      const sentInput = mutationHandlerSpy.mock.calls[0]?.[0]?.variables?.input;
      expect(sentInput).toBeDefined();
      expect(sentInput).not.toHaveProperty('capacityOverride');
      expect(sentInput).not.toHaveProperty('attendedChildrenCountOverride');
      expect(sentInput).not.toHaveProperty('attendedAdultsCountOverride');
    });
  });

  describe('normalizeTime', () => {
    it('normalizes date and time using configured timezone into an ISO string', () => {
      const result = normalizeTime('1.2.2027', '10:00');
      const expected = moment
        .tz('1.2.2027 10:00', 'D.M.YYYY HH:mm', true, AppConfig.timezone)
        .toISOString();
      expect(result).toBe(expected);
    });

    it('returns undefined if date or time is undefined', () => {
      expect(normalizeTime(undefined, '10:00')).toBeUndefined();
      expect(normalizeTime('1.2.2027', undefined)).toBeUndefined();
    });
  });
});
