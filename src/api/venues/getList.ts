import { gql } from 'apollo-boost';

import client from '../client';
import {
  Venues_venues_edges as ApiVenueEdge,
  Venues_venues_edges_node as ApiVenue,
  Venues_venues_edges_node_translations as ApiVenueTranslations,
} from '../generatedTypes/Venues';
import { Venue, VenueTranslations } from '../../venues/types';

const VENUES_QUERY = gql`
  query Venues {
    venues {
      edges {
        node {
          id
          translations {
            name
            address
            languageCode
          }
        }
      }
    }
  }
`;

const getList = async (params: object) => {
  // TODO Add filtering, sorting and pagination
  const response = await client.query({ query: VENUES_QUERY });
  return response.data.venues.edges.map((edge: ApiVenueEdge) =>
    mapApiDataToLocalData(edge.node as ApiVenue)
  );
};

export default getList;

const mapApiDataToLocalData = (apiVenue: ApiVenue): Venue => {
  return {
    id: apiVenue.id,
    translations: convertTranslations(apiVenue.translations),
  };
};

/*
Convert translations from the API data form

  [
    {
      "languageCode": "FI",
      "name": "foo",
      "address": "bar"
    }
  ]

  to the form used in this app

  {
    "FI": {
      "name": "foo",
      "address": "bar"
    }
  }
*/
const convertTranslations = (
  apiTranslations: ApiVenueTranslations[]
): VenueTranslations => {
  const translations: VenueTranslations = {};
  for (const apiTranslation of apiTranslations) {
    const { languageCode, name, address } = apiTranslation;
    translations[languageCode] = { name, address };
  }
  return translations;
};
