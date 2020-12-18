import { required, maxLength } from 'react-admin';

import { requireFinnishFields } from '../../common/utils';

export const validateName = required();

export const validateShortDescription = maxLength(140);

export const validateEventGroupForm = (values: any) => {
  return requireFinnishFields(values, [
    'name',
    'eventGroups.translations.FI.name.required',
  ]);
};
