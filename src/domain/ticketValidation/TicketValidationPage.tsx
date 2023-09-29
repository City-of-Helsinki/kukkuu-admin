import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
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
}));

type Params = {
  cryptographicallySignedCode: string;
};

const TicketValidationPage = () => {
  const t = useTranslate();
  const styles = useStyles();
  const { cryptographicallySignedCode } = useParams<Params>();
  const { data, error, loading } = useVerifyTicketQuery({
    referenceId: cryptographicallySignedCode,
  });
  const {
    validity: isValid,
    eventName,
    venueName,
    occurrenceTime,
  } = data?.verifyTicket ?? {};

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

  return (
    <div className={styles.container}>
      <ValidityIndicator isValid={isValid} />
      <OccurrenceCard
        eventName={eventName}
        venueName={venueName}
        occurrenceTime={occurrenceTime}
      />
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
