import { MethodHandlerResponse, MethodHandlerParams } from '../../../api/types';
import { queryHandler, handleApiConnection } from '../../../api/utils/apiUtils';
import { MessagesQuery } from '../queries/MessageQueries';
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
function addMessage(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  return Promise.resolve(null);
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
