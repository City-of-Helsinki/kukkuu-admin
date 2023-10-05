import { TranslationMessages } from 'ra-core';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import fiMessages from 'ra-language-finnish';
import svMessages from 'ra-language-swedish';
import enMessages from 'ra-language-english';

import fiDomainMessages from './fi.json';
import svDomainMessages from './sv.json';
import enDomainMessages from './en.json';

// By default the delete confirmation modal title contains the ID of the
// resource that is being deleted. As a quick fix we are replacing the
// translation string with a more simple one.
function hideIdFromDeleteConfirmation(domainMessages: any, raMessages: any) {
  return {
    ...raMessages,
    ...domainMessages,
    ra: {
      ...raMessages.ra,
      message: {
        ...raMessages.ra.message,
        delete_title: domainMessages.ra.message.delete_title,
      },
    },
  };
}

const allMessages: { [index: string]: TranslationMessages } = {
  fi: hideIdFromDeleteConfirmation(fiDomainMessages, fiMessages),
  sv: hideIdFromDeleteConfirmation(svDomainMessages, svMessages),
  en: hideIdFromDeleteConfirmation(enDomainMessages, enMessages),
};

const i18nProvider = polyglotI18nProvider(
  (locale: string) => allMessages[locale],
  'fi'
);

export default i18nProvider;
