import { required, maxLength } from 'react-admin';
import * as yup from 'yup';

import { Language } from '../api/generatedTypes/graphql';

export const validateName = required();

export const validateShortDescription = maxLength(140);

export const getEventGroupsTranslatedFieldsSchema = (lang: Language) =>
  yup.object().shape({
    name:
      lang === Language.Fi
        ? yup.string().required('eventGroups.translations.FI.name.required')
        : yup.string().optional(),
    description: yup.string(),
    shortDescription: yup.string(),
  });

export const eventGroupsSchema = yup.object().shape({
  translations: yup.object().shape({
    [Language.Fi]: getEventGroupsTranslatedFieldsSchema(Language.Fi),
    [Language.Sv]: getEventGroupsTranslatedFieldsSchema(Language.Sv),
    [Language.En]: getEventGroupsTranslatedFieldsSchema(Language.En),
  }),
});
