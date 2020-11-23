/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EventParticipantsPerInvite } from "./globalTypes";

// ====================================================
// GraphQL fragment: EventGroupEventFragment
// ====================================================

export interface EventGroupEventFragment_occurrences_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  enrolmentCount: number;
}

export interface EventGroupEventFragment_occurrences_edges {
  /**
   * The item at the end of the edge
   */
  node: EventGroupEventFragment_occurrences_edges_node | null;
}

export interface EventGroupEventFragment_occurrences {
  /**
   * Contains the nodes in this connection.
   */
  edges: (EventGroupEventFragment_occurrences_edges | null)[];
}

export interface EventGroupEventFragment {
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
  capacityPerOccurrence: number;
  publishedAt: any | null;
  occurrences: EventGroupEventFragment_occurrences;
}
