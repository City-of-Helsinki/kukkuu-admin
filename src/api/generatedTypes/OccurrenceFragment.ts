/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Language, TicketSystem } from "./globalTypes";

// ====================================================
// GraphQL fragment: OccurrenceFragment
// ====================================================

export interface OccurrenceFragment_event_eventGroup {
  /**
   * The ID of the object.
   */
  id: string;
  name: string | null;
}

export interface OccurrenceFragment_event {
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
  eventGroup: OccurrenceFragment_event_eventGroup | null;
}

export interface OccurrenceFragment_venue_translations {
  languageCode: Language;
  name: string;
}

export interface OccurrenceFragment_venue {
  /**
   * The ID of the object.
   */
  id: string;
  translations: OccurrenceFragment_venue_translations[];
}

export interface OccurrenceFragment_enrolments_edges_node_child_guardians_edges_node {
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
  phoneNumber: string;
}

export interface OccurrenceFragment_enrolments_edges_node_child_guardians_edges {
  /**
   * The item at the end of the edge
   */
  node: OccurrenceFragment_enrolments_edges_node_child_guardians_edges_node | null;
}

export interface OccurrenceFragment_enrolments_edges_node_child_guardians {
  /**
   * Contains the nodes in this connection.
   */
  edges: (OccurrenceFragment_enrolments_edges_node_child_guardians_edges | null)[];
}

export interface OccurrenceFragment_enrolments_edges_node_child {
  firstName: string;
  lastName: string;
  birthdate: any;
  guardians: OccurrenceFragment_enrolments_edges_node_child_guardians;
}

export interface OccurrenceFragment_enrolments_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  attended: boolean | null;
  child: OccurrenceFragment_enrolments_edges_node_child | null;
}

export interface OccurrenceFragment_enrolments_edges {
  /**
   * The item at the end of the edge
   */
  node: OccurrenceFragment_enrolments_edges_node | null;
}

export interface OccurrenceFragment_enrolments {
  /**
   * Contains the nodes in this connection.
   */
  edges: (OccurrenceFragment_enrolments_edges | null)[];
}

export interface OccurrenceFragment_freeSpotNotificationSubscriptions_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
}

export interface OccurrenceFragment_freeSpotNotificationSubscriptions_edges {
  /**
   * The item at the end of the edge
   */
  node: OccurrenceFragment_freeSpotNotificationSubscriptions_edges_node | null;
}

export interface OccurrenceFragment_freeSpotNotificationSubscriptions {
  /**
   * Contains the nodes in this connection.
   */
  edges: (OccurrenceFragment_freeSpotNotificationSubscriptions_edges | null)[];
}

export interface OccurrenceFragment_ticketSystem_InternalOccurrenceTicketSystem {
  type: TicketSystem;
}

export interface OccurrenceFragment_ticketSystem_TicketmasterOccurrenceTicketSystem {
  type: TicketSystem;
  url: string;
}

export type OccurrenceFragment_ticketSystem = OccurrenceFragment_ticketSystem_InternalOccurrenceTicketSystem | OccurrenceFragment_ticketSystem_TicketmasterOccurrenceTicketSystem;

export interface OccurrenceFragment {
  /**
   * The ID of the object.
   */
  id: string;
  time: any;
  event: OccurrenceFragment_event;
  enrolmentCount: number;
  capacity: number | null;
  /**
   * When set will be used as the capacity of this occurrence instead of the value coming from the event.
   */
  capacityOverride: number | null;
  venue: OccurrenceFragment_venue;
  enrolments: OccurrenceFragment_enrolments;
  freeSpotNotificationSubscriptions: OccurrenceFragment_freeSpotNotificationSubscriptions;
  ticketSystem: OccurrenceFragment_ticketSystem | null;
}
