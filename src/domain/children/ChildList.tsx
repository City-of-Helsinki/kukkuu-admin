import React from 'react';
import {
  List,
  Datagrid,
  DateField,
  useLocale,
  EmailField,
  SelectField,
  TextField,
  FunctionField,
  useTranslate,
} from 'react-admin';
import { CardHeader } from '@material-ui/core';

import { Children_children_edges_node as Child } from '../../api/generatedTypes/Children';
import { languageChoices } from '../../common/choices';
import Aside from '../../common/components/aside/Aside';

const ChildList = (props: any) => {
  const translate = useTranslate();
  const locale = useLocale();
  return (
    <>
      <CardHeader title={translate('children.list.title')} />
      <List
        bulkActionButtons={false}
        aside={<Aside content="children.list.aside.content" />}
        {...props}
      >
        <Datagrid rowClick="show">
          <FunctionField
            label="children.fields.name.label"
            render={(record: Child) =>
              `${record.firstName} ${record.lastName}`.trim()
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
      </List>
    </>
  );
};

export default ChildList;
