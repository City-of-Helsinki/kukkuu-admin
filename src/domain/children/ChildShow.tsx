import React from 'react';
import {
  type ShowProps,
  TextField,
  SimpleShowLayout,
  DateField,
  EmailField,
  useTranslate,
  useLocaleState,
  SelectField,
  FunctionField,
  Datagrid,
  ReferenceField,
  ArrayField,
} from 'react-admin';
import { CardHeader } from '@mui/material';
import omit from 'lodash/omit';

import { languageChoices } from '../../common/choices';
import OccurrenceTimeRangeField from '../occurrences/fields/OccurrenceTimeRangeField';
import KukkuuShow from '../application/layout/kukkuuDetailPage/KukkuuShow';
import type { ChildNode } from '../api/generatedTypes/graphql';

const ChildShow = (props: ShowProps) => {
  const translate = useTranslate();
  const [locale] = useLocaleState();

  return (
    <>
      <CardHeader title={translate('children.show.title')} />
      <KukkuuShow title="children.show.title" {...omit(props, 'hasShow')}>
        <SimpleShowLayout>
          {/* @typescript-eslint/ban-ts-comment
                    @ts-ignore TS2739*/}
          <FunctionField
            label="children.fields.name.label"
            render={(record: ChildNode) => record.name.trim()}
          />
          <TextField
            source="birthyear"
            label="children.fields.birthyear.label"
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
            render={(record: ChildNode) =>
              record &&
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
              bulkActionButtons={false}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              rowClick={(
                id: string,
                resource: string,
                record: ChildNode['occurrences']['edges'][number]
              ) =>
                record
                  ? `/occurrences/${encodeURIComponent(
                      record.node?.id ?? ''
                    )}/show`
                  : '#'
              }
            >
              <DateField
                label="occurrences.fields.time.fields.date.label"
                source="node.time"
                locales={locale}
              />
              <OccurrenceTimeRangeField occurrenceSource="node" />
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
