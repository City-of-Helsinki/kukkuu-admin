import React from 'react';
import { useTranslate } from 'react-admin';

import KukkuuCreatePage from '../../application/layout/kukkuuCreatePage/KukkuuCreatePage';
import KukkuuCreateToolbar from '../../application/layout/kukkuuCreatePage/KukkuuCreateToolbar';
import EventGroupForm from '../form/EventGroupForm';
import TranslatableProvider from '../../../common/providers/TranslatableProvider';

const EventGroupsCreate = () => {
  const t = useTranslate();

  return (
    <KukkuuCreatePage
      pageTitle={t('eventGroups.create.title.label')}
      reactAdminProps={{ redirect: 'show' }}
    >
      <TranslatableProvider>
        <EventGroupForm toolbar={<KukkuuCreateToolbar />} />
      </TranslatableProvider>
    </KukkuuCreatePage>
  );
};

export default EventGroupsCreate;
