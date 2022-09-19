import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useTranslate } from 'react-admin';

import ticketSystemPasswordsApi from './api/ticketSystemPasswordsApi';
import { AdminEvent } from '../events/types/EventTypes';

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

    const onChangePasswordsText: React.ChangeEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      setPasswordsText(e.currentTarget.value);
    };

    const submitPasswords = async () => {
      // TODO: Handle messaging: errors and succefull import

      // Collect the passwords in a list
      // Every new line is a new password
      const passwords = passwordsText.split(/\r?\n/);

      // Submit the import event passwords mutation to the API
      await ticketSystemPasswordsApi.importTicketSystemPasswords({
        data: {
          eventId: record.id,
          passwords,
        },
      });

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
          {translate('event.ticketSystemPassword.import.dialog.title')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {translate('event.ticketSystemPassword.import.dialog.text')}
          </DialogContentText>
          <TextareaAutosize
            name="passwords"
            className={classes.passwordsField}
            aria-label={translate(
              'event.ticketSystemPassword.import.passwords.ariaLabel'
            )}
            placeholder={'0A1BC3D4E5\nABC123DEFG\n987A654B32'}
            rowsMin={10}
            value={passwordsText}
            onChange={onChangePasswordsText}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {translate('event.ticketSystemPassword.import.action.cancel')}
          </Button>
          <Button onClick={submitPasswords} color="primary">
            {translate('event.ticketSystemPassword.import.action.import')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default ImportTicketSystemPasswordsFormDialog;
