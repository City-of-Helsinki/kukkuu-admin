import React from 'react';
import {
  type RaRecord,
  useTranslate,
  TextField,
  NumberField,
  SelectField,
  FunctionField,
} from 'react-admin';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router';

import KukkuuPageLayout from '../../application/layout/kukkuuPageLayout/KukkuuPageLayout';
import KukkuuDetailPage from '../../application/layout/kukkuuDetailPage/KukkuuDetailPage';
import LocalDataGrid from '../../../common/components/localDataGrid/LocalDataGrid';
import { participantsPerInviteChoices } from '../../events/choices';
import {
  type CapacityEventNode,
  type EnrollmentsCountEventNode,
  countCapacity,
  countEnrollments,
} from '../../events/utils';
import EventReadyField from './EventReadyField';
import EventGroupsDetailActions from './EventGroupsDetailActions';
import type { EventNode } from '../../api/generatedTypes/graphql';

const useStyles = makeStyles(() => ({
  center: {
    margin: '0 auto',
    textAlign: 'center',
  },
}));

const EventGroupsDetail = () => {
  const navigate = useNavigate();
  const t = useTranslate();
  const classes = useStyles();
  const handleRowClick = (record?: RaRecord) => {
    navigate(`/events/${record?.id}/show`);
  };

  return (
    <KukkuuDetailPage
      pageTitleSource="name"
      reactAdminProps={{
        actions: <EventGroupsDetailActions />,
      }}
      layout={KukkuuPageLayout}
      breadcrumbs={[
        {
          label: t('eventsAndEventGroups.list.label'),
          link: '/events-and-event-groups',
        },
      ]}
    >
      <LocalDataGrid source="events" rowClick={handleRowClick}>
        <TextField source="name" label={t('events.fields.name.label')} />
        <SelectField
          source="participantsPerInvite"
          label={t('events.fields.participantsPerInvite.label')}
          choices={participantsPerInviteChoices}
        />
        <NumberField
          source="duration"
          label={t('events.fields.duration.label')}
        />
        {/* @typescript-eslint/ban-ts-comment
        @ts-ignore TS2739*/}
        <FunctionField
          label="events.fields.totalCapacity.label"
          textAlign="right"
          // FIXME: Why is it EventNode in EventGroupDetails?
          render={(record?: Partial<EventNode>) =>
            record
              ? countCapacity(record as CapacityEventNode)
              : t('events.fields.totalCapacity.unknown')
          }
        />
        <NumberField
          source="occurrences.edges.length"
          label="events.fields.numOfOccurrences.label"
        />
        {/* @typescript-eslint/ban-ts-comment
        @ts-ignore TS2739*/}
        <FunctionField
          label="events.fields.numOfEnrolments.label"
          textAlign="right"
          // FIXME: Why is it EventNode in EventGroupDetails?
          render={(record?: Partial<EventNode>) =>
            record
              ? countEnrollments(record as EnrollmentsCountEventNode)
              : null
          }
        />
        {/* @typescript-eslint/ban-ts-comment
        @ts-ignore TS2739*/}
        <FunctionField
          headerClassName={classes.center}
          label="events.fields.ready.label2"
          // FIXME: Why is it EventNode in EventGroupDetails?
          render={(record: Partial<EventNode>) => (
            <EventReadyField
              record={record as EventNode}
              className={classes.center}
            />
          )}
        />
      </LocalDataGrid>
    </KukkuuDetailPage>
  );
};

export default EventGroupsDetail;
