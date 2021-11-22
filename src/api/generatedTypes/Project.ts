/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Language } from "./globalTypes";

// ====================================================
// GraphQL query operation: Project
// ====================================================

export interface Project_project_translations {
  languageCode: Language;
  name: string;
}

export interface Project_project {
  /**
   * The ID of the object.
   */
  id: string;
  year: number;
  /**
   * Whether it is allowed to create events outside event groups.
   */
  singleEventsAllowed: boolean;
  translations: Project_project_translations[];
}

export interface Project {
  project: Project_project | null;
}

export interface ProjectVariables {
  id: string;
}
