import { type SimpleFormProps, TextInput, SimpleForm } from 'react-admin';
import { yupResolver } from '@hookform/resolvers/yup';
import type { FieldValues, Resolver } from 'react-hook-form';

import {
  validateName,
  eventGroupsSchema,
  validateShortDescription,
} from '../validations';
import useTranslatableContext from '../../../common/hooks/useTranslatableContext';
import TranslatableProvider from '../../../common/providers/TranslatableProvider';
import { CopyTargetFields } from '../../events/copy/CopyTargetFields';
import { Language } from '../../api/generatedTypes/graphql';

type EventGroupFormProps = Omit<SimpleFormProps, 'children'> & {
  isCopy?: boolean;
};

type FormValues = {
  translations: {
    EN: { name?: string; shortDescription?: string; description?: string };
    FI: { name?: string; shortDescription?: string; description?: string };
    SV: { name?: string; shortDescription?: string; description?: string };
  };
};

const EventGroupForm = (props: EventGroupFormProps) => {
  const { isCopy, ...simpleFormProps } = props;
  const resolver: Resolver<FormValues> = yupResolver(eventGroupsSchema);
  return (
    <SimpleForm
      resolver={resolver as unknown as Resolver<FieldValues>}
      {...simpleFormProps}
    >
      {isCopy && <CopyTargetFields resource="event-groups" />}
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
