import React from 'react';
import {
  Datagrid,
  DateField,
  useLocale,
  EmailField,
  SelectField,
  TextField,
  FunctionField,
  useTranslate,
  Pagination,
} from 'react-admin';
import { CardHeader } from '@mui/material';

import { Children_children_edges_node as Child } from '../../api/generatedTypes/Children';
import { languageChoices } from '../../common/choices';
import KukkuuList from '../application/layout/kukkuuListPage/KukkuuList';

const ChildList = (props: any) => {
  const translate = useTranslate();
  const locale = useLocale();

  return (
    <>
      <CardHeader title={translate('children.list.title')} />
      <KukkuuList
        bulkActionButtons={false}
        exporter={false}
        {...props}
        pagination={<Pagination rowsPerPageOptions={[20, 100]} />}
        perPage={20}
      >
        <Datagrid rowClick="show">
          <FunctionField
            label="children.fields.name.label"
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            render={(record?: Child) =>
              record && `${record.firstName} ${record.lastName}`.trim()
            }
          />
          <DateField
            source="birthdate"
            label="children.fields.birthdate.label"
            locales={locale}
          />
          <TextField
            source="postalCode"
            label="children.fields.guardians.fields.postalCode.label"
          />
          <EmailField
            source="guardians.edges.0.node.email"
            label="children.fields.guardians.label"
          />
          <SelectField
            source="guardians.edges.0.node.language"
            label="events.fields.language.label"
            choices={languageChoices}
          />
        </Datagrid>
      </KukkuuList>
    </>
  );
};

export default ChildList;
