/* eslint-disable no-console */
import type { ErrorHandler } from '@apollo/client/link/error';
import * as Sentry from '@sentry/browser';
import type { OperationDefinitionNode } from 'graphql';

import authService from '../../domain/authentication/authService';
import Config from '../../domain/config';

const stringify = (value: unknown) => JSON.stringify(value, null, 2);

const handleApolloError: ErrorHandler = ({
  graphQLErrors,
  networkError,
  operation,
}) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((graphQLError) => {
      const errorCode = graphQLError?.extensions?.code;

      // eslint-disable-next-line max-len
      const errorMessage = `[GraphQL error]: Message: ${graphQLError.message}, Code: ${errorCode}, Location: ${graphQLError.locations}, Path: ${graphQLError.path}`;

      if (Config.NODE_ENV === 'development') {
        console.error(errorMessage);
      }

      if (
        // This first check is just to maintain compatibility with old backend versions, it can be removed later.
        graphQLError.message ===
          'Invalid Authorization header. JWT has expired.' ||
        errorCode === 'AUTHENTICATION_EXPIRED_ERROR'
      ) {
        // If JWT is expired it means that we want people to log in again. We don't need to log this to sentry.
        console.error('JWT expired');
        authService.resetAuthState();
      } else if (errorCode === 'PERMISSION_DENIED_ERROR') {
        // Most permission errors happen when user authentication
        // expires or when the user accesses the application before
        // authentication. Due to how react-admin's optimistic nature,
        // these errors can happen with practically any call. Permission
        // errors end up creating a lot of noise in Sentry, so it's
        // worth it to ignore them in our opinion even with the chance
        // that we miss a few edge cases.
        console.error('Permissions denied');
        authService.resetAuthState();
      } else {
        const { extensions, locations, message, path } = graphQLError;

        const operationName = operation.operationName;
        const operationKind = operation.query.definitions.find(
          (definition): definition is OperationDefinitionNode =>
            definition.kind === 'OperationDefinition'
        )?.operation;

        Sentry.withScope((scope) => {
          scope.setLevel('error');

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

          Sentry.captureMessage(message);

          if (errorCode === 'AUTHENTICATION_ERROR') {
            authService.resetAuthState();
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
};

export default handleApolloError;
