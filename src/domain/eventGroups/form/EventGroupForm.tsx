import React from 'react';
import type { SimpleFormProps } from 'react-admin';
import { TextInput, SimpleForm } from 'react-admin';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  validateName,
  eventGroupsSchema,
  validateShortDescription,
} from '../validations';
import useTranslatableContext from '../../../common/hooks/useTranslatableContext';
import TranslatableProvider from '../../../common/providers/TranslatableProvider';
import { Language } from '../../api/generatedTypes/graphql';

type EventGroupFormProps = Omit<SimpleFormProps, 'children'>;

const EventGroupForm = (props: EventGroupFormProps) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <SimpleForm resolver={yupResolver(eventGroupsSchema)} {...props}>
      <TranslatableProvider>
        <EventGroupFormFields />
      </TranslatableProvider>
    </SimpleForm>
  );
};

const EventGroupFormFields = () => {
  const {
    selectedLanguage,
    selector: languageTabsComponent,
    getSource: translatableField,
  } = useTranslatableContext();
  return (
    <>
      {languageTabsComponent}
      <TextInput
        variant="outlined"
        source={translatableField('name')}
        label="eventGroups.fields.name.label"
        validate={selectedLanguage === Language.Fi ? validateName : undefined}
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
    </>
  );
};

export default EventGroupForm;
