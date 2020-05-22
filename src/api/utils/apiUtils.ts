import {
  QueryOptions,
  OperationVariables,
  MutationOptions,
} from 'apollo-client';
import { HttpError } from 'react-admin';

import client from '../client';
import { API_ERROR_MESSAGE } from '../constants/ApiConstants';
import { Language as EventTranslationLanguageCode } from '../generatedTypes/globalTypes';
import userManager from '../../domain/authentication/userManager';

type ApiTranslation = {
  languageCode: EventTranslationLanguageCode;
};

export type AdminUITranslation<F> = {
  [EventTranslationLanguageCode.EN]?: F;
  [EventTranslationLanguageCode.FI]?: F;
  [EventTranslationLanguageCode.SV]?: F;
};

export type EntityNode = {
  id: string;
  translations?: ApiTranslation[];
};

export type LocalEntity<T> = {
  id: string;
  translations?: [T];
};

/**
 * Add generic error handler for Apollo query
 * with error match with React-admin error handling standard
 * @param queryOptions Apollo query options
 */
export const queryHandler = async (
  queryOptions: QueryOptions<OperationVariables>
) => {
  try {
    const res = await client.query(queryOptions);
    return res;
  } catch (error) {
    if (
      error.message ===
      'GraphQL error: Invalid Authorization header. JWT has expired.'
    ) {
      console.error(
        'WIP: JWT has expired. Not sure if we should be able to reach this place if silent renew works. TODO: Find out! Consider if we want to log in automatically'
      );
      userManager.signinRedirect();
    }

    if (error.graphQLErrors[0].extensions.code === 'PERMISSION_DENIED_ERROR') {
      console.error('Permission denied');
    }
    throw new HttpError(error.message || API_ERROR_MESSAGE);
  }
};

export const mutationHandler = async (
  mutationOptions: MutationOptions<OperationVariables>
) => {
  try {
    return await client.mutate(mutationOptions);
  } catch (error) {
    throw new HttpError(error.message || API_ERROR_MESSAGE);
  }
};

/**
 * Convert translations from the API data form
 *
 * [
 *   {
 *     "languageCode": "FI",
 *     "name": "foo",
 *     "address": "bar",
 *     "__typename": "bazType"
 *   }
 * ]
 *
 * to the form used in this app
 *
 * {
 *   "FI": {
 *     "name": "foo",
 *     "address": "bar"
 *   }
 * }
 */
export const normalizeApiTranslations = <T extends ApiTranslation>(
  apiTranslations: T[]
) => {
  const translations: AdminUITranslation<Omit<T, 'languageCode'>> = {};
  for (const apiTranslation of apiTranslations) {
    const { languageCode, ...fields } = apiTranslation;
    delete (fields as { __typename?: string }).__typename;
    translations[languageCode] = fields;
  }
  return translations;
};

/**
 * Convert local data translations back to API ones.
 */
export const denormalizeLocalTranslations = <T>(
  adminTranslations: AdminUITranslation<T>
) => {
  const apiTranslations: T[] = [];
  for (const [k, v] of Object.entries(adminTranslations)) {
    apiTranslations.push(Object.assign({ languageCode: k }, v));
  }
  return apiTranslations;
};

/**
 *
 * Convert translations from the API single data entity to a local one.
 * If no translations, return the entity data.
 *
 * {
 *   id: string;
 *   translations: APITranslation[];
 *   __typename: string;
 *   ...rest
 * }
 *
 * to the form used in this app
 *
 * {
 *   id: string;
 *   translations: LocalTranslation[];
 *   ...rest
 * }
 */
export const mapApiDataToLocalData = <E extends EntityNode>(
  apiEntityNode: E | null
) => {
  const apiData = Object.assign({}, apiEntityNode);
  delete (apiData as { __typename?: string }).__typename;
  return apiData.translations
    ? Object.assign({}, apiData, {
        translations: normalizeApiTranslations(apiData.translations),
      })
    : apiData;
};

// TODO add proper typing
export const mapLocalDataToApiData = (record: any) => {
  return record.translations
    ? Object.assign({}, record, {
        translations: denormalizeLocalTranslations(record.translations),
      })
    : record;
};
