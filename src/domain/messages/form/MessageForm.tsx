import React, { ChangeEvent } from 'react';
import {
  TextInput,
  SimpleForm,
  SelectInput,
  SimpleFormProps,
  FormDataConsumer,
} from 'react-admin';
import { makeStyles } from '@material-ui/core';
import { useForm } from 'react-final-form';

import useLanguageTabs from '../../../common/hooks/useLanguageTabs';
import EventSelect from '../../events/eventSelect/EventSelect';
import OccurrenceArraySelect from '../../occurrences/OccurrenceArraySelect';
import {
  validateRecipientSelection,
  validateSubject,
  validateBodyText,
  validateMessageForm,
} from '../validations';
import {
  recipientSelectionChoices,
  recipientsWithEventSelection,
} from '../choices';

const CustomOnChange = ({ children, onChange, ...rest }: any) => {
  const form = useForm();

  return React.cloneElement(children, {
    ...rest,
    onChange: (e: ChangeEvent<HTMLInputElement>) => onChange(e, form),
  });
};

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

  const handleRecipientSelectionChange = (
    event: ChangeEvent<HTMLInputElement>,
    form: any
  ) => {
    const value = event?.target.value;
    const name = event?.target.name;

    form.batch(() => {
      // When the user sets recipient as all, event and occurrence
      // choices are reset
      if (value === 'ALL') {
        form.change('eventId', 'all');
        form.change('occurrenceIds', ['all']);
      }

      form.change(name, value);
    });
  };

  const handleEvenIdChange = (
    event: ChangeEvent<HTMLInputElement>,
    form: any
  ) => {
    const value = event?.target.value;
    const name = event?.target.name;

    form.batch(() => {
      // Any time the user changes the event selection, reset
      // occurrenceIds
      form.change('occurrenceIds', ['all']);
      form.change(name, value);
    });
  };

  return (
    <SimpleForm
      variant="outlined"
      redirect="show"
      validate={validateMessageForm}
      {...props}
      className={classes.form}
    >
      {languageTabsComponent}
      <CustomOnChange onChange={handleRecipientSelectionChange}>
        <SelectInput
          source="recipientSelection"
          label="messages.fields.recipientSelection.label"
          choices={recipientSelectionChoices}
          validate={validateRecipientSelection}
          defaultValue="ALL"
          fullWidth
          formClassName={classes.recipientSelection}
        />
      </CustomOnChange>
      <FormDataConsumer formClassName={classes.event}>
        {({ formData: { recipientSelection }, ...rest }) =>
          recipientsWithEventSelection.includes(recipientSelection) && (
            <CustomOnChange onChange={handleEvenIdChange}>
              <EventSelect
                {...rest}
                source="eventId"
                label="messages.fields.event.label"
                fullWidth
                className={classes.fullWidth}
                allowEmpty
                emptyValue="all"
                emptyText="messages.fields.event.all"
                InputLabelProps={{
                  shrink: true,
                }}
                initialValue={props?.record?.event?.id || 'all'}
              />
            </CustomOnChange>
          )
        }
      </FormDataConsumer>
      <FormDataConsumer formClassName={classes.occurrences}>
        {({ formData: { eventId, recipientSelection }, ...rest }) =>
          eventId &&
          eventId !== 'all' &&
          recipientSelection !== 'INVITED' && (
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
