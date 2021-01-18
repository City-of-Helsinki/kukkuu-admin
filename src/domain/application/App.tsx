import React from 'react';
import { Admin, Resource, useTranslate } from 'react-admin';
import { createBrowserHistory as createHistory } from 'history';
import PlaceIcon from '@material-ui/icons/Place';
import EventIcon from '@material-ui/icons/Event';
import MessageIcon from '@material-ui/icons/EmailOutlined';
import ChildCareIcon from '@material-ui/icons/ChildCare';

import i18nProvider from '../../common/translation/i18nProvider';
import theme from '../../common/materialUI/themeConfig';
import AppRoutes from '../../routes';
import Dashboard from '../dashboard/Dashboard';
import dataProvider from '../../api/dataProvider';
import authProvider from '../authentication/authProvider';
import LoginPage from '../authentication/LoginPage';
import VenuesResource from '../venues/VenuesResource';
import EventResource from '../events/EventsResource';
import OccurrencesResource from '../occurrences/OccurrencesResource';
import ChildResource from '../children/ChildResource';
import MessageResource from '../messages/MessagesResource';
import EventGroupsResource from '../eventGroups/EventGroupsResource';
import EventsAndEventGroupsResource from '../eventsAndEventGroups/EventsAndEventGroupsResource';
import KukkuuLayout from './layout/kukkuuAppLayout/KukkuuAppLayout';

export const history = createHistory();

const App = () => {
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
      // react-admin does not export types for LoginPage yet, so the
      // prop type is incorrect
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      loginPage={LoginPage}
      customRoutes={AppRoutes}
    >
      <Resource
        name="events-and-event-groups"
        options={{ label: translate('events.list.title') }}
        list={EventsAndEventGroupsResource.List}
      />
      <Resource
        name="events"
        icon={EventIcon}
        show={EventResource.Detail}
        create={EventResource.Create}
        edit={EventResource.Edit}
      />
      <Resource
        name="venues"
        options={{ label: translate('venues.list.title') }}
        icon={PlaceIcon}
        list={VenuesResource.List}
        show={VenuesResource.Detail}
        create={VenuesResource.Create}
        edit={VenuesResource.Edit}
      />
      <Resource
        name="children"
        options={{ label: 'children.list.title' }}
        icon={ChildCareIcon}
        list={ChildResource.List}
        show={ChildResource.Detail}
      />
      <Resource
        name="occurrences"
        create={OccurrencesResource.Create}
        show={OccurrencesResource.Detail}
        edit={OccurrencesResource.Edit}
      />
      <Resource
        name="messages"
        options={{ label: translate('messages.list.title') }}
        icon={MessageIcon}
        list={MessageResource.List}
        show={MessageResource.Detail}
        create={MessageResource.Create}
        edit={MessageResource.Edit}
      />
      <Resource
        name="event-groups"
        show={EventGroupsResource.Detail}
        create={EventGroupsResource.Create}
        edit={EventGroupsResource.Edit}
      />
    </Admin>
  );
};

export default App;
