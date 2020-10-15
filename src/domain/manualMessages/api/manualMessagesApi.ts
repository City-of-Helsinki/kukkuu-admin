import { MethodHandlerResponse, MethodHandlerParams } from '../../../api/types';

function getManualMessages(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  return Promise.resolve(null);
}
function getManualMessage(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  return Promise.resolve(null);
}
function addManualMessage(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  return Promise.resolve(null);
}
function updateManualMessage(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  return Promise.resolve(null);
}
function deleteManualMessage(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  return Promise.resolve(null);
}
function sendManualMessage(
  params: MethodHandlerParams
): Promise<MethodHandlerResponse | null> {
  return Promise.resolve(null);
}

const manualMessagesApi = {
  getManualMessages,
  getManualMessage,
  addManualMessage,
  updateManualMessage,
  deleteManualMessage,
  sendManualMessage,
};

export default manualMessagesApi;
