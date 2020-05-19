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
  translations: Project_project_translations[];
}

export interface Project {
  /**
   * The ID of the object
   */
  project: Project_project | null;
}

export interface ProjectVariables {
  id: string;
}
