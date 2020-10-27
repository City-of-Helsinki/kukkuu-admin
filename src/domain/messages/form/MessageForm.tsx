import React from 'react';
import {
  TextInput,
  SimpleForm,
  SelectInput,
  SimpleFormProps,
} from 'react-admin';

import EventSelect from '../../events/eventSelect/EventSelect';
import useLanguageTabs from '../hooks/useLanguageTabs';
import {
  validateRecipientSelection,
  validateSubject,
  validateBodyText,
  validateMessageForm,
} from '../validations';
import { recipientSelectionChoices } from '../choices';
import styles from './messageForm.module.css';

type Props = Omit<SimpleFormProps, 'children'>;

const MessageForm = (props: Props) => {
  const [
    languageTabsComponent,
    translatableField,
    language,
  ] = useLanguageTabs();

  return (
    <SimpleForm
      variant="outlined"
      redirect="show"
      validate={validateMessageForm}
      {...props}
    >
      {languageTabsComponent}
      <SelectInput
        source="recipientSelection"
        label="messages.fields.recipientSelection.label"
        choices={recipientSelectionChoices}
        validate={validateRecipientSelection}
        defaultValue="ALL"
        fullWidth
        formClassName={styles.inline}
      />
      <EventSelect
        source="eventId"
        label="messages.fields.event.label"
        fullWidth
        language={language}
        allowEmpty
        emptyValue="all"
        emptyText="messages.fields.event.all"
        defaultValue="all"
        formClassName={styles.inline}
        InputLabelProps={{
          shrink: true,
        }}
        initialValue={props?.record?.event?.id || 'all'}
      />
      <TextInput
        source={translatableField('subject')}
        label="messages.fields.subject.label2"
        validate={validateSubject}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextInput
        source={translatableField('bodyText')}
        label="messages.fields.bodyText.label"
        validate={validateBodyText}
        multiline
        fullWidth
        rows={10}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </SimpleForm>
  );
};

export default MessageForm;
