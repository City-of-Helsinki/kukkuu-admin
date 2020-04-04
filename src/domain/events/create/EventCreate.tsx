import React, { useState } from 'react';
import {
  Create,
  TextInput,
  useTranslate,
  SimpleForm,
  SelectInput,
  NumberInput,
  maxLength,
  minValue,
  required,
} from 'react-admin';

import LanguageTabs from '../../../common/components/languageTab/LanguageTabs';
import { Language } from '../../../api/generatedTypes/globalTypes';

const validateShortDescription = maxLength(160);

const validateParticipantsPerInvite = required();

const validateCapacityPerOccurrence = [minValue(0), required()];

const validateDuration = minValue(0);

const EventCreate = (props: any) => {
  const translate = useTranslate();
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const translation = `translations.${selectedLanguage}`;

  return (
    <Create title={translate('events.show.tab.label')} {...props}>
      <SimpleForm>
        <LanguageTabs
          selectedLanguage={selectedLanguage}
          onSelect={selectLanguage}
        />
        <TextInput
          source={`${translation}.name`}
          label={translate('events.fields.name.label')}
          validate={selectedLanguage === Language.FI ? required() : null}
        />
        <TextInput
          source={`${translation}.description`}
          label={translate('events.fields.description.label')}
          multiline
        />
        <TextInput
          source={`${translation}.shortDescription`}
          label={translate('events.fields.shortDescription.label')}
          validate={validateShortDescription}
          multiline
        />
        <SelectInput
          source="participantsPerInvite"
          label={translate('events.fields.participantsPerInvite.label')}
          choices={[
            {
              id: 'CHILD_AND_GUARDIAN',
              name: translate(
                'events.fields.participantsPerInvite.choices.CHILD_AND_GUARDIAN.label'
              ),
            },
            {
              id: 'FAMILY',
              name: translate(
                'events.fields.participantsPerInvite.choices.FAMILY.label'
              ),
            },
          ]}
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
