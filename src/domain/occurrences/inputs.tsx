import React, { useState, useEffect } from 'react';
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

const validateCapacityOverride = [minValue(0)];

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

export { OccurrenceCapacityOverrideInput };
