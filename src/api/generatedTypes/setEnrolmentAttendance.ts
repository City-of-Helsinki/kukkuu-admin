/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SetEnrolmentAttendanceMutationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: setEnrolmentAttendance
// ====================================================

export interface setEnrolmentAttendance_setEnrolmentAttendance_enrolment {
  /**
   * The ID of the object.
   */
  id: string;
  attended: boolean | null;
}

export interface setEnrolmentAttendance_setEnrolmentAttendance {
  enrolment: setEnrolmentAttendance_setEnrolmentAttendance_enrolment | null;
}

export interface setEnrolmentAttendance {
  setEnrolmentAttendance: setEnrolmentAttendance_setEnrolmentAttendance | null;
}

export interface setEnrolmentAttendanceVariables {
  input: SetEnrolmentAttendanceMutationInput;
}
