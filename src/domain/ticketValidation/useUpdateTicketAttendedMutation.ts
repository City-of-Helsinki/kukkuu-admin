import { useMutation } from '@apollo/client';
import { useNotify } from 'react-admin';
import * as Sentry from '@sentry/browser';

import {
  UpdateTicketAttendedDocument,
  type UpdateTicketAttendedMutationResult,
} from '../api/generatedTypes/graphql';

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
        const ticket = data?.updateTicketAttended?.ticket;
        const attended = ticket?.attended;
        if (attended === true) {
          // eslint-disable-next-line no-console
          console.info('The ticket attendance status set to', true);
          notify(
            'ticketValidation.updateTicketAttended.onSuccess.attendedWithCountsMessage',
            {
              messageArgs: {
                children: ticket?.arrivedChildrenCount ?? 0,
                adults: ticket?.arrivedGuardiansCount ?? 0,
              },
            }
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
        sideEffect?.(data);
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
