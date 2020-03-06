/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {UpdateVenueMutationInput, Language} from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateVenue
// ====================================================

export interface updateVenue_updateVenue_venue_translations {
  name: string;
  address: string;
  languageCode: Language;
  description: string;
  accessibilityInfo: string;
  arrivalInstructions: string;
  additionalInfo: string;
}

export interface updateVenue_updateVenue_venue {
  /**
   * The ID of the object.
   */
  id: string;
  translations: updateVenue_updateVenue_venue_translations[];
}

export interface updateVenue_updateVenue {
  venue: updateVenue_updateVenue_venue | null;
}

export interface updateVenue {
  updateVenue: updateVenue_updateVenue | null;
}

export interface updateVenueVariables {
  input: UpdateVenueMutationInput;
}
