import React from 'react';
import {
  TextInput,
  SimpleForm,
  SimpleFormProps,
  TranslatableContext,
} from 'react-admin';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  validateName,
  eventGroupsSchema,
  validateShortDescription,
} from '../validations';
import { Language } from '../../../api/generatedTypes/globalTypes';
import KukkuuTranslatableInputs from '../../../common/components/translatableInputs/KukkuuTranslatableInputs';

type EventGroupFormProps = Omit<SimpleFormProps, 'children'>;

const EventGroupForm = (props: EventGroupFormProps) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <SimpleForm resolver={yupResolver(eventGroupsSchema)} {...props}>
      <KukkuuTranslatableInputs>
        <TranslatableContext.Consumer>
          {/* The translatable works so that it injects the source-attribute to it's
          children, but not to grandchildrens, so getSource is needed with the
          consumer as the consumer is the first level child. */}
          {/* The fields needs to be unmounted to refresh them, so a key-property is needed */}
          {({ selectedLocale, getSource }) => (
            <div key={`translations-${selectedLocale}`}>
              <TextInput
                variant="outlined"
                source={getSource('name')}
                label="eventGroups.fields.name.label"
                validate={
                  selectedLocale === Language.FI ? validateName : undefined
                }
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
            </div>
          )}
        </TranslatableContext.Consumer>
      </KukkuuTranslatableInputs>
    </SimpleForm>
  );
};

export default EventGroupForm;
