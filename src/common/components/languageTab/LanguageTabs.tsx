import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTranslate } from 'react-admin';

import { CONTENT_LANGUAGES } from '../../constants';

/**
 * Use as a wrapper for translatable content view
 * as render props, (please forgive me, HOC is worse).
 *
 * Example:
 * <LanguageTabs>
 *    {(selectedLanguage: string) =>
 *      <FooBar selectedLanguage={selectedLanguage} />}
 * </LanguageTabs>
 *
 */
const LanguageTabs: React.FunctionComponent<{
  children: (selectedLocale: string) => React.ReactNode;
}> = ({ children }) => {
  const [selectedLocale, selectLocale] = React.useState(CONTENT_LANGUAGES[0]);
  const translate = useTranslate();

  return (
    <>
      <Tabs value={selectedLocale} onChange={(e, value) => selectLocale(value)}>
        {CONTENT_LANGUAGES.map((language, index) => (
          <Tab
            key={index}
            value={language}
            label={translate(`languageTabs.tab.${language}.label`)}
          />
        ))}
      </Tabs>

      <>{children(selectedLocale)}</>
    </>
  );
};

export default LanguageTabs;
