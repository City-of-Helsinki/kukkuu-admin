import {
  Venues_venues_edges as ApiVenueEdge,
  Venues_venues_edges_node as ApiListVenue,
} from '../../../api/generatedTypes/Venues';
import { Venue_venue as ApiDetailVenue } from '../../../api/generatedTypes/Venue';
import { Venue } from '../types/VenueTypes';
import { convertVenueTranslations } from '../VenueUtils';
import client from '../../../api/client';
import { venuesQuery, venueQuery } from '../query/VenueQueries';
import { MethodHandler, MethodHandlerParams } from '../../../api/types';
import { queryHandler } from '../../../api/utils/apiUtils';

const mapApiDataToLocalData = (
  apiVenue: ApiListVenue | ApiDetailVenue
): Venue => {
  return {
    id: apiVenue.id,
    translations: convertVenueTranslations(apiVenue.translations),
  };
};

/**
 * Get list of venues
 */
const getVenues: MethodHandler = async (params: MethodHandlerParams) => {
  const response = await queryHandler({ query: venuesQuery });
  return response.data.venues.edges.map((edge: ApiVenueEdge) =>
    mapApiDataToLocalData(edge.node as ApiListVenue)
  );
};

const getVenue: MethodHandler = async (params: MethodHandlerParams) => {
  const response = await client.query({
    query: venueQuery,
    variables: { id: params.id },
  });
  return mapApiDataToLocalData(response.data.venue as ApiDetailVenue);
};

export { getVenues, getVenue };
