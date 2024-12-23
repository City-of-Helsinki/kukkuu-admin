import React from 'react';
import { type WithStyles, withStyles, createStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useNotify, useTranslate, useRefresh } from 'react-admin';

import ticketSystemPasswordsApi from './api/ticketSystemPasswordsApi';
import type { AdminEvent } from '../events/types/EventTypes';
import type { ImportTicketSystemPasswordsMutationPayload } from '../api/generatedTypes/graphql';

const styles = createStyles({
  passwordsField: {
    width: '100%',
  },
});

interface ImportTicketSystemPasswordsModalProps
  extends WithStyles<typeof styles> {
  isOpen: boolean;
  onClose: () => void;
  record: AdminEvent;
}

const ImportTicketSystemPasswordsFormDialog = withStyles(styles)(({
  isOpen,
  onClose,
  classes,
  record,
}: ImportTicketSystemPasswordsModalProps) => {
  const translate = useTranslate();
  const [passwordsText, setPasswordsText] = React.useState('');
  const refresh = useRefresh();
  const notify = useNotify();
  const onChangePasswordsText: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setPasswordsText(e.currentTarget.value);
  };

  const submitPasswords = async () => {
    // Collect the passwords in a list
    // Every new line is a new password
    const passwords = passwordsText.split(/\r?\n/);

    // Submit the import event passwords mutation to the API
    try {
      const response =
        await ticketSystemPasswordsApi.importTicketSystemPasswords({
          data: {
            eventId: record.id,
            passwords,
          },
        });
      const data = response?.data
        ? (response.data as ImportTicketSystemPasswordsMutationPayload)
        : null;

      if (data?.errors?.length) {
        const passwordsWithError = data.errors.map((error) => error?.value);
        notify('ticketSystemPassword.import.submit.passwords.error', {
          type: 'warning',
          passwords: passwordsWithError.join(', '),
        });
      }

      notify('ticketSystemPassword.import.submit.success', { type: 'info' });
    } catch (e) {
      notify('ticketSystemPassword.import.submit.error', { type: 'error' });
    }

    // Clear input
    setPasswordsText('');

    // Close the dialog
    onClose();

    refresh();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {translate('ticketSystemPassword.import.dialog.title')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {translate('ticketSystemPassword.import.dialog.text')}
        </DialogContentText>
        <TextareaAutosize
          name="passwords"
          className={classes.passwordsField}
          aria-label={translate(
            'ticketSystemPassword.import.passwords.ariaLabel'
          )}
          placeholder={translate(
            'ticketSystemPassword.import.passwords.placeholder'
          )}
          minRows={10}
          value={passwordsText}
          onChange={onChangePasswordsText}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {translate('ticketSystemPassword.import.action.cancel')}
        </Button>
        <Button
          onClick={() => {
            void (async () => {
              await submitPasswords();
            })();
          }}
          color="primary"
        >
          {translate('ticketSystemPassword.import.action.import')}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default ImportTicketSystemPasswordsFormDialog;
