import type { ApolloQueryResult } from '@apollo/client';

import { accessibilitiesQuery } from '../query/AccessibilityQueries';
import type { MethodHandler, MethodHandlerParams } from '../../../api/types';
import { queryHandler, handleApiConnection } from '../../../api/utils/apiUtils';
import type { Query } from '../../api/generatedTypes/graphql';

/**
 * Get list of accessibilities. The names are localized by the API
 * according to the accept-language header.
 */
const getAccessibilities: MethodHandler = async (
  _params: MethodHandlerParams
) => {
  const response: ApolloQueryResult<Pick<Query, 'accessibilities'>> =
    await queryHandler({ query: accessibilitiesQuery });
  return handleApiConnection(response.data.accessibilities);
};

export { getAccessibilities };
