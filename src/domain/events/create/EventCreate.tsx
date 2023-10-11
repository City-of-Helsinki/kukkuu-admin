import React from 'react';
import { useTranslate } from 'react-admin';
import { useLocation } from 'react-router-dom';

import Aside from '../../../common/components/aside/Aside';
import KukkuuCreatePage from '../../application/layout/kukkuuCreatePage/KukkuuCreatePage';
import EventForm from '../eventForm/EventForm';

const EventCreate = () => {
  const { search } = useLocation();
  const eventGroupId = new URLSearchParams(search).get('eventGroupId');
  const translate = useTranslate();

  const transform = (data: any) => {
    return {
      ...data,
      eventGroupId,
    };
  };
  const isAddingEventToEventGroup = Boolean(eventGroupId);
  const redirect = isAddingEventToEventGroup
    ? `/event-groups/${eventGroupId}/show`
    : 'show';
  return (
    <KukkuuCreatePage
      pageTitle={translate('events.create.title')}
      reactAdminProps={{
        aside: <Aside content="events.create.aside.content" />,
        transform,
        redirect,
      }}
    >
      <EventForm view="create" />
    </KukkuuCreatePage>
  );
};

export default EventCreate;
