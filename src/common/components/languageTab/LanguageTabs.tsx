import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTranslatableContext, useTranslate } from 'react-admin';

import styles from './languageTabs.module.css';

const LanguageTabs: React.FunctionComponent = () => {
  const translate = useTranslate();

  const { locales, selectLocale, selectedLocale } = useTranslatableContext();

  return (
    <Tabs
      indicatorColor="secondary"
      value={selectedLocale}
      onChange={(e, value) => selectLocale(value)}
      className={styles.languageTabs}
    >
      {locales.map((lang) => (
        <Tab value={lang} label={translate(`languages.${lang}`)} />
      ))}
    </Tabs>
  );
};

export default LanguageTabs;
