import React from 'react';
import { useInput, useTranslate } from 'react-admin';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment-timezone';

const useStyles = makeStyles({
  boundedTextField: { marginRight: '8px', minWidth: '256px' },
});

type Props = {
  validate?: any;
};

const BoundedTextField = (props: Props & TextFieldProps) => {
  const translate = useTranslate();
  const classes = useStyles();

  const { label, variant } = props;
  const {
    input: { name, onChange },
    meta: { touched, error },
    isRequired,
  } = useInput(props);

  return (
    <TextField
      variant={variant}
      className={classes.boundedTextField}
      name={name}
      label={label}
      onChange={onChange}
      error={!!(touched && error)}
      helperText={touched && translate(error)}
      required={isRequired}
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

const DateTimeTextInput = (props: any) => {
  const translate = useTranslate();
  const dateLabel = `${translate(
    'occurrences.fields.time.fields.date.label'
  )} (${translate('occurrences.fields.time.fields.date.format')})`;
  const timeLabel = `${translate(
    'occurrences.fields.time.fields.time.label'
  )} (${translate('occurrences.fields.time.fields.time.format')})`;

  return (
    <>
      <BoundedTextField
        validate={validateDate}
        size="medium"
        name="date"
        label={dateLabel}
        required={props.required}
        variant={props.variant}
      />
      <BoundedTextField
        validate={validateTime}
        name="time"
        label={timeLabel}
        required={props.required}
        variant={props.variant}
      />
    </>
  );
};

export default DateTimeTextInput;
