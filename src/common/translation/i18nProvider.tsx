import { TranslationMessages } from 'ra-core';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import fiMessages from 'ra-language-finnish';
import svMessages from 'ra-language-swedish';
import enMessages from 'ra-language-english';

import fiDomainMessages from './fi.json';
import svDomainMessages from './sv.json';
import enDomainMessages from './en.json';

const allMessages: { [index: string]: TranslationMessages } = {
  fi: { ...fiMessages, ...fiDomainMessages },
  sv: { ...svMessages, ...svDomainMessages },
  en: { ...enMessages, ...enDomainMessages },
};

const i18nProvider = polyglotI18nProvider(
  (locale: string) => allMessages[locale],
  'fi'
);

export default i18nProvider;
