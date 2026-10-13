import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HttpError } from 'react-admin';

import * as apiUtils from '../../../../api/utils/apiUtils';
import { getEvent } from '../EventApi';
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
});
