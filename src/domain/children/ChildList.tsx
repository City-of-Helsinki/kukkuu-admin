import React from 'react';
import {
  Datagrid,
  EmailField,
  SelectField,
  TextField,
  FunctionField,
  useTranslate,
  Pagination,
} from 'react-admin';
import { CardHeader } from '@mui/material';

import { languageChoices } from '../../common/choices';
import KukkuuList from '../application/layout/kukkuuListPage/KukkuuList';
import type { ChildNode } from '../api/generatedTypes/graphql';

const ChildList = () => {
  const translate = useTranslate();

  return (
    <>
      <CardHeader title={translate('children.list.title')} />
      <KukkuuList
        exporter={false}
        pagination={<Pagination rowsPerPageOptions={[25, 100]} />}
        perPage={25}
      >
        <Datagrid rowClick="show" bulkActionButtons={false}>
          <FunctionField
            label="children.fields.name.label"
            render={(record?: ChildNode) => record?.name.trim()}
          />
          <TextField
            source="birthyear"
            label="children.fields.birthyear.label"
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
