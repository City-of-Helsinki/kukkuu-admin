import React from 'react';
import { useTranslate } from 'react-admin';
import { CardHeader, Grid } from '@mui/material';
import type { FieldValues } from 'react-hook-form';

import KukkuuEdit from '../../application/layout/kukkuuEditPage/KukkuuEdit';
import ViewTitle from '../../../common/components/viewTitle/ViewTitle';
import EventForm from '../eventForm/EventForm';
import {
  createTranslationObject,
  getNormalizedValues,
} from '../../../common/utils';
import { FormFieldValueNormalizer } from '../../../common/types';

const EventEdit = () => {
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
    return getNormalizedValues({
      fieldNormalizerMap,
      formValues: data,
      initialValues: data,
    });
  };

  // Undoable / mutationMode is false to prevent image from appearing while waiting for backend result.
  return (
    <>
      <CardHeader title={translate('events.edit.title')} />
      <Grid container direction="column" item>
        <KukkuuEdit
          mutationMode={'pessimistic'}
          title={'events.edit.title'}
          redirect="show"
          transform={transform}
        >
          <ViewTitle />
          <EventForm view="edit" />
        </KukkuuEdit>
      </Grid>
    </>
  );
};

export default EventEdit;
