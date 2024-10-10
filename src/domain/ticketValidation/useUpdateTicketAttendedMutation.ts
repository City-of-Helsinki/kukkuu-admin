import { useMutation } from '@apollo/client';
import { useNotify } from 'react-admin';
import * as Sentry from '@sentry/browser';

import { UpdateTicketAttendedDocument } from '../api/generatedTypes/graphql';
import type { UpdateTicketAttendedMutationResult } from '../api/generatedTypes/graphql';

type Config = {
  sideEffect?: (data: UpdateTicketAttendedMutationResult['data']) => void;
};

export default function useUpdateTicketAttendedMutation({
  sideEffect,
}: Config) {
  const notify = useNotify();

  return useMutation<UpdateTicketAttendedMutationResult['data']>(
    UpdateTicketAttendedDocument,
    {
      onCompleted: (data) => {
        const attended = data?.updateTicketAttended?.ticket?.attended;
        if (attended === true) {
          // eslint-disable-next-line no-console
          console.info('The ticket attendance status set to', true);
          notify(
            'ticketValidation.updateTicketAttended.onSuccess.attendedMessage'
          );
        } else if (attended === false) {
          // eslint-disable-next-line no-console
          console.info('The ticket attendance status set to', false);
          notify(
            'ticketValidation.updateTicketAttended.onSuccess.unattendedMessage'
          );
        } else {
          // eslint-disable-next-line no-console
          console.error('Error while updating the ticket attendance status', {
            data,
          });
          notify('ticketValidation.updateTicketAttended.onError.message', {
            type: 'warning',
          });
        }
        sideEffect && sideEffect(data);
      },
      onError: (error: Error) => {
        // eslint-disable-next-line no-console
        console.error(
          'Error while updating the ticket attendance status',
          error
        );
        Sentry.captureException(error);
        notify('ticketValidation.updateTicketAttended.onError.message', {
          type: 'warning',
        });
      },
    }
  );
}
