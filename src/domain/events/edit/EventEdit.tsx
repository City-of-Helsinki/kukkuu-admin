import React, { useState } from 'react';
import {
  Edit,
  TextInput,
  SimpleForm,
  SelectInput,
  NumberInput,
  required,
  Toolbar,
  SaveButton,
  DeleteButton,
} from 'react-admin';
import { Grid } from '@material-ui/core';

import LanguageTabs from '../../../common/components/languageTab/LanguageTabs';
import { Language } from '../../../api/generatedTypes/globalTypes';
import { validateVenue } from '../../venues/validations';
import {
  validateCapacityPerOccurrence,
  validateDuration,
  validateParticipantsPerInvite,
  validateShortDescription,
} from '../validations';
import { participantsPerInviteChoices } from '../choices';
import ImageUploadField from '../../../common/components/imageField/ImageUploadField';

const EventEditToolbar = (props: any) => {
  return (
    <Toolbar style={{ justifyContent: 'space-between' }} {...props}>
      <SaveButton />
      <DeleteButton disabled={Boolean(props.record.occurrences.edges.length)} />
    </Toolbar>
  );
};

const EventEdit = (props: any) => {
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const translation = `translations.${selectedLanguage}`;

  // Undoable is false to prevent image from appearing while waiting for backend result.
  return (
    <Grid container direction="column" xs={6} item={true}>
      <Edit undoable={false} title={'events.edit.title'} {...props}>
        <SimpleForm
          variant="outlined"
          redirect="show"
          validate={validateVenue}
          toolbar={<EventEditToolbar />}
        >
          <LanguageTabs
            selectedLanguage={selectedLanguage}
            onSelect={selectLanguage}
          />
          <ImageUploadField edit={true} name="image" source="image" />
          <TextInput
            source={`${translation}.imageAltText`}
            label={'events.fields.imageAltText.label'}
            validate={null}
            fullWidth
          />
          <TextInput
            source={`${translation}.name`}
            label={'events.fields.name.label'}
            validate={selectedLanguage === Language.FI ? required() : null}
            fullWidth
          />
          <TextInput
            source={`${translation}.shortDescription`}
            label={'events.fields.shortDescription.label'}
            validate={validateShortDescription}
            multiline
            fullWidth
          />
          <TextInput
            source={`${translation}.description`}
            label={'events.fields.description.label'}
            multiline
            fullWidth
          />
          <SelectInput
            source="participantsPerInvite"
            label={'events.fields.participantsPerInvite.label'}
            choices={participantsPerInviteChoices}
            validate={validateParticipantsPerInvite}
            fullWidth
          />
          <NumberInput
            source="capacityPerOccurrence"
            label={'events.fields.capacityPerOccurrence.label'}
            validate={validateCapacityPerOccurrence}
            fullWidth
          />
          <NumberInput
            source="duration"
            label={'events.fields.duration.label'}
            validate={validateDuration}
            fullWidth
          />
        </SimpleForm>
      </Edit>
    </Grid>
  );
};

export default EventEdit;
