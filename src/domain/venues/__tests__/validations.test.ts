import { validateVenue } from '../validations';

describe('venue field validations', () => {
  describe('validateVenue', () => {
    it('should return an error object when the Finnish name is missing', () => {
      expect(validateVenue({})).toEqual({
        'it-does-not-matter': {
          type: 'required',
          message: 'what-we-have-here',
        },
      });
    });

    it('should return an empty object when the Finnish name exists', () => {
      expect(
        validateVenue({
          translations: { FI: { name: 'Test venue' } },
        })
      ).toEqual({});
    });
  });
});
