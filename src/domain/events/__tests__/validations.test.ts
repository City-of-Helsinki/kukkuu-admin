import moment from 'moment-timezone';

import {
  validateEvent,
  validateTicketSystemEndTime,
  validateUrl,
} from '../validations';

describe('event field validations', () => {
  describe('validateEvent', () => {
    it('should return an error object when the Finnish name is missing', () => {
      expect(validateEvent({ themePathIds: ['rhythm'] })).toEqual({
        'it-does-not-matter': {
          type: 'required',
          message: 'what-we-have-here',
        },
      });
    });

    it('should return an empty object when the Finnish name and a theme path exist', () => {
      expect(
        validateEvent({
          translations: { FI: { name: 'Test event' } },
          themePathIds: ['rhythm'],
        })
      ).toEqual({});
    });

    it('should return an error for themePathIds when none are selected', () => {
      expect(
        validateEvent({
          translations: { FI: { name: 'Test event' } },
          themePathIds: [],
        })
      ).toEqual({ themePathIds: 'ra.validation.required' });
    });

    it('should not require a theme path when it is optional', () => {
      expect(
        validateEvent(
          { translations: { FI: { name: 'Test event' } }, themePathIds: [] },
          { isThemePathOptional: true }
        )
      ).toEqual({});
    });

    it('should return error for past ticketSystem.endTime when isEditing is false', () => {
      const pastEndTime = moment().subtract(1, 'day').toISOString();
      expect(
        validateEvent(
          {
            translations: { FI: { name: 'Test event' } },
            themePathIds: ['rhythm'],
            ticketSystem: { endTime: pastEndTime },
          },
          { isEditing: false }
        )
      ).toEqual({
        'ticketSystem.endTime':
          'events.fields.ticketSystemEndTime.pastErrorMessage',
      });
    });

    it('should not return error for past ticketSystem.endTime when isEditing is true', () => {
      const pastEndTime = moment().subtract(1, 'day').toISOString();
      expect(
        validateEvent(
          {
            translations: { FI: { name: 'Test event' } },
            themePathIds: ['rhythm'],
            ticketSystem: { endTime: pastEndTime },
          },
          { isEditing: true }
        )
      ).toEqual({});
    });

    it('should not return error for future ticketSystem.endTime when isEditing is false', () => {
      const futureEndTime = moment().add(1, 'day').toISOString();
      expect(
        validateEvent(
          {
            translations: { FI: { name: 'Test event' } },
            themePathIds: ['rhythm'],
            ticketSystem: { endTime: futureEndTime },
          },
          { isEditing: false }
        )
      ).toEqual({});
    });
  });

  describe('validateTicketSystemEndTime', () => {
    it('returns error message when datetime is in the past', () => {
      const past = moment().subtract(1, 'hour').toISOString();
      expect(validateTicketSystemEndTime(past)).toBe(
        'events.fields.ticketSystemEndTime.pastErrorMessage'
      );
    });

    it('returns undefined when datetime is in the future', () => {
      const future = moment().add(1, 'hour').toISOString();
      expect(validateTicketSystemEndTime(future)).toBeUndefined();
    });

    it('returns undefined when value is null, undefined, or empty', () => {
      expect(validateTicketSystemEndTime(null)).toBeUndefined();
      expect(validateTicketSystemEndTime(undefined)).toBeUndefined();
      expect(validateTicketSystemEndTime('')).toBeUndefined();
    });
  });

  describe('validateUrl', () => {
    it('should return undefined for a valid URL', () => {
      expect(validateUrl('https://example.com')).toEqual(undefined);
    });

    it('should return the error for an invalid URL', () => {
      expect(validateUrl('this-is-an-invalid-url')).toEqual(
        'events.validationErrors.url'
      );
    });

    it('should return the error for an invalid protocol', () => {
      expect(validateUrl('ftp://example.com')).toEqual(
        'events.validationErrors.url'
      );
    });
  });
});
