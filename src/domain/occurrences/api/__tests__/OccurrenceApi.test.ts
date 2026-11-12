import { describe, it, expect, vi, beforeEach } from 'vitest';

import * as apiUtils from '../../../../api/utils/apiUtils';
import { addOccurrence, updateOccurrence } from '../OccurrenceApi';

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
              input: expect.objectContaining({ accessibilityIds }),
            },
          })
        );
      }
    );
  });
});
