import { describe, it, expect, vi, beforeEach } from 'vitest';

import * as apiUtils from '../../../../api/utils/apiUtils';
import { getOrganisations } from '../OrganisationApi';
import { organisationsQuery } from '../../query/OrganisationQueries';

describe('OrganisationApi', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('getOrganisations', () => {
    it('calls organisationsQuery and returns handled connection', async () => {
      const mockData = {
        data: {
          organisations: {
            edges: [
              {
                node: {
                  id: 'org-1',
                  name: 'Test Organisation 1',
                },
              },
              {
                node: {
                  id: 'org-2',
                  name: 'Test Organisation 2',
                },
              },
            ],
            count: 2,
          },
        },
      };

      const queryHandlerSpy = vi
        .spyOn(apiUtils, 'queryHandler')
        .mockResolvedValue(mockData as any);

      const result = await getOrganisations({});

      expect(queryHandlerSpy).toHaveBeenCalledWith({
        query: organisationsQuery,
      });
      expect(result).toEqual({
        data: [
          { id: 'org-1', name: 'Test Organisation 1' },
          { id: 'org-2', name: 'Test Organisation 2' },
        ],
        total: 2,
      });
    });
  });
});
