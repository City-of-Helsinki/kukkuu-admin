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
  publishedAt: any | null;
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

export interface Occurrence_occurrence_enrolments_edges_node_child_guardians_edges_node {
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

export interface Occurrence_occurrence_enrolments_edges_node_child_guardians_edges {
  /**
   * The item at the end of the edge
   */
  node: Occurrence_occurrence_enrolments_edges_node_child_guardians_edges_node | null;
}

export interface Occurrence_occurrence_enrolments_edges_node_child_guardians {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Occurrence_occurrence_enrolments_edges_node_child_guardians_edges | null)[];
}

export interface Occurrence_occurrence_enrolments_edges_node_child {
  firstName: string;
  lastName: string;
  birthdate: any;
  guardians: Occurrence_occurrence_enrolments_edges_node_child_guardians;
}

export interface Occurrence_occurrence_enrolments_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  attended: boolean | null;
  child: Occurrence_occurrence_enrolments_edges_node_child;
}

export interface Occurrence_occurrence_enrolments_edges {
  /**
   * The item at the end of the edge
   */
  node: Occurrence_occurrence_enrolments_edges_node | null;
}

export interface Occurrence_occurrence_enrolments {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Occurrence_occurrence_enrolments_edges | null)[];
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
  enrolments: Occurrence_occurrence_enrolments;
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
