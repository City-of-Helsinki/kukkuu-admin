import React from 'react';
import { TextInput, SimpleForm, SimpleFormProps } from 'react-admin';

import useLanguageTabs from '../../../common/hooks/useLanguageTabs';
import {
  validateName,
  validateEventGroupForm,
  validateShortDescription,
} from '../validations';

type EventGroupFormProps = Omit<SimpleFormProps, 'children'>;

const EventGroupForm = (props: EventGroupFormProps) => {
  const [languageTabsComponent, translatableField] = useLanguageTabs();

  // TODO: refactor form validate with YUP
  // https://marmelab.com/react-admin/Upgrade.html#input-level-validation-now-triggers-on-submit
  return (
    <SimpleForm validate={validateEventGroupForm} {...props}>
      {languageTabsComponent}
      <TextInput
        variant="outlined"
        source={translatableField('name')}
        label="eventGroups.fields.name.label"
        validate={validateName}
        fullWidth
      />
      <TextInput
        variant="outlined"
        source={translatableField('shortDescription')}
        label="eventGroups.fields.shortDescription.label"
        validate={validateShortDescription}
        helperText="eventGroups.fields.shortDescription.helperText"
        multiline
        fullWidth
      />
      <TextInput
        variant="outlined"
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
