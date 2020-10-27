import { minValue, required, choices } from 'react-admin';

import i18nProvider from '../../common/translation/i18nProvider';
import { Language } from '../../api/generatedTypes/globalTypes';
import { recipientSelectionChoices } from './choices';

export const validateSubject = required();

export const validateBodyText = required();

export const validateCapacityPerOccurrence = [minValue(0), required()];

export const validateRecipientSelection = [
  choices(recipientSelectionChoices.map((choice) => choice.id)),
];

const labelAllLanguages = (
  errorObject: Record<string, any>,
  field: string,
  error: string
) => {
  Object.values(Language).forEach((language) => {
    errorObject.translations[language][field] = error;
  });
};

export const validateMessageForm = (values: any) => {
  const errors = {
    translations: {
      [Language.FI]: {},
      [Language.SV]: {},
      [Language.EN]: {},
    },
  };

  if (!values?.translations?.[Language.FI]?.subject) {
    labelAllLanguages(
      errors,
      'subject',
      i18nProvider.translate('message.translations.FI.subject.required')
    );
  }

  if (!values?.translations?.[Language.FI]?.bodyText) {
    labelAllLanguages(
      errors,
      'bodyText',
      i18nProvider.translate('message.translations.FI.bodyText.required')
    );
  }

  return errors;
};
