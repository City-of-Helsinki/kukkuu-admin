import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import * as Sentry from '@sentry/browser';
import {
  minValue,
  useTranslate,
  useDataProvider,
  NumberInput,
} from 'react-admin';

import { AdminEvent } from '../events/types/EventTypes';
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
  const [event, setEvent] = useState<AdminEvent | undefined>();
  const { eventId, ...sanitizedProps } = props;

  useEffect(() => {
    if (props.record?.event) {
      // use already available event data (normally when editing an occurrence this should happen)
      setEvent(props.record.event);
    } else if (eventId) {
      dataProvider
        // fallback to fetching event data from the API
        .getOne('events', { id: eventId })
        .then(({ data }: { data: AdminEvent }) => {
          setEvent(data);
        })
        .catch((error: Error) => {
          Sentry.captureException(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                event?.capacityPerOccurrence.toString() ?? '---',
            }
          )}
          validate={validateCapacityOverride}
        />
      </Grid>
    </SanitizedGrid>
  );
};

export { OccurrenceCapacityOverrideInput };
