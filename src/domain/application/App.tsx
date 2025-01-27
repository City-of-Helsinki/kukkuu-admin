import React from 'react';
import type { ResourceProps } from 'react-admin';
import {
  type DataProvider,
  AdminContext,
  AdminUI,
  CustomRoutes,
  Loading,
  Resource,
  usePermissions,
} from 'react-admin';
import PlaceIcon from '@mui/icons-material/Place';
import EventIcon from '@mui/icons-material/Event';
import MessageIcon from '@mui/icons-material/EmailOutlined';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { Navigate, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import type { Permissions } from '../authentication/authProvider';
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
import projectService from '../projects/projectService';

const App = () => {
  return (
    <BrowserRouter>
      <AdminContext
        dataProvider={dataProvider as DataProvider}
        i18nProvider={i18nProvider}
        theme={theme}
        dashboard={Dashboard}
        authProvider={authProvider}
      >
        <AsyncResources />
      </AdminContext>
    </BrowserRouter>
  );
};

function AsyncResources() {
  const projectId = projectService.projectId ?? undefined;
  const { permissions } = usePermissions<Permissions>();
  const [resources, setResources] = React.useState<ResourceProps[]>(
    getReactAdminResources(projectId, permissions)
  );
  React.useEffect(() => {
    setResources(getReactAdminResources(projectId, permissions));
  }, [permissions?.role, projectId]);

  return (
    <AdminUI ready={Loading} layout={KukkuuLayout} loginPage={LoginPage}>
      <CustomRoutes noLayout>
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route
          path="/check-ticket-validity/:cryptographicallySignedCode"
          element={<TicketValidationPage />}
        />
        <Route
          path="/event-groups"
          element={<Navigate to="/events-and-event-groups" />}
        />
        <Route
          path="/events"
          element={<Navigate to="/events-and-event-groups" />}
        />
      </CustomRoutes>
      {resources.map((resource: ResourceProps) => (
        <Resource key={resource.name} {...resource} />
      ))}
    </AdminUI>
  );
}

function getReactAdminResources(
  projectId?: string,
  permissions?: Permissions
): ResourceProps[] {
  const resources = [
    {
      name: 'events-and-event-groups',
      options: { label: 'events.list.title' },
      list: EventsAndEventGroupsResource.List,
    },
    {
      name: 'events',
      icon: EventIcon,
      show: EventResource.Detail,
      create: EventResource.Create,
      edit: EventResource.Edit,
    },
    {
      name: 'venues',
      options: { label: 'venues.list.title' },
      icon: PlaceIcon,
      list: VenuesResource.List,
      show: VenuesResource.Detail,
      create: VenuesResource.Create,
      edit: VenuesResource.Edit,
    },
    {
      name: 'occurrences',
      create: OccurrencesResource.Create,
      show: OccurrencesResource.Detail,
      edit: OccurrencesResource.Edit,
    },
    {
      name: 'messages',
      options: { label: 'messages.list.title' },
      icon: MessageIcon,
      list: MessageResource.List,
      show: MessageResource.Detail,
      create: MessageResource.Create,
      edit: MessageResource.Edit,
    },
    {
      name: 'event-groups',
      show: EventGroupsResource.Detail,
      create: EventGroupsResource.Create,
      edit: EventGroupsResource.Edit,
    },
  ];

  // Add children resource if user has permissions to view families
  if (permissions?.canViewFamiliesWithinProject(projectId)) {
    resources.splice(3, 0, {
      name: 'children',
      options: { label: 'children.list.title' },
      icon: ChildCareIcon,
      list: ChildResource.List,
      show: ChildResource.Detail,
      // Use `any` to avoid type error for edit and create,
      // which should allow undefined, but for some reason does not.
      // eslint-disable-line @typescript-eslint/no-explicit-any
    } as any);
  }
  return resources;
}

export default App;
