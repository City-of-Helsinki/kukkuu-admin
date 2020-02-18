export interface VenueTranslation {
  name: string;
  address: string;
}

export type VenueTranslations = { [index: string]: VenueTranslation };

export interface Venue {
  id: string;
  translations: VenueTranslations;
}
