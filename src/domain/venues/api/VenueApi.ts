import { HttpError } from 'react-admin';

import {
  Venues_venues_edges as ApiVenueEdge,
  Venues_venues_edges_node as ApiVenue,
} from '../../../api/generatedTypes/Venues';
import { Venue } from '../types/VenueTypes';
import { convertVenueTranslations } from '../VenueUtils';
import client from '../../../api/client';
import { venuesQuery } from '../query/VenueQueries';
import { MethodHandler, MethodHandlerParams } from '../../../api/types';

const mapApiDataToLocalData = (apiVenue: ApiVenue): Venue => {
  return {
    id: apiVenue.id,
    translations: convertVenueTranslations(apiVenue.translations),
  };
};

/**
 * Get list of venues
 */
const getVenues: MethodHandler = async (params: MethodHandlerParams) => {
  try {
    const response = await client.query({ query: venuesQuery });
    const data = response.data.venues.edges.map((edge: ApiVenueEdge) =>
      mapApiDataToLocalData(edge.node as ApiVenue)
    );
    return {
      data,
      total: data.length,
    };
  } catch {
    throw new HttpError('Error getting venues');
  }
};

export { getVenues };
