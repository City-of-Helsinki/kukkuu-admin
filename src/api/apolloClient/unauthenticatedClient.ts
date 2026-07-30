import { ApolloClient, ApolloLink, HttpLink } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import { onError } from '@apollo/client/link/error';

import handleApolloError from './handleApolloError';
import { getEnvValue } from '../../common/utils/envUtils';

const errorLink = onError(handleApolloError);

const httpLink = new HttpLink({
  uri: getEnvValue('VITE_API_URI'),
});

const unauthenticatedClient = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
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
