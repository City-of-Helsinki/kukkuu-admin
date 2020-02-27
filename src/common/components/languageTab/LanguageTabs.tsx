import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTranslate } from 'react-admin';

import { EventTranslationLanguageCode as LanguageEnum } from '../../../api/generatedTypes/globalTypes';
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
  selectedLanguage: LanguageEnum;
  onSelect: (value: LanguageEnum) => void;
}> = ({ selectedLanguage, onSelect }) => {
  const translate = useTranslate();

  return (
    <>
      <Tabs value={selectedLanguage} onChange={(e, value) => onSelect(value)}>
        <Tab
          value={LanguageEnum.EN}
          label={translate(`languageTabs.tab.EN.label`)}
        />
        <Tab
          value={LanguageEnum.FI}
          label={translate(`languageTabs.tab.FI.label`)}
        />
        <Tab
          value={LanguageEnum.SV}
          label={translate(`languageTabs.tab.SV.label`)}
        />
      </Tabs>
    </>
  );
};

export default LanguageTabs;
