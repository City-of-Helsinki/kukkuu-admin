/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddOccurrenceMutationInput, Language } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addOccurrence
// ====================================================

export interface addOccurrence_addOccurrence_occurrence_event {
  /**
   * The ID of the object.
   */
  id: string;
  capacityPerOccurrence: number;
  /**
   * In minutes
   */
  duration: number | null;
}

export interface addOccurrence_addOccurrence_occurrence_venue_translations {
  languageCode: Language;
  name: string;
}

export interface addOccurrence_addOccurrence_occurrence_venue {
  /**
   * The ID of the object.
   */
  id: string;
  translations: addOccurrence_addOccurrence_occurrence_venue_translations[];
}

export interface addOccurrence_addOccurrence_occurrence {
  /**
   * The ID of the object.
   */
  id: string;
  time: any;
  event: addOccurrence_addOccurrence_occurrence_event;
  enrolmentCount: number;
  venue: addOccurrence_addOccurrence_occurrence_venue;
}

export interface addOccurrence_addOccurrence {
  occurrence: addOccurrence_addOccurrence_occurrence | null;
}

export interface addOccurrence {
  addOccurrence: addOccurrence_addOccurrence | null;
}

export interface addOccurrenceVariables {
  input: AddOccurrenceMutationInput;
}
