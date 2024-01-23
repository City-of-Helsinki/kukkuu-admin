import React from 'react';
import type { RaRecord, Identifier } from 'react-admin';
import {
  TextField,
  useTranslate,
  NumberField,
  FunctionField,
  TopToolbar,
  CreateButton,
  useGetOne,
  usePermissions,
  Labeled,
} from 'react-admin';
import { makeStyles } from '@mui/styles';

import type { Permissions } from '../../authentication/authProvider';
import { toDateTimeString } from '../../../common/utils';
import PublishedField from '../../../common/components/publishedField/PublishedField';
import KukkuuListPage from '../../application/layout/kukkuuListPage/KukkuuListPage';
import { EventList, countCapacity, countOccurrences } from '../../events/utils';
import projectService from '../../projects/projectService';
import type {
  EventGroupNode,
  EventNode,
  EventOrEventGroupUnion,
  ProjectNode,
} from '../../api/generatedTypes/graphql';

const useEventsAndEventGroupsListToolbarStyles = makeStyles((theme?: any) => ({
  toolbar: {
    margin: `0 -${theme.spacing(1)}`,
    '& > *': {
      margin: `0 ${theme.spacing(1)}`,
    },
  },
}));

const EventsAndEventGroupsListToolbar = () => {
  const { permissions } = usePermissions<Permissions>();
  const t = useTranslate();
  const classes = useEventsAndEventGroupsListToolbarStyles();
  const { data: projectData } = useGetOne<ProjectNode>('projects', {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    id: projectService.projectId!,
  });

  const canManageEventGroups = permissions?.canManageEventGroupsWithinProject(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    projectService.projectId!
  );

  return (
    <TopToolbar className={classes.toolbar}>
      {canManageEventGroups && (
        <CreateButton
          resource="event-groups"
          label={t('eventGroups.actions.create.do')}
        />
      )}
      {projectData?.singleEventsAllowed && (
        <CreateButton resource="events" label={t('events.actions.create')} />
      )}
    </TopToolbar>
  );
};

function when(
  record: EventOrEventGroupUnion,
  whenEvent: (record: EventNode) => any,
  whenEventGroup: (record: EventGroupNode) => any
): any {
  const isEventGroup = record.hasOwnProperty('events');

  if (isEventGroup) {
    const eventGroup = record as EventGroupNode;

    return whenEventGroup(eventGroup);
  } else {
    const event = record as EventNode;

    return whenEvent(event);
  }
}

const useStyles = makeStyles((theme) => ({
  uppercase: {
    textTransform: 'uppercase',
  },
  bold: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const EventsAndEventGroupsList = () => {
  const translate = useTranslate();
  const classes = useStyles();
  const handleRowClick = (
    id: Identifier,
    resource: string,
    record: RaRecord
  ) => {
    const isEvent = !record.hasOwnProperty('events');
    const isEventGroup = record.hasOwnProperty('events');

    if (isEvent) {
      return `/events/${id}/show`;
    }

    if (isEventGroup) {
      return `/event-groups/${id}/show`;
    }

    return '';
  };

  return (
    <KukkuuListPage
      pageTitle={translate('events.list.title')}
      reactAdminProps={{
        actions: <EventsAndEventGroupsListToolbar />,
      }}
      datagridProps={{
        rowClick: handleRowClick,
      }}
    >
      <TextField
        source="name"
        label={translate('events.fields.name.label')}
        className={classes.bold}
      />
      <FunctionField
        label="eventsAndEventGroups.list.type.label"
        render={(record: RaRecord) => {
          if (!record) {
            return null;
          }

          return when(
            record as EventOrEventGroupUnion,
            () => translate('eventsAndEventGroups.list.type.event.label'),
            () => translate('eventsAndEventGroups.list.type.eventGroup.label')
          );
        }}
        className={[classes.uppercase, classes.bold].join(' ')}
      />
      <NumberField
        label="eventsAndEventGroups.list.eventCount.label"
        source="events.edges.length"
        emptyText="1"
        className={classes.bold}
      />
      <FunctionField
        label="events.fields.totalCapacity.label"
        textAlign="right"
        render={(record?: RaRecord) => {
          if (!record) {
            return null;
          }

          return when(
            record as EventOrEventGroupUnion,
            (event: EventNode) => {
              return (
                countCapacity(event) ??
                translate('events.fields.totalCapacity.unknown')
              );
            },
            (eventGroup: EventGroupNode) => {
              return (
                countCapacity(...EventList(eventGroup.events).items) ??
                translate('events.fields.totalCapacity.unknown')
              );
            }
          );
        }}
      />
      <FunctionField
        label="events.fields.numOfOccurrences.label"
        textAlign="right"
        render={(record?: RaRecord) => {
          if (!record) {
            return null;
          }

          return when(
            record as EventOrEventGroupUnion,
            (event: EventNode) => {
              return countOccurrences(event);
            },
            (eventGroup: EventGroupNode) => {
              return countOccurrences(...EventList(eventGroup.events).items);
            }
          );
        }}
      />
      <Labeled label={translate('events.fields.publishedAt.label')}>
        <PublishedField
          source="publishedAt"
          render={(date: Date) =>
            `${translate(
              'events.fields.publishedAt.published.label'
            )} ${toDateTimeString(date)}`
          }
          emptyText={translate(
            'events.fields.publishedAt.values.NOT_PUBLISHED'
          )}
          className={classes.bold}
        />
      </Labeled>
    </KukkuuListPage>
  );
};

export default EventsAndEventGroupsList;
