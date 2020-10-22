import React, { useState, ReactElement } from 'react';
import {
  TextInput,
  SimpleForm,
  SelectInput,
  SimpleFormProps,
} from 'react-admin';

import LanguageTabs from '../../../common/components/languageTab/LanguageTabs';
import { Language } from '../../../api/generatedTypes/globalTypes';
import EventSelect from '../../events/eventSelect/EventSelect';
import {
  validateRecipientSelection,
  validateSubject,
  validateBodyText,
} from '../validations';
import { recipientSelectionChoices } from '../choices';
import styles from './messageForm.module.css';

function useLanguageTabs(): [
  ReactElement,
  (fieldName: string) => string,
  Language,
  (language: Language) => void
] {
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const tField = (fieldName: string) =>
    `translations.${selectedLanguage}.${fieldName}`;
  const component = (
    <LanguageTabs
      selectedLanguage={selectedLanguage}
      onSelect={selectLanguage}
    />
  );

  return [component, tField, selectedLanguage, selectLanguage];
}

type Props = Omit<SimpleFormProps, 'children'>;

const MessageForm = (props: Props) => {
  const [
    languageTabsComponent,
    translatableField,
    language,
  ] = useLanguageTabs();

  return (
    <SimpleForm variant="outlined" redirect="show" {...props}>
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
