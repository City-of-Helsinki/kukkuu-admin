/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateOccurrenceMutationInput, Language } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateOccurrence
// ====================================================

export interface updateOccurrence_updateOccurrence_occurrence_event {
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

export interface updateOccurrence_updateOccurrence_occurrence_venue_translations {
  languageCode: Language;
  name: string;
}

export interface updateOccurrence_updateOccurrence_occurrence_venue {
  /**
   * The ID of the object.
   */
  id: string;
  translations: updateOccurrence_updateOccurrence_occurrence_venue_translations[];
}

export interface updateOccurrence_updateOccurrence_occurrence {
  /**
   * The ID of the object.
   */
  id: string;
  time: any;
  event: updateOccurrence_updateOccurrence_occurrence_event;
  enrolmentCount: number;
  venue: updateOccurrence_updateOccurrence_occurrence_venue;
  capacity: number | null;
  /**
   * When set will be used as the capacity of this occurrence instead of the value coming from the event.
   */
  capacityOverride: number | null;
}

export interface updateOccurrence_updateOccurrence {
  occurrence: updateOccurrence_updateOccurrence_occurrence | null;
}

export interface updateOccurrence {
  updateOccurrence: updateOccurrence_updateOccurrence | null;
}

export interface updateOccurrenceVariables {
  input: UpdateOccurrenceMutationInput;
}
