import React from 'react';
import { useTranslate } from 'react-admin';

import KukkuuCreatePage from '../../application/layout/kukkuuCreatePage/KukkuuCreatePage';
import KukkuuCreateToolbar from '../../application/layout/kukkuuCreatePage/KukkuuCreateToolbar';
import EventGroupForm from '../form/EventGroupForm';

const EventGroupsCreate = () => {
  const t = useTranslate();

  return (
    <KukkuuCreatePage
      pageTitle={t('eventGroups.create.title.label')}
      reactAdminProps={{ redirect: 'show' }}
    >
      <EventGroupForm toolbar={<KukkuuCreateToolbar />} />
    </KukkuuCreatePage>
  );
};

export default EventGroupsCreate;
