import React, { useState } from 'react';
import {
  TextInput,
  SimpleForm,
  SelectInput,
  NumberInput,
  required,
  Toolbar,
  SaveButton,
  DeleteButton,
  useTranslate,
} from 'react-admin';
import { CardHeader, Grid } from '@material-ui/core';

import LanguageTabs from '../../../common/components/languageTab/LanguageTabs';
import { Language } from '../../../api/generatedTypes/globalTypes';
import { validateVenue } from '../../venues/validations';
import {
  validateCapacityPerOccurrence,
  validateDuration,
  validateParticipantsPerInvite,
  validateShortDescription,
} from '../validations';
import { participantsPerInviteChoices, ticketSystemChoices } from '../choices';
import ImageUploadField from '../../../common/components/imageField/ImageUploadField';
import ViewTitle from '../../../common/components/viewTitle/ViewTitle';
import KukkuuEdit from '../../application/layout/kukkuuEditPage/KukkuuEdit';

const EventEditToolbar = (props: any) => {
  return (
    <Toolbar style={{ justifyContent: 'space-between' }} {...props}>
      <SaveButton />
      <DeleteButton
        disabled={Boolean(props.record.occurrences.edges.length)}
        undoable={props.undoable}
      />
    </Toolbar>
  );
};

const EventEdit = (props: any) => {
  const translate = useTranslate();
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const translation = `translations.${selectedLanguage}`;

  // Undoable is false to prevent image from appearing while waiting for backend result.
  return (
    <>
      <CardHeader title={translate('events.edit.title')} />
      <Grid container direction="column" xs={6} item={true}>
        <KukkuuEdit undoable={false} title={'events.edit.title'} {...props}>
          <SimpleForm
            variant="outlined"
            redirect="show"
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            validate={validateVenue}
            toolbar={<EventEditToolbar />}
            sanitizeEmptyValues={false}
          >
            <ViewTitle source={'events.edit.title'} />
            <LanguageTabs
              selectedLanguage={selectedLanguage}
              onSelect={selectLanguage}
            />
            <ImageUploadField
              edit={true}
              name="image"
              source="image"
              helperText="events.fields.image.helperText"
            />
            <TextInput
              source={`${translation}.imageAltText`}
              label="events.fields.imageAltText.label"
              helperText="events.fields.imageAltText.helperText"
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              validate={null}
              fullWidth
            />
            <TextInput
              source={`${translation}.name`}
              label="events.fields.name.label"
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              validate={selectedLanguage === Language.FI ? required() : null}
              fullWidth
              helperText="Tähän laitetaan tapahtuman nimi"
            />
            <TextInput
              source={`${translation}.shortDescription`}
              label="events.fields.shortDescription.label"
              helperText="events.fields.shortDescription.helperText"
              validate={validateShortDescription}
              multiline
              fullWidth
            />
            <TextInput
              source={`${translation}.description`}
              label="events.fields.description.label"
              helperText="events.fields.description.helperText"
              multiline
              fullWidth
            />
            <SelectInput
              source="participantsPerInvite"
              label="events.fields.participantsPerInvite.label"
              helperText="events.fields.participantsPerInvite.helperText"
              choices={participantsPerInviteChoices}
              validate={validateParticipantsPerInvite}
              fullWidth
            />
            <NumberInput
              source="capacityPerOccurrence"
              label="events.fields.capacityPerOccurrence.label"
              helperText="events.fields.capacityPerOccurrence.helperText"
              validate={validateCapacityPerOccurrence}
              fullWidth
            />
            <NumberInput
              source="duration"
              label="events.fields.duration.label"
              helperText="events.fields.duration.helperText"
              validate={validateDuration}
              fullWidth
            />
            <SelectInput
              source="ticketSystem.type"
              label="events.fields.ticketSystem.label"
              choices={ticketSystemChoices}
              fullWidth
            />
          </SimpleForm>
        </KukkuuEdit>
      </Grid>
    </>
  );
};

export default EventEdit;
