import React from 'react';
import { ResourceComponentProps } from 'react-admin';

import KukkuuEditPage from '../../application/layout/kukkuuEditPage/KukkuuEditPage';
import EventGroupForm from '../form/EventGroupForm';

const EventGroupsEdit = (props: ResourceComponentProps) => {
  return (
    <KukkuuEditPage pageTitleSource="name" reactAdminProps={props}>
      <EventGroupForm
        redirect="/events-and-event-groups"
        sanitizeEmptyValues={false}
      />
    </KukkuuEditPage>
  );
};

export default EventGroupsEdit;
