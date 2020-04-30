/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Language } from "./globalTypes";

// ====================================================
// GraphQL query operation: Occurrence
// ====================================================

export interface Occurrence_occurrence_event {
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

export interface Occurrence_occurrence_venue_translations {
  languageCode: Language;
  name: string;
}

export interface Occurrence_occurrence_venue {
  /**
   * The ID of the object.
   */
  id: string;
  translations: Occurrence_occurrence_venue_translations[];
}

export interface Occurrence_occurrence_children_edges_node_guardians_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  email: string | null;
}

export interface Occurrence_occurrence_children_edges_node_guardians_edges {
  /**
   * The item at the end of the edge
   */
  node: Occurrence_occurrence_children_edges_node_guardians_edges_node | null;
}

export interface Occurrence_occurrence_children_edges_node_guardians {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Occurrence_occurrence_children_edges_node_guardians_edges | null)[];
}

export interface Occurrence_occurrence_children_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  birthdate: any;
  guardians: Occurrence_occurrence_children_edges_node_guardians;
}

export interface Occurrence_occurrence_children_edges {
  /**
   * The item at the end of the edge
   */
  node: Occurrence_occurrence_children_edges_node | null;
}

export interface Occurrence_occurrence_children {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Occurrence_occurrence_children_edges | null)[];
}

export interface Occurrence_occurrence {
  /**
   * The ID of the object.
   */
  id: string;
  time: any;
  event: Occurrence_occurrence_event;
  enrolmentCount: number;
  venue: Occurrence_occurrence_venue;
  children: Occurrence_occurrence_children;
}

export interface Occurrence {
  /**
   * The ID of the object
   */
  occurrence: Occurrence_occurrence | null;
}

export interface OccurrenceVariables {
  id: string;
}
