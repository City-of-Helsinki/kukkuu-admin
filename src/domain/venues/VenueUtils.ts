import { Venues_venues_edges_node_translations as ApiListVenueTranslations } from '../../api/generatedTypes/Venues';
import { Venue_venue_translations as ApiDetailVenueTranslations } from '../../api/generatedTypes/Venue';
import { VenueTranslations } from './types/VenueTypes';

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
export const convertVenueTranslations = (
  apiTranslations: ApiListVenueTranslations[] | ApiDetailVenueTranslations[]
): VenueTranslations => {
  const translations: VenueTranslations = {};
  for (const apiTranslation of apiTranslations) {
    const { languageCode, ...fields } = apiTranslation;
    translations[languageCode] = fields;
  }
  return translations;
};
