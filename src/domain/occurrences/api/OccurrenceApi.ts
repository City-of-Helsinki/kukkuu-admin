import { ApolloQueryResult } from 'apollo-client';
import moment from 'moment-timezone';

import { MethodHandler, MethodHandlerParams } from '../../../api/types';
import {
  queryHandler,
  mapApiDataToLocalData,
  mapLocalDataToApiData,
  mutationHandler,
} from '../../../api/utils/apiUtils';
import {
  occurrencesQuery,
  occurrenceQuery,
} from '../queries/OccurrenceQueries';
import { Occurrences as ApiOccurrences } from '../../../api/generatedTypes/Occurrences';
import { Occurrence_occurrence as ApiOccurrence } from '../../../api/generatedTypes/Occurrence';
import {
  addOccurrenceMutation,
  updateOccurrenceMutation,
  deleteOccurrenceMutation,
  setEnrolmentAttendanceMutation,
} from '../mutations/OccurrenceMutations';
import { getProjectId } from '../../profile/utils';

moment.tz.setDefault('Europe/Helsinki');

const getOccurrences: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<ApiOccurrences> = await queryHandler({
    query: occurrencesQuery,
    variables: { projectId: getProjectId(), eventId: params.id },
  });
  const data = response.data.occurrences?.edges.map((edge) =>
    edge?.node ? mapApiDataToLocalData(edge.node) : null
  );
  return data;
};

const getOccurrence: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<ApiOccurrence> = await queryHandler({
    query: occurrenceQuery,
    variables: { id: params.id },
  });
  const data = response.data ? mapApiDataToLocalData(response.data) : null;
  return data;
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
  return response?.data?.addOccurrence.occurrence
    ? mapApiDataToLocalData(response.data.addOccurrence.occurrence)
    : null;
};

const updateOccurrence: MethodHandler = async (params: MethodHandlerParams) => {
  const { ...localUpdateData } = params.data;
  const {
    id,
    timeField,
    date,
    venue,
    occurrenceLanguage,
    event,
  } = localUpdateData;

  const data = {
    id,
    venueId: venue.id,
    time: normalizeTime(date, timeField),
    occurrenceLanguage,
    eventId: event.id,
  };

  const response = await mutationHandler({
    mutation: updateOccurrenceMutation,
    variables: { input: data },
  });
  return response.data?.updateOccurrence.occurrence
    ? mapApiDataToLocalData(response.data.updateOccurrence.occurrence)
    : null;
};

const deleteOccurrence: MethodHandler = async (params: MethodHandlerParams) => {
  await mutationHandler({
    mutation: deleteOccurrenceMutation,
    variables: { input: { id: params.id } },
  });
  return { id: params.id };
};

const setEnrolmentAttendance = async (
  enrolmentId: string,
  attended: boolean | null
) => {
  const response = await mutationHandler({
    mutation: setEnrolmentAttendanceMutation,
    variables: { input: { enrolmentId, attended } },
  });
  return response.data;
};

export {
  getOccurrences,
  getOccurrence,
  addOccurrence,
  updateOccurrence,
  deleteOccurrence,
  setEnrolmentAttendance,
};
