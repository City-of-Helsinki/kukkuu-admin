/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Language } from "./globalTypes";

// ====================================================
// GraphQL query operation: Children
// ====================================================

export interface Children_children_edges_node_guardians_edges_node {
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

export interface Children_children_edges_node_guardians_edges {
  /**
   * The item at the end of the edge
   */
  node: Children_children_edges_node_guardians_edges_node | null;
}

export interface Children_children_edges_node_guardians {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Children_children_edges_node_guardians_edges | null)[];
}

export interface Children_children_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  birthdate: any;
  postalCode: string;
  guardians: Children_children_edges_node_guardians;
}

export interface Children_children_edges {
  /**
   * The item at the end of the edge
   */
  node: Children_children_edges_node | null;
}

export interface Children_children {
  count: number;
  /**
   * Contains the nodes in this connection.
   */
  edges: (Children_children_edges | null)[];
}

export interface Children {
  children: Children_children | null;
}

export interface ChildrenVariables {
  projectId?: string | null;
  limit?: number | null;
  offset?: number | null;
}
