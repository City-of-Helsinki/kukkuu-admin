import React from 'react';
import {
  List,
  Datagrid,
  DateField,
  useLocale,
  EmailField,
  SelectField,
} from 'react-admin';

import { Children_children_edges_node as Child } from '../../api/generatedTypes/Children';
import { languageChoices } from '../../common/choices';

const ChildNameField = ({ record }: { [key: string]: any; record?: Child }) => (
  <span>{`${record?.firstName} ${record?.lastName}`.trim()}</span>
);

const ChildList = (props: any) => {
  const locale = useLocale();
  return (
    <List title="children.list.title" {...props}>
      <Datagrid rowClick="show">
        <ChildNameField label="children.fields.name.label" />
        <DateField
          source="birthdate"
          label="children.fields.birthdate.label"
          locales={locale}
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
  );
};

export default ChildList;
