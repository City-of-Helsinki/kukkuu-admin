import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useNotify, useTranslate } from 'react-admin';

import ticketSystemPasswordsApi from './api/ticketSystemPasswordsApi';
import { AdminEvent } from '../events/types/EventTypes';
import { ImportTicketSystemPasswordsMutation_importTicketSystemPasswords as ImportTicketSystemPasswords } from '../../api/generatedTypes/ImportTicketSystemPasswordsMutation';

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

const ImportTicketSystemPasswordsFormDialog = withStyles(styles)(
  ({
    isOpen,
    onClose,
    classes,
    record,
  }: ImportTicketSystemPasswordsModalProps) => {
    const translate = useTranslate();
    const [passwordsText, setPasswordsText] = React.useState('');
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
        const response = await ticketSystemPasswordsApi.importTicketSystemPasswords(
          {
            data: {
              eventId: record.id,
              passwords,
            },
          }
        );
        const data = response?.data
          ? ((response.data as unknown) as ImportTicketSystemPasswords)
          : null;

        if (data?.errors?.length) {
          const passwordsWithError = data.errors.map((error) => error?.value);
          notify(
            translate('ticketSystemPassword.import.submit.passwords.error', {
              passwords: passwordsWithError.join(', '),
            }),
            'warning'
          );
        }

        notify(translate('ticketSystemPassword.import.submit.success'), 'info');
      } catch (e) {
        notify(translate('ticketSystemPassword.import.submit.error'), 'error');
      }

      // Clear input
      setPasswordsText('');

      // Close the dialog
      onClose();
    };

    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
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
            rowsMin={10}
            value={passwordsText}
            onChange={onChangePasswordsText}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            {translate('ticketSystemPassword.import.action.cancel')}
          </Button>
          <Button onClick={submitPasswords} color="primary">
            {translate('ticketSystemPassword.import.action.import')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default ImportTicketSystemPasswordsFormDialog;
