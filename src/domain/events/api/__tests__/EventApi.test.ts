import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HttpError } from 'react-admin';

import * as apiUtils from '../../../../api/utils/apiUtils';
import { getEvent, updateEvent } from '../EventApi';
import { EventDocument } from '../../../api/generatedTypes/graphql';

describe('EventApi', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('getEvent', () => {
    it('throws 404 HttpError when event is null', async () => {
      vi.spyOn(apiUtils, 'queryHandler').mockResolvedValue({
        data: {
          event: null,
        },
      } as any);

      await expect(getEvent({ id: 'non-existent' })).rejects.toThrow(HttpError);
      await expect(getEvent({ id: 'non-existent' })).rejects.toMatchObject({
        status: 404,
        message: 'ra.notification.item_doesnt_exist',
      });
    });
  });

  describe('updateEvent', () => {
    const mockMutationHandler = () =>
      vi.spyOn(apiUtils, 'mutationHandler').mockResolvedValue({
        data: { updateEvent: { event: { id: 'event-1' } } },
      });

    it('sends the theme path IDs', async () => {
      const mutationHandlerSpy = mockMutationHandler();

      await updateEvent({ data: { id: 'event-1', themePathIds: ['path-1'] } });

      expect(mutationHandlerSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            input: expect.objectContaining({ themePathIds: ['path-1'] }),
          },
        })
      );
    });

    // An event without theme paths can be saved without selecting any (see
    // useIsThemePathOptional). The API's updateEvent rejects an empty list but
    // keeps the current theme paths when the input is omitted, so the empty
    // selection must be left out of the input. This also means that updateEvent
    // can't be used to remove all theme paths from an event.
    it.each([
      { description: 'an empty list', themePathIds: [] },
      { description: 'undefined', themePathIds: undefined },
    ])(
      'omits the theme path IDs from the input when they are $description',
      async ({ themePathIds }) => {
        const mutationHandlerSpy = mockMutationHandler();

        await updateEvent({ data: { id: 'event-1', themePathIds } });

        expect(mutationHandlerSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            variables: {
              input: expect.not.objectContaining({
                themePathIds: expect.anything(),
              }),
            },
          })
        );
      }
    );
  });
});
