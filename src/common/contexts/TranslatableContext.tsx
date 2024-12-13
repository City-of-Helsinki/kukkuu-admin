import React from 'react';

import { CONTENT_LANGUAGES } from '../constants';
import LanguageTabs from '../components/languageTab/LanguageTabs';
import { Language } from '../../domain/api/generatedTypes/graphql';

export type TranslatableContextType = {
  defaultLanguage: Language;
  languages: Language[];
  selectedLanguage: Language;
  selectLanguage: React.Dispatch<React.SetStateAction<Language>>;
  getSource: (fieldName: string) => string;
  selector: React.ReactElement;
};

export const initialContext = {
  defaultLanguage: Language.Fi,
  languages: CONTENT_LANGUAGES,
  getSource: (fieldName: string) => fieldName,
  selectedLanguage: Language.Fi,
  selectLanguage: function (value: React.SetStateAction<Language>): void {
    throw new Error('Function not implemented.');
  },
  selector: <LanguageTabs />,
};

const TranslatableContext =
  React.createContext<TranslatableContextType>(initialContext);

export default TranslatableContext;
