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
   * The ID of the object.
   */
  id: string;
  capacityPerOccurrence: number;
  /**
   * In minutes
   */
  duration: number | null;
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

export interface Occurrences_occurrences_edges_node_children_edges_node_guardians_edges_node {
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
}

export interface Occurrences_occurrences_edges_node_children_edges_node_guardians_edges {
  /**
   * The item at the end of the edge
   */
  node: Occurrences_occurrences_edges_node_children_edges_node_guardians_edges_node | null;
}

export interface Occurrences_occurrences_edges_node_children_edges_node_guardians {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Occurrences_occurrences_edges_node_children_edges_node_guardians_edges | null)[];
}

export interface Occurrences_occurrences_edges_node_children_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  birthdate: any;
  guardians: Occurrences_occurrences_edges_node_children_edges_node_guardians;
}

export interface Occurrences_occurrences_edges_node_children_edges {
  /**
   * The item at the end of the edge
   */
  node: Occurrences_occurrences_edges_node_children_edges_node | null;
}

export interface Occurrences_occurrences_edges_node_children {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Occurrences_occurrences_edges_node_children_edges | null)[];
}

export interface Occurrences_occurrences_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  time: any;
  event: Occurrences_occurrences_edges_node_event;
  enrolmentCount: number;
  venue: Occurrences_occurrences_edges_node_venue;
  children: Occurrences_occurrences_edges_node_children;
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
  eventId?: string | null;
}
