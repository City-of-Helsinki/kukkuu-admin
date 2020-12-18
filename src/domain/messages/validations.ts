import { minValue, required, choices } from 'react-admin';

import { requireFinnishFields } from '../../common/utils';
import { recipientSelectionChoices } from './choices';

export const validateSubject = required();

export const validateBodyText = required();

export const validateCapacityPerOccurrence = [minValue(0), required()];

export const validateRecipientSelection = [
  choices(recipientSelectionChoices.map((choice) => choice.id)),
];

export const validateMessageForm = (values: any) => {
  return requireFinnishFields(
    values,
    ['subject', 'message.translations.FI.subject.required'],
    ['bodyText', 'message.translations.FI.bodyText.required']
  );
};
