import { ApolloQueryResult } from 'apollo-client';

import { Message } from '../../../api/generatedTypes/Message';
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
  updateMessageMutation,
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
  const response: ApolloQueryResult<Message> = await queryHandler({
    query: messageQuery,
    variables: { id: params.id },
  });

  return handleApiNode(response.data.message);
}

function cleanEventId(data: any): any {
  if (data?.eventId === 'all') {
    const { eventId, ...cleanData } = data;

    return cleanData;
  }

  return data;
}

async function addMessage(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  // When the event id field is empty, the message applies to all
  // events. Hence when eventId is empty, we want to show a label that
  // tells the user they are targeting all event. But react-admin
  // doesn't seems to support showing empty values as selected. To
  // circumvent, we are using "all" as the empty value. Here we are
  // cleaning field before sending it to the backend. In essence, if
  // eventId is "all", we remove the field from the data.
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
  // When the event id field is empty, the message applies to all
  // events. Hence when eventId is empty, we want to show a label that
  // tells the user they are targeting all event. But react-admin
  // doesn't seems to support showing empty values as selected. To
  // circumvent, we are using "all" as the empty value. Here we are
  // cleaning field before sending it to the backend. In essence, if
  // eventId is "all", we remove the field from the data.
  const cleanedData = cleanEventId(updateData);
  const data = mapLocalDataToApiData(cleanedData);

  const response = await mutationHandler({
    mutation: updateMessageMutation,
    variables: { input: data },
  });

  return handleApiNode(response.data?.updateMessage.message);
}
function deleteMessage(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  return Promise.resolve(null);
}
function sendMessage(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  return Promise.resolve(null);
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
