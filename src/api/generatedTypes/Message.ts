/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RecipientSelectionEnum, LanguageTranslationLanguageCode } from "./globalTypes";

// ====================================================
// GraphQL query operation: Message
// ====================================================

export interface Message_message_event {
  /**
   * The ID of the object.
   */
  id: string;
  name: string | null;
}

export interface Message_message_translations {
  languageCode: LanguageTranslationLanguageCode;
  subject: string;
  bodyText: string;
}

export interface Message_message {
  /**
   * The ID of the object.
   */
  id: string;
  subject: string | null;
  bodyText: string | null;
  recipientSelection: RecipientSelectionEnum | null;
  recipientCount: number | null;
  sentAt: any | null;
  event: Message_message_event | null;
  translations: Message_message_translations[];
}

export interface Message {
  /**
   * The ID of the object
   */
  message: Message_message | null;
}

export interface MessageVariables {
  id: string;
}
