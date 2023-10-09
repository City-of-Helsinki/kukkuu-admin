import React from 'react';
import { Datagrid, TextField, useTranslate, useLocaleState } from 'react-admin';
import { CardHeader } from '@mui/material';

import { getTranslatedField } from '../../common/translation/TranslationUtils';
import Aside from '../../common/components/aside/Aside';
import KukkuuList from '../application/layout/kukkuuListPage/KukkuuList';

const VenueList = (props: any) => {
  const translate = useTranslate();
  const [locale] = useLocaleState();

  return (
    <>
      <CardHeader title={translate('venues.list.title')} />
      <KukkuuList
        pagination={false}
        exporter={false}
        aside={<Aside content="venues.list.aside.content" />}
        {...props}
      >
        <Datagrid rowClick="show" bulkActionButtons={false}>
          <TextField
            source={getTranslatedField('name', locale)}
            label={translate('venues.fields.name.label')}
          />
          <TextField
            source="translations.FI.address"
            label={translate('venues.fields.address.label')}
          />
        </Datagrid>
      </KukkuuList>
    </>
  );
};

export default VenueList;
