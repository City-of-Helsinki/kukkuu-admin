import { AdminUITranslation } from '../../../api/utils/apiUtils';
import { Venue_venue_translations as ApiVenueTranslation } from '../../../api/generatedTypes/Venue';
export interface AdminVenue {
  id: string;
  translations: AdminUITranslation<Omit<ApiVenueTranslation, 'languageCode'>>;
}
