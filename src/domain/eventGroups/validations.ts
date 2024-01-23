import { required, maxLength } from 'react-admin';
import { object, string } from 'yup';

import { Language } from '../api/generatedTypes/graphql';

export const validateName = required();

export const validateShortDescription = maxLength(140);

export const getEventGroupsTranslatedFieldsSchema = (lang: Language) =>
  object({
    name:
      lang === Language.Fi
        ? string().required('eventGroups.translations.FI.name.required')
        : string(),
    description: string(),
    shortDescription: string(),
  });

export const eventGroupsSchema = object({
  translations: object({
    [Language.Fi]: getEventGroupsTranslatedFieldsSchema(Language.Fi),
    [Language.Sv]: getEventGroupsTranslatedFieldsSchema(Language.Sv),
    [Language.En]: getEventGroupsTranslatedFieldsSchema(Language.En),
  }),
});
