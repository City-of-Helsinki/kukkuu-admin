/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddVenueMutationInput, Language } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addVenue
// ====================================================

export interface addVenue_addVenue_venue_translations {
  name: string;
  address: string;
  languageCode: Language;
  description: string;
  accessibilityInfo: string;
  arrivalInstructions: string;
  additionalInfo: string;
}

export interface addVenue_addVenue_venue {
  /**
   * The ID of the object.
   */
  id: string;
  translations: addVenue_addVenue_venue_translations[];
}

export interface addVenue_addVenue {
  venue: addVenue_addVenue_venue | null;
}

export interface addVenue {
  addVenue: addVenue_addVenue | null;
}

export interface addVenueVariables {
  input: AddVenueMutationInput;
}
