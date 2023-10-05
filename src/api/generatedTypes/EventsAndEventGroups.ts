/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EventParticipantsPerInvite } from './globalTypes';

// ====================================================
// GraphQL query operation: EventsAndEventGroups
// ====================================================

export interface EventsAndEventGroups_eventsAndEventGroups_edges_node_EventNode_occurrences_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * When set will be used as the capacity of this occurrence instead of the value coming from the event.
   */
  capacityOverride: number | null;
}

export interface EventsAndEventGroups_eventsAndEventGroups_edges_node_EventNode_occurrences_edges {
  /**
   * The item at the end of the edge
   */
  node: EventsAndEventGroups_eventsAndEventGroups_edges_node_EventNode_occurrences_edges_node | null;
}

export interface EventsAndEventGroups_eventsAndEventGroups_edges_node_EventNode_occurrences {
  /**
   * Contains the nodes in this connection.
   */
  edges: (EventsAndEventGroups_eventsAndEventGroups_edges_node_EventNode_occurrences_edges | null)[];
}

export interface EventsAndEventGroups_eventsAndEventGroups_edges_node_EventNode {
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
  occurrences: EventsAndEventGroups_eventsAndEventGroups_edges_node_EventNode_occurrences;
}

export interface EventsAndEventGroups_eventsAndEventGroups_edges_node_EventGroupNode_events_edges_node_occurrences_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * When set will be used as the capacity of this occurrence instead of the value coming from the event.
   */
  capacityOverride: number | null;
}

export interface EventsAndEventGroups_eventsAndEventGroups_edges_node_EventGroupNode_events_edges_node_occurrences_edges {
  /**
   * The item at the end of the edge
   */
  node: EventsAndEventGroups_eventsAndEventGroups_edges_node_EventGroupNode_events_edges_node_occurrences_edges_node | null;
}

export interface EventsAndEventGroups_eventsAndEventGroups_edges_node_EventGroupNode_events_edges_node_occurrences {
  /**
   * Contains the nodes in this connection.
   */
  edges: (EventsAndEventGroups_eventsAndEventGroups_edges_node_EventGroupNode_events_edges_node_occurrences_edges | null)[];
}

export interface EventsAndEventGroups_eventsAndEventGroups_edges_node_EventGroupNode_events_edges_node {
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
  occurrences: EventsAndEventGroups_eventsAndEventGroups_edges_node_EventGroupNode_events_edges_node_occurrences;
}

export interface EventsAndEventGroups_eventsAndEventGroups_edges_node_EventGroupNode_events_edges {
  /**
   * The item at the end of the edge
   */
  node: EventsAndEventGroups_eventsAndEventGroups_edges_node_EventGroupNode_events_edges_node | null;
}

export interface EventsAndEventGroups_eventsAndEventGroups_edges_node_EventGroupNode_events {
  /**
   * Contains the nodes in this connection.
   */
  edges: (EventsAndEventGroups_eventsAndEventGroups_edges_node_EventGroupNode_events_edges | null)[];
}

export interface EventsAndEventGroups_eventsAndEventGroups_edges_node_EventGroupNode {
  /**
   * The ID of the object.
   */
  id: string;
  name: string | null;
  publishedAt: any | null;
  events: EventsAndEventGroups_eventsAndEventGroups_edges_node_EventGroupNode_events;
}

export type EventsAndEventGroups_eventsAndEventGroups_edges_node =
  | EventsAndEventGroups_eventsAndEventGroups_edges_node_EventNode
  | EventsAndEventGroups_eventsAndEventGroups_edges_node_EventGroupNode;

export interface EventsAndEventGroups_eventsAndEventGroups_edges {
  /**
   * The item at the end of the edge
   */
  node: EventsAndEventGroups_eventsAndEventGroups_edges_node | null;
}

export interface EventsAndEventGroups_eventsAndEventGroups {
  /**
   * Contains the nodes in this connection.
   */
  edges: (EventsAndEventGroups_eventsAndEventGroups_edges | null)[];
}

export interface EventsAndEventGroups {
  eventsAndEventGroups: EventsAndEventGroups_eventsAndEventGroups | null;
}

export interface EventsAndEventGroupsVariables {
  projectId?: string | null;
}
