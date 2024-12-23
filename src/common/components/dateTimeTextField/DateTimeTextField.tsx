import React from 'react';
import { type InputProps, type Validator , useInput, useRecordContext, useTranslate } from 'react-admin';
import TextField, type { TextFieldProps } from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import moment from 'moment-timezone';
import { Grid } from '@mui/material';

const useStyles = makeStyles({
  dateTimeTextInput: { flexGrow: 1 },
  textFieldInput: { width: '100%' },
});

/**
 * Removes the special prefix `@@react-admin@@` and the needless quotation marks
 * that might be added by the useInput-hook.
 * @param message the translation key (with ra-core's special prefix to avoid double translation)
 * @returns the fixed translation key
 * @example
 *    Warning: Missing translation for key: "@@react-admin@@"occurrences.fields.time.fields.time.errorMessage""
 * @example
 *    // a code related to the validation in the useInput.ts...
 *    validate: async (value, values) => {
 *        if (!sanitizedValidate) return true;
 *        const error = await sanitizedValidate(value, values, props);
 *        if (!error) return true;
 *        // react-hook-form expects errors to be plain strings but our validators can return objects
 *        // that have message and args.
 *        // To avoid double translation for users that validate with a schema instead of our validators
 *        // we use a special format for our validators errors.
 *        // The ValidationError component will check for this format and extract the message and args
 *        // to translate.
 *        return `@@react-admin@@${JSON.stringify(error)}`
 */
const handleUseInputDoubleValidationMessage = (message: string) =>
  message.replace('@@react-admin@@', '').replaceAll('"', '');

export type BoundedTextFieldProps = InputProps & TextFieldProps;

const BoundedTextField = (props: BoundedTextFieldProps) => {
  const translate = useTranslate();
  const classes = useStyles();
  const {
    field,
    fieldState: { isTouched, error },
    formState: { isSubmitted },
  } = useInput(props);

  return (
    <TextField
      {...props}
      {...field}
      className={classes.textFieldInput}
      size="small"
      error={!!(isTouched && error)}
      helperText={
        (isTouched || isSubmitted) && !!error
          ? translate(
              handleUseInputDoubleValidationMessage(error?.message ?? '')
            )
          : undefined
      }
    />
  );
};

const validateDate: Validator = (value: string) =>
  moment(value, 'D.M.YYYY', true)?.isValid()
    ? undefined
    : 'occurrences.fields.time.fields.date.errorMessage';

const validateTime: Validator = (value: string) =>
  moment(value, 'H:mm', true)?.isValid()
    ? undefined
    : 'occurrences.fields.time.fields.time.errorMessage';

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
