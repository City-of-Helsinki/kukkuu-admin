import { useCallback } from 'react';

import useLanguage from './useLanguage';

function useTranslationDataKey() {
  const language = useLanguage();

  return useCallback(
    (field: string) => {
      return `translations.${language}.${field}`;
    },
    [language]
  );
}

export default useTranslationDataKey;
