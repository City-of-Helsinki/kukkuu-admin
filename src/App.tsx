import React from 'react';
import { Admin, Resource, useTranslate } from 'react-admin';
import fakeDataProvider from 'ra-data-fakerest'; // TODO replace with an actual API data provider
import PlaceIcon from '@material-ui/icons/Place';

import i18nProvider from './i18n/i18nProvider';
import Dashboard from './Dashboard/Dashboard';
import VenueList from './venues/VenueList';
import theme from './theme';
import mockData from './mock_data';

const App: React.FC = () => {
  const translate = useTranslate();
  return (
    <Admin
      dataProvider={fakeDataProvider(mockData)}
      i18nProvider={i18nProvider}
      theme={theme}
      dashboard={Dashboard}
    >
      <Resource
        name="venues"
        options={{ label: translate('venues.list.title') }}
        icon={PlaceIcon}
        list={VenueList}
      />
    </Admin>
  );
};

export default App;
