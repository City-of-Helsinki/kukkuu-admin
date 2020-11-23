import React from 'react';
import {
  ResourceComponentPropsWithId,
  TopToolbar,
  useTranslate,
  CreateButton,
  EditButton,
  TextField,
  NumberField,
  SelectField,
  FunctionField,
  Record,
} from 'react-admin';
import { makeStyles } from '@material-ui/core';

import KukkuuPageLayout from '../../application/layout/kukkuuPageLayout/KukkuuPageLayout';
import KukkuuDetailPage from '../../application/layout/kukkuuDetailPage/KukkuuDetailPage';
import LocalDataGrid from '../../../common/components/localDataGrid/LocalDataGrid';
import { participantsPerInviteChoices } from '../../events/choices';
import PublishEventGroupButton from './PublishEventGroupButton';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    margin: `0 -${theme.spacing(1)}px`,
    '& > *': {
      margin: `0 ${theme.spacing(1)}px`,
    },
  },
}));

const EventGroupsDetailActions = ({ data, basePath }: any) => {
  const t = useTranslate();
  const classes = useStyles();

  return (
    <TopToolbar className={classes.toolbar}>
      <CreateButton
        basePath="events"
        label={t('eventGroups.actions.addEvent.do')}
      />
      <EditButton basePath="event-groups" />
      {data && <PublishEventGroupButton basePath={basePath} record={data} />}
    </TopToolbar>
  );
};

const EventGroupsDetail = (props: ResourceComponentPropsWithId) => {
  const t = useTranslate();

  return (
    <KukkuuDetailPage
      pageTitleSource="name"
      reactAdminProps={props}
      actions={<EventGroupsDetailActions />}
      layout={KukkuuPageLayout}
      breadcrumbs={[
        {
          label: t('eventsAndEventGroups.list.label'),
          link: '/events-and-event-groups',
        },
      ]}
    >
      <LocalDataGrid source="events">
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
        <FunctionField
          label="events.fields.totalCapacity.label"
          textAlign="right"
          render={(record?: Record) =>
            `${
              (record?.capacityPerOccurrence || 0) *
              (record?.occurrences.edges.length || 0)
            }`
          }
        />
        <NumberField
          source="occurrences.edges.length"
          label="events.fields.numOfOccurrences.label"
        />
        <FunctionField
          label="events.fields.numOfEnrolments.label"
          textAlign="right"
          render={(record?: Record) =>
            record?.occurrences.edges.reduce(
              (sum: number, { node: { enrolmentCount = 0 } }) =>
                sum + enrolmentCount,
              0
            )
          }
        />
      </LocalDataGrid>
    </KukkuuDetailPage>
  );
};

export default EventGroupsDetail;
