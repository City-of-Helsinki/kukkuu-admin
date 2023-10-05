/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateEventGroupMutationInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: updateEventGroup
// ====================================================

export interface updateEventGroup_updateEventGroup_eventGroup {
  /**
   * The ID of the object.
   */
  id: string;
}

export interface updateEventGroup_updateEventGroup {
  eventGroup: updateEventGroup_updateEventGroup_eventGroup | null;
}

export interface updateEventGroup {
  updateEventGroup: updateEventGroup_updateEventGroup | null;
}

export interface updateEventGroupVariables {
  input: UpdateEventGroupMutationInput;
}
