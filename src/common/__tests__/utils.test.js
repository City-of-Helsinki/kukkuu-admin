import {
  sum,
  requireFinnishFields,
  toDateTimeString,
  toShortDateTimeString,
  toDateString,
  toTimeString,
} from '../utils';

describe('common utils', () => {
  describe('sum', () => {
    it('should add numbers together', () => {
      expect(sum([1, 4, 10])).toEqual(15);
    });
  });

  describe('requireFinnishFields', () => {
    const errorMessage = 'error';

    const checkErrors = (errors, field, message) => {
      expect(errors.translations.FI[field]).toEqual(message);
      expect(errors.translations.SV[field]).toEqual(message);
      expect(errors.translations.EN[field]).toEqual(message);
    };

    beforeAll(() => {
      // Hide console log errors about missing translation keys
      jest.spyOn(global.console, 'error').mockReturnValue();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    // eslint-disable-next-line max-len
    it('should label all languages with an error when the field in question is missing in the Finnish language version', () => {
      const errors = requireFinnishFields({}, ['name', errorMessage]);

      checkErrors(errors, 'name', errorMessage);
    });

    it('should return the error structure even when the field is valid', () => {
      const errors = requireFinnishFields(
        {
          translations: {
            FI: {
              name: 'Cantaloupe',
            },
          },
        },
        ['name', errorMessage]
      );

      expect(errors.translations.FI).toEqual({});
      expect(errors.translations.SV).toEqual({});
      expect(errors.translations.EN).toEqual({});
    });

    it('should support multiple fields', () => {
      const errorMessage2 = 'error 2';
      const errors = requireFinnishFields(
        {},
        ['name', errorMessage],
        ['description', errorMessage2]
      );

      checkErrors(errors, 'name', errorMessage);
      checkErrors(errors, 'description', errorMessage2);
    });
  });

  describe('date formatters', () => {
    const date = new Date(0);
    const formatters = [
      toDateTimeString,
      toShortDateTimeString,
      toDateString,
      toTimeString,
    ];

    formatters.forEach((formatter) => {
      it(`${formatter.name} should return a correctly formatted string`, () => {
        expect(formatter(date)).toMatchSnapshot();
      });
    });
  });
});
