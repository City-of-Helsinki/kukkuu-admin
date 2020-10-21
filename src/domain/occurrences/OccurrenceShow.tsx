import React, { ReactText } from 'react';
import {
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
  useGetOne,
} from 'react-admin';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import makeStyles from '@material-ui/styles/makeStyles';

import { OccurrenceTimeRangeField } from './fields';
import {
  Occurrences_occurrences_edges_node_enrolments_edges as EnrolmentEdge,
  Occurrences_occurrences_edges_node_enrolments_edges_node as Enrolment,
  Occurrences_occurrences_edges_node_enrolments_edges_node_child_guardians_edges_node as Guardian,
  Occurrences_occurrences_edges_node as Occurrence,
} from '../../api/generatedTypes/Occurrences';
import KukkuuShow from '../../common/components/kukkuuShow/KukkuuShow';

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

const useDataGridTitleStyles = makeStyles({
  fakeValue: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.87)',
    marginLeft: 16,
  },
});

const OccurrenceDataGridTitle = ({ occurrenceId }: any) => {
  const styles = useDataGridTitleStyles();
  const translate = useTranslate();
  const { data: record } = useGetOne('occurrences', occurrenceId);

  return (
    <>
      {translate('occurrences.fields.children.label')}
      <span className={styles.fakeValue}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */}
        {/* @ts-ignore */}
        {record.enrolments?.edges.length || ''}
      </span>
    </>
  );
};

const OccurrenceShow = (props: any) => {
  const locale = useLocale();
  const translate = useTranslate();

  const renderGuardian = (
    enrollmentRecord: EnrolmentEdge,
    render: (guardian: Guardian) => string
  ) => {
    const guardian = enrollmentRecord.node?.child.guardians.edges[0]?.node;

    if (guardian) {
      return render(guardian);
    }

    return translate('guardian.doesNotExist');
  };

  const getGuardianFullName = (enrollmentRecord: EnrolmentEdge) => {
    return renderGuardian(enrollmentRecord, (guardian) =>
      `${guardian.firstName} ${guardian.lastName}`.trim()
    );
  };

  const getGuardianLanguage = (enrollmentRecord: EnrolmentEdge) => {
    return renderGuardian(enrollmentRecord, (guardian) =>
      translate(`languages.${guardian.language}`)
    );
  };

  return (
    <KukkuuShow {...props} title="occurrences.show.title">
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
          source="capacity"
          label="occurrences.fields.capacity.label"
        />
        <FunctionField
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          render={(occurrence: Occurrence) =>
            occurrence.freeSpotNotificationSubscriptions?.edges.length || '0'
          }
          label="occurrences.fields.freeSpotNotificationSubscriptions.label"
        />
        <ArrayField
          label={<OccurrenceDataGridTitle occurrenceId={props.id} />}
          source="enrolments.edges"
        >
          <Datagrid
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            rowClick={(
              id: ReactText,
              basePath: string,
              record: EnrolmentEdge
            ) => escape(`/children/${record?.node?.id}/show`)}
          >
            <FunctionField
              label="children.fields.name.label"
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
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
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              render={(record: EnrolmentEdge) => getGuardianFullName(record)}
              label="guardian.name"
            />
            <EmailField
              source="node.child.guardians.edges.0.node.email"
              label="children.fields.guardians.fields.email.label"
              emptyText={translate('guardian.doesNotExist')}
            />
            <FunctionField
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              render={(record: EnrolmentEdge) => getGuardianLanguage(record)}
              label="events.fields.language.label"
            />
            <AttendedField />
          </Datagrid>
        </ArrayField>
      </SimpleShowLayout>
    </KukkuuShow>
  );
};

export default OccurrenceShow;
