import React from 'react';
import {
  type InputProps,
  type Validator,
  useInput,
  useRecordContext,
  useTranslate,
} from 'react-admin';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import moment from 'moment-timezone';
import { Grid } from '@mui/material';

import AppConfig from '../../../domain/application/AppConfig';

const momentValidationDateFormats = ['D.M.YYYY', 'DD.MM.YYYY'] as const;

const momentValidationTimeFormats = ['H:mm', 'HH:mm'] as const;

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
  const {
    // Use nonControllerField to fix warning:
    // "MuiOutlinedInputInput contains an input of type text with both value and defaultValue props."
    // Input elements must be either controlled or uncontrolled.
    field: { value, ...nonControllerField },
    fieldState: { isTouched, error },
    formState: { isSubmitted },
  } = useInput(props);

  // Use curatedProps to fix warning: "Invalid value for prop `validate` on <div> tag."
  const { validate, ...curatedProps } = props;

  return (
    <TextField
      {...curatedProps}
      {...nonControllerField}
      sx={{ width: '100%' }}
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

/**
 * Creates a validator function for occurrence date inputs.
 *
 * Validates date format ('D.M.YYYY' or 'DD.MM.YYYY').
 * When `futureOnly` is true, also validates that the date is not strictly
 * before the start of today in the application timezone.
 *
 * @param options.futureOnly - If true, rejects dates before today.
 * @returns A react-admin Validator function.
 */
export const createValidateDate = ({
  futureOnly = false,
}: { futureOnly?: boolean } = {}): Validator => {
  return (value?: string) => {
    if (value === undefined || value === '') return undefined;

    const isValidFormat = momentValidationDateFormats.some((format) =>
      moment(value, format, true).isValid()
    );

    if (!isValidFormat) {
      return 'occurrences.fields.time.fields.date.errorMessage';
    }

    if (futureOnly) {
      const matchingFormat = momentValidationDateFormats.find((format) =>
        moment(value, format, true).isValid()
      );
      const dateMoment = moment.tz(
        value,
        matchingFormat!,
        true,
        AppConfig.timezone
      );
      const startOfToday = moment.tz(AppConfig.timezone).startOf('day');

      if (dateMoment.isBefore(startOfToday)) {
        return 'occurrences.fields.time.fields.date.pastErrorMessage';
      }
    }

    return undefined;
  };
};

/** Default date validator with futureOnly disabled (preserves existing behavior). */
export const validateDate: Validator = createValidateDate();

/**
 * Creates a validator function for occurrence time inputs.
 *
 * Validates time format ('H:mm' or 'HH:mm').
 * When `futureOnly` is true and a valid `date` is provided in form values:
 * - If date is in the future (e.g. tomorrow), any valid time (e.g. 11:00 when clock is 12:00) is valid.
 * - If date is today, validates that the combined date and time is not in the past in the application timezone.
 * - If date is before today, returns undefined so the date input alone displays the past error.
 * - If date is not provided or invalid, passes to allow date validator to handle date-specific errors.
 *
 * @param options.futureOnly - If true, rejects times in the past when the date is today.
 * @returns A react-admin Validator function.
 */
export const createValidateTime = ({
  futureOnly = false,
}: { futureOnly?: boolean } = {}): Validator => {
  return (value?: string, allValues?: { date?: string }) => {
    if (value === undefined || value === '') return undefined;

    const isValidFormat = momentValidationTimeFormats.some((format) =>
      moment(value, format, true).isValid()
    );

    if (!isValidFormat) {
      return 'occurrences.fields.time.fields.time.errorMessage';
    }

    if (futureOnly && allValues?.date) {
      const isDateFormatValid = momentValidationDateFormats.some((format) =>
        moment(allValues.date, format, true).isValid()
      );

      if (isDateFormatValid) {
        const matchingDateFormat = momentValidationDateFormats.find((format) =>
          moment(allValues.date, format, true).isValid()
        );
        const dateMoment = moment.tz(
          allValues.date,
          matchingDateFormat!,
          true,
          AppConfig.timezone
        );
        const startOfToday = moment.tz(AppConfig.timezone).startOf('day');

        // Only validate time against current moment if the date is today.
        // If date is in the future (tomorrow+), time is valid.
        // If date is in the past, validateDate handles the error on the date input.
        if (dateMoment.isSame(startOfToday, 'day')) {
          const matchingTimeFormat = momentValidationTimeFormats.find(
            (format) => moment(value, format, true).isValid()
          );
          const combinedMoment = moment.tz(
            `${allValues.date} ${value}`,
            `${matchingDateFormat} ${matchingTimeFormat}`,
            true,
            AppConfig.timezone
          );
          const now = moment.tz(AppConfig.timezone);

          if (combinedMoment.isBefore(now)) {
            return 'occurrences.fields.time.fields.time.pastErrorMessage';
          }
        }
      }
    }

    return undefined;
  };
};

/** Default time validator with futureOnly disabled (preserves existing behavior). */
export const validateTime: Validator = createValidateTime();

export type DateTimeTextInputProps = Pick<
  BoundedTextFieldProps,
  'variant' | 'required' | 'disabled'
> & {
  futureOnly?: boolean;
};

const DateTimeTextInput = ({
  variant,
  required,
  disabled,
  futureOnly = false,
}: DateTimeTextInputProps) => {
  const record = useRecordContext();
  const defaultDate = record?.time
    ? moment(record.time).format('D.M.YYYY')
    : '';

  const defaultTime = record?.time ? moment(record.time).format('HH:mm') : '';

  const translate = useTranslate();

  const dateValidator = React.useMemo(
    () =>
      futureOnly ? createValidateDate({ futureOnly: true }) : validateDate,
    [futureOnly]
  );
  const timeValidator = React.useMemo(
    () =>
      futureOnly ? createValidateTime({ futureOnly: true }) : validateTime,
    [futureOnly]
  );

  const dateLabel = `${translate(
    'occurrences.fields.time.fields.date.label'
  )} (${translate('occurrences.fields.time.fields.date.format')})`;
  const timeLabel = `${translate(
    'occurrences.fields.time.fields.time.label'
  )} (${translate('occurrences.fields.time.fields.time.format')})`;

  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item md={6}>
          <BoundedTextField
            source="date"
            validate={dateValidator}
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
            validate={timeValidator}
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
