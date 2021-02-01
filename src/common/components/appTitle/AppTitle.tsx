import React from 'react';
import { useTranslate } from 'react-admin';

import Config from '../../../domain/config';
import styles from './appTitle.module.css';

const AppTitle = () => {
  const translate = useTranslate();

  const isTestEnvironment = Config.IS_TEST_ENVIRONMENT;
  const testEnvironmentString = ` ${translate('application.test')}`;

  return (
    <>
      {translate('dashboard.title')}
      {isTestEnvironment && (
        <span className={styles.uppercase}>{testEnvironmentString}</span>
      )}
    </>
  );
};

export default AppTitle;
