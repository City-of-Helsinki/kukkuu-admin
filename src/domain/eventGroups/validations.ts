import { required, maxLength } from 'react-admin';
import { object, string } from 'yup';

import { requireFinnishFields } from '../../common/utils';
import { Language } from '../../api/generatedTypes/globalTypes';

export const validateName = required();

export const validateShortDescription = maxLength(140);

export const validateEventGroupForm = (values: any) => {
  return requireFinnishFields(values, [
    'name',
    'eventGroups.translations.FI.name.required',
  ]);
};

export const getEventGroupsTranslatedFieldsSchema = (lang: Language) =>
  object({
    name:
      lang === Language.FI
        ? string().required('eventGroups.translations.FI.name.required')
        : string(),
    description: string(),
    shortDescription: string(),
  });

export const eventGroupsSchema = object({
  translations: object({
    [Language.FI]: getEventGroupsTranslatedFieldsSchema(Language.FI),
    [Language.SV]: getEventGroupsTranslatedFieldsSchema(Language.SV),
    [Language.EN]: getEventGroupsTranslatedFieldsSchema(Language.EN),
  }),
});
