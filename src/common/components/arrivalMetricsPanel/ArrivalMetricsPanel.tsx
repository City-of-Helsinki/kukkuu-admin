import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslate } from 'react-admin';

import MetricLabelWithTooltip from '../metricLabelWithTooltip/MetricLabelWithTooltip';

export type ArrivalMetricsPanelProps = {
  attendedSeats: number;
  calculatedAttendedSeats?: number;
  attendedCountOverride?: number | null;
  attendedChildrenCountOverride?: number | null;
  attendedAdultsCountOverride?: number | null;
  reservedSeats: number;
  capacity?: number | null;
  pendingArrivalSeats: number;
  remainingEmptySeats?: number | null;
  enrolmentCount: number;
  handledEnrolmentCount: number;
  attendedEnrolmentCount: number;
};

const ArrivalMetricsPanel = ({
  attendedSeats,
  calculatedAttendedSeats,
  attendedCountOverride,
  attendedChildrenCountOverride,
  attendedAdultsCountOverride,
  reservedSeats,
  capacity,
  pendingArrivalSeats,
  remainingEmptySeats,
  enrolmentCount,
  handledEnrolmentCount,
  attendedEnrolmentCount,
}: ArrivalMetricsPanelProps) => {
  const translate = useTranslate();
  const isOverridden =
    attendedCountOverride !== undefined && attendedCountOverride !== null;
  const hasBreakdown =
    attendedChildrenCountOverride !== undefined &&
    attendedChildrenCountOverride !== null &&
    attendedAdultsCountOverride !== undefined &&
    attendedAdultsCountOverride !== null;
  const unhandledTickets = Math.max(enrolmentCount - handledEnrolmentCount, 0);

  const rows = [
    {
      key: 'peopleArrived',
      label: translate('arrivalMetrics.peopleArrived.label'),
      tooltip: translate('arrivalMetrics.peopleArrived.tooltip'),
      value: String(attendedSeats),
      extra: isOverridden ? (
        <Chip
          size="small"
          color="warning"
          label={translate('occurrences.fields.attendedCountOverride.badge', {
            calculated: calculatedAttendedSeats ?? '?',
          })}
        />
      ) : null,
    },
    {
      key: 'seatsReserved',
      label: translate('arrivalMetrics.seatsReserved.label'),
      tooltip: translate('arrivalMetrics.seatsReserved.tooltip'),
      value:
        capacity !== undefined && capacity !== null
          ? `${reservedSeats} / ${capacity}`
          : String(reservedSeats),
    },
    {
      key: 'spaceLeft',
      label: translate('arrivalMetrics.spaceLeft.label'),
      tooltip: translate('arrivalMetrics.spaceLeft.tooltip'),
      value:
        remainingEmptySeats !== undefined && remainingEmptySeats !== null
          ? String(remainingEmptySeats)
          : '—',
    },
    {
      key: 'expectedRemaining',
      label: translate('arrivalMetrics.expectedRemaining.label'),
      tooltip: translate('arrivalMetrics.expectedRemaining.tooltip'),
      value: String(pendingArrivalSeats),
    },
    {
      key: 'ticketsHandled',
      label: translate('arrivalMetrics.ticketsHandled.label'),
      tooltip: translate('arrivalMetrics.ticketsHandled.tooltip'),
      value: translate('arrivalMetrics.ticketsHandled.value', {
        handled: handledEnrolmentCount,
        total: enrolmentCount,
        remaining: unhandledTickets,
        arrivedTickets: attendedEnrolmentCount,
      }),
    },
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%', maxWidth: 480 }}>
      <CardContent sx={{ '&:last-child': { pb: 2 } }}>
        <Stack spacing={1.25}>
          {isOverridden && (
            <Alert severity="warning" sx={{ py: 0.5 }}>
              {hasBreakdown
                ? translate(
                    'occurrences.fields.attendedCountOverride.alertWithBreakdown',
                    {
                      override: attendedCountOverride,
                      children: attendedChildrenCountOverride,
                      adults: attendedAdultsCountOverride,
                      calculated: calculatedAttendedSeats ?? '?',
                    }
                  )
                : translate('occurrences.fields.attendedCountOverride.alert', {
                    override: attendedCountOverride,
                    calculated: calculatedAttendedSeats ?? '?',
                  })}
            </Alert>
          )}
          {rows.map((row, idx) => (
            <Box key={row.key}>
              {idx > 0 && <Divider sx={{ mb: 1.25 }} />}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1.5,
                  flexWrap: 'wrap',
                }}
              >
                <MetricLabelWithTooltip
                  label={row.label}
                  tooltip={row.tooltip}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {row.extra}
                  <Typography
                    component="span"
                    variant="subtitle1"
                    fontWeight={700}
                  >
                    {row.value}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ArrivalMetricsPanel;
