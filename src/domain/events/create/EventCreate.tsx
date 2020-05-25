import React, { useState } from 'react';
import {
  Create,
  TextInput,
  ImageInput,
  ImageField,
  useTranslate,
  SimpleForm,
  SelectInput,
  NumberInput,
  required,
} from 'react-admin';

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

const EventCreate = (props: any) => {
  const translate = useTranslate();
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const translation = `translations.${selectedLanguage}`;

  return (
    <Create title={translate('events.create.title')} {...props}>
      <SimpleForm redirect="show" validate={validateEvent}>
        <LanguageTabs
          selectedLanguage={selectedLanguage}
          onSelect={selectLanguage}
        />
        <ImageInput
          source="image"
          label={'events.fields.imageAltText.label'}
          accept="image/*"
          placeholder={<p>{translate('events.fields.imageInput.label')}</p>}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <TextInput
          source={`${translation}.imageAltText`}
          label={'events.fields.imageAltText.label'}
          validate={null}
        />
        <TextInput
          source={`${translation}.name`}
          label={translate('events.fields.name.label')}
          validate={selectedLanguage === Language.FI ? required() : null}
        />
        <TextInput
          source={`${translation}.shortDescription`}
          label={translate('events.fields.shortDescription.label')}
          validate={validateShortDescription}
          multiline
        />
        <TextInput
          source={`${translation}.description`}
          label={translate('events.fields.description.label')}
          multiline
        />
        <SelectInput
          source="participantsPerInvite"
          label={translate('events.fields.participantsPerInvite.label')}
          choices={participantsPerInviteChoices}
          validate={validateParticipantsPerInvite}
        />
        <NumberInput
          source="capacityPerOccurrence"
          label={translate('events.fields.capacityPerOccurrence.label')}
          validate={validateCapacityPerOccurrence}
        />
        <NumberInput
          source="duration"
          label={translate('events.fields.duration.label')}
          validate={validateDuration}
        />
      </SimpleForm>
    </Create>
  );
};

export default EventCreate;
