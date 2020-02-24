import React from 'react';
import { List, Datagrid, TextField, useTranslate } from 'react-admin';

const EventList = (props: any) => {
  const translate = useTranslate();
  return (
    <List title={translate('events.list.title')} {...props}>
      <Datagrid rowClick="show">
        <TextField
          source="translations.FI.id"
          label={translate('events.fields.participantsPerInvite.label')}
        />
        <TextField
          source="translations.FI.participants"
          label={translate('events.fields.participantsPerInvite.label')}
        />
        <TextField
          source="translations.FI.duration"
          label={translate('venues.fields.duration.label')}
        />
      </Datagrid>
    </List>
  );
};

export default EventList;
