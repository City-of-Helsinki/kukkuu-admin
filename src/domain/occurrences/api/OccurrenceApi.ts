import { ApolloQueryResult } from 'apollo-boost';

import { MethodHandler, MethodHandlerParams } from '../../../api/types';
import {
  queryHandler,
  mapApiDataToLocalData,
  mapLocalDataToApiData,
  mutationHandler,
} from '../../../api/utils/apiUtils';
import {
  occurrencesQuery,
  occurrenceQuery,
} from '../queries/OccurrenceQueries';
import { Occurrences as ApiOccurrences } from '../../../api/generatedTypes/Occurrences';
import { Occurrence_occurrence as ApiOccurrence } from '../../../api/generatedTypes/Occurrence';
import { addOccurrenceMutation } from '../mutations/OccurrenceMutations';

const getOccurrences: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<ApiOccurrences> = await queryHandler({
    query: occurrencesQuery,
    variables: { eventId: params.id },
  });
  const data = response.data.occurrences?.edges.map(edge =>
    edge?.node ? mapApiDataToLocalData(edge.node) : null
  );
  return data;
};

const getOccurrence: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<ApiOccurrence> = await queryHandler({
    query: occurrenceQuery,
    variables: { id: params.id },
  });
  const data = response.data ? mapApiDataToLocalData(response.data) : null;
  return data;
};

const addOccurrence: MethodHandler = async (params: MethodHandlerParams) => {
  const data = mapLocalDataToApiData(params.data);
  const response = await mutationHandler({
    mutation: addOccurrenceMutation,
    variables: { input: data },
  });
  return response?.data?.addOccurrence.occurrence
    ? mapApiDataToLocalData(response.data.addOccurrence.occurrence)
    : null;
};

export { getOccurrences, getOccurrence, addOccurrence };
