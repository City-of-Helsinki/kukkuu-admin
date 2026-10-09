import type { ApolloQueryResult } from '@apollo/client';

import { organisationsQuery } from '../query/OrganisationQueries';
import type { MethodHandler, MethodHandlerParams } from '../../../api/types';
import { queryHandler, handleApiConnection } from '../../../api/utils/apiUtils';
import type { Query } from '../../api/generatedTypes/graphql';

/**
 * Get list of organisations
 */
const getOrganisations: MethodHandler = async (
  _params: MethodHandlerParams
) => {
  const response: ApolloQueryResult<Pick<Query, 'organisations'>> =
    await queryHandler({
      query: organisationsQuery,
    });
  return handleApiConnection(response.data.organisations);
};

export { getOrganisations };
