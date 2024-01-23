import { minValue, required, choices } from 'react-admin';
import { object, string } from 'yup';

import { recipientSelectionChoices } from './choices';
import { Language } from '../api/generatedTypes/graphql';

export const validateSubject = required();

export const validateBodyText = required();

export const validateCapacityPerOccurrence = [minValue(0), required()];

export const validateRecipientSelection = [
  choices(recipientSelectionChoices.map((choice) => choice.id)),
];

export const getEmailMessagesTranslatedFieldsSchema = (lang: Language) =>
  object({
    bodyText:
      lang === Language.Fi
        ? string().required('message.translations.FI.subject.required')
        : string(),
    subject:
      lang === Language.Fi
        ? string().required('message.translations.FI.bodyText.required')
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
  translations: object({
    [Language.Fi]: getEmailMessagesTranslatedFieldsSchema(Language.Fi),
    [Language.Sv]: getEmailMessagesTranslatedFieldsSchema(Language.Sv),
    [Language.En]: getEmailMessagesTranslatedFieldsSchema(Language.En),
  }),
});

export const smsMessageSchema = object({
  translations: object({
    [Language.Fi]: getSmsMessagesTranslatedFieldsSchema(Language.Fi),
    [Language.Sv]: getSmsMessagesTranslatedFieldsSchema(Language.Sv),
    [Language.En]: getSmsMessagesTranslatedFieldsSchema(Language.En),
  }),
});
