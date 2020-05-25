import React from 'react';
import {
  Show,
  TextField,
  NumberField,
  DateField,
  Datagrid,
  ReferenceField,
  useLocale,
  useTranslate,
  SimpleShowLayout,
  EmailField,
  ArrayField,
  FunctionField,
} from 'react-admin';

import { Children_children_edges as ChildEdge } from '../../api/generatedTypes/Children';
import { OccurrenceTimeRangeField } from './fields';

const OccurrenceShow = (props: any) => {
  const locale = useLocale();
  const translate = useTranslate();

  return (
    <Show {...props} title="occurrences.show.title">
      <SimpleShowLayout>
        <ReferenceField
          label="occurrences.fields.event.label"
          source="event.id"
          reference="events"
          link="show"
        >
          <TextField source="translations.FI.name" />
        </ReferenceField>
        <DateField
          label="occurrences.fields.time.fields.date.label"
          source="time"
          locales={locale}
        />
        <OccurrenceTimeRangeField locales={locale} />
        <ReferenceField
          label="occurrences.fields.venue.label"
          source="venue.id"
          reference="venues"
          link="show"
        >
          <TextField source="translations.FI.name" />
        </ReferenceField>
        <NumberField
          source="event.capacityPerOccurrence"
          label="occurrences.fields.capacity.label"
        />
        <ArrayField
          label="occurrences.fields.children.label"
          source="children.edges"
        >
          <Datagrid
            rowClick={(id: string, basePath: string, record: ChildEdge) =>
              escape(`/children/${record?.node?.id}/show`)
            }
          >
            <FunctionField
              label="children.fields.name.label"
              render={(record: ChildEdge) =>
                `${record.node?.firstName} ${record.node?.lastName}`.trim()
              }
            />
            <DateField
              source="node.birthdate"
              label="children.fields.birthdate.label"
              locales={locale}
            />
            <FunctionField
              render={(record: ChildEdge) =>
                `${record.node?.guardians.edges[0]?.node?.firstName} ${record.node?.guardians.edges[0]?.node?.lastName}`.trim()
              }
              label="guardian.name"
            />
            <EmailField
              source="node.guardians.edges.0.node.email"
              label="children.fields.guardiansEmail.label"
            />
            <FunctionField
              render={(record: ChildEdge) =>
                translate(
                  `languages.${record?.node?.guardians.edges[0]?.node?.language}`
                )
              }
              label="Kieli"
            />
          </Datagrid>
        </ArrayField>
      </SimpleShowLayout>
    </Show>
  );
};

export default OccurrenceShow;
