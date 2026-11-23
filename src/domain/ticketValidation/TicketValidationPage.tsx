import React from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import RemoveIcon from '@mui/icons-material/Remove';
import { useParams } from 'react-router-dom';
import { useTranslate, Loading } from 'react-admin';
import { ApolloProvider } from '@apollo/client';

import unauthenticatedClient from '../../api/apolloClient/unauthenticatedClient';
import ArrivalMetricsPanel from '../../common/components/arrivalMetricsPanel/ArrivalMetricsPanel';
import useVerifyTicketQuery from './useVerifyTicketQuery';
import OccurrenceCard from './OccurrenceCard';
import useUpdateTicketAttendedMutation from './useUpdateTicketAttendedMutation';

const containerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '24px 16px',
};

type Params = {
  cryptographicallySignedCode: string;
};

type ParticipantStepperProps = {
  label: string;
  helperText: string;
  value: number;
  max: number;
  decrementLabel: string;
  incrementLabel: string;
  onChange: (next: number) => void;
  disabled?: boolean;
};

const ParticipantStepper = ({
  label,
  helperText,
  value,
  max,
  decrementLabel,
  incrementLabel,
  onChange,
  disabled = false,
}: ParticipantStepperProps) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
    }}
  >
    <Box>
      <Typography variant="subtitle1" fontWeight={600}>
        {label}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {helperText}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton
        aria-label={decrementLabel}
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={disabled || value <= 0}
        sx={{
          minWidth: 44,
          minHeight: 44,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <RemoveIcon />
      </IconButton>
      <Typography
        component="span"
        variant="h6"
        data-testid={`stepper-value-${label}`}
        sx={{ minWidth: 28, textAlign: 'center', fontWeight: 700 }}
      >
        {value}
      </Typography>
      <IconButton
        aria-label={incrementLabel}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || value >= max}
        sx={{
          minWidth: 44,
          minHeight: 44,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  </Box>
);

const TicketValidationPage = () => {
  const t = useTranslate();
  const theme = useTheme();
  const { cryptographicallySignedCode } = useParams<Params>();
  const { data, error, loading, refetch } = useVerifyTicketQuery({
    referenceId: cryptographicallySignedCode ?? '',
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const [updateAttended, { loading: saving }] = useUpdateTicketAttendedMutation(
    {
      sideEffect: async () => {
        setRefreshing(true);
        try {
          await refetch({ referenceId: cryptographicallySignedCode ?? '' });
        } catch {
          // Refetch error is surfaced by useVerifyTicketQuery
        } finally {
          setRefreshing(false);
        }
      },
    }
  );

  const ticket = data?.verifyTicket;
  const {
    validity: isValid = false,
    eventName = '',
    venueName = '',
    occurrenceTime,
    bookedChildrenCount = 1,
    bookedGuardiansCount = 1,
    arrivedChildrenCount = null,
    arrivedGuardiansCount = null,
    occurrenceArrivalStatus,
  } = ticket ?? {};

  const [childrenCount, setChildrenCount] = React.useState<number>(
    arrivedChildrenCount ?? bookedChildrenCount
  );
  const [guardiansCount, setGuardiansCount] = React.useState<number>(
    arrivedGuardiansCount ?? bookedGuardiansCount
  );

  React.useEffect(() => {
    if (ticket) {
      setChildrenCount(
        ticket.arrivedChildrenCount ?? ticket.bookedChildrenCount
      );
      setGuardiansCount(
        ticket.arrivedGuardiansCount ?? ticket.bookedGuardiansCount
      );
    }
  }, [ticket]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div style={containerStyles}>
        <Alert severity="error">{t('ticketValidation.error')}</Alert>
      </div>
    );
  }

  const handleSave = () => {
    updateAttended({
      variables: {
        input: {
          referenceId: cryptographicallySignedCode ?? '',
          arrivedChildrenCount: childrenCount,
          arrivedGuardiansCount: guardiansCount,
        },
      },
    });
  };

  const isBusy = saving || refreshing;
  const hasSavedArrival =
    arrivedChildrenCount !== null && arrivedGuardiansCount !== null;

  return (
    <div
      style={{
        ...containerStyles,
        rowGap: theme.spacing(3),
        backgroundColor: theme.palette.grey[200],
      }}
    >
      <ValidityIndicator isValid={isValid} />
      <OccurrenceCard
        eventName={eventName}
        venueName={venueName ?? ''}
        occurrenceTime={occurrenceTime}
      />
      {isValid && (
        <Stack spacing={2} sx={{ width: '100%', maxWidth: 480 }}>
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={2}>
                {hasSavedArrival && (
                  <Alert severity="info">
                    {t('ticketValidation.savedStatus', {
                      children: arrivedChildrenCount,
                      adults: arrivedGuardiansCount,
                    })}
                  </Alert>
                )}
                <ParticipantStepper
                  label={t('ticketValidation.arrivedChildren.label')}
                  helperText={t('ticketValidation.arrivedChildren.helperText', {
                    booked: bookedChildrenCount,
                  })}
                  value={childrenCount}
                  max={bookedChildrenCount}
                  decrementLabel={t(
                    'ticketValidation.arrivedChildren.decrement'
                  )}
                  incrementLabel={t(
                    'ticketValidation.arrivedChildren.increment'
                  )}
                  onChange={setChildrenCount}
                  disabled={isBusy}
                />
                <ParticipantStepper
                  label={t('ticketValidation.arrivedAdults.label')}
                  helperText={t('ticketValidation.arrivedAdults.helperText', {
                    booked: bookedGuardiansCount,
                  })}
                  value={guardiansCount}
                  max={bookedGuardiansCount}
                  decrementLabel={t('ticketValidation.arrivedAdults.decrement')}
                  incrementLabel={t('ticketValidation.arrivedAdults.increment')}
                  onChange={setGuardiansCount}
                  disabled={isBusy}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={handleSave}
                  disabled={isBusy}
                  sx={{ minHeight: 48 }}
                >
                  {t('ticketValidation.updateTicketAttended.saveButton.label')}
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {occurrenceArrivalStatus && (
            <ArrivalMetricsPanel
              attendedSeats={occurrenceArrivalStatus.attendedSeats ?? 0}
              reservedSeats={occurrenceArrivalStatus.reservedSeats ?? 0}
              capacity={occurrenceArrivalStatus.capacity}
              pendingArrivalSeats={
                occurrenceArrivalStatus.pendingArrivalSeats ?? 0
              }
              remainingEmptySeats={occurrenceArrivalStatus.remainingEmptySeats}
              enrolmentCount={occurrenceArrivalStatus.enrolmentCount ?? 0}
              handledEnrolmentCount={
                occurrenceArrivalStatus.handledEnrolmentCount ?? 0
              }
              attendedEnrolmentCount={
                occurrenceArrivalStatus.attendedEnrolmentCount ?? 0
              }
            />
          )}
        </Stack>
      )}
    </div>
  );
};

type ValidityIndicatorProps = {
  isValid: boolean;
};

const ValidityIndicator = ({ isValid }: ValidityIndicatorProps) => {
  const t = useTranslate();
  const theme = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: theme.spacing(1),
      }}
    >
      {React.createElement(isValid ? CheckCircleIcon : CancelIcon, {
        style: {
          fontSize: '6rem',
          color: isValid
            ? theme.palette.success.main
            : theme.palette.error.main,
        },
      })}
      <Typography component="h1" variant="h5">
        {t(isValid ? 'ticketValidation.valid' : 'ticketValidation.invalid')}
      </Typography>
    </div>
  );
};

const TicketValidationPageWithApolloProvider = () => (
  <ApolloProvider client={unauthenticatedClient}>
    <TicketValidationPage />
  </ApolloProvider>
);

export default TicketValidationPageWithApolloProvider;
