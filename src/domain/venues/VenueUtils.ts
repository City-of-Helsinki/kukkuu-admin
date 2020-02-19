import { Venues_venues_edges_node_translations as ApiVenueTranslations } from '../../api/generatedTypes/Venues';
import { VenueTranslations } from '../../domain/venues/types/VenueTypes';

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
  apiTranslations: ApiVenueTranslations[]
): VenueTranslations => {
  const translations: VenueTranslations = {};
  for (const apiTranslation of apiTranslations) {
    const { languageCode, name, address } = apiTranslation;
    translations[languageCode] = { name, address };
  }
  return translations;
};
