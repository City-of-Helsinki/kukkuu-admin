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
// GraphQL query operation: Event
// ====================================================

export interface Event_event_translations {
  languageCode: Language;
  name: string;
  imageAltText: string;
  description: string;
  shortDescription: string;
}

export interface Event_event_eventGroup {
  /**
   * The ID of the object.
   */
  id: string;
  name: string | null;
}

export interface Event_event_occurrences_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
}

export interface Event_event_occurrences_edges {
  /**
   * The item at the end of the edge
   */
  node: Event_event_occurrences_edges_node | null;
}

export interface Event_event_occurrences {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Event_event_occurrences_edges | null)[];
}

export interface Event_event_project_myPermissions {
  publish: boolean | null;
}

export interface Event_event_project {
  /**
   * The ID of the object.
   */
  id: string;
  myPermissions: Event_event_project_myPermissions | null;
}

export interface Event_event_ticketSystem_InternalEventTicketSystem {
  type: TicketSystem;
}

export interface Event_event_ticketSystem_TicketmasterEventTicketSystem {
  type: TicketSystem;
  usedPasswordCount: number;
  freePasswordCount: number;
  url: string;
  endTime: any | null;
}

export interface Event_event_ticketSystem_LippupisteEventTicketSystem {
  type: TicketSystem;
  usedPasswordCount: number;
  freePasswordCount: number;
  url: string;
  endTime: any | null;
}

export type Event_event_ticketSystem =
  | Event_event_ticketSystem_InternalEventTicketSystem
  | Event_event_ticketSystem_TicketmasterEventTicketSystem
  | Event_event_ticketSystem_LippupisteEventTicketSystem;

export interface Event_event {
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
  translations: Event_event_translations[];
  capacityPerOccurrence: number | null;
  publishedAt: any | null;
  readyForEventGroupPublishing: boolean;
  eventGroup: Event_event_eventGroup | null;
  occurrences: Event_event_occurrences;
  project: Event_event_project;
  ticketSystem: Event_event_ticketSystem | null;
}

export interface Event {
  event: Event_event | null;
}

export interface EventVariables {
  id: string;
}
