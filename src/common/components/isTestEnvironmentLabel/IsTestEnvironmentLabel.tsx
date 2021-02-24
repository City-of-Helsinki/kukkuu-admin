import React from 'react';
import { useTranslate } from 'react-admin';

import Config from '../../../domain/config';
import styles from './isTestEnvironmentLabel.module.css';

const IsTestEnvironmentLabel = () => {
  const translate = useTranslate();

  const isTestEnvironment = Config.IS_TEST_ENVIRONMENT;
  const testEnvironmentString = ` ${translate('application.test')}`;

  return isTestEnvironment ? (
    <span className={styles.uppercase}>{testEnvironmentString}</span>
  ) : null;
};

export default IsTestEnvironmentLabel;
