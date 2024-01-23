import React from 'react';
import {
  TextField,
  NumberField,
  DateField,
  Datagrid,
  ReferenceField,
  useLocaleState,
  useTranslate,
  SimpleShowLayout,
  EmailField,
  ArrayField,
  FunctionField,
  useGetOne,
  RaRecord,
} from 'react-admin';
import makeStyles from '@mui/styles/makeStyles';
import { useParams } from 'react-router-dom';

import {
  Occurrence_occurrence_enrolments_edges as EnrolmentEdge,
  Occurrence_occurrence_enrolments_edges_node_child_guardians_edges_node as GuardianType,
  Occurrence_occurrence as OccurrenceType,
  Occurrence_occurrence,
} from '../../api/generatedTypes/Occurrence';
import KukkuuPageLayout from '../application/layout/kukkuuPageLayout/KukkuuPageLayout';
import KukkuuDetailPage from '../application/layout/kukkuuDetailPage/KukkuuDetailPage';
import OccurrenceTimeRangeField from './fields/OccurrenceTimeRangeField';
import OccurrenceAttendedField from './fields/OccurrenceAttendedField';
import Occurrence from './Occurrence';
import Guardian from './Guardian';

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
  const { data: record } = useGetOne('occurrences', { id: occurrenceId });

  return (
    <>
      {translate('occurrences.fields.children.label')}
      <span className={styles.fakeValue}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        {record.enrolments?.edges.length || ''}
      </span>
    </>
  );
};

export const withEnrolment =
  (hasRecord: (record: EnrolmentEdge) => any, otherwise: () => any) =>
  (record: RaRecord | undefined | null) => {
    if (record) {
      const enrolmentEdge = record as unknown as EnrolmentEdge;

      return hasRecord(enrolmentEdge);
    }

    return otherwise();
  };

export const withGuardian =
  (hasRecord: (guardian: GuardianType) => string, otherwise: () => any) =>
  (enrollmentRecord: EnrolmentEdge) => {
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

export const getGuardianPhoneNumber = (guardian: GuardianType) =>
  new Guardian(guardian).phoneNumber;

export const getBreadCrumbs = (record?: RaRecord) =>
  new Occurrence(record as OccurrenceType).breadcrumbs;

export const getTitle = (record?: RaRecord) =>
  new Occurrence(record as OccurrenceType).title || '';

export const getChildFullName = (enrolmentEdge: EnrolmentEdge) =>
  enrolmentEdge.node?.child?.name.trim();

const OccurrenceShow = () => {
  const [locale] = useLocaleState();
  const translate = useTranslate();
  const { id } = useParams();
  return (
    <KukkuuDetailPage
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
        <NumberField
          source="capacity"
          label="occurrences.fields.capacity.label"
        />
        <FunctionField
          render={(occurrence: Occurrence_occurrence) =>
            occurrence?.freeSpotNotificationSubscriptions?.edges?.length ?? '?'
          }
          label="occurrences.fields.freeSpotNotificationSubscriptions.label"
        />
        <ArrayField
          label={<OccurrenceDataGridTitle occurrenceId={id} />}
          source="enrolments.edges"
        >
          <Datagrid
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            rowClick={(id: string, resource: string, record: EnrolmentEdge) =>
              escape(`/children/${record?.node?.child?.id}/show`)
            }
            bulkActionButtons={false}
          >
            <FunctionField
              label="children.fields.name.label"
              render={withEnrolment(getChildFullName, () => null)}
            />
            <DateField
              source="node.child.birthyear"
              label="children.fields.birthyear.label"
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
                withGuardian(getGuardianPhoneNumber, () =>
                  translate('guardian.doesNotExist')
                ),
                () => null
              )}
              label="children.fields.guardians.fields.phoneNumber.label"
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
      </SimpleShowLayout>
    </KukkuuDetailPage>
  );
};

export default OccurrenceShow;
