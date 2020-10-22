/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RecipientSelectionEnum, LanguageTranslationLanguageCode } from "./globalTypes";

// ====================================================
// GraphQL fragment: MessageFragment
// ====================================================

export interface MessageFragment_event {
  name: string | null;
}

export interface MessageFragment_translations {
  languageCode: LanguageTranslationLanguageCode;
  subject: string;
  bodyText: string;
}

export interface MessageFragment {
  /**
   * The ID of the object.
   */
  id: string;
  subject: string | null;
  bodyText: string | null;
  recipientSelection: RecipientSelectionEnum | null;
  recipientCount: number | null;
  sentAt: any | null;
  event: MessageFragment_event | null;
  translations: MessageFragment_translations[];
}
