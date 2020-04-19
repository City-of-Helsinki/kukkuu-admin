import { ApolloQueryResult } from 'apollo-boost';

import { MethodHandler, MethodHandlerParams } from '../../../api/types';
import {
  queryHandler,
  mapApiDataToLocalData,
} from '../../../api/utils/apiUtils';
import { occurrencesQuery } from '../queries/OccurrenceQueries';
import { Occurrences as ApiOccurrences } from '../../../api/generatedTypes/Occurrences';

const getOccurrences: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<ApiOccurrences> = await queryHandler({
    query: occurrencesQuery,
    variables: { eventId: params.id },
  });
  return response.data.occurrences?.edges.map(edge =>
    edge?.node ? mapApiDataToLocalData(edge.node) : null
  );
};

export { getOccurrences };
