import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  useTranslate,
  useLocale,
} from 'react-admin';

import { getTranslatedField } from '../../common/translation/TranslationUtils';
import Aside from '../../common/components/aside/Aside';

const VenueList = (props: any) => {
  const translate = useTranslate();
  const locale = useLocale();
  return (
    <List
      title="venues.list.title"
      bulkActionButtons={false}
      aside={<Aside content="venues.list.aside.content" />}
      {...props}
    >
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
