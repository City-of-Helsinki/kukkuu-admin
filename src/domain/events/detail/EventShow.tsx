import React, { useState } from 'react';
import {
  type RaRecord,
  TabbedShowLayout,
  TextField,
  Tab,
  useTranslate,
  ImageField,
  NumberField,
  SelectField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
  useLocaleState,
  Button,
  UrlField,
  useRecordContext,
  Loading,
  FunctionField,
} from 'react-admin';
import { type WithStyles, createStyles, withStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

import { toDateString, toDateTimeString } from '../../../common/utils';
import ViewTitle from '../../../common/components/viewTitle/ViewTitle';
import LongTextField from '../../../common/components/longTextField/LongTextField';
import KukkuuPageLayout from '../../application/layout/kukkuuPageLayout/KukkuuPageLayout';
import KukkuuDetailPage from '../../application/layout/kukkuuDetailPage/KukkuuDetailPage';
import OccurrenceTimeRangeField from '../../occurrences/fields/OccurrenceTimeRangeField';
import { PublishedField } from '../fields';
import { participantsPerInviteChoices, ticketSystemChoices } from '../choices';
import EventShowActions from './EventShowActions';
import { hasInternalTicketSystem } from '../utils';
import type { AdminEvent } from '../types/EventTypes';
import ImportTicketSystemPasswordsFormDialog from '../../ticketSystemPassword/ImportTicketSystemPasswordsFormDialog';
import TranslatableProvider from '../../../common/providers/TranslatableProvider';
import useTranslatableContext from '../../../common/hooks/useTranslatableContext';
import type { OccurrenceNode } from '../../api/generatedTypes/graphql';
import { dateTimeFieldOptions } from '../../../common/utils';

const styles = createStyles({
  button: {
    marginBottom: '1em',
  },
});

interface AddOccurrenceButtonProps extends WithStyles<typeof styles> {
  record?: OccurrenceNode;
}

const AddOccurrenceButton = withStyles(styles)(({
  classes,
}: AddOccurrenceButtonProps) => {
  const record = useRecordContext();
  return (
    <Button
      component={Link}
      className={classes.button}
      to={{
        pathname: '/occurrences/create',
        search: `?event_id=${record?.id}`,
      }}
      label="occurrences.create.title"
    >
      <AddIcon />
    </Button>
  );
});

interface ImportTicketSystemPasswordsButtonProps
  extends WithStyles<typeof styles> {
  onClick: () => void;
}

const ImportTicketSystemPasswordsButton = withStyles(styles)(({
  classes,
  onClick,
}: ImportTicketSystemPasswordsButtonProps) => {
  const translate = useTranslate();
  return (
    <Button
      className={classes.button}
      label={translate('ticketSystemPassword.import.dialog.openButton')}
      onClick={onClick}
    >
      <AddIcon />
    </Button>
  );
});

interface ImportTicketmasterPasswordsControlsProps {
  record: AdminEvent;
}

const ImportTicketmasterPasswordsControls = ({
  record,
}: ImportTicketmasterPasswordsControlsProps) => {
  const [isDialogShown, setShowDialog] = useState(false);
  const internalTicketSystem = hasInternalTicketSystem(record);
  return (
    <div>
      {!internalTicketSystem && (
        <>
          <ImportTicketSystemPasswordsButton
            onClick={() => {
              setShowDialog(true);
            }}
          />
          <ImportTicketSystemPasswordsFormDialog
            isOpen={isDialogShown}
            onClose={() => {
              setShowDialog(false);
            }}
            record={record}
          />
        </>
      )}
    </div>
  );
};

const EventShow = () => {
  const t = useTranslate();
  const getCrumbs = (record?: RaRecord) => {
    const crumbs = [
      {
        label: t('events.list.title'),
        link: `/events-and-event-groups`,
      },
    ];

    if (record?.eventGroup) {
      crumbs.push({
        label: record?.eventGroup?.name,
        link: `/event-groups/${record?.eventGroup?.id}/show`,
      });
    }

    return crumbs;
  };

  return (
    <KukkuuDetailPage
      reactAdminProps={{
        actions: <EventShowActions />,
      }}
      layout={KukkuuPageLayout}
      breadcrumbs={(record?: RaRecord) => getCrumbs(record)}
      pageTitleSource="name"
    >
      <TranslatableProvider>
        <EventDetails />
      </TranslatableProvider>
    </KukkuuDetailPage>
  );
};

const EventDetails = () => {
  const [locale] = useLocaleState();
  const record = useRecordContext<AdminEvent>();
  const internalTicketSystem = hasInternalTicketSystem(record);
  const { selector: languageTabsComponent, getSource: translatableField } =
    useTranslatableContext();

  if (!record) {
    return <Loading />;
  }

  return (
    <TabbedShowLayout>
      <Tab label="events.show.tab.label">
        <ViewTitle />
        {languageTabsComponent}
        <ImageField source="image" />
        <TextField
          source={translatableField('imageAltText')}
          label={'events.fields.imageAltText.label'}
        />
        <TextField
          source={translatableField('name')}
          label={'events.fields.name.label'}
        />
        <LongTextField
          source={translatableField('shortDescription')}
          label={'events.fields.shortDescription.label'}
        />
        <LongTextField
          source={translatableField('description')}
          label={'events.fields.description.label'}
        />
        <SelectField
          source="participantsPerInvite"
          label={'events.fields.participantsPerInvite.label'}
          choices={participantsPerInviteChoices}
        />
        {internalTicketSystem
          ? [
              <NumberField
                source="duration"
                key="duration"
                label="events.fields.duration.label"
              />,
              <NumberField
                source="capacityPerOccurrence"
                key="capacityPerOccurrence"
                label="events.fields.capacityPerOccurrence.label"
              />,
            ]
          : [
              <SelectField
                source="ticketSystem.type"
                label="events.fields.ticketSystem.label"
                choices={ticketSystemChoices}
                key="ticketSystemType"
              />,
              <UrlField
                source="ticketSystem.url"
                label="events.fields.ticketSystemUrl.label"
                key="ticketSystemUrl"
              />,
              <FunctionField
                source="ticketSystem.endTime"
                label="events.fields.ticketSystemEndTime.label"
                key="ticketSystemEndTime"
                render={(record: RaRecord) => {
                  const endTime = record.ticketSystem?.endTime;
                  return endTime
                    ? toDateTimeString(new Date(endTime), locale)
                    : '';
                }}
                locales={locale}
              />,
            ]}
        {/* @ts-ignore - label is magically handled by material-ui */}
        <PublishedField label="events.fields.publishedAt.published.label" />
      </Tab>
      {internalTicketSystem ? (
        <Tab label="events.fields.occurrences.label">
          <ReferenceManyField
            label=" "
            reference="occurrences"
            target="event_id"
          >
            <Datagrid rowClick="show" bulkActionButtons={false}>
              <FunctionField
                label="occurrences.fields.time.fields.date.label"
                source="time"
                render={(record: RaRecord) =>
                  toDateString(new Date(record.time), locale)
                }
                locales={locale}
              />
              <OccurrenceTimeRangeField />
              <ReferenceField
                label="occurrences.fields.venue.label"
                source="venue.id"
                reference="venues"
                link={false}
              >
                <TextField source="translations.FI.name" />
              </ReferenceField>
              <NumberField
                source="capacity"
                label="occurrences.fields.capacity.label"
              />
              <NumberField
                source="enrolmentCount"
                label="occurrences.fields.enrolmentsCount.label"
              />
              <NumberField
                source="attendedEnrolmentCount"
                label="occurrences.fields.attendedEnrolmentsCount.label"
              />
              <NumberField
                source="freeSpotNotificationSubscriptionCount"
                label="occurrences.fields.freeSpotNotificationSubscriptions.label"
              />
            </Datagrid>
          </ReferenceManyField>
          <AddOccurrenceButton />
        </Tab>
      ) : (
        <Tab label="ticketSystemPassword.passwordsTab.label">
          <NumberField
            source="ticketSystem.usedPasswordCount"
            label="ticketSystemPassword.fields.usedPasswordCount.label"
          />
          <NumberField
            source="ticketSystem.freePasswordCount"
            label="ticketSystemPassword.fields.freePasswordCount.label"
          />
          {record && <ImportTicketmasterPasswordsControls record={record} />}
        </Tab>
      )}
    </TabbedShowLayout>
  );
};

export default EventShow;
