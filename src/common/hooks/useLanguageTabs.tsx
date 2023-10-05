import React, { useState, ReactElement } from 'react';

import LanguageTabs from '../components/languageTab/LanguageTabs';
import { Language } from '../../api/generatedTypes/globalTypes';

type Options = {
  enabled?: boolean;
};

function useLanguageTabs(
  options?: Options
): [
  ReactElement | null,
  (fieldName: string) => string,
  Language,
  (language: Language) => void,
] {
  const enabled = options?.enabled ?? true;
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const tField = (fieldName: string) =>
    `translations.${selectedLanguage}.${fieldName}`;
  const component = enabled ? (
    <LanguageTabs
      selectedLanguage={selectedLanguage}
      onSelect={selectLanguage}
    />
  ) : null;

  return [component, tField, selectedLanguage, selectLanguage];
}

export default useLanguageTabs;
