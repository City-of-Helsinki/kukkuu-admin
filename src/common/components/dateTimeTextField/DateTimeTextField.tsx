import React, { useState } from 'react';
import { useField } from 'react-final-form';
import { TextInput } from 'react-admin';
import moment from 'moment';

type Props = {
  inputName: string;
  required?: boolean;
  label: string;
  error?: string;
};

type DateTime = {
  date?: string;
  timeTime?: string;
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

const DateTimeTextInput = ({ inputName, label, error }: Props) => {
  console.log({ inputName, label, error });
  const [time, setDateTime] = useState<DateTime>({
    date: '',
    timeTime: '',
  });

  const {
    input: { value, onChange },
  } = useField(inputName);
  console.log('value');
  console.log(value);
  // e type is set to any for now. Event type returned from hds
  // is set to ChangeEvent<Element> which doesn't contain
  // target.value
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  const handleChange = (e: any) => {
    e.persist();
    console.log(e.target.id);
    console.log(e.target.value);
    setDateTime((previousDateTime) => ({
      ...previousDateTime,
      [e.target.id]: e.target.value,
    }));
    onChange((z: any) => {
      console.log('onChange');
      console.log(z);
      return {
        target: `${e.target.id === 'date' ? e.target.value : time.date}
          ${e.target.id === 'timeTime' ? e.target.value : time.timeTime}`,
      };
    });
  };
  return (
    <>
      <TextInput
        id="date"
        label="Date (dd.mm.yyyy)"
        onChange={handleChange}
        value={time.date}
      />
      <TextInput
        id="timeTime"
        label="Time (hh:mm)"
        onChange={handleChange}
        value={time.timeTime}
      />
    </>
  );
};

export default DateTimeTextInput;
