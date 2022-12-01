/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Language } from "./globalTypes";

// ====================================================
// GraphQL query operation: Occurrences
// ====================================================

export interface Occurrences_occurrences_edges_node_event {
  /**
   * In minutes
   */
  duration: number | null;
  capacityPerOccurrence: number | null;
}

export interface Occurrences_occurrences_edges_node_venue_translations {
  languageCode: Language;
  name: string;
}

export interface Occurrences_occurrences_edges_node_venue {
  /**
   * The ID of the object.
   */
  id: string;
  translations: Occurrences_occurrences_edges_node_venue_translations[];
}

export interface Occurrences_occurrences_edges_node_enrolments_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  attended: boolean | null;
}

export interface Occurrences_occurrences_edges_node_enrolments_edges {
  /**
   * The item at the end of the edge
   */
  node: Occurrences_occurrences_edges_node_enrolments_edges_node | null;
}

export interface Occurrences_occurrences_edges_node_enrolments {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Occurrences_occurrences_edges_node_enrolments_edges | null)[];
}

export interface Occurrences_occurrences_edges_node_freeSpotNotificationSubscriptions_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
}

export interface Occurrences_occurrences_edges_node_freeSpotNotificationSubscriptions_edges {
  /**
   * The item at the end of the edge
   */
  node: Occurrences_occurrences_edges_node_freeSpotNotificationSubscriptions_edges_node | null;
}

export interface Occurrences_occurrences_edges_node_freeSpotNotificationSubscriptions {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Occurrences_occurrences_edges_node_freeSpotNotificationSubscriptions_edges | null)[];
}

export interface Occurrences_occurrences_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  time: any;
  event: Occurrences_occurrences_edges_node_event;
  enrolmentCount: number;
  capacity: number | null;
  /**
   * When set will be used as the capacity of this occurrence instead of the value coming from the event.
   */
  capacityOverride: number | null;
  venue: Occurrences_occurrences_edges_node_venue;
  enrolments: Occurrences_occurrences_edges_node_enrolments;
  freeSpotNotificationSubscriptions: Occurrences_occurrences_edges_node_freeSpotNotificationSubscriptions;
}

export interface Occurrences_occurrences_edges {
  /**
   * The item at the end of the edge
   */
  node: Occurrences_occurrences_edges_node | null;
}

export interface Occurrences_occurrences {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Occurrences_occurrences_edges | null)[];
}

export interface Occurrences {
  occurrences: Occurrences_occurrences | null;
}

export interface OccurrencesVariables {
  projectId?: string | null;
  eventId?: string | null;
}
