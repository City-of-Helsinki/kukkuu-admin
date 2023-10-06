import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTranslate } from 'react-admin';

import { Language } from '../../../api/generatedTypes/globalTypes';
import styles from './languageTabs.module.css';

/**
 * Use as a wrapper for translatable content view
 * as render props, (please forgive me, HOC is worse).
 *
 * Example usage:
 * 1. Create local state using useState hook or component state
 * 2. import <LanguageTabs>, pass the required props, remember to use language enum.
 * 3. Basically render language tab and trigger onChange props that passed in
 * Gonna save a bit of boilterplate code.
 * Unfortunately HOC can not be done cause React-admin only pass props down to 1 level deep of children.
 *
 */
const LanguageTabs: React.FunctionComponent<{
  selectedLanguage: Language;
  onSelect: (value: Language) => void;
}> = ({ selectedLanguage, onSelect }) => {
  const translate = useTranslate();

  return (
    <Tabs
      indicatorColor="secondary"
      value={selectedLanguage}
      onChange={(e, value) => onSelect(value)}
      className={styles.languageTabs}
    >
      <Tab value={Language.FI} label={translate('languages.FI')} />
      <Tab value={Language.SV} label={translate('languages.SV')} />
      <Tab value={Language.EN} label={translate('languages.EN')} />
    </Tabs>
  );
};

export default LanguageTabs;
