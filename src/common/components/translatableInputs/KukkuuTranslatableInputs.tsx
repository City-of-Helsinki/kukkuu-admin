import React from 'react';
import { TranslatableInputsProps } from 'react-admin';

import { CONTENT_LANGUAGES } from '../../constants';
import { CustomizedReactAdminTranslatableInputs } from '../../reactAdmin/TranslatableInputs';
import { Language } from '../../../api/generatedTypes/globalTypes';
import LanguageTabs from '../languageTab/LanguageTabs';

type KukkuuTranslatableInputsProps = Omit<
  TranslatableInputsProps,
  'locales' | 'defaultLocale'
> & {
  locales?: TranslatableInputsProps['locales'];
  defaultLocale?: TranslatableInputsProps['defaultLocale'];
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
    <CustomizedReactAdminTranslatableInputs
      locales={locales}
      defaultLocale={defaultLocale}
      customGetSource={customGetSource}
      selector={<LanguageTabs />}
    >
      {children}
    </CustomizedReactAdminTranslatableInputs>
  );
}
