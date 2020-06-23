import React, { FunctionComponent, useState, Fragment } from 'react';
import {
  Show,
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
  useMutation,
  EditButton,
  TopToolbar,
  useNotify,
  useRefresh,
  Confirm,
} from 'react-admin';
import {
  withStyles,
  WithStyles,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import * as Sentry from '@sentry/browser';

import { participantsPerInviteChoices } from '../choices';
import LanguageTabs from '../../../common/components/languageTab/LanguageTabs';
import { Language } from '../../../api/generatedTypes/globalTypes';
import { Occurrences_occurrences_edges_node as Occurrence } from '../../../api/generatedTypes/Occurrences';
import { OccurrenceTimeRangeField } from '../../occurrences/fields';
import { AdminEvent } from '../types/EventTypes';
import ViewTitle from '../../../common/components/viewTitle/ViewTitle';

const styles = createStyles({
  button: {
    marginBottom: '1em',
  },
});

const useStyles = makeStyles({
  root: {
    '&> .MuiToolbar-regular  ': {
      justifyContent: 'flex-start',
    },
  },
});

interface Props extends WithStyles<typeof styles> {
  record?: Occurrence;
}

const AddOccurrenceButton = withStyles(styles)(({ classes, record }: Props) => (
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
));

const PublishButton = ({ record }: { record?: AdminEvent }) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const [open, setOpen] = useState(false);
  const translate = useTranslate();
  const [publish, { loading }] = useMutation(
    {
      type: 'publish',
      resource: 'events',
      payload: { id: record?.id },
    },
    {
      onSuccess: ({ data }: { data: any }) => {
        notify('events.show.publish.onSuccess.message');
        refresh();
      },
      onFailure: (error: Error) => {
        console.error(error);
        Sentry.captureException(error);
        notify('events.show.publish.onSuccess.message', 'warning');
      },
    }
  );
  if (record?.publishedAt) {
    return null;
  }
  const handleClick = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);
  const handleConfirm = () => {
    publish();
    setOpen(false);
  };

  return (
    <Fragment>
      <Button
        label="events.show.publish.button.label"
        onClick={handleClick}
        disabled={loading}
      >
        <DoneOutlineIcon />
      </Button>
      <Confirm
        isOpen={open}
        loading={loading}
        title={translate('events.show.publish.confirm.title', {
          eventName: record?.translations?.FI?.name,
        })}
        content="events.show.publish.confirm.content"
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </Fragment>
  );
};

const EventShowActions = ({
  basePath,
  data,
  resource,
}: {
  basePath?: string;
  data?: AdminEvent;
  resource?: string;
}) => (
  <TopToolbar>
    <EditButton basePath={basePath} record={data} />
    <PublishButton record={data} />
  </TopToolbar>
);

const EventShow: FunctionComponent = (props: any) => {
  const locale = useLocale();
  const classes = useStyles();
  const [language, selectLanguage] = useState(Language.FI);

  return (
    <Show
      actions={<EventShowActions />}
      classes={{ root: classes.root }}
      {...props}
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

          <TextField
            source={`translations.${language}.shortDescription`}
            label={'events.fields.shortDescription.label'}
          />

          <TextField
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

          <NumberField
            source={`capacityPerOccurrence`}
            label={'events.fields.capacityPerOccurrence.label'}
          />

          <DateField
            source={`publishedAt`}
            label={'events.fields.publishedAt.label'}
            showTime={true}
            locales={locale}
          />
        </Tab>
        <Tab label="events.fields.occurrences.label">
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
              <OccurrenceTimeRangeField
                label="occurrences.fields.time.fields.time.label"
                locales={locale}
              />
              <ReferenceField
                label="occurrences.fields.venue.label"
                source="venue.id"
                reference="venues"
                link={false}
              >
                <TextField source="translations.FI.name" />
              </ReferenceField>
              <NumberField
                source="event.capacityPerOccurrence"
                label="occurrences.fields.capacity.label"
              />
              <NumberField
                source="enrolmentCount"
                label="occurrences.fields.enrolmentsCount.label"
              />
            </Datagrid>
          </ReferenceManyField>
          <AddOccurrenceButton />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

export default EventShow;
