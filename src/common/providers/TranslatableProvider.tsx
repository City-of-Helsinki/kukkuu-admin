import React from 'react';

import TranslatableContext, {
  TranslatableContextType,
  initialContext,
} from '../contexts/TranslatableContext';
import { Language } from '../../api/generatedTypes/globalTypes';
import { CONTENT_LANGUAGES } from '../constants';
import LanguageTabs from '../components/languageTab/LanguageTabs';

type LanguageTabsProviderProps = {
  children: React.ReactNode;
  groupKey?: string;
  defaultLanguage?: TranslatableContextType['defaultLanguage'];
  languages?: TranslatableContextType['languages'];
  selector?: TranslatableContextType['selector'];
};

export default function TranslatableProvider({
  children,
  groupKey,
  defaultLanguage = Language.FI,
  languages = CONTENT_LANGUAGES,
  selector = <LanguageTabs />,
}: LanguageTabsProviderProps) {
  const [selectedLanguage, selectLanguage] =
    React.useState<Language>(defaultLanguage);

  const getSource = (fieldName: string) =>
    `translations.${selectedLanguage}.${fieldName}`;

  const context = {
    ...initialContext,
    getSource,
    defaultLanguage,
    languages,
    selectLanguage,
    selectedLanguage,
    selector,
  };

  const uniqueKeyForLanguageContainer = `translatable-context${
    groupKey ? '-' + groupKey : ''
  }-${selectedLanguage}`;

  return (
    <TranslatableContext.Provider value={context}>
      {/* NOTE: The fields won't unmount without a container with a key-parameter 
      (or key in each field), so without the changing container, 
      the fields values won't be refreshed when the language is changed. */}
      <div key={uniqueKeyForLanguageContainer}>{children}</div>
    </TranslatableContext.Provider>
  );
}
