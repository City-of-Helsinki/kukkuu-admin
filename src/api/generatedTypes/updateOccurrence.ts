/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateOccurrenceMutationInput, Language, TicketSystem } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateOccurrence
// ====================================================

export interface updateOccurrence_updateOccurrence_occurrence_event {
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

export interface updateOccurrence_updateOccurrence_occurrence_enrolments_edges_node_child_guardians_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * If left blank, will be populated with the user's email.
   */
  email: string;
  firstName: string;
  lastName: string;
  language: Language;
}

export interface updateOccurrence_updateOccurrence_occurrence_enrolments_edges_node_child_guardians_edges {
  /**
   * The item at the end of the edge
   */
  node: updateOccurrence_updateOccurrence_occurrence_enrolments_edges_node_child_guardians_edges_node | null;
}

export interface updateOccurrence_updateOccurrence_occurrence_enrolments_edges_node_child_guardians {
  /**
   * Contains the nodes in this connection.
   */
  edges: (updateOccurrence_updateOccurrence_occurrence_enrolments_edges_node_child_guardians_edges | null)[];
}

export interface updateOccurrence_updateOccurrence_occurrence_enrolments_edges_node_child {
  firstName: string;
  lastName: string;
  birthdate: any;
  guardians: updateOccurrence_updateOccurrence_occurrence_enrolments_edges_node_child_guardians;
}

export interface updateOccurrence_updateOccurrence_occurrence_enrolments_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  attended: boolean | null;
  child: updateOccurrence_updateOccurrence_occurrence_enrolments_edges_node_child | null;
}

export interface updateOccurrence_updateOccurrence_occurrence_enrolments_edges {
  /**
   * The item at the end of the edge
   */
  node: updateOccurrence_updateOccurrence_occurrence_enrolments_edges_node | null;
}

export interface updateOccurrence_updateOccurrence_occurrence_enrolments {
  /**
   * Contains the nodes in this connection.
   */
  edges: (updateOccurrence_updateOccurrence_occurrence_enrolments_edges | null)[];
}

export interface updateOccurrence_updateOccurrence_occurrence_ticketSystem_InternalOccurrenceTicketSystem {
  type: TicketSystem;
}

export interface updateOccurrence_updateOccurrence_occurrence_ticketSystem_TicketmasterOccurrenceTicketSystem {
  type: TicketSystem;
  url: string;
}

export interface updateOccurrence_updateOccurrence_occurrence_ticketSystem_LippupisteOccurrenceTicketSystem {
  type: TicketSystem;
  url: string;
}

export type updateOccurrence_updateOccurrence_occurrence_ticketSystem = updateOccurrence_updateOccurrence_occurrence_ticketSystem_InternalOccurrenceTicketSystem | updateOccurrence_updateOccurrence_occurrence_ticketSystem_TicketmasterOccurrenceTicketSystem | updateOccurrence_updateOccurrence_occurrence_ticketSystem_LippupisteOccurrenceTicketSystem;

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
  enrolments: updateOccurrence_updateOccurrence_occurrence_enrolments;
  ticketSystem: updateOccurrence_updateOccurrence_occurrence_ticketSystem | null;
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
