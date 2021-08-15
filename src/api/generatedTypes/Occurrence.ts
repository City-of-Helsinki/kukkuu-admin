/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Language, TicketSystem } from "./globalTypes";

// ====================================================
// GraphQL query operation: Occurrence
// ====================================================

export interface Occurrence_occurrence_event_eventGroup {
  /**
   * The ID of the object.
   */
  id: string;
  name: string | null;
}

export interface Occurrence_occurrence_event {
  /**
   * The ID of the object.
   */
  id: string;
  name: string | null;
  capacityPerOccurrence: number | null;
  /**
   * In minutes
   */
  duration: number | null;
  publishedAt: any | null;
  eventGroup: Occurrence_occurrence_event_eventGroup | null;
}

export interface Occurrence_occurrence_venue_translations {
  languageCode: Language;
  name: string;
}

export interface Occurrence_occurrence_venue {
  /**
   * The ID of the object.
   */
  id: string;
  translations: Occurrence_occurrence_venue_translations[];
}

export interface Occurrence_occurrence_enrolments_edges_node_child_guardians_edges_node {
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

export interface Occurrence_occurrence_enrolments_edges_node_child_guardians_edges {
  /**
   * The item at the end of the edge
   */
  node: Occurrence_occurrence_enrolments_edges_node_child_guardians_edges_node | null;
}

export interface Occurrence_occurrence_enrolments_edges_node_child_guardians {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Occurrence_occurrence_enrolments_edges_node_child_guardians_edges | null)[];
}

export interface Occurrence_occurrence_enrolments_edges_node_child {
  firstName: string;
  lastName: string;
  birthdate: any;
  guardians: Occurrence_occurrence_enrolments_edges_node_child_guardians;
}

export interface Occurrence_occurrence_enrolments_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  attended: boolean | null;
  child: Occurrence_occurrence_enrolments_edges_node_child | null;
}

export interface Occurrence_occurrence_enrolments_edges {
  /**
   * The item at the end of the edge
   */
  node: Occurrence_occurrence_enrolments_edges_node | null;
}

export interface Occurrence_occurrence_enrolments {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Occurrence_occurrence_enrolments_edges | null)[];
}

export interface Occurrence_occurrence_freeSpotNotificationSubscriptions_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
}

export interface Occurrence_occurrence_freeSpotNotificationSubscriptions_edges {
  /**
   * The item at the end of the edge
   */
  node: Occurrence_occurrence_freeSpotNotificationSubscriptions_edges_node | null;
}

export interface Occurrence_occurrence_freeSpotNotificationSubscriptions {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Occurrence_occurrence_freeSpotNotificationSubscriptions_edges | null)[];
}

export interface Occurrence_occurrence_ticketSystem_InternalOccurrenceTicketSystem {
  type: TicketSystem;
}

export interface Occurrence_occurrence_ticketSystem_TicketmasterOccurrenceTicketSystem {
  type: TicketSystem;
  url: string;
}

export type Occurrence_occurrence_ticketSystem = Occurrence_occurrence_ticketSystem_InternalOccurrenceTicketSystem | Occurrence_occurrence_ticketSystem_TicketmasterOccurrenceTicketSystem;

export interface Occurrence_occurrence {
  /**
   * The ID of the object.
   */
  id: string;
  time: any;
  event: Occurrence_occurrence_event;
  enrolmentCount: number;
  capacity: number | null;
  /**
   * When set will be used as the capacity of this occurrence instead of the value coming from the event.
   */
  capacityOverride: number | null;
  venue: Occurrence_occurrence_venue;
  enrolments: Occurrence_occurrence_enrolments;
  freeSpotNotificationSubscriptions: Occurrence_occurrence_freeSpotNotificationSubscriptions;
  ticketSystem: Occurrence_occurrence_ticketSystem | null;
}

export interface Occurrence {
  /**
   * The ID of the object
   */
  occurrence: Occurrence_occurrence | null;
}

export interface OccurrenceVariables {
  id: string;
}
