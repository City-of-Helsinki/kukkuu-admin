import { useLocale } from 'react-admin';

import { Language } from '../../api/generatedTypes/globalTypes';

function useLanguage() {
  const locale = useLocale();

  return Object.values(Language).find(
    (language) => language === locale.toUpperCase()
  );
}

export default useLanguage;
