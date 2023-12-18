import type { FieldValues } from 'react-hook-form';

export type ContentLanguage = 'FI' | 'SV' | 'EN';

export type ValuesToNormalize = any[];
export type NormalizedValue = any;
export type FormFieldValueNormalizer<T extends FieldValues> = {
  [fieldName in keyof T]: [ValuesToNormalize, NormalizedValue];
};
