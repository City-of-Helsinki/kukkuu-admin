import React from 'react';
import { useTranslate, useDataProvider } from 'react-admin';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import {
  Occurrence_occurrence_enrolments_edges as EnrolmentEdge,
  Occurrence_occurrence_enrolments_edges_node as Enrolment,
} from '../../../api/generatedTypes/Occurrence';

type Props = {
  record?: EnrolmentEdge;
};

const OccurrenceAttendedField = ({ record }: Props) => {
  const enrolment = record?.node as Enrolment; // enrolment should be never undefined or null here
  const [attended, setAttended] = React.useState(
    JSON.stringify(enrolment.attended)
  );
  const dataProvider = useDataProvider();
  const translate = useTranslate();
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
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

OccurrenceAttendedField.propTypes = {
  record: PropTypes.object,
};

OccurrenceAttendedField.defaultProps = {
  label: 'enrolments.fields.attended.label',
};

export default OccurrenceAttendedField;
