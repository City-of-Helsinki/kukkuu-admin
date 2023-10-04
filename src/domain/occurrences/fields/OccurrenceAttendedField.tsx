import React from 'react';
import { useTranslate, useDataProvider, useRecordContext } from 'react-admin';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import {
  Occurrence_occurrence_enrolments_edges as EnrolmentEdge,
  Occurrence_occurrence_enrolments_edges_node as Enrolment,
} from '../../../api/generatedTypes/Occurrence';

const OccurrenceAttendedField = () => {
  const record = useRecordContext<EnrolmentEdge>();
  const enrolment = record?.node as Enrolment; // enrolment should be never undefined or null here
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
