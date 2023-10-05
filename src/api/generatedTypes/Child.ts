/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Language } from './globalTypes';

// ====================================================
// GraphQL query operation: Child
// ====================================================

export interface Child_child_guardians_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * If left blank, will be populated with the user's email.
   */
  email: string;
  language: Language;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface Child_child_guardians_edges {
  /**
   * The item at the end of the edge
   */
  node: Child_child_guardians_edges_node | null;
}

export interface Child_child_guardians {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Child_child_guardians_edges | null)[];
}

export interface Child_child_occurrences_edges_node_event {
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * In minutes
   */
  duration: number | null;
}

export interface Child_child_occurrences_edges_node_venue {
  /**
   * The ID of the object.
   */
  id: string;
}

export interface Child_child_occurrences_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  time: any;
  event: Child_child_occurrences_edges_node_event;
  venue: Child_child_occurrences_edges_node_venue;
}

export interface Child_child_occurrences_edges {
  /**
   * The item at the end of the edge
   */
  node: Child_child_occurrences_edges_node | null;
}

export interface Child_child_occurrences {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Child_child_occurrences_edges | null)[];
}

export interface Child_child {
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  birthdate: any;
  postalCode: string;
  guardians: Child_child_guardians;
  occurrences: Child_child_occurrences;
}

export interface Child {
  child: Child_child | null;
}

export interface ChildVariables {
  id: string;
}
