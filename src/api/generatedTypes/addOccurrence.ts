/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddOccurrenceMutationInput, Language, TicketSystem } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addOccurrence
// ====================================================

export interface addOccurrence_addOccurrence_occurrence_event {
  /**
   * The ID of the object.
   */
  id: string;
  capacityPerOccurrence: number | null;
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

export interface addOccurrence_addOccurrence_occurrence_ticketSystem_InternalOccurrenceTicketSystem {
  type: TicketSystem;
}

export interface addOccurrence_addOccurrence_occurrence_ticketSystem_TicketmasterOccurrenceTicketSystem {
  type: TicketSystem;
  url: string;
}

export interface addOccurrence_addOccurrence_occurrence_ticketSystem_LippupisteOccurrenceTicketSystem {
  type: TicketSystem;
  url: string;
}

export type addOccurrence_addOccurrence_occurrence_ticketSystem = addOccurrence_addOccurrence_occurrence_ticketSystem_InternalOccurrenceTicketSystem | addOccurrence_addOccurrence_occurrence_ticketSystem_TicketmasterOccurrenceTicketSystem | addOccurrence_addOccurrence_occurrence_ticketSystem_LippupisteOccurrenceTicketSystem;

export interface addOccurrence_addOccurrence_occurrence {
  /**
   * The ID of the object.
   */
  id: string;
  time: any;
  event: addOccurrence_addOccurrence_occurrence_event;
  enrolmentCount: number;
  venue: addOccurrence_addOccurrence_occurrence_venue;
  capacity: number | null;
  /**
   * When set will be used as the capacity of this occurrence instead of the value coming from the event.
   */
  capacityOverride: number | null;
  ticketSystem: addOccurrence_addOccurrence_occurrence_ticketSystem | null;
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
