import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  useTranslate,
  useLocale,
} from 'react-admin';

import { getTranslatedField } from '../../../common/translation/TranslationUtils';

const EventList = (props: any) => {
  const translate = useTranslate();
  const currentLocale = useLocale();

  return (
    <List title={translate('events.list.title')} {...props}>
      <Datagrid rowClick="show">
        <TextField source="id" label={translate('events.fields.id.label')} />

        <TextField
          source={getTranslatedField('name', currentLocale)}
          label={translate('events.fields.name.label')}
        />

        <TextField
          source="participantsPerInvite"
          label={translate('events.fields.participantsPerInvite.label')}
        />
        <TextField
          source="duration"
          label={translate('events.fields.duration.label')}
        />
      </Datagrid>
    </List>
  );
};

export default EventList;
