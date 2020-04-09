/* tslint:disable */
import React from 'react';
import { Admin, Resource, useTranslate } from 'react-admin';
import PlaceIcon from '@material-ui/icons/Place';
import { createBrowserHistory as createHistory } from 'history';

import i18nProvider from '../../common/translation/i18nProvider';
import Dashboard from '../dashboard/Dashboard';
import theme from '../../common/materialUI/themeConfig';
import authProvider from '../authentication/authProvider';
import AppRoutes from '../../routes';
import LoginPage from '../authentication/components/LoginPage';
import dataProvider from '../../api/dataProvider';
import VenueList from '../venues/VenueList';
import VenueShow from '../venues/VenueShow';
import EventList from '../events/list/EventList';
import EventShow from '../events/detail/EventShow';
import VenueEdit from '../venues/VenueEdit';
import VenueCreate from '../venues/VenueCreate';
import EventCreate from '../events/create/EventCreate';
import EventEdit from '../events/edit/EventEdit';

const history = createHistory();

const App: React.FC = () => {
  const translate = useTranslate();
  return (
    <Admin
      dataProvider={dataProvider}
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
        show={VenueShow}
        create={VenueCreate}
        edit={VenueEdit}
      />
      <Resource
        name="events"
        options={{ label: translate('events.list.title') }}
        icon={PlaceIcon}
        list={EventList}
        show={EventShow}
        create={EventCreate}
        edit={EventEdit}
      />
    </Admin>
  );
};

export default App;
