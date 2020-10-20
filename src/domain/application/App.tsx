import React from 'react';
import { Admin, Resource, useTranslate } from 'react-admin';
import PlaceIcon from '@material-ui/icons/Place';
import EventIcon from '@material-ui/icons/Event';
import MessageIcon from '@material-ui/icons/EmailOutlined';
import { createBrowserHistory as createHistory } from 'history';
import ChildCareIcon from '@material-ui/icons/ChildCare';

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
import OccurrenceCreate from '../occurrences/OccurrenceCreate';
import ChildList from '../children/ChildList';
import OccurrenceShow from '../occurrences/OccurrenceShow';
import OccurrenceEdit from '../occurrences/OccurrenceEdit';
import ChildShow from '../children/ChildShow';
import KukkuuLayout from '../../common/components/layout/KukkuuLayout';
import MessagesList from '../messages/list/MessagesList';
import MessagesDetail from '../messages/detail/MessagesDetail';
import MessagesEdit from '../messages/edit/MessagesEdit';
import MessagesCreate from '../messages/create/MessagesCreate';

const history = createHistory();

const App: React.FC = () => {
  const translate = useTranslate();
  return (
    <Admin
      layout={KukkuuLayout}
      // FIXME: In version 3.9.0 typescript support was added into
      // react-admin and our implementation of dataProvider is not type
      // compatible.
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
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
        name="events"
        options={{ label: translate('events.list.title') }}
        icon={EventIcon}
        list={EventList}
        show={EventShow}
        create={EventCreate}
        edit={EventEdit}
      />
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
        name="children"
        options={{ label: 'children.list.title' }}
        icon={ChildCareIcon}
        list={ChildList}
        show={ChildShow}
      />
      <Resource
        name="occurrences"
        create={OccurrenceCreate}
        show={OccurrenceShow}
        edit={OccurrenceEdit}
      />
      <Resource
        name="messages"
        options={{ label: translate('messages.list.title') }}
        icon={MessageIcon}
        list={MessagesList}
        show={MessagesDetail}
        create={MessagesCreate}
        edit={MessagesEdit}
      />
    </Admin>
  );
};

export default App;
