import React from 'react';
import { useTranslate } from 'react-admin';
const AppTitle = () => {
  const translate = useTranslate();
  return <>{translate('dashboard.title')}</>;
};

export default AppTitle;
