import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import * as Sentry from '@sentry/browser';
import {
  minValue,
  useTranslate,
  useDataProvider,
  useRecordContext,
  NumberInput,
} from 'react-admin';

import type { AdminEvent } from '../events/types/EventTypes';
import SanitizedGrid from '../../common/components/sanitizedGrid/SanitizedGrid';

const validateInteger = (value: unknown) => {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }
  const numericValue = typeof value === 'number' ? value : Number(value);
  return Number.isInteger(numericValue) ? undefined : 'ra.validation.number';
};

const isEmpty = (value: unknown) =>
  value === null || value === undefined || value === '';

// If the other override field has a value, this one is required too: the
// children and adults overrides are saved (and validated by the API) as a pair.
const requiredWithOther =
  (otherSource: string) =>
  (value: unknown, allValues?: Record<string, unknown>) =>
    isEmpty(value) && !isEmpty(allValues?.[otherSource])
      ? 'occurrences.fields.attendedCountOverride.bothRequired'
      : undefined;

const validateCapacityOverride = [minValue(0)];
const validateAttendedChildrenCountOverride = [
  minValue(0),
  validateInteger,
  requiredWithOther('attendedAdultsCountOverride'),
];
const validateAttendedAdultsCountOverride = [
  minValue(0),
  validateInteger,
  requiredWithOther('attendedChildrenCountOverride'),
];

type OccurrenceCapacityOverrideInputProps = {
  [index: string]: any;
  eventId?: string;
};

const OccurrenceCapacityOverrideInput = (
  props: OccurrenceCapacityOverrideInputProps
) => {
  const translate = useTranslate();
  const dataProvider = useDataProvider();
  const record = useRecordContext<{ event?: AdminEvent }>();
  const [event, setEvent] = useState<AdminEvent | undefined>();
  const { eventId, ...sanitizedProps } = props;

  useEffect(() => {
    if (record?.event) {
      setEvent(record.event);
    } else if (eventId) {
      dataProvider
        .getOne('events', { id: eventId })
        .then(({ data }: { data: AdminEvent }) => {
          setEvent(data);
        })
        .catch((error: Error) => {
          Sentry.captureException(error);
        });
    }
  }, [record, eventId, dataProvider]);

  return (
    <SanitizedGrid container spacing={1}>
      <Grid item lg={6}>
        <NumberInput
          {...sanitizedProps}
          style={{ width: '100%' }}
          source="capacityOverride"
          label="occurrences.fields.capacityOverride.label"
          helperText={translate(
            'occurrences.fields.capacityOverride.helperText',
            {
              capacityPerOccurrence:
                event?.capacityPerOccurrence?.toString() ?? '---',
            }
          )}
          validate={validateCapacityOverride}
        />
      </Grid>
    </SanitizedGrid>
  );
};

const parseOverride = (value: string | number | null | undefined) =>
  value === '' || value === undefined ? null : Number(value);
const formatOverride = (value: number | null | undefined) => value ?? '';

const OccurrenceAttendedCountOverrideInput = (
  props: Record<string, unknown>
) => {
  const translate = useTranslate();
  return (
    <SanitizedGrid container spacing={1}>
      <Grid item xs={12}>
        <Alert severity="warning" sx={{ mb: 1 }}>
          {translate('occurrences.fields.attendedCountOverride.formWarning')}
        </Alert>
      </Grid>
      <Grid item lg={6}>
        <NumberInput
          {...props}
          style={{ width: '100%' }}
          source="attendedChildrenCountOverride"
          label="occurrences.fields.attendedCountOverride.childrenLabel"
          helperText={translate(
            'occurrences.fields.attendedCountOverride.helperText'
          )}
          step={1}
          validate={validateAttendedChildrenCountOverride}
          parse={parseOverride}
          format={formatOverride}
        />
      </Grid>
      <Grid item lg={6}>
        <NumberInput
          {...props}
          style={{ width: '100%' }}
          source="attendedAdultsCountOverride"
          label="occurrences.fields.attendedCountOverride.adultsLabel"
          helperText={translate(
            'occurrences.fields.attendedCountOverride.helperText'
          )}
          step={1}
          validate={validateAttendedAdultsCountOverride}
          parse={parseOverride}
          format={formatOverride}
        />
      </Grid>
    </SanitizedGrid>
  );
};

export {
  OccurrenceCapacityOverrideInput,
  OccurrenceAttendedCountOverrideInput,
};
