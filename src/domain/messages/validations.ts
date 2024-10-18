import { minValue, required, choices } from 'react-admin';
import { object, string } from 'yup';

import { recipientSelectionChoices } from './choices';
import { Language } from '../api/generatedTypes/graphql';

export const validateSubject = required();

export const validateBodyText = required();

export const validateCapacityPerOccurrence = [minValue(0), required()];

export const validateRecipientSelection = [
  required('messages.fields.recipientSelection.required'),
  choices(
    recipientSelectionChoices.map((choice) => choice.id),
    'messages.fields.recipientSelection.required'
  ),
];

export const getEmailMessagesTranslatedFieldsSchema = (lang: Language) =>
  object({
    bodyText:
      lang === Language.Fi
        ? string().required('message.translations.FI.bodyText.required')
        : string(),
    subject:
      lang === Language.Fi
        ? string().required('message.translations.FI.subject.required')
        : string(),
  });

export const getSmsMessagesTranslatedFieldsSchema = (lang: Language) =>
  object({
    bodyText:
      lang === Language.Fi
        ? string().required('message.translations.FI.bodyText.required')
        : string(),
  });

export const emailMessageSchema = object({
  recipientSelection: string().required(
    'messages.fields.recipientSelection.required'
  ),
  translations: object({
    [Language.Fi]: getEmailMessagesTranslatedFieldsSchema(Language.Fi),
    [Language.Sv]: getEmailMessagesTranslatedFieldsSchema(Language.Sv),
    [Language.En]: getEmailMessagesTranslatedFieldsSchema(Language.En),
  }),
});

export const smsMessageSchema = object({
  recipientSelection: string().required(
    'messages.fields.recipientSelection.required'
  ),
  translations: object({
    [Language.Fi]: getSmsMessagesTranslatedFieldsSchema(Language.Fi),
    [Language.Sv]: getSmsMessagesTranslatedFieldsSchema(Language.Sv),
    [Language.En]: getSmsMessagesTranslatedFieldsSchema(Language.En),
  }),
});
