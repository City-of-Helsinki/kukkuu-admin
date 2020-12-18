/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddEventGroupMutationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addEventGroup
// ====================================================

export interface addEventGroup_addEventGroup_eventGroup {
  /**
   * The ID of the object.
   */
  id: string;
}

export interface addEventGroup_addEventGroup {
  eventGroup: addEventGroup_addEventGroup_eventGroup | null;
}

export interface addEventGroup {
  addEventGroup: addEventGroup_addEventGroup | null;
}

export interface addEventGroupVariables {
  input: AddEventGroupMutationInput;
}
