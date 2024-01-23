import React from 'react';
import { useTranslate, useDataProvider, useRecordContext } from 'react-admin';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import type {
  EnrolmentNode,
  EnrolmentNodeEdge,
} from '../../api/generatedTypes/graphql';

const OccurrenceAttendedField = () => {
  const record = useRecordContext<EnrolmentNodeEdge>();
  const enrolment = record.node as EnrolmentNode; // enrolment should be never undefined or null here
  const [attended, setAttended] = React.useState(
    JSON.stringify(enrolment.attended)
  );
  const dataProvider = useDataProvider();
  const translate = useTranslate();
  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    dataProvider.setEnrolmentAttendance(enrolment.id, JSON.parse(value));
    setAttended(value);
  };
  return (
    <FormControl fullWidth>
      <Select
        style={{ fontSize: '0.875rem' }}
        disableUnderline
        value={attended}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem value="null">
          <em>
            {translate(
              'occurrences.fields.enrolments.fields.attended.choices.null'
            )}
          </em>
        </MenuItem>
        <MenuItem value="true">
          {translate(
            'occurrences.fields.enrolments.fields.attended.choices.true'
          )}
        </MenuItem>
        <MenuItem value="false">
          {translate(
            'occurrences.fields.enrolments.fields.attended.choices.false'
          )}
        </MenuItem>
      </Select>
    </FormControl>
  );
};

OccurrenceAttendedField.defaultProps = {
  label: 'enrolments.fields.attended.label',
};

export default OccurrenceAttendedField;
