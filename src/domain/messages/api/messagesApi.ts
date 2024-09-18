import type { ApolloQueryResult } from '@apollo/client';
import { get, omit } from 'lodash';

import type {
  MethodHandlerResponse,
  MethodHandlerParams,
} from '../../../api/types';
import {
  queryHandler,
  handleApiConnection,
  mapLocalDataToApiData,
  mutationHandler,
  handleApiNode,
} from '../../../api/utils/apiUtils';
import {
  addMessageMutation,
  sendMessageMutation,
  deleteMessageMutation,
  updateMessageMutation,
} from '../mutations/MessageMutations';
import projectService from '../../projects/projectService';
import type { MessagesQuery } from '../../api/generatedTypes/graphql';
import {
  MessageDocument,
  MessagesDocument,
} from '../../api/generatedTypes/graphql';

async function getMessages(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse> {
  const response: ApolloQueryResult<MessagesQuery> = await queryHandler({
    query: MessagesDocument,
    variables: {
      projectId: projectService.projectId,
      limit: params.pagination.limit,
      offset: params.pagination.offset,
      orderBy: '-created_at',
    },
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return handleApiConnection(response.data.messages);
}

async function getMessage(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  const response = await queryHandler({
    query: MessageDocument,
    variables: { id: params.id },
  });

  return handleApiNode(response.data.message);
}

function cleanAll(data: any, field: string): any {
  const value = get(data, field);
  const isAllArrayField =
    Array.isArray(value) && value.length === 1 && value[0] === 'all';
  const isAllStringField = value === 'all';

  if (isAllArrayField) {
    return { ...omit(data, field), [field]: [] };
  }

  if (isAllStringField) {
    return { ...omit(data, field), [field]: null };
  }

  return data;
}

// When the event id field is empty, the message applies to all
// events. Hence when eventId is empty, we want to show a label that
// tells the user they are targeting all events. But react-admin
// doesn't seems to support showing empty values (null) as selected. To
// circumvent, we are using "all" as the empty value. Here we are
// cleaning field before sending it to the backend. In essence, if
// eventId is "all", we change its contents to "null".
function cleanEventId(data: any): any {
  return cleanAll(data, 'eventId');
}

function cleanOccurrences(data: any): any {
  return cleanAll(data, 'occurrenceIds');
}

function cleanMessage(data: any): any {
  return cleanOccurrences(cleanEventId(data));
}

async function addMessage(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  const cleanedData = cleanMessage(params.data);
  const data = mapLocalDataToApiData(cleanedData);
  const response = await mutationHandler({
    mutation: addMessageMutation,
    variables: {
      input: {
        ...data,
        projectId: projectService.projectId,
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
  const cleanedData = cleanMessage(updateData);
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
