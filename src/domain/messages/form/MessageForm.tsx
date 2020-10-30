import React from 'react';
import {
  TextInput,
  SimpleForm,
  SelectInput,
  SimpleFormProps,
  FormDataConsumer,
} from 'react-admin';
import { makeStyles } from '@material-ui/core';

import EventSelect from '../../events/eventSelect/EventSelect';
import OccurrenceArraySelect from '../../occurrences/OccurrenceArraySelect';
import useLanguageTabs from '../hooks/useLanguageTabs';
import {
  validateRecipientSelection,
  validateSubject,
  validateBodyText,
  validateMessageForm,
} from '../validations';
import { recipientSelectionChoices } from '../choices';

const useStyles = makeStyles((theme) => ({
  form: {
    '& > .MuiCardContent-root': {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'auto',
      columnGap: theme.spacing(2) + 'px',
      '& > *': {
        gridColumn: '1 / -1',
      },
    },
  },
  recipientSelection: {
    gridColumn: '1 !important',
  },
  event: {
    gridColumn: '1 !important',
  },
  occurrences: {
    gridColumn: '2 !important',
  },
  fullWidth: {
    width: '100%',
  },
}));

function getInitialOccurrenceIds(record: any) {
  if (!record?.occurrences?.edges || record.occurrences.edges.length === 0) {
    return ['all'];
  }

  return record.occurrences.edges.map(
    (occurrenceNode: any) => occurrenceNode.node.id
  );
}

type Props = Omit<SimpleFormProps, 'children'>;

const MessageForm = (props: Props) => {
  const [languageTabsComponent, translatableField] = useLanguageTabs();
  const classes = useStyles();

  return (
    <SimpleForm
      variant="outlined"
      redirect="show"
      validate={validateMessageForm}
      {...props}
      className={classes.form}
    >
      {languageTabsComponent}
      <SelectInput
        source="recipientSelection"
        label="messages.fields.recipientSelection.label"
        choices={recipientSelectionChoices}
        validate={validateRecipientSelection}
        defaultValue="ALL"
        fullWidth
        formClassName={classes.recipientSelection}
      />
      <EventSelect
        source="eventId"
        label="messages.fields.event.label"
        fullWidth
        allowEmpty
        emptyValue="all"
        emptyText="messages.fields.event.all"
        formClassName={classes.event}
        InputLabelProps={{
          shrink: true,
        }}
        initialValue={props?.record?.event?.id || 'all'}
      />
      <FormDataConsumer formClassName={classes.occurrences}>
        {({ formData: { eventId }, ...rest }) =>
          eventId &&
          eventId !== 'all' && (
            <OccurrenceArraySelect
              {...rest}
              source="occurrenceIds"
              label="messages.fields.occurrences.label"
              eventId={eventId}
              fullWidth
              className={classes.fullWidth}
              initialValue={getInitialOccurrenceIds(props.record)}
              allText="messages.fields.occurrences.all"
            />
          )
        }
      </FormDataConsumer>
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
