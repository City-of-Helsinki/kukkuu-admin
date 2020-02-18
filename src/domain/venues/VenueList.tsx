import React from 'react';
import { List, Datagrid, TextField, useTranslate } from 'react-admin';

const VenueList = (props: any) => {
  const translate = useTranslate();
  return (
    <List title={translate('venues.list.title')} {...props}>
      <Datagrid rowClick="show">
        <TextField
          source="name"
          label={translate('venues.fields.name.label')}
        />
        <TextField
          source="address"
          label={translate('venues.fields.address.label')}
        />
      </Datagrid>
    </List>
  );
};

export default VenueList;
