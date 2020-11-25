import get from 'lodash/get';

import i18nProvider from './translation/i18nProvider';
import { Language } from '../api/generatedTypes/globalTypes';

export function toDateTimeString(date: Date, locale?: string) {
  return date.toLocaleString(locale, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function toShortDateTimeString(date: Date, locale?: string) {
  const dateTimeString = toDateTimeString(date, locale);

  if (dateTimeString && locale === 'fi') {
    // This is a pretty ugly way to go about it, but I couldn't find a
    // way to use the API to remove this prefix.
    return dateTimeString.replace(' klo', ',');
  }

  return dateTimeString;
}

export function sum(numbers: number[]): number {
  return numbers.reduce((sum: number, capacity: number) => sum + capacity, 0);
}

const labelAllLanguages = (
  errorObject: Record<string, any>,
  field: string,
  error: string
) => {
  Object.values(Language).forEach((language) => {
    errorObject.translations[language][field] = error;
  });
};

export function requireFinnishFields(
  values: any,
  ...fields: Array<[string, string]>
) {
  const errors = {
    translations: {
      [Language.FI]: {},
      [Language.SV]: {},
      [Language.EN]: {},
    },
  };

  fields.forEach(([field, fieldError]) => {
    const value = get(values, `translations.${Language.FI}.${field}`);

    if (!value) {
      labelAllLanguages(errors, field, i18nProvider.translate(fieldError));
    }
  });

  return errors;
}
