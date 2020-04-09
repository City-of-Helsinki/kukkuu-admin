import { maxLength, minValue, required } from 'react-admin';

export const validateShortDescription = maxLength(160);

export const validateParticipantsPerInvite = required();

export const validateCapacityPerOccurrence = [minValue(0), required()];

export const validateDuration = minValue(0);

export const validateEvent = ({
  translations: { FI: { name } = {} } = {},
}: {
  translations: { FI?: { name?: string } }; // TS lol
}) => {
  if (!name) {
    return { 'it-does-not-matter': 'what-we-have-here' };
  }
  return {};
};
