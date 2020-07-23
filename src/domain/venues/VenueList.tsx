import React from 'react';
import { Datagrid, TextField, useTranslate, useLocale } from 'react-admin';
import { CardHeader } from '@material-ui/core';

import { getTranslatedField } from '../../common/translation/TranslationUtils';
import Aside from '../../common/components/aside/Aside';
import KukkuuList from '../../common/components/kukkuuList/KukkuuList';

const VenueList = (props: any) => {
  const translate = useTranslate();
  const locale = useLocale();

  return (
    <>
      <CardHeader title={translate('venues.list.title')} />
      <KukkuuList
        bulkActionButtons={false}
        pagination={false}
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
      </KukkuuList>
    </>
  );
};

export default VenueList;
