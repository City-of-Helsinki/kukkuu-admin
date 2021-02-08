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
import { participantsPerInviteChoices } from '../choices';
import EventShowActions from './EventShowActions';

const styles = createStyles({
  button: {
    marginBottom: '1em',
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

const EventShow = (props: ResourceComponentPropsWithId) => {
  const locale = useLocale();
  const [language, selectLanguage] = useState(Language.FI);
  const t = useTranslate();

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
          <NumberField
            source={`capacityPerOccurrence`}
            label={'events.fields.capacityPerOccurrence.label'}
          />
          <PublishedField locale={locale} />
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
              <OccurrenceTimeRangeField label="occurrences.fields.time.fields.time.label" />
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
                source="record.freeSpotNotificationSubscriptions.edges.length"
                label="occurrences.fields.freeSpotNotificationSubscriptions.label"
                textAlign="right"
                emptyText="0"
              />
            </Datagrid>
          </ReferenceManyField>
          <AddOccurrenceButton />
        </Tab>
      </TabbedShowLayout>
    </KukkuuDetailPage>
  );
};

export default EventShow;
