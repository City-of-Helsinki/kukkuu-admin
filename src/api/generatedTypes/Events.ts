/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EventParticipantsPerInvite, EventTranslationLanguageCode } from "./globalTypes";

// ====================================================
// GraphQL query operation: Events
// ====================================================

export interface Events_events_edges_node_translations {
  languageCode: EventTranslationLanguageCode;
  name: string;
}

export interface Events_events_edges_node_occurrences_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
}

export interface Events_events_edges_node_occurrences_edges {
  /**
   * The item at the end of the edge
   */
  node: Events_events_edges_node_occurrences_edges_node | null;
}

export interface Events_events_edges_node_occurrences {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Events_events_edges_node_occurrences_edges | null)[];
}

export interface Events_events_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  image: string;
  participantsPerInvite: EventParticipantsPerInvite;
  /**
   * In minutes
   */
  duration: number | null;
  translations: Events_events_edges_node_translations[];
  capacityPerOccurrence: number;
  publishedAt: any | null;
  occurrences: Events_events_edges_node_occurrences;
}

export interface Events_events_edges {
  /**
   * The item at the end of the edge
   */
  node: Events_events_edges_node | null;
}

export interface Events_events {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Events_events_edges | null)[];
}

export interface Events {
  events: Events_events | null;
}
