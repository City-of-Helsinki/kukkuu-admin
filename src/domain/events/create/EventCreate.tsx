import React from 'react';
import { useTranslate } from 'react-admin';
import { useLocation } from 'react-router-dom';
import type { FieldValues } from 'react-hook-form';

import Aside from '../../../common/components/aside/Aside';
import KukkuuCreatePage from '../../application/layout/kukkuuCreatePage/KukkuuCreatePage';
import EventForm from '../eventForm/EventForm';
import {
  createTranslationObject,
  getNormalizedValues,
} from '../../../common/utils';
import { FormFieldValueNormalizer } from '../../../common/types';

const EventCreate = () => {
  const { search } = useLocation();
  const eventGroupId = new URLSearchParams(search).get('eventGroupId');
  const translate = useTranslate();

  const transform = (data: any) => {
    const fieldNormalizerMap = createTranslationObject({
      translatableFields: [
        'imageAltText',
        'name',
        'shortDescription',
        'description',
      ],
      translationsKeyName: 'translations',
      value: [[null], ''],
      flattenedWithDotNotation: true,
    }) as FormFieldValueNormalizer<FieldValues>;
    return {
      ...getNormalizedValues({
        fieldNormalizerMap,
        formValues: data,
        initialValues: data,
      }),
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
