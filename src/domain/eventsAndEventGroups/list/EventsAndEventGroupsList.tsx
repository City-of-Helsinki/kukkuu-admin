import React, { ReactText } from 'react';
import {
  TextField,
  useTranslate,
  useLocale,
  NumberField,
  SelectField,
  FunctionField,
  Record,
  TopToolbar,
  CreateButton,
} from 'react-admin';
import { makeStyles } from '@material-ui/core';

import { getTranslatedField } from '../../../common/translation/TranslationUtils';
import KukkuuListPage from '../../application/layout/kukkuuListPage/KukkuuListPage';
import { participantsPerInviteChoices } from '../../events/choices';
import { PublishedField } from '../../events/fields';

const useEventsAndEventGroupsListToolbarStyles = makeStyles((theme) => ({
  toolbar: {
    margin: `0 -${theme.spacing(1)}px`,
    '& > *': {
      margin: `0 ${theme.spacing(1)}px`,
    },
  },
}));

const EventsAndEventGroupsListToolbar = ({ data }: any) => {
  const t = useTranslate();
  const classes = useEventsAndEventGroupsListToolbarStyles();

  return (
    <TopToolbar className={classes.toolbar}>
      {data && (
        <CreateButton
          basePath="event-groups"
          label={t('eventGroups.actions.create.do')}
        />
      )}
      {data && (
        <CreateButton basePath="events" label={t('events.actions.create')} />
      )}
    </TopToolbar>
  );
};

const EventsAndEventGroupsList = (props: any) => {
  const translate = useTranslate();
  const locale = useLocale();

  const handleRowClick = (id: ReactText, basePath: string, record: Record) => {
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
        ...props,
        actions: <EventsAndEventGroupsListToolbar />,
      }}
      datagridProps={{
        rowClick: handleRowClick,
      }}
    >
      <TextField
        source={getTranslatedField('name', locale)}
        label={translate('events.fields.name.label')}
      />
      <SelectField
        source="participantsPerInvite"
        label={translate('events.fields.participantsPerInvite.label')}
        choices={participantsPerInviteChoices}
      />
      <NumberField
        source="duration"
        label={translate('events.fields.duration.label')}
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
      <PublishedField locale={locale} />
    </KukkuuListPage>
  );
};

export default EventsAndEventGroupsList;
