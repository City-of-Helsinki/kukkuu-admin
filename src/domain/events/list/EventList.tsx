import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  useTranslate,
  useLocale,
  NumberField,
} from 'react-admin';

import { getTranslatedField } from '../../../common/translation/TranslationUtils';

const EventList = (props: any) => {
  const translate = useTranslate();
  const currentLocale = useLocale();

  return (
    <List title={translate('events.list.title')} {...props}>
      <Datagrid rowClick="show">
        <TextField
          source={getTranslatedField('name', currentLocale)}
          label={translate('events.fields.name.label')}
        />

        <TextField
          source="participantsPerInvite"
          label={translate('events.fields.participantsPerInvite.label')}
        />
        <NumberField
          source="duration"
          label={translate('events.fields.duration.label')}
        />
        <NumberField
          source="capacityPerOccurrence"
          label={translate('events.fields.capacityPerOccurrence.label')}
        />
        <NumberField
          source="occurrences.edges.length"
          label={translate('events.fields.occurrences.label')}
        />
      </Datagrid>
    </List>
  );
};

export default EventList;
