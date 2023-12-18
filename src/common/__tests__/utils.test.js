import set from 'lodash/set';

import {
  sum,
  requireFinnishFields,
  toDateTimeString,
  toShortDateTimeString,
  toDateString,
  toTimeString,
  getNormalizedValues,
  createTranslationObject,
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

  describe('getNormalizedValues', () => {
    const fieldNormalizerMap = {
      nullToEmptyStringField: [[null], ''],
      zeroToNullField: [[0], null],
      falthyValuesToFalseField: [[0, '', null], false],
      'nestedField.x': [[0], false],
      'nestedField.y': [[1], true],
      'nestedField.translations.fi': [[null], ''],
      'nestedField.translations.sv': [[null], ''],
      'nestedField.translations.en': [[null], ''],
    };

    const getAllCases = (fieldNormalizerMap) =>
      Object.entries(fieldNormalizerMap)
        .map(([fieldName, [sourceValues, normalizedValue]]) =>
          sourceValues.map((sourceValue) => [
            fieldName,
            sourceValue,
            normalizedValue,
          ])
        )
        .flat();

    it.each(getAllCases(fieldNormalizerMap))(
      'normalizes field `%s` from value `%s` to a value `%s`',
      async (field, sourceValue, normalizedValue) => {
        const formValues = set({}, field, sourceValue);
        const expectedValues = set({}, field, normalizedValue);
        const normalizedValues = getNormalizedValues({
          fieldNormalizerMap,
          formValues,
        });
        expect(normalizedValues).toStrictEqual(expectedValues);
      }
    );

    it('only manipulates the fields that are included in the `fieldNormalizerMap`', async () => {
      const formValues = { nullToEmptyStringField: null, zeroToNullField: 0 };
      const normalizedValues = getNormalizedValues({
        fieldNormalizerMap,
        formValues,
      });
      expect(normalizedValues).toStrictEqual({
        nullToEmptyStringField: '',
        zeroToNullField: null,
      });
    });

    it('returns only the fields that that should be transformed if the initialValues is not given', async () => {
      const formValues = {
        nullToEmptyStringField: null,
        zeroToNullField: 0,
        a: 1,
        b: 2,
      };
      const normalizedValues = getNormalizedValues({
        fieldNormalizerMap,
        formValues,
      });
      expect(normalizedValues).toStrictEqual({
        nullToEmptyStringField: '',
        zeroToNullField: null,
      });
    });

    it('uses the initial values as a base for returned formValues', async () => {
      const formValues = {
        nullToEmptyStringField: null,
        zeroToNullField: 0,
        a: 1,
        b: 2,
      };
      const normalizedValues = getNormalizedValues({
        fieldNormalizerMap,
        formValues,
        initialValues: formValues,
      });
      expect(normalizedValues).toStrictEqual({
        nullToEmptyStringField: '',
        zeroToNullField: null,
        a: 1,
        b: 2,
      });
    });

    it('handles the nested fields', async () => {
      const formValues = {
        zeroToNullField: 0,
        nestedField: {
          x: 0,
          y: 1,
          translations: {
            fi: null,
            en: null,
            sv: null,
          },
        },
      };
      const normalizedValues = getNormalizedValues({
        fieldNormalizerMap,
        formValues,
      });
      expect(normalizedValues).toStrictEqual({
        zeroToNullField: null,
        nestedField: {
          x: false,
          y: true,
          translations: {
            fi: '',
            en: '',
            sv: '',
          },
        },
      });
    });
  });

  describe('createTranslationObject', () => {
    it.each([
      [['a', 'b', 'c'], 'translations', ''],
      [['x', 'y', 'z'], 'root', null],
    ])(
      'creates a translation object for fields `%s` under the key `%s` with init value `%s`',
      async (fields, translationProperty, initValue) => {
        const dictionary = createTranslationObject({
          translatableFields: fields,
          translationsKeyName: translationProperty,
          value: initValue,
          flattenedWithDotNotation: false,
        });
        fields.forEach((field) => {
          ['FI', 'SV', 'EN'].forEach((lang) => {
            expect(dictionary[translationProperty][lang][field]).toStrictEqual(
              initValue
            );
          });
        });
      }
    );
    it.each([
      [['a', 'b', 'c'], 'translations', ''],
      [['x', 'y', 'z'], 'root', null],
    ])(
      'creates a flattened, dot notated, translation object for fields `%s` under the key `%s` with init value `%s`',
      async (fields, translationProperty, initValue) => {
        const dictionary = createTranslationObject({
          translatableFields: fields,
          translationsKeyName: translationProperty,
          value: initValue,
          flattenedWithDotNotation: true,
        });
        fields.forEach((field) => {
          ['FI', 'SV', 'EN'].forEach((lang) => {
            expect(
              dictionary[`${translationProperty}.${lang}.${field}`]
            ).toStrictEqual(initValue);
          });
        });
      }
    );
  });
});
