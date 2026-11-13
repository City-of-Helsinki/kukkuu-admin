import { maxLength, minValue, required } from 'react-admin';
import moment from 'moment-timezone';

import type { TicketSystem } from '../api/generatedTypes/graphql';

export const validateShortDescription = maxLength(160);

export const validateParticipantsPerInvite = required();

export const validateCapacityPerOccurrence = [minValue(0), required()];

export const validateDuration = minValue(0);

/**
 * Validates that external ticket system end time is not in the past.
 *
 * @param value - The ISO datetime string or Date representing ticket system end time.
 * @returns Translation error key if datetime is in the past, otherwise undefined.
 */
export const validateTicketSystemEndTime = (value?: string | null) => {
  if (!value) return undefined;
  const endMoment = moment(value);
  if (!endMoment.isValid()) return undefined;
  return endMoment.isAfter(moment())
    ? undefined
    : 'events.fields.ticketSystemEndTime.pastErrorMessage';
};

/**
 * Validates event form values.
 *
 * @param values - Event form field values.
 * @param options.isThemePathOptional - Whether theme path selection is optional.
 * @param options.isEditing - Whether the form is in edit mode. When editing, past-date
 *   validation for ticketSystem.endTime is dismissed.
 * @returns An errors object with field-specific validation error keys.
 */
export const validateEvent = (
  values: {
    translations?: { FI?: { name?: string } };
    themePathIds?: string[];
    ticketSystem?: {
      type?: TicketSystem;
      endTime?: string | null;
      url?: string | null;
    };
  },
  {
    isThemePathOptional = false,
    isEditing = false,
  }: { isThemePathOptional?: boolean; isEditing?: boolean } = {}
) => {
  const errors: Record<string, unknown> = {};
  if (!values?.translations?.FI?.name) {
    errors['it-does-not-matter'] = {
      type: 'required',
      message: 'what-we-have-here',
    };
  }
  if (!isThemePathOptional && !values?.themePathIds?.length) {
    errors.themePathIds = 'ra.validation.required';
  }
  if (!isEditing && values?.ticketSystem?.endTime) {
    const error = validateTicketSystemEndTime(values.ticketSystem.endTime);
    if (error) {
      errors['ticketSystem.endTime'] = error;
    }
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
