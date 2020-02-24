export interface VenueTranslation {
  name: string;
  address: string;
  description?: string;
  accessibilityInfo?: string;
  arrivalInstructions?: string;
  additionalInfo?: string;
}

export type VenueTranslations = { [index: string]: VenueTranslation };

export interface Venue {
  id: string;
  translations: VenueTranslations;
}
