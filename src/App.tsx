import React from 'react';
import { Admin } from 'react-admin';
import fakeDataProvider from 'ra-data-fakerest';

import i18nProvider from './i18n/i18nProvider';
import Dashboard from './Dashboard/Dashboard';
import theme from './theme';

const App: React.FC = () => (
  <Admin
    dataProvider={fakeDataProvider({})}
    i18nProvider={i18nProvider}
    theme={theme}
    dashboard={Dashboard}
  />
);

export default App;
