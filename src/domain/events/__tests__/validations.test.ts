import { validateEvent, validateUrl } from '../validations';

describe('event field validations', () => {
  describe('validateEvent', () => {
    it('should return an error object when the Finnish name is missing', () => {
      expect(validateEvent({})).toEqual({
        'it-does-not-matter': {
          type: 'required',
          message: 'what-we-have-here',
        },
      });
    });

    it('should return an empty object when the Finnish name exists', () => {
      expect(
        validateEvent({
          translations: { FI: { name: 'Test event' } },
        })
      ).toEqual({});
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
