import React, { ReactElement } from 'react';

import { Language } from '../../api/generatedTypes/globalTypes';
import { CONTENT_LANGUAGES } from '../constants';
import LanguageTabs from '../components/languageTab/LanguageTabs';

export type TranslatableContextType = {
  defaultLanguage: Language;
  languages: Language[];
  selectedLanguage: Language;
  selectLanguage: React.Dispatch<React.SetStateAction<Language>>;
  getSource: (fieldName: string) => string;
  selector: ReactElement;
};

export const initialContext = {
  defaultLanguage: Language.FI,
  languages: CONTENT_LANGUAGES,
  getSource: (fieldName: string) => fieldName,
  selectedLanguage: Language.FI,
  selectLanguage: function (value: React.SetStateAction<Language>): void {
    throw new Error('Function not implemented.');
  },
  selector: <LanguageTabs />,
};

const TranslatableContext =
  React.createContext<TranslatableContextType>(initialContext);

export default TranslatableContext;
