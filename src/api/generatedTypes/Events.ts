/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  EventParticipantsPerInvite,
  Language,
  TicketSystem,
} from './globalTypes';

// ====================================================
// GraphQL query operation: Events
// ====================================================

export interface Events_events_edges_node_translations {
  languageCode: Language;
  name: string;
  imageAltText: string;
  description: string;
  shortDescription: string;
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

export interface Events_events_edges_node_ticketSystem_InternalEventTicketSystem {
  type: TicketSystem;
}

export interface Events_events_edges_node_ticketSystem_TicketmasterEventTicketSystem {
  type: TicketSystem;
  url: string;
  endTime: any | null;
}

export interface Events_events_edges_node_ticketSystem_LippupisteEventTicketSystem {
  type: TicketSystem;
  url: string;
  endTime: any | null;
}

export type Events_events_edges_node_ticketSystem =
  | Events_events_edges_node_ticketSystem_InternalEventTicketSystem
  | Events_events_edges_node_ticketSystem_TicketmasterEventTicketSystem
  | Events_events_edges_node_ticketSystem_LippupisteEventTicketSystem;

export interface Events_events_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  name: string | null;
  image: string;
  participantsPerInvite: EventParticipantsPerInvite;
  /**
   * In minutes
   */
  duration: number | null;
  translations: Events_events_edges_node_translations[];
  capacityPerOccurrence: number | null;
  publishedAt: any | null;
  occurrences: Events_events_edges_node_occurrences;
  ticketSystem: Events_events_edges_node_ticketSystem | null;
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

export interface EventsVariables {
  projectId?: string | null;
}
