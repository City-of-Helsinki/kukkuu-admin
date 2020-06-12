/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Language } from "./globalTypes";

// ====================================================
// GraphQL query operation: Venue
// ====================================================

export interface Venue_venue_project {
  /**
   * The ID of the object.
   */
  id: string;
}

export interface Venue_venue_translations {
  languageCode: Language;
  name: string;
  description: string;
  address: string;
  accessibilityInfo: string;
  arrivalInstructions: string;
  additionalInfo: string;
  wcAndFacilities: string;
  wwwUrl: string;
}

export interface Venue_venue_occurrences_pageInfo {
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
}

export interface Venue_venue_occurrences {
  /**
   * Pagination data for this connection.
   */
  pageInfo: Venue_venue_occurrences_pageInfo;
}

export interface Venue_venue {
  /**
   * The ID of the object.
   */
  id: string;
  project: Venue_venue_project;
  translations: Venue_venue_translations[];
  occurrences: Venue_venue_occurrences;
}

export interface Venue {
  /**
   * The ID of the object
   */
  venue: Venue_venue | null;
}

export interface VenueVariables {
  id: string;
}
