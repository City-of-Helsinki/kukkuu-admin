import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
//import * as Sentry from '@sentry/browser';

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_API_URI,
  headers: {
    'keep-alive': 'true',
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      const errorMessage = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`;
      // Sentry.captureMessage(errorMessage);
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(errorMessage);
      }

      // If JWT is expired it means that we want people to log in again.
      if (message === 'Invalid Authorization header. JWT has expired.') {
        console.error('JWT expired');
      }
    });
  }

  if (networkError) {
    // We don't want to log network errors to Sentry
    console.error(networkError);
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('apiToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, uploadLink]),
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

export default client;
