import React from 'react';
import { ReactAdminComponentProps, useTranslate } from 'react-admin';

import KukkuuCreatePage from '../../application/layout/kukkuuCreatePage/KukkuuCreatePage';
import KukkuuCreateToolbar from '../../application/layout/kukkuuCreatePage/KukkuuCreateToolbar';
import EventGroupForm from '../form/EventGroupForm';

const EventGroupsCreate = (props: ReactAdminComponentProps) => {
  const t = useTranslate();

  return (
    <KukkuuCreatePage
      pageTitle={t('eventGroups.create.title.label')}
      reactAdminProps={props}
    >
      <EventGroupForm
        toolbar={<KukkuuCreateToolbar />}
        redirect="/events-and-event-groups"
      />
    </KukkuuCreatePage>
  );
};

export default EventGroupsCreate;
