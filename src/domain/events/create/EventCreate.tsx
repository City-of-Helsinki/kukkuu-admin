import React, { useState } from 'react';
import {
  Create,
  TextInput,
  SimpleForm,
  SelectInput,
  NumberInput,
  required,
} from 'react-admin';
import { Grid } from '@material-ui/core';

import LanguageTabs from '../../../common/components/languageTab/LanguageTabs';
import { Language } from '../../../api/generatedTypes/globalTypes';
import {
  validateCapacityPerOccurrence,
  validateDuration,
  validateEvent,
  validateParticipantsPerInvite,
  validateShortDescription,
} from '../validations';
import { participantsPerInviteChoices } from '../choices';
import ImageUploadField from '../../../common/components/imageField/ImageUploadField';
import Aside from '../../../common/components/aside/Aside';

const EventCreate = (props: any) => {
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const translation = `translations.${selectedLanguage}`;

  return (
    <Grid container direction="column" xs={6} item={true}>
      <Create
        title="events.create.title"
        aside={<Aside content="events.create.aside.content" />}
        {...props}
      >
        <SimpleForm variant="outlined" redirect="show" validate={validateEvent}>
          <LanguageTabs
            selectedLanguage={selectedLanguage}
            onSelect={selectLanguage}
          />
          <ImageUploadField edit={true} source="image" image="image" />
          <TextInput
            source={`${translation}.imageAltText`}
            label="events.fields.imageAltText.label"
            helperText="events.fields.imageAltText.helperText"
            validate={null}
            fullWidth
          />
          <TextInput
            source={`${translation}.name`}
            label="events.fields.name.label"
            validate={selectedLanguage === Language.FI ? required() : null}
            fullWidth
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
        </SimpleForm>
      </Create>
    </Grid>
  );
};

export default EventCreate;
