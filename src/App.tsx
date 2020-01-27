import React from 'react';
import { Admin } from 'react-admin';
import fakeDataProvider from 'ra-data-fakerest';

import i18nProvider from './i18n/i18nProvider';

const App: React.FC = () => (
  <Admin dataProvider={fakeDataProvider({})} i18nProvider={i18nProvider} />
);

export default App;
