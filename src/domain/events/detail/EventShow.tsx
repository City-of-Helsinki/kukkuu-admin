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
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

import MetricLabelWithTooltip from '../../../common/components/metricLabelWithTooltip/MetricLabelWithTooltip';
import { toDateString, toDateTimeString } from '../../../common/utils';
import ViewTitle from '../../../common/components/viewTitle/ViewTitle';
import LongTextField from '../../../common/components/longTextField/LongTextField';
import KukkuuPageLayout from '../../application/layout/kukkuuPageLayout/KukkuuPageLayout';
import KukkuuDetailPage from '../../application/layout/kukkuuDetailPage/KukkuuDetailPage';
import OccurrenceTimeRangeField from '../../occurrences/fields/OccurrenceTimeRangeField';
import OccurrenceHasAccessibilitiesField from '../../occurrences/fields/OccurrenceHasAccessibilitiesField';
import OccurrenceLanguagesField from '../../occurrences/fields/OccurrenceLanguagesField';
import { PublishedField } from '../fields';
import { participantsPerInviteChoices, ticketSystemChoices } from '../choices';
import EventShowActions from './EventShowActions';
import { hasInternalTicketSystem } from '../utils';
import type { AdminEvent } from '../types/EventTypes';
import ImportTicketSystemPasswordsFormDialog from '../../ticketSystemPassword/ImportTicketSystemPasswordsFormDialog';
import TranslatableProvider from '../../../common/providers/TranslatableProvider';
import useTranslatableContext from '../../../common/hooks/useTranslatableContext';

const AddOccurrenceButton = () => {
  const record = useRecordContext();
  return (
    <Button
      component={Link}
      sx={{ marginBottom: '1em' }}
      to={{
        pathname: '/occurrences/create',
        search: `?event_id=${record?.id}`,
      }}
      label="occurrences.create.title"
    >
      <AddIcon />
    </Button>
  );
};

interface ImportTicketSystemPasswordsButtonProps {
  onClick: () => void;
}

const ImportTicketSystemPasswordsButton = ({
  onClick,
}: ImportTicketSystemPasswordsButtonProps) => {
  const translate = useTranslate();
  return (
    <Button
      sx={{ marginBottom: '1em' }}
      label={translate('ticketSystemPassword.import.dialog.openButton')}
      onClick={onClick}
    >
      <AddIcon />
    </Button>
  );
};

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
  const t = useTranslate();
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
          source="organisation.name"
          label={'events.fields.organisation.label'}
        />
        <FunctionField
          source="themePaths"
          label="events.fields.themePaths.label"
          render={(record: AdminEvent) =>
            record.themePaths?.length
              ? record.themePaths.map(({ name }) => name).join(', ')
              : t('events.fields.themePaths.notSet')
          }
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
              />,
            ]}
        {/* @ts-ignore - label is magically handled by material-ui */}
        <PublishedField label="events.fields.publishedAt.published.label" />
        <FunctionField
          source="registrationOpensAt"
          label="events.fields.registrationOpensAt.label"
          render={(record: RaRecord) =>
            record.registrationOpensAt
              ? toDateTimeString(new Date(record.registrationOpensAt), locale)
              : t('events.fields.registrationOpensAt.notSet')
          }
        />
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
                sortable={false}
                label={
                  <MetricLabelWithTooltip
                    label={t('occurrences.fields.capacity.label')}
                    tooltip={t('occurrences.fields.capacity.tooltip')}
                  />
                }
              />
              <NumberField
                source="seatCount"
                sortable={false}
                label={
                  <MetricLabelWithTooltip
                    label={t('arrivalMetrics.seatsReserved.label')}
                    tooltip={t('arrivalMetrics.seatsReserved.tooltip')}
                  />
                }
              />
              <FunctionField
                source="attendedSeats"
                sortable={false}
                label={
                  <MetricLabelWithTooltip
                    label={t('arrivalMetrics.peopleArrived.label')}
                    tooltip={t('arrivalMetrics.peopleArrived.tooltip')}
                  />
                }
                render={(occ: RaRecord) => {
                  const isOverridden =
                    occ.attendedCountOverride !== null &&
                    occ.attendedCountOverride !== undefined;
                  return (
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.75,
                      }}
                    >
                      <span>{occ.attendedSeats ?? 0}</span>
                      {isOverridden && (
                        <Tooltip
                          title={
                            occ.attendedChildrenCountOverride !== null &&
                            occ.attendedChildrenCountOverride !== undefined &&
                            occ.attendedAdultsCountOverride !== null &&
                            occ.attendedAdultsCountOverride !== undefined
                              ? t(
                                  'occurrences.fields.attendedCountOverride.tooltipWithBreakdown',
                                  {
                                    children: occ.attendedChildrenCountOverride,
                                    adults: occ.attendedAdultsCountOverride,
                                    calculated:
                                      occ.calculatedAttendedSeats ?? '?',
                                  }
                                )
                              : t(
                                  'occurrences.fields.attendedCountOverride.tooltip',
                                  {
                                    calculated:
                                      occ.calculatedAttendedSeats ?? '?',
                                  }
                                )
                          }
                          enterTouchDelay={0}
                          arrow
                        >
                          <Chip
                            size="small"
                            color="warning"
                            label={t(
                              'occurrences.fields.attendedCountOverride.shortBadge'
                            )}
                          />
                        </Tooltip>
                      )}
                    </Box>
                  );
                }}
              />
              <FunctionField
                label={
                  <MetricLabelWithTooltip
                    label={t('arrivalMetrics.spaceLeft.label')}
                    tooltip={t('arrivalMetrics.spaceLeft.tooltip')}
                  />
                }
                render={(occ: RaRecord) => occ.remainingEmptySeats ?? '—'}
              />
              <NumberField
                source="pendingArrivalSeats"
                sortable={false}
                label={
                  <MetricLabelWithTooltip
                    label={t('arrivalMetrics.expectedRemaining.label')}
                    tooltip={t('arrivalMetrics.expectedRemaining.tooltip')}
                  />
                }
              />
              <FunctionField
                source="handledEnrolmentCount"
                sortable={false}
                label={
                  <MetricLabelWithTooltip
                    label={t('arrivalMetrics.ticketsHandled.label')}
                    tooltip={t('arrivalMetrics.ticketsHandled.tooltip')}
                  />
                }
                render={(occ: RaRecord) =>
                  `${occ.handledEnrolmentCount ?? 0} / ${occ.enrolmentCount ?? 0}`
                }
              />
              <NumberField
                source="freeSpotNotificationSubscriptionCount"
                label="occurrences.fields.freeSpotNotificationSubscriptions.label"
              />
              <OccurrenceLanguagesField
                source="languages"
                label="occurrences.fields.languages.label"
              />
              <OccurrenceHasAccessibilitiesField
                source="accessibilities"
                label="occurrences.fields.accessibilities.label"
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
