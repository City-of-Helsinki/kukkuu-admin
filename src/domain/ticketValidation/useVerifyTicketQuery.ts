import { useQuery } from '@apollo/client';

import {
  type VerifyTicketQuery,
  VerifyTicketDocument,
} from '../api/generatedTypes/graphql';

type Config = {
  referenceId: string;
};

export default function useVerifyTicketQuery({ referenceId }: Config) {
  return useQuery<VerifyTicketQuery>(VerifyTicketDocument, {
    skip: !referenceId,
    variables: { referenceId },
  });
}
