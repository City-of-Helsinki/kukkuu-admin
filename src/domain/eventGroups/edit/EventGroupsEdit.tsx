import React from 'react';

import KukkuuEditPage from '../../application/layout/kukkuuEditPage/KukkuuEditPage';
import EventGroupForm from '../form/EventGroupForm';
import TranslatableProvider from '../../../common/providers/TranslatableProvider';

const EventGroupsEdit = () => {
  return (
    <KukkuuEditPage
      pageTitleSource="name"
      reactAdminProps={{ redirect: '/events-and-event-groups' }}
    >
      <TranslatableProvider>
        <EventGroupForm />
      </TranslatableProvider>
    </KukkuuEditPage>
  );
};

export default EventGroupsEdit;
