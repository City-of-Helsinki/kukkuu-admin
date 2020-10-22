import React, { useState, ReactElement } from 'react';

import LanguageTabs from '../../../common/components/languageTab/LanguageTabs';
import { Language } from '../../../api/generatedTypes/globalTypes';

function useLanguageTabs(): [
  ReactElement,
  (fieldName: string) => string,
  Language,
  (language: Language) => void
] {
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const tField = (fieldName: string) =>
    `translations.${selectedLanguage}.${fieldName}`;
  const component = (
    <LanguageTabs
      selectedLanguage={selectedLanguage}
      onSelect={selectLanguage}
    />
  );

  return [component, tField, selectedLanguage, selectLanguage];
}

export default useLanguageTabs;
