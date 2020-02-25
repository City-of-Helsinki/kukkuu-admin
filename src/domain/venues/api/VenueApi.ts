import { ApolloQueryResult } from 'apollo-boost';

import { Venues_venues as ApiDetailVenues } from '../../../api/generatedTypes/Venues';
import { Venue as ApiDetailVenue } from '../../../api/generatedTypes/Venue';
import { venuesQuery, venueQuery } from '../query/VenueQueries';
import { MethodHandler, MethodHandlerParams } from '../../../api/types';
import {
  queryHandler,
  mapApiDataToLocalData,
} from '../../../api/utils/apiUtils';
/**
 * Get list of venues
 */
const getVenues: MethodHandler = async (params: MethodHandlerParams) => {
  const response = await queryHandler({ query: venuesQuery });
  return (response.data.venues as ApiDetailVenues).edges.map(edge =>
    edge?.node ? mapApiDataToLocalData(edge.node) : null
  );
};

const getVenue: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<ApiDetailVenue> = await queryHandler({
    query: venueQuery,
    variables: { id: params.id },
  });
  return response.data.venue
    ? mapApiDataToLocalData(response.data.venue)
    : null;
};

export { getVenues, getVenue };
