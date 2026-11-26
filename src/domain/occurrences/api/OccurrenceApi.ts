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
import { hasInternalTicketSystem } from '../../events/utils';
import Config from '../../config';
import AppConfig from '../../application/AppConfig';

moment.tz.setDefault(AppConfig.timezone);

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
export const normalizeTime = (date?: string, time?: string) => {
  let datetime;

  if (date === undefined || time === undefined) return undefined;

  for (const format of Config.momentValidationDateTimeFormats) {
    datetime = moment.tz(`${date} ${time}`, format, true, AppConfig.timezone);
    if (datetime.isValid()) {
      return datetime.toISOString();
    }
  }

  throw new Error(`Invalid date or time format: "${date} ${time}"`);
};
const addOccurrence: MethodHandler = async (params: MethodHandlerParams) => {
  const data = mapLocalDataToApiData(params.data);
  data.time = normalizeTime(data.date as string, data.timeField as string);
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
  const {
    id,
    timeField,
    date,
    venue,
    event,
    capacityOverride,
    attendedChildrenCountOverride,
    attendedAdultsCountOverride,
    accessibilityIds,
    languageIds,
  } = localUpdateData;

  const isInternal = hasInternalTicketSystem(event);
  const data = {
    id,
    venueId: venue.id,
    time: normalizeTime(date as string, timeField as string),
    eventId: event.id,
    ...(isInternal
      ? {
          capacityOverride,
          // Always send both overrides explicitly (null clears an active override;
          // the backend requires them to be set or cleared together)
          attendedChildrenCountOverride: attendedChildrenCountOverride ?? null,
          attendedAdultsCountOverride: attendedAdultsCountOverride ?? null,
        }
      : {}),
    accessibilityIds,
    languageIds,
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
  attended?: boolean | null,
  counts?: {
    arrivedChildrenCount: number;
    arrivedGuardiansCount: number;
  }
) => {
  const input = counts
    ? {
        enrolmentId,
        arrivedChildrenCount: counts.arrivedChildrenCount,
        arrivedGuardiansCount: counts.arrivedGuardiansCount,
      }
    : { enrolmentId, attended: attended ?? null };

  const response = await mutationHandler({
    mutation: setEnrolmentAttendanceMutation,
    variables: { input },
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
