import { ApolloClient, ApolloLink } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import { onError } from '@apollo/client/link/error';

import handleApolloError from './handleApolloError';

const errorLink = onError(handleApolloError);

const unauthenticatedClient = new ApolloClient({
  link: ApolloLink.from([errorLink]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
  },
  cache: new InMemoryCache(),
});

export default unauthenticatedClient;
