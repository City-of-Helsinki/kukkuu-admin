import type { AdminUITranslation } from '../../../api/types';
import type { VenueTranslationType } from '../../api/generatedTypes/graphql';

export interface AdminVenue {
  id: string;
  translations: AdminUITranslation<Omit<VenueTranslationType, 'languageCode'>>;
}
