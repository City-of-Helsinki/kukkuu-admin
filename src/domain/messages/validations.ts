import { minValue, required, choices } from 'react-admin';
import * as yup from 'yup';

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
  yup.object().shape({
    bodyText:
      lang === Language.Fi
        ? yup.string().required('message.translations.FI.bodyText.required')
        : yup.string().optional(),
    subject:
      lang === Language.Fi
        ? yup.string().required('message.translations.FI.subject.required')
        : yup.string().optional(),
  });

export const getSmsMessagesTranslatedFieldsSchema = (lang: Language) =>
  yup.object().shape({
    bodyText:
      lang === Language.Fi
        ? yup.string().required('message.translations.FI.bodyText.required')
        : yup.string().optional(),
  });

export const emailMessageSchema = yup.object().shape({
  recipientSelection: yup
    .string()
    .required('messages.fields.recipientSelection.required'),
  translations: yup.object().shape({
    [Language.Fi]: getEmailMessagesTranslatedFieldsSchema(Language.Fi),
    [Language.Sv]: getEmailMessagesTranslatedFieldsSchema(Language.Sv),
    [Language.En]: getEmailMessagesTranslatedFieldsSchema(Language.En),
  }),
});

export const smsMessageSchema = yup.object().shape({
  recipientSelection: yup
    .string()
    .required('messages.fields.recipientSelection.required'),
  translations: yup.object().shape({
    [Language.Fi]: getSmsMessagesTranslatedFieldsSchema(Language.Fi),
    [Language.Sv]: getSmsMessagesTranslatedFieldsSchema(Language.Sv),
    [Language.En]: getSmsMessagesTranslatedFieldsSchema(Language.En),
  }),
});
