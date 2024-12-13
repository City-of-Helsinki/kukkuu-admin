import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  type Theme,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useParams } from 'react-router';
import { useTranslate, Loading } from 'react-admin';
import Typography from '@mui/material/Typography';
import Alert from '@mui/lab/Alert';
import { ApolloProvider } from '@apollo/client';

import unauthenticatedClient from '../../api/apolloClient/unauthenticatedClient';
import useVerifyTicketQuery from './useVerifyTicketQuery';
import OccurrenceCard from './OccurrenceCard';
import useUpdateTicketAttendedMutation from './useUpdateTicketAttendedMutation';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
} as const;

const useStyles = makeStyles((theme) => ({
  errorContainer: {
    ...containerStyles,
  },
  container: {
    ...containerStyles,
    rowGap: theme.spacing(3),

    backgroundColor: theme.palette.grey[200],
  },
  formControl: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(3),
  },
  arrivalStatus: {
    color: theme.palette.grey[600],
    display: 'block',
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'lighter',
  },
}));

type Params = {
  cryptographicallySignedCode: string;
};

const TicketValidationPage = () => {
  const t = useTranslate();
  const styles = useStyles();
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
      <div className={styles.errorContainer}>
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
    <div className={styles.container}>
      <ValidityIndicator isValid={isValid} />
      <OccurrenceCard
        eventName={eventName}
        venueName={venueName ?? ''}
        occurrenceTime={occurrenceTime}
      />
      {isValid && (
        <div>
          <div className={styles.formControl}>
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
          <div className={styles.arrivalStatus}>
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

const useValidStyles = makeStyles<Theme, ValidityIndicatorProps>((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: theme.spacing(1),
  },
  icon: {
    fontSize: '6rem',
    color: ({ isValid }) =>
      isValid ? theme.palette.success.main : theme.palette.error.main,
  },
}));

const ValidityIndicator = ({ isValid }: ValidityIndicatorProps) => {
  const t = useTranslate();
  const styles = useValidStyles({ isValid });

  return (
    <div className={styles.container}>
      {React.createElement(isValid ? CheckCircleIcon : CancelIcon, {
        className: styles.icon,
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
