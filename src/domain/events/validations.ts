import { maxLength, minValue, required } from 'react-admin';

export const validateShortDescription = maxLength(160);

export const validateParticipantsPerInvite = required();

export const validateCapacityPerOccurrence = [minValue(0), required()];

export const validateDuration = minValue(0);

export const validateEvent = (
  {
    translations,
    themePathIds,
  }: {
    translations?: { FI?: { name?: string } };
    themePathIds?: string[];
  },
  { isThemePathOptional = false }: { isThemePathOptional?: boolean } = {}
) => {
  const errors: Record<string, unknown> = {};
  if (!translations?.FI?.name) {
    errors['it-does-not-matter'] = {
      type: 'required',
      message: 'what-we-have-here',
    };
  }
  if (!isThemePathOptional && !themePathIds?.length) {
    errors.themePathIds = 'ra.validation.required';
  }
  return errors;
};

export const validateUrl = (input: string) => {
  const error = 'events.validationErrors.url';
  let url;
  try {
    url = new URL(input);
  } catch (_) {
    return error;
  }
  return ['http:', 'https:'].includes(url.protocol) ? undefined : error;
};
