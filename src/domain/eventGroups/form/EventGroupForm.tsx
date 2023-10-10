import React from 'react';
import { TextInput, SimpleForm, SimpleFormProps } from 'react-admin';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  validateName,
  eventGroupsSchema,
  validateShortDescription,
} from '../validations';
import { Language } from '../../../api/generatedTypes/globalTypes';
import useTranslatableContext from '../../../common/hooks/useTranslatableContext';

type EventGroupFormProps = Omit<SimpleFormProps, 'children'>;

const EventGroupForm = (props: EventGroupFormProps) => {
  const { selectedLanguage, selector, getSource } = useTranslatableContext();
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <SimpleForm resolver={yupResolver(eventGroupsSchema)} {...props}>
      {selector}
      <TextInput
        variant="outlined"
        source={getSource('name')}
        label="eventGroups.fields.name.label"
        validate={selectedLanguage === Language.FI ? validateName : undefined}
        fullWidth
      />
      <TextInput
        variant="outlined"
        source={getSource('shortDescription')}
        label="eventGroups.fields.shortDescription.label"
        validate={validateShortDescription}
        helperText="eventGroups.fields.shortDescription.helperText"
        multiline
        fullWidth
      />
      <TextInput
        variant="outlined"
        source={getSource('description')}
        label="eventGroups.fields.description.label"
        helperText="eventGroups.fields.description.helperText"
        multiline
        fullWidth
      />
    </SimpleForm>
  );
};

export default EventGroupForm;
