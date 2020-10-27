import { MethodHandlerResponse, MethodHandlerParams } from '../../../api/types';
import {
  queryHandler,
  handleApiConnection,
  mapLocalDataToApiData,
  mutationHandler,
  handleApiNode,
} from '../../../api/utils/apiUtils';
import { messagesQuery, messageQuery } from '../queries/MessageQueries';
import {
  addMessageMutation,
  sendMessageMutation,
  updateMessageMutation,
  deleteMessageMutation,
} from '../mutations/MessageMutations';
import { getProjectId } from '../../profile/utils';

async function getMessages(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  const response = await queryHandler({
    query: messagesQuery,
    variables: { projectId: getProjectId() },
  });

  return handleApiConnection(response.data.messages);
}

async function getMessage(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  const response = await queryHandler({
    query: messageQuery,
    variables: { id: params.id },
  });

  return handleApiNode(response.data.message);
}

// When the event id field is empty, the message applies to all
// events. Hence when eventId is empty, we want to show a label that
// tells the user they are targeting all events. But react-admin
// doesn't seems to support showing empty values (null) as selected. To
// circumvent, we are using "all" as the empty value. Here we are
// cleaning field before sending it to the backend. In essence, if
// eventId is "all", we change its contents to "null".
function cleanEventId(data: any): any {
  if (data?.eventId === 'all') {
    const { eventId, ...cleanData } = data;

    return { ...cleanData, eventId: null };
  }

  return data;
}

async function addMessage(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  const cleanedData = cleanEventId(params.data);
  const data = mapLocalDataToApiData(cleanedData);
  const response = await mutationHandler({
    mutation: addMessageMutation,
    variables: {
      input: {
        ...data,
        projectId: getProjectId(),
      },
    },
  });

  return handleApiNode(response.data?.addMessage.message);
}

async function updateMessage(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  const updateData = {
    id: params.data.id,
    translations: params.data.translations,
    recipientSelection: params.data.recipientSelection,
    eventId: params.data.eventId,
    occurrenceIds: params.data.occurrenceIds,
  };
  const cleanedData = cleanEventId(updateData);
  const data = mapLocalDataToApiData(cleanedData);

  const response = await mutationHandler({
    mutation: updateMessageMutation,
    variables: { input: data },
  });

  return handleApiNode(response.data?.updateMessage.message);
}

async function deleteMessage(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  await mutationHandler({
    mutation: deleteMessageMutation,
    variables: { input: { id: params.id } },
  });

  return { data: { id: params.id } };
}

async function sendMessage(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  const response = await mutationHandler({
    mutation: sendMessageMutation,
    variables: { input: { id: params.id } },
  });

  return handleApiNode(response.data?.sendMessage.message);
}

const messagesApi = {
  getMessages,
  getMessage,
  addMessage,
  updateMessage,
  deleteMessage,
  sendMessage,
};

export default messagesApi;
