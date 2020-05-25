/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Language } from "./globalTypes";

// ====================================================
// GraphQL query operation: Venues
// ====================================================

export interface Venues_venues_edges_node_translations {
  name: string;
  address: string;
  languageCode: Language;
}

export interface Venues_venues_edges_node_occurrences_pageInfo {
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
}

export interface Venues_venues_edges_node_occurrences {
  /**
   * Pagination data for this connection.
   */
  pageInfo: Venues_venues_edges_node_occurrences_pageInfo;
}

export interface Venues_venues_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  translations: Venues_venues_edges_node_translations[];
  occurrences: Venues_venues_edges_node_occurrences;
}

export interface Venues_venues_edges {
  /**
   * The item at the end of the edge
   */
  node: Venues_venues_edges_node | null;
}

export interface Venues_venues {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Venues_venues_edges | null)[];
}

export interface Venues {
  venues: Venues_venues | null;
}
