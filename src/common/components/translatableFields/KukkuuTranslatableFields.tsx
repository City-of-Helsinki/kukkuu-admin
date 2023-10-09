import React from 'react';
import { TranslatableFieldsProps } from 'react-admin';

import { CONTENT_LANGUAGES } from '../../constants';
import { CustomizedReactAdminTranslatableFields } from '../../reactAdmin/TranslatableFields';
import { Language } from '../../../api/generatedTypes/globalTypes';
import LanguageTabs from '../languageTab/LanguageTabs';

type KukkuuTranslatableInputsProps = Omit<
  TranslatableFieldsProps,
  'locales' | 'defaultLocale'
> & {
  locales?: TranslatableFieldsProps['locales'];
  defaultLocale?: TranslatableFieldsProps['defaultLocale'];
};

export default function KukkuuTranslatableInputs({
  children,
  locales = CONTENT_LANGUAGES,
  defaultLocale = Language.FI,
}: KukkuuTranslatableInputsProps) {
  const customGetSource =
    (selectedLocale: string) =>
    (field: string, locale = selectedLocale) =>
      `translations.${locale}.${field}`;
  return (
    <CustomizedReactAdminTranslatableFields
      locales={locales}
      defaultLocale={defaultLocale}
      customGetSource={customGetSource}
      selector={<LanguageTabs />}
    >
      {children}
    </CustomizedReactAdminTranslatableFields>
  );
}
