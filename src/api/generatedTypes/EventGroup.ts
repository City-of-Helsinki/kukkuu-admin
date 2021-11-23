/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Language, EventParticipantsPerInvite } from "./globalTypes";

// ====================================================
// GraphQL query operation: EventGroup
// ====================================================

export interface EventGroup_eventGroup_translations {
  languageCode: Language;
  name: string;
  shortDescription: string;
  description: string;
}

export interface EventGroup_eventGroup_events_edges_node_occurrences_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  enrolmentCount: number;
  /**
   * When set will be used as the capacity of this occurrence instead of the value coming from the event.
   */
  capacityOverride: number | null;
}

export interface EventGroup_eventGroup_events_edges_node_occurrences_edges {
  /**
   * The item at the end of the edge
   */
  node: EventGroup_eventGroup_events_edges_node_occurrences_edges_node | null;
}

export interface EventGroup_eventGroup_events_edges_node_occurrences {
  /**
   * Contains the nodes in this connection.
   */
  edges: (EventGroup_eventGroup_events_edges_node_occurrences_edges | null)[];
}

export interface EventGroup_eventGroup_events_edges_node {
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
  capacityPerOccurrence: number | null;
  publishedAt: any | null;
  readyForEventGroupPublishing: boolean;
  occurrences: EventGroup_eventGroup_events_edges_node_occurrences;
}

export interface EventGroup_eventGroup_events_edges {
  /**
   * The item at the end of the edge
   */
  node: EventGroup_eventGroup_events_edges_node | null;
}

export interface EventGroup_eventGroup_events {
  /**
   * Contains the nodes in this connection.
   */
  edges: (EventGroup_eventGroup_events_edges | null)[];
}

export interface EventGroup_eventGroup_project {
  /**
   * The ID of the object.
   */
  id: string;
}

export interface EventGroup_eventGroup {
  /**
   * The ID of the object.
   */
  id: string;
  name: string | null;
  publishedAt: any | null;
  translations: EventGroup_eventGroup_translations[];
  events: EventGroup_eventGroup_events;
  project: EventGroup_eventGroup_project;
}

export interface EventGroup {
  eventGroup: EventGroup_eventGroup | null;
}

export interface EventGroupVariables {
  id: string;
}
