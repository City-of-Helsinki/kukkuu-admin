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
} from 'react-admin';
import makeStyles from '@material-ui/styles/makeStyles';

import {
  Occurrences_occurrences_edges_node_enrolments_edges as EnrolmentEdge,
  Occurrences_occurrences_edges_node_enrolments_edges_node_child_guardians_edges_node as Guardian,
  Occurrences_occurrences_edges_node as OccurrenceType,
} from '../../api/generatedTypes/Occurrences';
import KukkuuPageLayout from '../application/layout/kukkuuPageLayout/KukkuuPageLayout';
import KukkuuDetailPage from '../application/layout/kukkuuDetailPage/KukkuuDetailPage';
import OccurrenceTimeRangeField from './fields/OccurrenceTimeRangeField';
import OccurrenceAttendedField from './fields/OccurrenceAttendedField';
import Occurrence from './Occurrence';

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

const OccurrenceShow = (props: any) => {
  const locale = useLocale();
  const translate = useTranslate();

  const renderGuardian = (
    enrollmentRecord: EnrolmentEdge,
    render: (guardian: Guardian) => string
  ) => {
    const guardian = enrollmentRecord.node?.child.guardians.edges[0]?.node;

    if (guardian) {
      return render(guardian);
    }

    return translate('guardian.doesNotExist');
  };

  const getGuardianFullName = (enrollmentRecord: EnrolmentEdge) => {
    return renderGuardian(enrollmentRecord, (guardian) =>
      `${guardian.firstName} ${guardian.lastName}`.trim()
    );
  };

  const getGuardianLanguage = (enrollmentRecord: EnrolmentEdge) => {
    return renderGuardian(enrollmentRecord, (guardian) =>
      translate(`languages.${guardian.language}`)
    );
  };

  const getBreadCrumbs = (record?: Record) => {
    const crumbs = [
      {
        label: translate('events.list.title'),
        link: '/events-and-event-groups',
      },
    ];

    const eventGroup = record?.event?.eventGroup;
    const event = record?.event;

    if (eventGroup) {
      crumbs.push({
        label: eventGroup?.name,
        link: `/event-groups/${eventGroup?.id}/show`,
      });
    }

    crumbs.push({
      label: event?.name,
      link: `/events/${event?.id}/show`,
    });

    return crumbs;
  };

  return (
    <KukkuuDetailPage
      reactAdminProps={props}
      layout={KukkuuPageLayout}
      pageTitle={(record) =>
        record && new Occurrence(record as OccurrenceType).title
      }
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          render={(occurrence: OccurrenceType) =>
            occurrence.freeSpotNotificationSubscriptions?.edges.length || '0'
          }
          label="occurrences.fields.freeSpotNotificationSubscriptions.label"
        />
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
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              render={(record: EnrolmentEdge) =>
                `${record.node?.child.firstName} ${record.node?.child.lastName}`.trim()
              }
            />
            <DateField
              source="node.child.birthdate"
              label="children.fields.birthdate.label"
              locales={locale}
            />
            <FunctionField
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              render={(record: EnrolmentEdge) => getGuardianFullName(record)}
              label="guardian.name"
            />
            <EmailField
              source="node.child.guardians.edges.0.node.email"
              label="children.fields.guardians.fields.email.label"
              emptyText={translate('guardian.doesNotExist')}
            />
            <FunctionField
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              render={(record: EnrolmentEdge) => getGuardianLanguage(record)}
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
