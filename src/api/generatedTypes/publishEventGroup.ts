/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PublishEventGroupMutationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: publishEventGroup
// ====================================================

export interface publishEventGroup_publishEventGroup_eventGroup {
  /**
   * The ID of the object.
   */
  id: string;
  publishedAt: any | null;
}

export interface publishEventGroup_publishEventGroup {
  eventGroup: publishEventGroup_publishEventGroup_eventGroup | null;
}

export interface publishEventGroup {
  publishEventGroup: publishEventGroup_publishEventGroup | null;
}

export interface publishEventGroupVariables {
  input: PublishEventGroupMutationInput;
}
