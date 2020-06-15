import React from 'react';
import {
  Show,
  TextField,
  NumberField,
  DateField,
  Datagrid,
  ReferenceField,
  useLocale,
  useTranslate,
  SimpleShowLayout,
  EmailField,
  ArrayField,
  FunctionField,
  useDataProvider,
} from 'react-admin';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import { OccurrenceTimeRangeField } from './fields';
import {
  Occurrences_occurrences_edges_node_enrolments_edges as EnrolmentEdge,
  Occurrences_occurrences_edges_node_enrolments_edges_node as Enrolment,
} from '../../api/generatedTypes/Occurrences';

type AttendedFieldProps = {
  record?: EnrolmentEdge;
};

const AttendedField = ({ record }: AttendedFieldProps) => {
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

AttendedField.propTypes = {
  record: PropTypes.object,
};

AttendedField.defaultProps = {
  label: 'enrolments.fields.attended.label',
};

const OccurrenceShow = (props: any) => {
  const locale = useLocale();
  const translate = useTranslate();

  return (
    <Show {...props} title="occurrences.show.title">
      <SimpleShowLayout>
        <ReferenceField
          label="occurrences.fields.event.label"
          source="event.id"
          reference="events"
          link="show"
        >
          <TextField source="translations.FI.name" />
        </ReferenceField>
        <DateField
          label="occurrences.fields.time.fields.date.label"
          source="time"
          locales={locale}
        />
        <OccurrenceTimeRangeField locales={locale} />
        <ReferenceField
          label="occurrences.fields.venue.label"
          source="venue.id"
          reference="venues"
          link="show"
        >
          <TextField source="translations.FI.name" />
        </ReferenceField>
        <NumberField
          source="event.capacityPerOccurrence"
          label="occurrences.fields.capacity.label"
        />
        <ArrayField
          label="occurrences.fields.children.label"
          source="enrolments.edges"
        >
          <Datagrid
            rowClick={(id: string, basePath: string, record: EnrolmentEdge) =>
              escape(`/children/${record?.node?.id}/show`)
            }
          >
            <FunctionField
              label="children.fields.name.label"
              render={(record: EnrolmentEdge) =>
                `${record.node?.child.firstName} ${record.node?.child.lastName}`.trim()
              }
            />
            <DateField
              source="node.child.birthdate"
              label="children.fields.birthdate.label"
              locales={locale}
            />
            <FunctionField
              render={(record: EnrolmentEdge) =>
                // eslint-disable-next-line max-len
                `${record.node?.child.guardians.edges[0]?.node?.firstName} ${record.node?.child.guardians.edges[0]?.node?.lastName}`.trim()
              }
              label="guardian.name"
            />
            <EmailField
              source="node.child.guardians.edges.0.node.email"
              label="children.fields.guardians.fields.email.label"
            />
            <FunctionField
              render={(record: EnrolmentEdge) =>
                translate(
                  `languages.${record?.node?.child.guardians.edges[0]?.node?.language}`
                )
              }
              label="events.fields.language.label"
            />
            <AttendedField />
          </Datagrid>
        </ArrayField>
      </SimpleShowLayout>
    </Show>
  );
};

export default OccurrenceShow;
