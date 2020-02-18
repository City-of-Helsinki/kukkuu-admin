import client from '../client';
import {
  Venues_venues_edges as ApiVenueEdge,
  Venues_venues_edges_node as ApiVenue,
} from '../generatedTypes/Venues';
import { Venue } from '../../domain/venues/types/VenueTypes';
import { venuesQuery } from '../../domain/venues/query/VenueQueries';
import { convertVenueTranslations } from '../../domain/venues/VenueUtils';

const mapApiDataToLocalData = (apiVenue: ApiVenue): Venue => {
  return {
    id: apiVenue.id,
    translations: convertVenueTranslations(apiVenue.translations),
  };
};

const getList = async (params: object) => {
  // TODO Add filtering, sorting and pagination
  const response = await client.query({ query: venuesQuery });
  return response.data.venues.edges.map((edge: ApiVenueEdge) =>
    mapApiDataToLocalData(edge.node as ApiVenue)
  );
};

export default getList;
