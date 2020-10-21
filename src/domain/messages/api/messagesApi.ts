import { MethodHandlerResponse, MethodHandlerParams } from '../../../api/types';
import {
  queryHandler,
  handleApiConnection,
  mapLocalDataToApiData,
  mutationHandler,
  handleApiNode,
} from '../../../api/utils/apiUtils';
import { MessagesQuery } from '../queries/MessageQueries';
import { addMessageMutation } from '../mutations/MessageMutations';
import { getProjectId } from '../../profile/utils';

async function getMessages(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  const response = await queryHandler({
    query: MessagesQuery,
    variables: { projectId: getProjectId() },
  });

  return handleApiConnection(response.data.messages);
}

function getMessage(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  return Promise.resolve(null);
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

function updateMessage(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  return Promise.resolve(null);
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
