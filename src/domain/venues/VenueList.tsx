import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  useTranslate,
  useLocale,
} from 'react-admin';

import { getTranslatedField } from '../../common/translation/TranslationUtils';

const VenueList = (props: any) => {
  const translate = useTranslate();
  const locale = useLocale();
  return (
    <List title={translate('venues.list.title')} {...props}>
      <Datagrid rowClick="show">
        <TextField
          source={getTranslatedField('name', locale)}
          label={translate('venues.fields.name.label')}
        />
        <TextField
          source="translations.FI.address"
          label={translate('venues.fields.address.label')}
        />
      </Datagrid>
    </List>
  );
};

export default VenueList;
