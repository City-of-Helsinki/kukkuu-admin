import type { MethodHandlerParams } from '../../../api/types';
import {
  handleApiNode,
  mapLocalDataToApiData,
  mutationHandler,
} from '../../../api/utils/apiUtils';
import { importEventTicketSystemPasswordsMutation } from '../mutations/TicketSystemPasswordMutations';

async function importTicketSystemPasswords(params: MethodHandlerParams) {
  const { eventId, passwords } = params.data;
  const input = {
    eventId,
    passwords,
  };
  const cleanedInput = mapLocalDataToApiData(input);
  const response = await mutationHandler({
    mutation: importEventTicketSystemPasswordsMutation,
    variables: {
      input: cleanedInput,
    },
  });

  return handleApiNode(response.data?.importTicketSystemPasswords);
}

const ticketSystemPasswordsApi = {
  importTicketSystemPasswords,
};

export default ticketSystemPasswordsApi;
