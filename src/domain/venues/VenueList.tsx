import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  useTranslate,
  useLocale,
} from 'react-admin';
import { CardHeader } from '@material-ui/core';

import { getTranslatedField } from '../../common/translation/TranslationUtils';
import Aside from '../../common/components/aside/Aside';
import AppTitle from '../../common/components/AppTitle';

const VenueList = (props: any) => {
  const translate = useTranslate();
  const locale = useLocale();
  return (
    <>
      <CardHeader title={translate('venues.list.title')} />
      <List
        bulkActionButtons={false}
        aside={<Aside content="venues.list.aside.content" />}
        title={<AppTitle />}
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
    </>
  );
};

export default VenueList;
