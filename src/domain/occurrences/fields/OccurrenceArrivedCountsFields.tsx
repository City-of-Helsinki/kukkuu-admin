import React from 'react';
import {
  useDataProvider,
  useNotify,
  useRecordContext,
  useRefresh,
  useTranslate,
} from 'react-admin';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

import type { EnrolmentNodeEdge } from '../../api/generatedTypes/graphql';

type ArrivedCounts = {
  arrivedChildrenCount: number;
  arrivedGuardiansCount: number;
};

type ArrivedCountsPatch = Partial<ArrivedCounts>;

type EnrolmentNode = NonNullable<EnrolmentNodeEdge['node']>;

const saveQueueByEnrolment = new Map<string, Promise<void>>();
const latestCountsByEnrolment = new Map<string, ArrivedCounts>();

const useEnrolmentArrivedCounts = () => {
  const record = useRecordContext<EnrolmentNodeEdge>();
  const dataProvider = useDataProvider();
  const refresh = useRefresh();
  const notify = useNotify();
  const [saving, setSaving] = React.useState(false);

  const enrolment = record?.node;
  const enrolmentId = enrolment?.id;
  const arrivedChildrenCount = enrolment?.arrivedChildrenCount;
  const arrivedGuardiansCount = enrolment?.arrivedGuardiansCount;

  React.useEffect(() => {
    if (enrolmentId && !saveQueueByEnrolment.has(enrolmentId)) {
      latestCountsByEnrolment.delete(enrolmentId);
    }
  }, [enrolmentId, arrivedChildrenCount, arrivedGuardiansCount]);

  React.useEffect(
    () => () => {
      if (enrolmentId && !saveQueueByEnrolment.has(enrolmentId)) {
        latestCountsByEnrolment.delete(enrolmentId);
      }
    },
    [enrolmentId]
  );

  const saveCounts = async (
    targetEnrolment: EnrolmentNode,
    patch: ArrivedCountsPatch
  ) => {
    setSaving(true);
    const prevTask =
      saveQueueByEnrolment.get(targetEnrolment.id) ?? Promise.resolve();
    const nextTask = (async () => {
      await prevTask.catch(() => undefined);
      const baseCounts: ArrivedCounts = latestCountsByEnrolment.get(
        targetEnrolment.id
      ) ?? {
        arrivedChildrenCount: defaultArrivedCount(
          targetEnrolment.arrivedChildrenCount,
          targetEnrolment.bookedChildrenCount,
          targetEnrolment.attended
        ),
        arrivedGuardiansCount: defaultArrivedCount(
          targetEnrolment.arrivedGuardiansCount,
          targetEnrolment.bookedGuardiansCount,
          targetEnrolment.attended
        ),
      };
      const nextCounts: ArrivedCounts = { ...baseCounts, ...patch };
      await dataProvider.setEnrolmentAttendance(
        targetEnrolment.id,
        undefined,
        nextCounts
      );
      latestCountsByEnrolment.set(targetEnrolment.id, nextCounts);
      refresh();
    })();

    saveQueueByEnrolment.set(targetEnrolment.id, nextTask);
    try {
      await nextTask;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to update enrolment arrived counts', error);
      notify('ra.notification.http_error', { type: 'error' });
    } finally {
      if (saveQueueByEnrolment.get(targetEnrolment.id) === nextTask) {
        saveQueueByEnrolment.delete(targetEnrolment.id);
      }
      setSaving(false);
    }
  };

  return { enrolment, saving, saveCounts };
};

const defaultArrivedCount = (
  arrived: number | null | undefined,
  booked: number | null | undefined,
  attended: boolean | null | undefined
) => (attended === false ? 0 : (arrived ?? booked ?? 1));

type ArrivedCountSelectProps = {
  value: number | null | undefined;
  maxCount: number;
  ariaLabel: string;
  disabled: boolean;
  onSelect: (count: number) => void;
};

const ArrivedCountSelect = ({
  value,
  maxCount,
  ariaLabel,
  disabled,
  onSelect,
}: ArrivedCountSelectProps) => (
  <FormControl size="small" sx={{ minWidth: 72 }}>
    <Select
      value={value === null || value === undefined ? '' : String(value)}
      displayEmpty
      disabled={disabled}
      onChange={(event: SelectChangeEvent) => {
        if (event.target.value !== '') {
          onSelect(Number(event.target.value));
        }
      }}
      onClick={(e) => e.stopPropagation()}
      inputProps={{ 'aria-label': ariaLabel }}
      sx={{ fontSize: '0.875rem' }}
    >
      <MenuItem value="" disabled>
        <em>—</em>
      </MenuItem>
      {Array.from({ length: maxCount + 1 }, (_, i) => (
        <MenuItem key={i} value={String(i)}>
          {i}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export const OccurrenceArrivedChildrenField = (_props: {
  label?: React.ReactNode;
}) => {
  const translate = useTranslate();
  const { enrolment, saving, saveCounts } = useEnrolmentArrivedCounts();

  if (!enrolment) {
    return null;
  }

  return (
    <ArrivedCountSelect
      value={enrolment.arrivedChildrenCount}
      maxCount={enrolment.bookedChildrenCount ?? 1}
      ariaLabel={translate('enrolments.fields.arrivedChildrenCount.label')}
      disabled={saving}
      onSelect={(count) =>
        saveCounts(enrolment, {
          arrivedChildrenCount: count,
        })
      }
    />
  );
};

export const OccurrenceArrivedGuardiansField = (_props: {
  label?: React.ReactNode;
}) => {
  const translate = useTranslate();
  const { enrolment, saving, saveCounts } = useEnrolmentArrivedCounts();

  if (!enrolment) {
    return null;
  }

  return (
    <ArrivedCountSelect
      value={enrolment.arrivedGuardiansCount}
      maxCount={enrolment.bookedGuardiansCount ?? 1}
      ariaLabel={translate('enrolments.fields.arrivedGuardiansCount.label')}
      disabled={saving}
      onSelect={(count) =>
        saveCounts(enrolment, {
          arrivedGuardiansCount: count,
        })
      }
    />
  );
};
