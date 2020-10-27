import { minValue, required, choices } from 'react-admin';

import { recipientSelectionChoices } from './choices';

export const validateSubject = required();

export const validateBodyText = required();

export const validateCapacityPerOccurrence = [minValue(0), required()];

export const validateRecipientSelection = [
  choices(recipientSelectionChoices.map((choice) => choice.id)),
];
