import React from 'react';
import {
  Admin,
  CustomRoutes,
  DataProvider,
  Resource,
  useTranslate,
} from 'react-admin';
import PlaceIcon from '@mui/icons-material/Place';
import EventIcon from '@mui/icons-material/Event';
import MessageIcon from '@mui/icons-material/EmailOutlined';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { Navigate, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient } from 'react-query';

import i18nProvider from '../../common/translation/i18nProvider';
import theme from '../../common/materialUI/themeConfig';
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
import CallbackPage from '../authentication/CallbackPage';
import UnauthorizedPage from '../authentication/UnauthorizedPage';
import TicketValidationPage from '../ticketValidation/TicketValidationPage';

const App = () => {
  const translate = useTranslate();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  });

  return (
    <BrowserRouter>
      <Admin
        layout={KukkuuLayout}
        dataProvider={dataProvider as DataProvider}
        queryClient={queryClient}
        i18nProvider={i18nProvider}
        theme={theme}
        dashboard={Dashboard}
        authProvider={authProvider}
        loginPage={LoginPage}
      >
        <CustomRoutes noLayout>
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route
            path="/check-ticket-validity/:cryptographicallySignedCode"
            element={<TicketValidationPage />}
          />
          <Route
            path="/events-groups"
            element={<Navigate to="/events-and-event-groups" />}
          />
          <Route
            path="/events"
            element={<Navigate to="/events-and-event-groups" />}
          />
        </CustomRoutes>
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
    </BrowserRouter>
  );
};

export default App;
