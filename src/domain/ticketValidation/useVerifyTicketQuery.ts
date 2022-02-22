import { gql, useQuery } from '@apollo/client';

const verifyTicketQuery = gql`
  query VerifyTicket($referenceId: String!) {
    verifyTicket(referenceId: $referenceId) {
      occurrenceTime
      eventName
      venueName
      validity
    }
  }
`;

type Config = {
  referenceId: string;
};

export default function useVerifyTicketQuery({ referenceId }: Config) {
  return useQuery(verifyTicketQuery, {
    variables: { referenceId },
  });
}
