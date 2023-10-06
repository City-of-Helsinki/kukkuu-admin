import React from 'react';
import {
  InputProps,
  useInput,
  useRecordContext,
  useTranslate,
} from 'react-admin';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import moment from 'moment-timezone';
import { Grid } from '@mui/material';

const useStyles = makeStyles({
  dateTimeTextInput: { flexGrow: 1 },
  textFieldInput: { width: '100%' },
});

export type BoundedTextFieldProps = InputProps & TextFieldProps;

const BoundedTextField = (props: BoundedTextFieldProps) => {
  const translate = useTranslate();
  const classes = useStyles();

  const { label, variant, defaultValue, disabled } = props;
  const {
    field: { name, onChange },
    fieldState: { isTouched, error },
    formState: { isSubmitted },
    isRequired,
  } = useInput(props);

  return (
    <TextField
      variant={variant}
      className={classes.textFieldInput}
      size="small"
      name={name}
      label={label}
      onChange={onChange}
      error={!!(isTouched && error)}
      helperText={
        (isTouched || isSubmitted) && !!error
          ? translate(error?.message ?? '')
          : undefined
      }
      required={isRequired}
      defaultValue={defaultValue}
      disabled={disabled}
    />
  );
};

const validateDate = (value: string) => {
  return moment(value, 'D.M.YYYY', true).isValid()
    ? undefined
    : 'occurrences.fields.time.fields.date.errorMessage';
};

const validateTime = (value: string) => {
  return moment(value, 'H:mm', true).isValid()
    ? undefined
    : 'occurrences.fields.time.fields.time.errorMessage';
};

const DateTimeTextInput = ({
  variant,
  required,
  disabled,
}: Pick<BoundedTextFieldProps, 'variant' | 'required' | 'disabled'>) => {
  const record = useRecordContext();
  const defaultDate = record?.time
    ? moment(record.time).format('D.M.YYYY')
    : '';

  const defaultTime = record?.time ? moment(record.time).format('HH:mm') : '';

  const classes = useStyles();
  const translate = useTranslate();

  const dateLabel = `${translate(
    'occurrences.fields.time.fields.date.label'
  )} (${translate('occurrences.fields.time.fields.date.format')})`;
  const timeLabel = `${translate(
    'occurrences.fields.time.fields.time.label'
  )} (${translate('occurrences.fields.time.fields.time.format')})`;

  return (
    <div className={classes.dateTimeTextInput}>
      <Grid container spacing={1}>
        <Grid item md={6}>
          <BoundedTextField
            source="date"
            validate={validateDate}
            name="date"
            label={dateLabel}
            defaultValue={defaultDate}
            required={required}
            variant={variant}
            disabled={disabled}
          />
        </Grid>
        <Grid item md={6}>
          <BoundedTextField
            source="timeField"
            validate={validateTime}
            name="timeField"
            label={timeLabel}
            defaultValue={defaultTime}
            required={required}
            variant={variant}
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default DateTimeTextInput;
