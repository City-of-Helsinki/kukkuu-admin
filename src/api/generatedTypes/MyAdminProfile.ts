/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyAdminProfile
// ====================================================

export interface MyAdminProfile_myAdminProfile_projects_edges_node_myPermissions {
  publish: boolean | null;
}

export interface MyAdminProfile_myAdminProfile_projects_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  year: number;
  name: string | null;
  myPermissions: MyAdminProfile_myAdminProfile_projects_edges_node_myPermissions | null;
}

export interface MyAdminProfile_myAdminProfile_projects_edges {
  /**
   * The item at the end of the edge
   */
  node: MyAdminProfile_myAdminProfile_projects_edges_node | null;
}

export interface MyAdminProfile_myAdminProfile_projects {
  /**
   * Contains the nodes in this connection.
   */
  edges: (MyAdminProfile_myAdminProfile_projects_edges | null)[];
}

export interface MyAdminProfile_myAdminProfile {
  /**
   * The ID of the object.
   */
  id: string;
  projects: MyAdminProfile_myAdminProfile_projects | null;
}

export interface MyAdminProfile {
  myAdminProfile: MyAdminProfile_myAdminProfile | null;
}
