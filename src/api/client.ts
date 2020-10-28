/* eslint-disable no-console */
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import * as Sentry from '@sentry/browser';
import { OperationDefinitionNode } from 'graphql';

import i18nProvider from '../common/translation/i18nProvider';

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_API_URI,
  headers: {
    'keep-alive': 'true',
  },
});

const stringify = (value: unknown) => JSON.stringify(value, null, 2);

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((graphQLError) => {
      // eslint-disable-next-line max-len
      const errorMessage = `[GraphQL error]: Message: ${graphQLError.message}, Location: ${graphQLError.locations}, Path: ${graphQLError.path}`;
      if (process.env.NODE_ENV === 'development') {
        console.error(errorMessage);
      }

      if (
        graphQLError.message ===
        'Invalid Authorization header. JWT has expired.'
      ) {
        // If JWT is expired it means that we want people to log in again. We don't need to log this to sentry.
        console.error('JWT expired');
      } else if (graphQLError?.extensions?.code === 'PERMISSION_DENIED_ERROR') {
        // Most permission errors happen when user authentication
        // expires or when the user accesses the application before
        // authentication. Due to how react-admin's optimistic nature,
        // these errors can happen with practically any call. Permission
        // errors end up creating a lot of noise in Sentry, so it's
        // worth it to ignore them in our opinion even with the chance
        // that we miss a few edge cases.
        console.error('Permissions denied');
      } else {
        const {
          originalError,
          extensions,
          locations,
          message,
          path,
        } = graphQLError;

        const operationName = operation.operationName;
        const operationKind = operation.query.definitions.find(
          (definition): definition is OperationDefinitionNode =>
            definition.kind === 'OperationDefinition'
        )?.operation;

        Sentry.withScope((scope) => {
          scope.setLevel(Sentry.Severity.Error);

          scope.setTag('type', 'GraphQL Error');
          scope.setTag('operation.name', operationName);
          if (operationKind) {
            scope.setTag('operation.kind', operationKind);
          }

          scope.setContext('GraphQL Error', {
            extensions: stringify(extensions),
            locations: stringify(locations),
            path: stringify(path),
          });
          scope.setContext('Operation', {
            name: operationName,
            kind: operationKind,
          });

          if (originalError) {
            scope.setExtra('message', message);
            Sentry.captureException(originalError);
          } else {
            Sentry.captureMessage(message);
          }
        });
      }
    });
  }

  if (networkError) {
    // We don't want to log network errors to Sentry
    // eslint-disable-next-line no-console
    console.error(networkError);
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('apiToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
      'accept-language': i18nProvider.getLocale() || 'fi',
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
