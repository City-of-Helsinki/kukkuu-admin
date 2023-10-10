import React, { ReactElement } from 'react';

import { Language } from '../../api/generatedTypes/globalTypes';
import useTranslatableContext from './useTranslatableContext';
import LanguageTabs from '../components/languageTab/LanguageTabs';

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

  const { selectedLanguage, selectLanguage, getSource } =
    useTranslatableContext();

  const component = enabled ? <LanguageTabs /> : null;

  return [component, getSource, selectedLanguage, selectLanguage];
}

export default useLanguageTabs;
