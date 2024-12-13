import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTranslate } from 'react-admin';

import styles from './languageTabs.module.css';
import useTranslatableContext from '../../hooks/useTranslatableContext';

const LanguageTabs: React.FunctionComponent = () => {
  const translate = useTranslate();
  const { languages, selectLanguage, selectedLanguage } =
    useTranslatableContext();

  return (
    <Tabs
      indicatorColor="secondary"
      value={selectedLanguage}
      onChange={(e, value) => {
        selectLanguage(value);
      }}
      className={styles.languageTabs}
    >
      {languages.map((lang) => (
        <Tab
          key={`language-tab-${lang}`}
          value={lang}
          label={translate(`languages.${lang}`)}
        />
      ))}
    </Tabs>
  );
};

export default LanguageTabs;
