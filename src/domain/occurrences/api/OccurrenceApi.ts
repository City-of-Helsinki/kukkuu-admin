import type { ApolloQueryResult } from '@apollo/client';
import moment from 'moment-timezone';

import type { MethodHandler, MethodHandlerParams } from '../../../api/types';
import {
  queryHandler,
  mapLocalDataToApiData,
  mutationHandler,
  handleApiConnection,
  handleApiNode,
} from '../../../api/utils/apiUtils';
import {
  addOccurrenceMutation,
  updateOccurrenceMutation,
  deleteOccurrenceMutation,
  setEnrolmentAttendanceMutation,
} from '../mutations/OccurrenceMutations';
import projectService from '../../projects/projectService';
import {
  OccurrencesDocument,
  type OccurrenceQuery,
  type OccurrencesQuery,
  OccurrenceDocument,
} from '../../api/generatedTypes/graphql';

moment.tz.setDefault('Europe/Helsinki');

const getOccurrences: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<OccurrencesQuery> = await queryHandler({
    query: OccurrencesDocument,
    variables: {
      projectId: projectService.projectId,
      ...params.filter,
    },
  });
  return handleApiConnection(response.data.occurrences);
};

const getOccurrence: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<OccurrenceQuery> = await queryHandler({
    query: OccurrenceDocument,
    variables: { id: params.id },
  });
  return handleApiNode(response.data.occurrence);
};

// Combine two fields into one:
const normalizeTime = (date: string, time: string) => {
  return moment
    .tz(`${date} ${time}`, 'D.M.YYYY H:mm', true, 'Europe/Helsinki')
    .toISOString();
};

const addOccurrence: MethodHandler = async (params: MethodHandlerParams) => {
  const data = mapLocalDataToApiData(params.data);
  data.time = normalizeTime(data.date, data.timeField);
  data.date = undefined;
  data.timeField = undefined;

  const response = await mutationHandler({
    mutation: addOccurrenceMutation,
    variables: { input: data },
  });

  return handleApiNode(response.data?.addOccurrence.occurrence);
};

const updateOccurrence: MethodHandler = async (params: MethodHandlerParams) => {
  const { ...localUpdateData } = params.data;
  const { id, timeField, date, venue, event, capacityOverride } =
    localUpdateData;

  const data = {
    id,
    venueId: venue.id,
    time: normalizeTime(date, timeField),
    eventId: event.id,
    capacityOverride,
  };

  const response = await mutationHandler({
    mutation: updateOccurrenceMutation,
    variables: { input: data },
  });

  return handleApiNode(response.data?.updateOccurrence.occurrence);
};

const deleteOccurrence: MethodHandler = async (params: MethodHandlerParams) => {
  await mutationHandler({
    mutation: deleteOccurrenceMutation,
    variables: { input: { id: params.id } },
  });
  return { data: { id: params.id } };
};

const setEnrolmentAttendance = async (
  enrolmentId: string,
  attended: boolean | null
) => {
  const response = await mutationHandler({
    mutation: setEnrolmentAttendanceMutation,
    variables: { input: { enrolmentId, attended } },
  });
  return { data: response.data };
};

const getOccurrencesManyReference = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<OccurrencesQuery> = await queryHandler({
    query: OccurrencesDocument,
    variables: { projectId: projectService.projectId, eventId: params.id },
  });
  return handleApiConnection(response.data.occurrences);
};

export {
  getOccurrences,
  getOccurrence,
  addOccurrence,
  updateOccurrence,
  deleteOccurrence,
  setEnrolmentAttendance,
  getOccurrencesManyReference,
};
