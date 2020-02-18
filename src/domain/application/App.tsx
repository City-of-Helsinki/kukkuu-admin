import React from 'react';
import { Admin, Resource, useTranslate } from 'react-admin';
import fakeDataProvider from 'ra-data-fakerest'; // TODO replace with an actual API data provider
import PlaceIcon from '@material-ui/icons/Place';
import { createBrowserHistory as createHistory } from 'history';

import i18nProvider from '../../common/translation/i18nProvider';
import Dashboard from '../dashboard/Dashboard';
import VenueList from '../venues/VenueList';
import theme from '../../common/materialUI/themeConfig';
import mockData from '../../__MOCKS__/mock_data';
import authProvider from '../authentication/authProvider';
import AppRoutes from '../../routes';
import LoginPage from '../authentication/components/LoginPage';

const history = createHistory();

const App: React.FC = () => {
  const translate = useTranslate();
  return (
    <Admin
      dataProvider={fakeDataProvider(mockData)}
      i18nProvider={i18nProvider}
      theme={theme}
      dashboard={Dashboard}
      history={history}
      authProvider={authProvider}
      loginPage={LoginPage}
      customRoutes={AppRoutes}
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
