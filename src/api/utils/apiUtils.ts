import { QueryOptions, OperationVariables } from 'apollo-boost';
import { HttpError } from 'react-admin';

import client from '../client';
import { API_ERROR_MESSAGE } from '../constants/ApiConstants';
import { EventTranslationLanguageCode } from '../generatedTypes/globalTypes';

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
  apiEntityNode: E
) => {
  const apiData = Object.assign({}, apiEntityNode);
  delete (apiData as { __typename?: string }).__typename;
  return apiData.translations
    ? Object.assign({}, apiData, {
        translations: normalizeApiTranslations(apiData.translations),
      })
    : apiData;
};
