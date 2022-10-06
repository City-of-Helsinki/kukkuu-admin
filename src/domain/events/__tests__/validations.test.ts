import { validateUrl } from '../validations';

describe('event field validations', () => {
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
