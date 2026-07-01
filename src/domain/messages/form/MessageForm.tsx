import type { ChangeEvent } from 'react';
import React from 'react';
import {
  type SimpleFormProps,
  TextInput,
  SimpleForm,
  SelectInput,
  FormDataConsumer,
  useTranslate,
  useRecordContext,
  usePermissions,
} from 'react-admin';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { FieldValues, Resolver } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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
  getRecipientSelectionChoicesByPermissions,
  recipientsWithEventSelection,
} from '../choices';
import TranslatableProvider from '../../../common/providers/TranslatableProvider';
import TranslatableContext from '../../../common/contexts/TranslatableContext';
import { ProtocolType } from '../../api/generatedTypes/graphql';
import type { Permissions } from '../../authentication/authProvider';
import projectService from '../../projects/projectService';

const CustomOnChange = ({ children, onChange, ...rest }: any) => {
  const form = useFormContext();
  return React.cloneElement(children, {
    ...rest,
    onChange: (e: ChangeEvent<HTMLInputElement>) => onChange(e, form),
  });
};

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

type FormValues = {
  recipientSelection: string;
  translations: {
    EN: { bodyText?: string };
    FI: { bodyText?: string };
    SV: { bodyText?: string };
  };
};

const MessageForm = ({ protocol, ...delegatedProps }: Props) => {
  const record = useRecordContext();
  const { permissions, isLoading: isLoadingPermissions } =
    usePermissions<Permissions>();
  const projectId = projectService.projectId ?? '';
  const canSendMessagesToAllRecipientsWithinProject = Boolean(
    permissions?.canSendMessagesToAllRecipientsWithinProject?.(projectId)
  );
  // When editing, the record exists and the protocol is already set.
  if (record?.protocol) {
    protocol = record.protocol;
  }

  const t = useTranslate();

  // Filter the list of recipient choices by permissions
  // NOTE: use `getFilteredRecipientSelectionChoicesByPermissions` if
  // the values are wanted to be hidden instead of disabled.
  const recipientSelectionChoices = getRecipientSelectionChoicesByPermissions({
    hasPermissionToSendToAll: canSendMessagesToAllRecipientsWithinProject,
  });

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

  if (isLoadingPermissions) {
    return null;
  }

  const resolver: Resolver<FormValues> = yupResolver(
    protocol === ProtocolType.Sms ? smsMessageSchema : emailMessageSchema
  );

  return (
    <SimpleForm
      resolver={resolver as unknown as Resolver<FieldValues>}
      sx={(theme) => ({
        '& > .MuiCardContent-root': {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'auto',
          columnGap: theme.spacing(2),
          '& > *': {
            gridColumn: '1 / -1',
          },
        },
      })}
      {...delegatedProps}
    >
      <TranslatableProvider>
        <TranslatableContext.Consumer>
          {({
            selector: languageTabsComponent,
            getSource: translatableField,
          }) => (
            <>
              {protocol !== ProtocolType.Sms && languageTabsComponent}
              <CustomOnChange onChange={handleRecipientSelectionChange}>
                <SelectInput
                  variant="outlined"
                  source="recipientSelection"
                  label="messages.fields.recipientSelection.label"
                  choices={recipientSelectionChoices}
                  validate={validateRecipientSelection}
                  defaultValue=""
                  fullWidth
                  sx={{ gridColumn: '1 !important' }}
                />
              </CustomOnChange>
              <Box sx={{ gridColumn: '1 !important' }}>
                <FormDataConsumer>
                  {({ formData: { recipientSelection }, ...rest }) =>
                    recipientsWithEventSelection.includes(
                      recipientSelection
                    ) && (
                      <CustomOnChange onChange={handleEvenIdChange}>
                        <EventSelect
                          {...rest}
                          variant="outlined"
                          source="eventId"
                          label="messages.fields.event.label"
                          fullWidth
                          emptyValue="all"
                          emptyText="messages.fields.event.all"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          defaultValue={record?.event?.id || 'all'}
                        />
                      </CustomOnChange>
                    )
                  }
                </FormDataConsumer>
              </Box>
              <Box sx={{ gridColumn: '2 !important' }}>
                <FormDataConsumer>
                  {({ formData: { eventId, recipientSelection }, ...rest }) =>
                    eventId &&
                    eventId !== 'all' &&
                    recipientSelection !== 'INVITED' && (
                      <Box sx={{ width: '100%' }}>
                        <OccurrenceArraySelect
                          {...rest}
                          source="occurrenceIds"
                          label="messages.fields.occurrences.label"
                          eventId={eventId}
                          defaultValue={getInitialOccurrenceIds(record)}
                          allText="messages.fields.occurrences.all"
                        />
                      </Box>
                    )
                  }
                </FormDataConsumer>
              </Box>
              {protocol === ProtocolType.Email && (
                <TextInput
                  source={translatableField('subject')}
                  variant="outlined"
                  label="messages.fields.subject.label2"
                  validate={validateSubject}
                  fullWidth
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
              />
              {protocol === ProtocolType.Sms && (
                <>
                  <Typography
                    variant="subtitle2"
                    sx={(theme) => ({ marginBottom: theme.spacing(1) })}
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
