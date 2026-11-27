import moment from 'moment-timezone';

import { TicketSystem } from '../../api/generatedTypes/graphql';
import {
  validateEvent,
  validateTicketSystemEndTime,
  validateUrl,
} from '../validations';

describe('event field validations', () => {
  describe('validateEvent', () => {
    const validEvent = {
      translations: { FI: { name: 'Test event' } },
      organisationId: 'org-1',
      themePathIds: ['rhythm'],
    };

    it('should return an error object when the Finnish name is missing', () => {
      expect(validateEvent({ ...validEvent, translations: undefined })).toEqual(
        {
          'it-does-not-matter': {
            type: 'required',
            message: 'what-we-have-here',
          },
        }
      );
    });

    it('should return an empty object when the Finnish name, an organisation and a theme path exist', () => {
      expect(validateEvent(validEvent)).toEqual({});
    });

    it('should return an error for organisationId when none is selected', () => {
      expect(
        validateEvent({ ...validEvent, organisationId: undefined })
      ).toEqual({ organisationId: 'ra.validation.required' });
    });

    it('should return an error for themePathIds when none are selected', () => {
      expect(validateEvent({ ...validEvent, themePathIds: [] })).toEqual({
        themePathIds: 'ra.validation.required',
      });
    });

    it('should not require a theme path when it is optional', () => {
      expect(
        validateEvent(
          { ...validEvent, themePathIds: [] },
          { isThemePathOptional: true }
        )
      ).toEqual({});
    });

    it('should return error for past ticketSystem.endTime when isEditing is false for external ticket systems', () => {
      const pastEndTime = moment().subtract(1, 'day').toISOString();
      expect(
        validateEvent(
          {
            ...validEvent,
            ticketSystem: {
              type: TicketSystem.Ticketmaster,
              endTime: pastEndTime,
            },
          },
          { isEditing: false }
        )
      ).toEqual({
        ticketSystem: {
          endTime: 'events.fields.ticketSystemEndTime.pastErrorMessage',
        },
      });
    });

    it('should not return error for past ticketSystem.endTime when ticket system is internal', () => {
      const pastEndTime = moment().subtract(1, 'day').toISOString();
      expect(
        validateEvent(
          {
            ...validEvent,
            ticketSystem: {
              type: TicketSystem.Internal,
              endTime: pastEndTime,
            },
          },
          { isEditing: false }
        )
      ).toEqual({});
    });

    it('should not return error for past ticketSystem.endTime when isEditing is true', () => {
      const pastEndTime = moment().subtract(1, 'day').toISOString();
      expect(
        validateEvent(
          {
            ...validEvent,
            ticketSystem: {
              type: TicketSystem.Ticketmaster,
              endTime: pastEndTime,
            },
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
            ...validEvent,
            ticketSystem: {
              type: TicketSystem.Ticketmaster,
              endTime: futureEndTime,
            },
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
