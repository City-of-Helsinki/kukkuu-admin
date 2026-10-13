import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HttpError } from 'react-admin';

import * as apiUtils from '../../../../api/utils/apiUtils';
import EventGroupsApi from '../eventGroupsApi';

describe('eventGroupsApi', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('getEventGroup', () => {
    it('throws 404 HttpError when eventGroup is null', async () => {
      vi.spyOn(apiUtils, 'queryHandler').mockResolvedValue({
        data: {
          eventGroup: null,
        },
      } as any);

      await expect(
        EventGroupsApi.getEventGroup({ id: 'non-existent' })
      ).rejects.toThrow(HttpError);
      await expect(
        EventGroupsApi.getEventGroup({ id: 'non-existent' })
      ).rejects.toMatchObject({
        status: 404,
        message: 'ra.notification.item_doesnt_exist',
      });
    });
  });
});
