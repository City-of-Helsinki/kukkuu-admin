/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EventParticipantsPerInvite, Language } from "./globalTypes";

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
  capacityPerOccurrence: number;
  publishedAt: any | null;
  readyForEventGroupPublishing: boolean;
  eventGroup: Event_event_eventGroup | null;
  occurrences: Event_event_occurrences;
}

export interface Event {
  /**
   * The ID of the object
   */
  event: Event_event | null;
}

export interface EventVariables {
  id: string;
}
