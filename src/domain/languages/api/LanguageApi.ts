import type { ApolloQueryResult } from '@apollo/client';

import { languagesQuery } from '../query/LanguageQueries';
import type { MethodHandler, MethodHandlerParams } from '../../../api/types';
import { queryHandler, handleApiConnection } from '../../../api/utils/apiUtils';
import type { LanguagesQuery } from '../../api/generatedTypes/graphql';

/**
 * Get list of languages. The names are localized by the API according to the
 * accept-language header. Use the `canBeOccurrenceLanguage` filter to get only
 * the languages an occurrence can be held in.
 */
const getLanguages: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<LanguagesQuery> = await queryHandler({
    query: languagesQuery,
    variables: {
      canBeOccurrenceLanguage: params.filter?.canBeOccurrenceLanguage,
    },
  });
  return handleApiConnection(response.data.languages);
};

export { getLanguages };
