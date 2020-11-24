import React from 'react';
import { TextInput, SimpleForm, SimpleFormProps } from 'react-admin';

import useLanguageTabs from '../../../common/hooks/useLanguageTabs';
import {
  validateName,
  validateEventGroupForm,
  validateShortDescription,
} from '../validations';

type Props = Omit<SimpleFormProps, 'children'>;

const EventGroupForm = (props: Props) => {
  const [languageTabsComponent, translatableField] = useLanguageTabs();

  return (
    <SimpleForm
      variant="outlined"
      redirect="show"
      validate={validateEventGroupForm}
      {...props}
    >
      {languageTabsComponent}
      <TextInput
        source={translatableField('name')}
        label="eventGroups.fields.name.label"
        validate={validateName}
        fullWidth
      />
      <TextInput
        source={translatableField('shortDescription')}
        label="eventGroups.fields.shortDescription.label"
        validate={validateShortDescription}
        helperText="eventGroups.fields.shortDescription.helperText"
        multiline
        fullWidth
      />
      <TextInput
        source={translatableField('description')}
        label="eventGroups.fields.description.label"
        helperText="eventGroups.fields.description.helperText"
        multiline
        fullWidth
      />
    </SimpleForm>
  );
};

export default EventGroupForm;
