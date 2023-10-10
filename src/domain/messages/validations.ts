import { minValue, required, choices } from 'react-admin';
import { object, string } from 'yup';

import { recipientSelectionChoices } from './choices';
import { Language } from '../../api/generatedTypes/globalTypes';

export const validateSubject = required();

export const validateBodyText = required();

export const validateCapacityPerOccurrence = [minValue(0), required()];

export const validateRecipientSelection = [
  choices(recipientSelectionChoices.map((choice) => choice.id)),
];

export const getEmailMessagesTranslatedFieldsSchema = (lang: Language) =>
  object({
    bodyText:
      lang === Language.FI
        ? string().required('message.translations.FI.subject.required')
        : string(),
    subject:
      lang === Language.FI
        ? string().required('message.translations.FI.bodyText.required')
        : string(),
  });

export const getSmsMessagesTranslatedFieldsSchema = (lang: Language) =>
  object({
    bodyText:
      lang === Language.FI
        ? string().required('message.translations.FI.bodyText.required')
        : string(),
  });

export const emailMessageSchema = object({
  translations: object({
    [Language.FI]: getEmailMessagesTranslatedFieldsSchema(Language.FI),
    [Language.SV]: getEmailMessagesTranslatedFieldsSchema(Language.SV),
    [Language.EN]: getEmailMessagesTranslatedFieldsSchema(Language.EN),
  }),
});

export const smsMessageSchema = object({
  translations: object({
    [Language.FI]: getSmsMessagesTranslatedFieldsSchema(Language.FI),
    [Language.SV]: getSmsMessagesTranslatedFieldsSchema(Language.SV),
    [Language.EN]: getSmsMessagesTranslatedFieldsSchema(Language.EN),
  }),
});
