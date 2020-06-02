import React, { useState } from 'react';
import {
  Create,
  TextInput,
  useTranslate,
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

const EventCreate = (props: any) => {
  const translate = useTranslate();
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const translation = `translations.${selectedLanguage}`;

  return (
    <Grid container direction="column" xs={6} item={true}>
      <Create title={translate('events.create.title')} {...props}>
        <SimpleForm variant="outlined" redirect="show" validate={validateEvent}>
          <LanguageTabs
            selectedLanguage={selectedLanguage}
            onSelect={selectLanguage}
          />
          <ImageUploadField edit={true} source="image" image="image" />
          <TextInput
            source={`${translation}.imageAltText`}
            label={'events.fields.imageAltText.label'}
            validate={null}
            fullWidth
          />
          <TextInput
            source={`${translation}.name`}
            label={translate('events.fields.name.label')}
            validate={selectedLanguage === Language.FI ? required() : null}
            fullWidth
          />
          <TextInput
            source={`${translation}.shortDescription`}
            label={translate('events.fields.shortDescription.label')}
            validate={validateShortDescription}
            multiline
            fullWidth
          />
          <TextInput
            source={`${translation}.description`}
            label={translate('events.fields.description.label')}
            multiline
            fullWidth
          />
          <SelectInput
            source="participantsPerInvite"
            label={translate('events.fields.participantsPerInvite.label')}
            choices={participantsPerInviteChoices}
            validate={validateParticipantsPerInvite}
            fullWidth
          />
          <NumberInput
            source="capacityPerOccurrence"
            label={translate('events.fields.capacityPerOccurrence.label')}
            validate={validateCapacityPerOccurrence}
            fullWidth
          />
          <NumberInput
            source="duration"
            label={translate('events.fields.duration.label')}
            validate={validateDuration}
            fullWidth
          />
        </SimpleForm>
      </Create>
    </Grid>
  );
};

export default EventCreate;
