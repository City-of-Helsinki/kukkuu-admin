import { useState } from 'react';
import { useTranslate } from 'react-admin';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import moment from 'moment-timezone';

// The value format of <input type="date">
const DATE_FORMAT = 'YYYY-MM-DD';
// Strict parsing with "H" accepts both "8:15" and "08:15"
const TIME_FORMAT = 'H:mm';

type Props = {
  isOpen: boolean;
  loading?: boolean;
  title: string;
  content: string;
  registrationOpensAtHelperText?: string;
  /** Called with the registration opening time as a timezone-aware ISO string. */
  onConfirm: (registrationOpensAt: string) => void;
  onClose: () => void;
};

const parseRegistrationOpensAt = (date: string, time: string) => {
  if (!date || !time) return null;
  const parsed = moment(
    `${date} ${time}`,
    `${DATE_FORMAT} ${TIME_FORMAT}`,
    true
  );
  return parsed.isValid() ? parsed : null;
};

const PublishDialog = ({
  isOpen,
  loading = false,
  title,
  content,
  registrationOpensAtHelperText,
  onConfirm,
  onClose,
}: Props) => {
  const translate = useTranslate();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isTimeTouched, setIsTimeTouched] = useState(false);

  const registrationOpensAt = parseRegistrationOpensAt(date, time);
  const isTimeFormatInvalid =
    time !== '' && !moment(time, TIME_FORMAT, true).isValid();
  const isInPast =
    registrationOpensAt !== null && !registrationOpensAt.isAfter(moment());

  let timeErrorMessage: string | undefined;
  if (isTimeFormatInvalid && isTimeTouched) {
    timeErrorMessage = translate('generic.publishDialog.time.errorMessage');
  } else if (isInPast) {
    timeErrorMessage = translate('generic.publishDialog.pastErrorMessage');
  }

  const reset = () => {
    setDate('');
    setTime('');
    setIsTimeTouched(false);
  };

  const handleConfirm = () => {
    if (registrationOpensAt && !isInPast) {
      onConfirm(registrationOpensAt.toISOString());
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="publish-dialog-title"
      slotProps={{ transition: { onExited: reset } }}
    >
      <DialogTitle id="publish-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{translate(content)}</DialogContentText>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <TextField
            type="date"
            variant="outlined"
            size="small"
            required
            fullWidth
            label={translate('generic.publishDialog.date.label')}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: moment().format(DATE_FORMAT) }}
          />
          <TextField
            type="text"
            variant="outlined"
            size="small"
            required
            fullWidth
            label={`${translate('generic.publishDialog.time.label')} (${translate(
              'generic.publishDialog.time.format'
            )})`}
            value={time}
            onChange={(event) => setTime(event.target.value.trim())}
            onBlur={() => setIsTimeTouched(true)}
            error={Boolean(timeErrorMessage)}
            helperText={timeErrorMessage}
            inputProps={{ inputMode: 'numeric', autoComplete: 'off' }}
          />
        </Stack>
        {registrationOpensAtHelperText && (
          <DialogContentText variant="body2" sx={{ mt: 2 }}>
            {translate(registrationOpensAtHelperText)}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{translate('ra.action.cancel')}</Button>
        <Button
          onClick={handleConfirm}
          disabled={loading || !registrationOpensAt || isInPast}
        >
          {translate('ra.action.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PublishDialog;
