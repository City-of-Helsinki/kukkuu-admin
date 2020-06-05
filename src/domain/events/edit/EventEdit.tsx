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
import Typography from '@material-ui/core/Typography';

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

const Aside = () => (
  <div style={{ width: 200, margin: '1em' }}>
    <Typography variant="h6">Tapahtuman muokkaus</Typography>
    <Typography variant="body2">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis
        leo et sapien aliquam malesuada. Mauris finibus eget nulla ut tempor.
        Mauris sodales mi ac ex semper, vitae luctus tellus bibendum.
      </p>
      <p>
        Fusce et feugiat eros. Aliquam ornare blandit sem, id suscipit ex dictum
        eu. Sed nec orci at turpis commodo dapibus. Quisque ut facilisis augue.
        Mauris mattis quam ac ligula fermentum auctor.
      </p>
      <p>
        Sed fringilla dolor ut metus pulvinar tempor. Praesent rhoncus semper
        vestibulum. Vestibulum at nisi at orci pretium condimentum ut vulputate
        ex. Aliquam pretium placerat lectus quis cursus. Praesent tincidunt nisi
        ac ipsum gravida aliquet.
      </p>
    </Typography>
  </div>
);

const EventEdit = (props: any) => {
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const translation = `translations.${selectedLanguage}`;

  // Undoable is false to prevent image from appearing while waiting for backend result.
  return (
    <Grid container direction="column" xs={6} item={true}>
      <Edit
        undoable={false}
        title={'events.edit.title'}
        aside={<Aside />}
        {...props}
      >
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
        </SimpleForm>
      </Edit>
    </Grid>
  );
};

export default EventEdit;
