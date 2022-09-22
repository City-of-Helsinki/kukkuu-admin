import React, { useState } from 'react';
import {
  TabbedShowLayout,
  TextField,
  Tab,
  useTranslate,
  ImageField,
  NumberField,
  DateField,
  SelectField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
  useLocale,
  Button,
  ResourceComponentPropsWithId,
  Record,
  useShowController,
  UrlField,
  FunctionField,
} from 'react-admin';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

import { Language } from '../../../api/generatedTypes/globalTypes';
import { Occurrences_occurrences_edges_node as Occurrence } from '../../../api/generatedTypes/Occurrences';
import LanguageTabs from '../../../common/components/languageTab/LanguageTabs';
import ViewTitle from '../../../common/components/viewTitle/ViewTitle';
import LongTextField from '../../../common/components/longTextField/LongTextField';
import KukkuuPageLayout from '../../application/layout/kukkuuPageLayout/KukkuuPageLayout';
import KukkuuDetailPage from '../../application/layout/kukkuuDetailPage/KukkuuDetailPage';
import OccurrenceTimeRangeField from '../../occurrences/fields/OccurrenceTimeRangeField';
import { PublishedField } from '../fields';
import { participantsPerInviteChoices, ticketSystemChoices } from '../choices';
import EventShowActions from './EventShowActions';
import { hasInternalTicketSystem } from '../utils';
import { AdminEvent } from '../types/EventTypes';
import ImportTicketSystemPasswordsFormDialog from '../../ticketSystemPassword/ImportTicketSystemPasswordsFormDialog';

const styles = createStyles({
  button: {
    marginBottom: '1em',
  },
});

interface AddOccurrenceButtonProps extends WithStyles<typeof styles> {
  record?: Occurrence;
}

const AddOccurrenceButton = withStyles(styles)(
  ({ classes, record }: AddOccurrenceButtonProps) => (
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
  )
);

interface ImportTicketSystemPasswordsButtonProps
  extends WithStyles<typeof styles> {
  onClick: () => void;
}

const ImportTicketSystemPasswordsButton = withStyles(styles)(
  ({ classes, onClick }: ImportTicketSystemPasswordsButtonProps) => {
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
  }
);

interface OccurrenceTabHeaderControlsProps {
  record: AdminEvent;
}

const OccurrenceTabHeaderControls = ({
  record,
}: OccurrenceTabHeaderControlsProps) => {
  const [isDialogShown, setShowDialog] = useState(false);
  const internalTicketSystem = hasInternalTicketSystem(record);
  return (
    <div>
      {!internalTicketSystem && (
        <>
          <ImportTicketSystemPasswordsButton
            onClick={() => setShowDialog(true)}
          />
          <ImportTicketSystemPasswordsFormDialog
            isOpen={isDialogShown}
            onClose={() => setShowDialog(false)}
            record={record}
          />
        </>
      )}
    </div>
  );
};

const EventShow = (props: ResourceComponentPropsWithId) => {
  const locale = useLocale();
  const [language, selectLanguage] = useState(Language.FI);
  const t = useTranslate();
  const { record } = useShowController<AdminEvent>(props);
  const internalTicketSystem = hasInternalTicketSystem(record);

  const getCrumbs = (record?: Record) => {
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
        ...props,
        actions: <EventShowActions permissions={props.permissions} />,
      }}
      layout={KukkuuPageLayout}
      breadcrumbs={(record?: Record) => getCrumbs(record)}
      pageTitleSource="name"
    >
      <TabbedShowLayout>
        <Tab label={'events.show.tab.label'}>
          <ViewTitle source="events.show.tab.label" />
          <LanguageTabs selectedLanguage={language} onSelect={selectLanguage} />
          <ImageField source="image" />
          <TextField
            source={`translations.${language}.imageAltText`}
            label={'events.fields.imageAltText.label'}
          />
          <TextField
            source={`translations.${language}.name`}
            label={'events.fields.name.label'}
          />
          <LongTextField
            source={`translations.${language}.shortDescription`}
            label={'events.fields.shortDescription.label'}
          />
          <LongTextField
            source={`translations.${language}.description`}
            label={'events.fields.description.label'}
          />
          <SelectField
            source="participantsPerInvite"
            label={'events.fields.participantsPerInvite.label'}
            choices={participantsPerInviteChoices}
          />
          <NumberField
            source={`duration`}
            label={'events.fields.duration.label'}
          />
          {internalTicketSystem ? (
            <NumberField
              source="capacityPerOccurrence"
              label="events.fields.capacityPerOccurrence.label"
            />
          ) : (
            <SelectField
              source="ticketSystem.type"
              label="events.fields.ticketSystem.label"
              choices={ticketSystemChoices}
            />
          )}
          <PublishedField locale={locale} />
        </Tab>
        <Tab label="events.fields.occurrences.label">
          {record && <OccurrenceTabHeaderControls record={record} />}
          <ReferenceManyField
            label=" "
            reference="occurrences"
            target="event_id"
          >
            <Datagrid rowClick="show">
              <DateField
                label="occurrences.fields.time.fields.date.label"
                source="time"
                locales={locale}
              />
              <OccurrenceTimeRangeField label="occurrences.fields.time.fields.time.label" />
              <ReferenceField
                label="occurrences.fields.venue.label"
                source="venue.id"
                reference="venues"
                link={false}
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
                <NumberField
                  source="enrolmentCount"
                  label="occurrences.fields.enrolmentsCount.label"
                />
              )}
              {internalTicketSystem && (
                <FunctionField
                  label="occurrences.fields.attendedEnrolmentsCount.label"
                  textAlign="right"
                  render={(record: any) => {
                    const attendedCount =
                      record?.enrolments?.edges?.filter(
                        (edge: any) => edge?.node?.attended
                      )?.length ?? '?';

                    return attendedCount;
                  }}
                />
              )}
              {internalTicketSystem && (
                <FunctionField
                  label="occurrences.fields.freeSpotNotificationSubscriptions.label"
                  textAlign="right"
                  render={(entity) =>
                    entity?.freeSpotNotificationSubscriptions?.edges?.length ??
                    '?'
                  }
                />
              )}
              {!internalTicketSystem && (
                <UrlField
                  source="ticketSystem.url"
                  label="occurrences.fields.ticketSystemUrl.label"
                />
              )}
            </Datagrid>
          </ReferenceManyField>
          <AddOccurrenceButton />
        </Tab>
      </TabbedShowLayout>
    </KukkuuDetailPage>
  );
};

export default EventShow;
