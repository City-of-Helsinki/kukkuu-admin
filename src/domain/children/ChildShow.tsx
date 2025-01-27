import React from 'react';
import {
  type Identifier,
  type RaRecord,
  type RowClickFunction,
  ArrayField,
  Datagrid,
  DateField,
  EmailField,
  FunctionField,
  ReferenceField,
  SelectField,
  SimpleShowLayout,
  TextField,
  useLocaleState,
  usePermissions,
  useRecordContext,
  useTranslate,
} from 'react-admin';
import { CardHeader } from '@mui/material';

import { languageChoices } from '../../common/choices';
import OccurrenceTimeRangeField from '../occurrences/fields/OccurrenceTimeRangeField';
import KukkuuShow from '../application/layout/kukkuuDetailPage/KukkuuShow';
import type { ChildNode } from '../api/generatedTypes/graphql';
import type { Permissions } from '../authentication/authProvider';
import projectService from '../projects/projectService';

const ChildShow = () => {
  const { permissions } = usePermissions<Permissions>();
  const record = useRecordContext<ChildNode>();
  const translate = useTranslate();
  const [locale] = useLocaleState();
  const projectId =
    record?.project?.id ?? projectService.projectId ?? undefined;
  const canViewFamilies = Boolean(
    permissions?.canViewFamiliesWithinProject?.(projectId)
  );
  const onClickGuardian = (record: ChildNode) =>
    record &&
    `${record.guardians.edges[0]?.node?.firstName} ${record.guardians.edges[0]?.node?.lastName}`.trim();

  const onClickOccurrence: RowClickFunction = (
    _id: Identifier,
    _resource: string,
    record: RaRecord<Identifier>
  ) =>
    record
      ? `/occurrences/${encodeURIComponent(record.node?.id ?? '')}/show`
      : '#';

  return (
    <>
      <CardHeader title={translate('children.show.title')} />
      {canViewFamilies ? (
        <KukkuuShow title="children.show.title">
          <SimpleShowLayout>
            <FunctionField
              label="children.fields.name.label"
              render={(record?: Partial<ChildNode>) =>
                record?.name?.trim() ?? ''
              }
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
              render={onClickGuardian}
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
              <Datagrid bulkActionButtons={false} rowClick={onClickOccurrence}>
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
      ) : (
        <div>{translate('children.noPermission')}</div>
      )}
    </>
  );
};

export default ChildShow;
