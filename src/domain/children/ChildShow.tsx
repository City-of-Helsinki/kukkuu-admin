import React from 'react';
import {
  TextField,
  SimpleShowLayout,
  DateField,
  EmailField,
  useTranslate,
  useLocale,
  SelectField,
  FunctionField,
  Datagrid,
  ReferenceField,
  ArrayField,
} from 'react-admin';
import { CardHeader } from '@material-ui/core';

import { languageChoices } from '../../common/choices';
import {
  Child_child as Child,
  Child_child_occurrences_edges as OccurrenceEdges,
} from '../../api/generatedTypes/Child';
import { OccurrenceTimeRangeField } from '../occurrences/fields';
import KukkuuShow from '../../common/components/kukkuuShow/KukkuuShow';

interface RowClickParams<T> {
  id: string;
  basePath: string;
  record: T;
}

const ChildShow = (props: any) => {
  const translate = useTranslate();
  const locale = useLocale();

  return (
    <>
      <CardHeader title={translate('children.show.title')} />
      <KukkuuShow title="children.show.title" {...props}>
        <SimpleShowLayout>
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
          <SelectField
            source="guardians.edges.0.node.language"
            label="events.fields.language.label"
            choices={languageChoices}
          />
          <TextField
            source="postalCode"
            label="children.fields.guardians.fields.postalCode.label"
          />
          <FunctionField
            label="children.fields.guardians.label"
            render={(record: Child) =>
              `${record.guardians.edges[0]?.node?.firstName} ${record.guardians.edges[0]?.node?.lastName}`.trim()
            }
          />
          <EmailField
            source="guardians.edges.0.node.email"
            label="children.fields.guardians.fields.email.label"
          />
          <TextField
            source="guardians.edges.0.node.phoneNumber"
            label="children.fields.guardians.fields.phoneNumber.label"
          />
          <ArrayField
            source="occurrences.edges"
            label="children.fields.occurrences.label"
          >
            <Datagrid
              rowClick={(
                id: string,
                basePath: string,
                record: OccurrenceEdges
              ) =>
                `/occurrences/${encodeURIComponent(record.node?.id || '')}/show`
              }
            >
              <DateField
                label="occurrences.fields.time.fields.date.label"
                source="node.time"
                locales={locale}
              />
              <OccurrenceTimeRangeField
                occurrenceSource="node"
                locales={locale}
              />
              <ReferenceField
                label="occurrences.fields.event.label"
                source="node.event.id"
                reference="events"
                link="show"
              >
                <TextField source="translations.FI.name" />
              </ReferenceField>
              <ReferenceField
                label="occurrences.fields.venue.label"
                source="node.venue.id"
                reference="venues"
                link="show"
              >
                <TextField source="translations.FI.name" />
              </ReferenceField>
            </Datagrid>
          </ArrayField>
        </SimpleShowLayout>
      </KukkuuShow>
    </>
  );
};

export default ChildShow;
