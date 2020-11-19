import { ApolloQueryResult } from '@apollo/client';

import { Venues as ApiVenues } from '../../../api/generatedTypes/Venues';
import { Venue as ApiDetailVenue } from '../../../api/generatedTypes/Venue';
import { venuesQuery, venueQuery } from '../query/VenueQueries';
import {
  addVenueMutation,
  updateVenueMutation,
  deleteVenueMutation,
} from './mutations/venueMutations';
import { MethodHandler, MethodHandlerParams } from '../../../api/types';
import {
  queryHandler,
  mutationHandler,
  mapLocalDataToApiData,
  handleApiNode,
  handleApiConnection,
} from '../../../api/utils/apiUtils';
import { AdminVenue } from '../types/VenueTypes';
import { getProjectId } from '../../profile/utils';

/**
 * Get list of venues
 */
const getVenues: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<ApiVenues> = await queryHandler({
    query: venuesQuery,
    variables: { projectId: getProjectId() },
  });
  return handleApiConnection(response.data.venues);
};

const getVenue: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<ApiDetailVenue> = await queryHandler({
    query: venueQuery,
    variables: { id: params.id },
  });
  return handleApiNode(response.data.venue);
};

const addVenue: MethodHandler = async (params: MethodHandlerParams) => {
  const data = mapLocalDataToApiData(params.data as AdminVenue);
  data['projectId'] = getProjectId();
  const response = await mutationHandler({
    mutation: addVenueMutation,
    variables: { input: data },
  });
  return handleApiNode(response.data?.addVenue.venue);
};

const updateVenue: MethodHandler = async (params: MethodHandlerParams) => {
  const { occurrences, ...localUpdateData } = params.data;
  const data = mapLocalDataToApiData(localUpdateData as AdminVenue);
  const response = await mutationHandler({
    mutation: updateVenueMutation,
    variables: { input: data },
  });
  return handleApiNode(response.data?.updateVenue.venue);
};

const deleteVenue: MethodHandler = async (params: MethodHandlerParams) => {
  await mutationHandler({
    mutation: deleteVenueMutation,
    variables: { input: { id: params.id } },
  });
  return { data: { id: params.id } };
};

export { getVenues, getVenue, addVenue, updateVenue, deleteVenue };
