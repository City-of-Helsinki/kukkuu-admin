import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTranslate } from 'react-admin';

import { CONTENT_LANGUAGES } from '../../constants';
const useStyles = makeStyles({
  tabsWrapper: {
    fontWeight: 'bold',
  },
  tabs: {},
  tabContent: {},
});

const LanguageTabs: React.FunctionComponent<{
  children: (selectedLocale: string) => React.ReactNode;
}> = ({ children }) => {
  const [selectedLocale, selectLocale] = React.useState(CONTENT_LANGUAGES[0]);
  const styles = useStyles();
  const translate = useTranslate();

  return (
    <div className={styles.tabsWrapper}>
      <div className={styles.tabs}>
        <Tabs
          value={selectedLocale}
          onChange={(e, value) => selectLocale(value)}
        >
          {CONTENT_LANGUAGES.map((language, index) => (
            <Tab
              key={index}
              value={language}
              label={translate(`languageTabs.tab.${language}.label`)}
            />
          ))}
        </Tabs>

        <div className={styles.tabContent}>{children(selectedLocale)}</div>
      </div>
    </div>
  );
};

export default LanguageTabs;
