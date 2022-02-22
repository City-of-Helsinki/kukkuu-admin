/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VerifyTicket
// ====================================================

export interface VerifyTicket_verifyTicket {
  /**
   * The time of the event occurrence
   */
  occurrenceTime: any;
  /**
   * The name of the event
   */
  eventName: string;
  /**
   * The name of the venue
   */
  venueName: string | null;
  validity: boolean;
}

export interface VerifyTicket {
  verifyTicket: VerifyTicket_verifyTicket | null;
}

export interface VerifyTicketVariables {
  referenceId: string;
}
