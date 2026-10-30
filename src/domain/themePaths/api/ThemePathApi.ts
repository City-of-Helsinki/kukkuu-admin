import type { ApolloQueryResult } from '@apollo/client';

import { themePathsQuery } from '../query/ThemePathQueries';
import type { MethodHandler, MethodHandlerParams } from '../../../api/types';
import { queryHandler, handleApiConnection } from '../../../api/utils/apiUtils';
import type { Query } from '../../api/generatedTypes/graphql';

/**
 * Get list of theme paths. The names are localized by the API
 * according to the accept-language header.
 */
const getThemePaths: MethodHandler = async (_params: MethodHandlerParams) => {
  const response: ApolloQueryResult<Pick<Query, 'themePaths'>> =
    await queryHandler({ query: themePathsQuery });
  return handleApiConnection(response.data.themePaths);
};

export { getThemePaths };
