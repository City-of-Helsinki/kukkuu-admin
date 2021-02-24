import React from 'react';
import { useTranslate } from 'react-admin';

import IsTestEnvironmentLabel from '../isTestEnvironmentLabel/IsTestEnvironmentLabel';

const AppTitle = () => {
  const translate = useTranslate();

  return (
    <>
      {translate('dashboard.title')}
      <IsTestEnvironmentLabel />
    </>
  );
};

export default AppTitle;
