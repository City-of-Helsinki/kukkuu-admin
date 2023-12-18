import get from 'lodash/get';
import set from 'lodash/set';
import type { FieldValues } from 'react-hook-form';

import i18nProvider from './translation/i18nProvider';
import { Language } from '../api/generatedTypes/globalTypes';
import { FormFieldValueNormalizer } from './types';
import { CONTENT_LANGUAGES } from './constants';

export function toDateTimeString(
  date: Date,
  locale: string = i18nProvider.getLocale()
) {
  return date.toLocaleString(locale, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function toShortDateTimeString(
  date: Date,
  locale: string = i18nProvider.getLocale()
) {
  const dateTimeString = toDateTimeString(date, locale);

  if (dateTimeString && locale === 'fi') {
    // This is a pretty ugly way to go about it, but I couldn't find a
    // way to use the API to remove this prefix.
    return dateTimeString.replace(' klo', ',');
  }

  return dateTimeString;
}

export function toDateString(
  date: Date,
  locale: string = i18nProvider.getLocale()
) {
  return date.toLocaleDateString(locale);
}

export function toTimeString(
  date: Date,
  locale: string = i18nProvider.getLocale()
) {
  return date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: 'numeric',
  });
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

/**
 * When an form input is cleared (with keyboard), the form context stores the value as `null`.
 * The `null` may not be handled properly by the Kukkuu API and an validation exception is raised.
 * This function converts the nulls to some specific value given in an input prop.
 * See more: https://helsinkisolutionoffice.atlassian.net/browse/KK-1048.
 */
export const getNormalizedValues = <T extends FieldValues = FieldValues>({
  fieldNormalizerMap,
  formValues,
  initialValues = {},
}: {
  fieldNormalizerMap: FormFieldValueNormalizer<T>;
  formValues: FieldValues;
  initialValues?: Partial<FieldValues>;
}): Partial<FieldValues> =>
  Object.keys(fieldNormalizerMap).reduce((result, fieldName) => {
    const value = get(formValues, fieldName);
    const [valuesToNormalize, normalizedValue] = get(
      fieldNormalizerMap,
      fieldName
    );
    if (valuesToNormalize?.includes(value)) {
      set(result, fieldName, normalizedValue);
    }
    return result;
  }, initialValues);

export const createTranslationObject = ({
  translatableFields,
  translationsKeyName = 'translations',
  value = '',
  flattenedWithDotNotation = false,
}: {
  translatableFields: string[];
  translationsKeyName?: string;
  value?: any;
  flattenedWithDotNotation?: boolean;
}) => {
  if (flattenedWithDotNotation) {
    return translatableFields.reduce(
      (dictionary, field) => ({
        ...dictionary,
        ...CONTENT_LANGUAGES.reduce(
          (translations, lang) => ({
            ...translations,
            [`${translationsKeyName}.${lang}.${field}`]: value,
          }),
          {}
        ),
      }),
      {}
    );
  }

  const dictionary = translatableFields.reduce(
    (dictionary, field) => ({ ...dictionary, [field]: value }),
    {}
  );

  const translations = CONTENT_LANGUAGES.reduce(
    (translations, lang) => ({ ...translations, [lang]: dictionary }),
    {}
  );

  return { [translationsKeyName]: translations };
};
