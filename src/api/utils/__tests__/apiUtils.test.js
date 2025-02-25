import { HttpError } from 'react-admin';

import { client } from '../../apolloClient/client';
import {
  queryHandler,
  mutationHandler,
  normalizeApiTranslations,
  denormalizeLocalTranslations,
  mapApiDataToLocalData,
  mapLocalDataToApiData,
  handleApiConnection,
  handleApiNode,
} from '../apiUtils';

vi.mock('../apolloClient/client');

describe('apiUtils', () => {
  describe('normalizeApiTranslations', () => {
    it('normalizes API translations to local format', () => {
      const apiTranslations = [
        {
          languageCode: 'FI',
          name: 'foo',
          address: 'bar',
          __typename: 'bazType',
        },
      ];
      const expected = {
        FI: { name: 'foo', address: 'bar' },
      };

      const result = normalizeApiTranslations(apiTranslations);
      expect(result).toEqual(expected);
    });
  });

  describe('denormalizeLocalTranslations', () => {
    it('denormalizes local translations to API format', () => {
      const localTranslations = {
        FI: { name: 'foo', address: 'bar' },
      };
      const expected = [{ languageCode: 'FI', name: 'foo', address: 'bar' }];

      const result = denormalizeLocalTranslations(localTranslations);
      expect(result).toEqual(expected);
    });
  });

  describe('mapApiDataToLocalData', () => {
    it('maps API data to local data format', () => {
      const apiNode = {
        id: '1',
        translations: [
          {
            languageCode: 'FI',
            name: 'foo',
            address: 'bar',
            __typename: 'bazType',
          },
        ],
        __typename: 'bazType',
      };
      const expected = {
        id: '1',
        translations: {
          FI: { name: 'foo', address: 'bar' },
        },
      };

      const result = mapApiDataToLocalData(apiNode);
      expect(result).toEqual(expected);
    });

    it('returns null if apiNode is null', () => {
      const result = mapApiDataToLocalData(null);
      expect(result).toBeNull();
    });
  });

  describe('mapLocalDataToApiData', () => {
    it('maps local data to API data format', () => {
      const localData = {
        id: '1',
        translations: {
          FI: { name: 'foo', address: 'bar' },
        },
      };
      const expected = {
        id: '1',
        translations: [{ languageCode: 'FI', name: 'foo', address: 'bar' }],
      };

      const result = mapLocalDataToApiData(localData);
      expect(result).toEqual(expected);
    });
  });

  describe('handleApiConnection', () => {
    it('handles API connection and returns data and total', () => {
      const connection = {
        edges: [
          {
            node: {
              id: '1',
              translations: [
                { languageCode: 'FI', name: 'foo', address: 'bar' },
              ],
            },
          },
        ],
        count: 1,
      };
      const expected = {
        data: [
          { id: '1', translations: { FI: { name: 'foo', address: 'bar' } } },
        ],
        total: 1,
      };

      const result = handleApiConnection(connection);
      expect(result).toEqual(expected);
    });

    it('returns empty data and total 0 if connection is null', () => {
      const result = handleApiConnection(null);
      expect(result).toEqual({ data: [], total: 0 });
    });
  });

  describe('handleApiNode', () => {
    it('handles API node and returns data', () => {
      const node = {
        id: '1',
        translations: [{ languageCode: 'FI', name: 'foo', address: 'bar' }],
      };
      const expected = {
        data: {
          id: '1',
          translations: { FI: { name: 'foo', address: 'bar' } },
        },
      };

      const result = handleApiNode(node);
      expect(result).toEqual(expected);
    });

    it('returns data with null if node is null', () => {
      const result = handleApiNode(null);
      expect(result).toEqual({ data: null });
    });
  });
});
