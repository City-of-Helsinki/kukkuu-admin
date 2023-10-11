import React from 'react';

import KukkuuEditPage from '../../application/layout/kukkuuEditPage/KukkuuEditPage';
import EventGroupForm from '../form/EventGroupForm';

const EventGroupsEdit = () => {
  return (
    <KukkuuEditPage
      pageTitleSource="name"
      reactAdminProps={{ redirect: '/events-and-event-groups' }}
    >
      <EventGroupForm />
    </KukkuuEditPage>
  );
};

export default EventGroupsEdit;
