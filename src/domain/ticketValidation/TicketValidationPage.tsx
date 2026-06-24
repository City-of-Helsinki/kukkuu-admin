import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  useTheme,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useParams } from 'react-router-dom';
import { useTranslate, Loading } from 'react-admin';
import Typography from '@mui/material/Typography';
import Alert from '@mui/lab/Alert';
import { ApolloProvider } from '@apollo/client';

import unauthenticatedClient from '../../api/apolloClient/unauthenticatedClient';
import useVerifyTicketQuery from './useVerifyTicketQuery';
import OccurrenceCard from './OccurrenceCard';
import useUpdateTicketAttendedMutation from './useUpdateTicketAttendedMutation';

const containerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
};

type Params = {
  cryptographicallySignedCode: string;
};

const TicketValidationPage = () => {
  const t = useTranslate();
  const theme = useTheme();
  const { cryptographicallySignedCode } = useParams<Params>();
  const { data, error, loading, refetch } = useVerifyTicketQuery({
    referenceId: cryptographicallySignedCode ?? '',
  });
  const [updateAttended] = useUpdateTicketAttendedMutation({
    sideEffect: () => {
      refetch({ referenceId: cryptographicallySignedCode ?? '' });
    },
  });

  const {
    validity: isValid = false,
    eventName = '',
    venueName = '',
    occurrenceTime,
    attended = null,
    occurrenceArrivalStatus,
  } = data?.verifyTicket ?? {};

  const { enrolmentCount, attendedEnrolmentCount } =
    occurrenceArrivalStatus ?? {
      enrolmentCount: '?',
      attendedEnrolmentCount: '?',
    };

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

  const handleAttended = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateAttended({
      variables: {
        input: {
          referenceId: cryptographicallySignedCode ?? '',
          attended: event.target.checked,
        },
      },
    });
  };

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
        <div>
          <div
            style={{
              margin: theme.spacing(1),
              marginTop: theme.spacing(3),
            }}
          >
            <FormControl component="fieldset" variant="standard">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleAttended}
                      checked={attended ?? false}
                    />
                  }
                  label={t(
                    'ticketValidation.updateTicketAttended.switchButton.label'
                  )}
                />
              </FormGroup>
            </FormControl>
          </div>
          <div
            style={{
              color: theme.palette.grey[600],
              display: 'block',
              textAlign: 'center',
              fontStyle: 'italic',
              fontWeight: 'lighter',
            }}
          >
            {t('ticketValidation.arrivalStatus.label', {
              attendedEnrolmentCount,
              enrolmentCount,
            })}
          </div>
        </div>
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
