import React, { ReactText } from 'react';
import {
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
  useGetOne,
  Record,
  UrlField,
  useShowController,
} from 'react-admin';
import makeStyles from '@material-ui/styles/makeStyles';

import {
  Occurrences_occurrences_edges_node_enrolments_edges as EnrolmentEdge,
  Occurrences_occurrences_edges_node_enrolments_edges_node_child_guardians_edges_node as GuardianType,
  Occurrences_occurrences_edges_node as OccurrenceType,
} from '../../api/generatedTypes/Occurrences';
import KukkuuPageLayout from '../application/layout/kukkuuPageLayout/KukkuuPageLayout';
import KukkuuDetailPage from '../application/layout/kukkuuDetailPage/KukkuuDetailPage';
import OccurrenceTimeRangeField from './fields/OccurrenceTimeRangeField';
import OccurrenceAttendedField from './fields/OccurrenceAttendedField';
import Occurrence from './Occurrence';
import Guardian from './Guardian';
import { hasInternalTicketSystem } from '../events/utils';

const useDataGridTitleStyles = makeStyles({
  fakeValue: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.87)',
    marginLeft: 16,
  },
});

const OccurrenceDataGridTitle = ({ occurrenceId }: any) => {
  const styles = useDataGridTitleStyles();
  const translate = useTranslate();
  const { data: record } = useGetOne('occurrences', occurrenceId);

  return (
    <>
      {translate('occurrences.fields.children.label')}
      <span className={styles.fakeValue}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */}
        {/* @ts-ignore */}
        {record.enrolments?.edges.length || ''}
      </span>
    </>
  );
};

export const withEnrolment = (
  hasRecord: (record: EnrolmentEdge) => any,
  otherwise: () => any
) => (record: Record | undefined | null) => {
  if (record) {
    const enrolmentEdge = (record as unknown) as EnrolmentEdge;

    return hasRecord(enrolmentEdge);
  }

  return otherwise();
};

export const withGuardian = (
  hasRecord: (guardian: GuardianType) => string,
  otherwise: () => any
) => (enrollmentRecord: EnrolmentEdge) => {
  const guardian = enrollmentRecord.node?.child?.guardians.edges[0]?.node;

  if (guardian) {
    return hasRecord(guardian as GuardianType);
  }

  return otherwise();
};

export const getGuardianFullName = (guardian: GuardianType) =>
  new Guardian(guardian).fullName;

export const getGuardianLanguage = (guardian: GuardianType) =>
  new Guardian(guardian).language;

export const getBreadCrumbs = (record?: Record) =>
  new Occurrence(record as OccurrenceType).breadcrumbs;

export const getTitle = (record?: Record) =>
  new Occurrence(record as OccurrenceType).title || '';

export const getChildFullName = (enrolmentEdge: EnrolmentEdge) =>
  `${enrolmentEdge.node?.child?.firstName} ${enrolmentEdge.node?.child?.lastName}`.trim();

const OccurrenceShow = (props: any) => {
  const locale = useLocale();
  const translate = useTranslate();
  const { record } = useShowController<OccurrenceType>(props);
  const internalTicketSystem = hasInternalTicketSystem(record);

  return (
    <KukkuuDetailPage
      reactAdminProps={props}
      layout={KukkuuPageLayout}
      pageTitle={getTitle}
      breadcrumbs={getBreadCrumbs}
    >
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
        <OccurrenceTimeRangeField />
        <ReferenceField
          label="occurrences.fields.venue.label"
          source="venue.id"
          reference="venues"
          link="show"
        >
          <TextField source="translations.FI.name" />
        </ReferenceField>
        {internalTicketSystem && (
          <NumberField
            source="capacity"
            label="occurrences.fields.capacity.label"
          />
        )}
        {internalTicketSystem && (
          <FunctionField
            render={(occurrence) =>
              occurrence?.freeSpotNotificationSubscriptions?.edges?.length ?? 0
            }
            emptyText="0"
            label="occurrences.fields.freeSpotNotificationSubscriptions.label"
          />
        )}
        {!internalTicketSystem && (
          <UrlField
            source="ticketSystem.url"
            label="occurrences.fields.ticketSystemUrl.label"
          />
        )}
        {internalTicketSystem && (
          <ArrayField
            label={<OccurrenceDataGridTitle occurrenceId={props.id} />}
            source="enrolments.edges"
          >
            <Datagrid
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              rowClick={(
                id: ReactText,
                basePath: string,
                record: EnrolmentEdge
              ) => escape(`/children/${record?.node?.id}/show`)}
            >
              <FunctionField
                label="children.fields.name.label"
                render={withEnrolment(getChildFullName, () => null)}
              />
              <DateField
                source="node.child.birthdate"
                label="children.fields.birthdate.label"
                locales={locale}
              />
              <FunctionField
                render={withEnrolment(
                  withGuardian(getGuardianFullName, () =>
                    translate('guardian.doesNotExist')
                  ),
                  () => null
                )}
                label="guardian.name"
              />
              <EmailField
                source="node.child.guardians.edges.0.node.email"
                label="children.fields.guardians.fields.email.label"
                emptyText={translate('guardian.doesNotExist')}
              />
              <FunctionField
                render={withEnrolment(
                  withGuardian(getGuardianLanguage, () =>
                    translate('guardian.doesNotExist')
                  ),
                  () => null
                )}
                label="events.fields.language.label"
              />
              <OccurrenceAttendedField />
            </Datagrid>
          </ArrayField>
        )}
      </SimpleShowLayout>
    </KukkuuDetailPage>
  );
};

export default OccurrenceShow;
