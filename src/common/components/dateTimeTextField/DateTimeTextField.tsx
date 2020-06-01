import React from 'react';
import { useInput, FunctionField } from 'react-admin';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

type Props = {
  error?: any;
  name: string;
  label: string;
  size?: 'big' | 'medium' | 'small';
  placeholder?: string;
  onChange?: any;
  validate?: any;
  required?: boolean;
};

const BoundedTextField = (props: Props) => {
  const {
    input: { name, onChange },
    meta: { touched, error },
    isRequired,
  } = useInput(props);
  return (
    <TextField
      name={name}
      label={props.label}
      onChange={onChange}
      error={!!(touched && error)}
      helperText={touched && error}
      required={isRequired}
      margin={'normal'}
    />
  );
};

const validateDate = (value: string) => {
  return moment(value, 'DD.MM.YYYY', true).isValid()
    ? undefined
    : 'Date invalid, use format 29.02.2020';
};

const validateTime = (value: string) => {
  return moment(value, 'HH:mm', true).isValid()
    ? undefined
    : 'Time invalid, use format 12:30';
};

const DateTimeTextInput = (props: any) => {
  return (
    <>
      <BoundedTextField
        validate={validateDate}
        size="medium"
        name="date"
        label="Date (dd.mm.yyyy)"
        required={props.required}
      />{' '}
      &nbsp; &nbsp;
      <BoundedTextField
        validate={validateTime}
        name="time"
        label="Time (hh:mm)"
        required={props.required}
      />
    </>
  );
};

export default DateTimeTextInput;
