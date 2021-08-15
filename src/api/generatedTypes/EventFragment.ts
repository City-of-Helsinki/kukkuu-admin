/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EventParticipantsPerInvite } from "./globalTypes";

// ====================================================
// GraphQL fragment: EventFragment
// ====================================================

export interface EventFragment_occurrences_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
}

export interface EventFragment_occurrences_edges {
  /**
   * The item at the end of the edge
   */
  node: EventFragment_occurrences_edges_node | null;
}

export interface EventFragment_occurrences {
  /**
   * Contains the nodes in this connection.
   */
  edges: (EventFragment_occurrences_edges | null)[];
}

export interface EventFragment {
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
  occurrences: EventFragment_occurrences;
}
