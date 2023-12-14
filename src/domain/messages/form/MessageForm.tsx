import React, { ChangeEvent } from 'react';
import {
  TextInput,
  SimpleForm,
  SelectInput,
  SimpleFormProps,
  FormDataConsumer,
  useTranslate,
  useRecordContext,
} from 'react-admin';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ProtocolType } from '../../../api/generatedTypes/globalTypes';
import EventSelect from '../../events/eventSelect/EventSelect';
import OccurrenceArraySelect from '../../occurrences/OccurrenceArraySelect';
import {
  validateRecipientSelection,
  validateSubject,
  validateBodyText,
  smsMessageSchema,
  emailMessageSchema,
} from '../validations';
import {
  recipientSelectionChoices,
  recipientsWithEventSelection,
} from '../choices';
import TranslatableProvider from '../../../common/providers/TranslatableProvider';
import TranslatableContext from '../../../common/contexts/TranslatableContext';

const CustomOnChange = ({ children, onChange, ...rest }: any) => {
  const form = useFormContext();

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
      columnGap: theme.spacing(2),
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
  formNoticeText: {
    marginBottom: theme.spacing(1),
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

type Props = Omit<SimpleFormProps, 'children'> & {
  protocol?: ProtocolType;
};

const MessageForm = ({ protocol, ...delegatedProps }: Props) => {
  const record = useRecordContext();

  // When editing, the record exists and the protocol is already set.
  if (record?.protocol) {
    protocol = record.protocol;
  }

  const t = useTranslate();
  const classes = useStyles();

  const handleRecipientSelectionChange = (
    event: ChangeEvent<HTMLInputElement>,
    form: ReturnType<typeof useFormContext>
  ) => {
    const recipients = event?.target.value;
    const name = event?.target.name;

    if (['ALL', 'INVITED'].includes(recipients)) {
      form.setValue('eventId', 'all');
      form.setValue('occurrenceIds', ['all']);
    }

    form.setValue(name, recipients);
  };

  const handleEvenIdChange = (
    event: ChangeEvent<HTMLInputElement>,
    form: ReturnType<typeof useFormContext>
  ) => {
    const value = event?.target.value;
    const name = event?.target.name;

    // Any time the user changes the event selection, reset
    // occurrenceIds
    form.setValue('occurrenceIds', ['all']);
    form.setValue(name, value);
  };

  return (
    <SimpleForm
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      resolver={yupResolver(
        protocol === ProtocolType.SMS ? smsMessageSchema : emailMessageSchema
      )}
      className={classes.form}
      {...delegatedProps}
    >
      <TranslatableProvider>
        <TranslatableContext.Consumer>
          {({
            selector: languageTabsComponent,
            getSource: translatableField,
          }) => (
            <>
              {protocol !== ProtocolType.SMS && languageTabsComponent}
              <CustomOnChange onChange={handleRecipientSelectionChange}>
                <SelectInput
                  variant="outlined"
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
                {({
                  formData: { recipientSelection },
                  getSource, // Pick away from ..rest
                  ...rest
                }) =>
                  recipientsWithEventSelection.includes(recipientSelection) && (
                    <CustomOnChange onChange={handleEvenIdChange}>
                      <EventSelect
                        {...rest}
                        variant="outlined"
                        source="eventId"
                        label="messages.fields.event.label"
                        fullWidth
                        className={classes.fullWidth}
                        emptyValue="all"
                        emptyText="messages.fields.event.all"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        initialValue={record?.event?.id || 'all'} // FIXME: This should no longer be needed KK-1017
                        defaultValue={record?.event?.id || 'all'}
                      />
                    </CustomOnChange>
                  )
                }
              </FormDataConsumer>
              <FormDataConsumer formClassName={classes.occurrences}>
                {({
                  formData: { eventId, recipientSelection },
                  getSource, // Pick away from ...rest
                  ...rest
                }) =>
                  eventId &&
                  eventId !== 'all' &&
                  recipientSelection !== 'INVITED' && (
                    <OccurrenceArraySelect
                      {...rest}
                      variant="outlined"
                      source="occurrenceIds"
                      label="messages.fields.occurrences.label"
                      eventId={eventId}
                      fullWidth
                      className={classes.fullWidth}
                      initialValue={getInitialOccurrenceIds(record)} // FIXME: This should no longer be needed KK-1017
                      defaultValue={getInitialOccurrenceIds(record)}
                      allText="messages.fields.occurrences.all"
                    />
                  )
                }
              </FormDataConsumer>
              {protocol === ProtocolType.EMAIL && (
                <TextInput
                  source={translatableField('subject')}
                  variant="outlined"
                  label="messages.fields.subject.label2"
                  validate={validateSubject}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
              <TextInput
                source={translatableField('bodyText')}
                label="messages.fields.bodyText.label"
                variant="outlined"
                validate={validateBodyText}
                multiline
                fullWidth
                rows={10}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {protocol === ProtocolType.SMS && (
                <>
                  <Typography
                    variant="subtitle2"
                    className={classes.formNoticeText}
                  >
                    {t('sms.create.messageSentImmediatelyNotice')}
                  </Typography>
                </>
              )}
            </>
          )}
        </TranslatableContext.Consumer>
      </TranslatableProvider>
    </SimpleForm>
  );
};

export default MessageForm;
