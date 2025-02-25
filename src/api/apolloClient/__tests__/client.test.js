import * as Sentry from '@sentry/browser';
import { waitFor } from '@testing-library/react';

import Config from '../../../domain/config';
import handleError from '../handleApolloError';

const graphQLError = {
  message: 'Message',
  extensions: {
    code: 'TEST',
  },
  locations: [],
  path: ['myTest'],
};

const operation = {
  operationName: 'Test',
  query: {
    definitions: [
      {
        kind: 'OperationDefinition',
        operation: 'query',
      },
    ],
  },
};

describe('client', () => {
  describe('handleApolloError', () => {
    const mockScope = {
      setLevel: vi.fn(),
      setTag: vi.fn(),
      setContext: vi.fn(),
      setExtra: vi.fn(),
    };

    beforeAll(() => {
      vi.spyOn(console, 'error').mockImplementation(() => {
        // pass
      });
    });

    afterEach(() => {
      vi.resetAllMocks();
    });

    afterAll(() => {
      vi.restoreAllMocks();
    });

    describe('GraphQL errors', () => {
      it('should send graphQL errors', () => {
        const captureExceptionSpy = vi.spyOn(Sentry, 'captureException');
        const captureMessageSpy = vi.spyOn(Sentry, 'captureMessage');
        const withScopeSpy = vi.spyOn(Sentry, 'withScope');

        withScopeSpy.mockImplementation((cb) => cb(mockScope));

        handleError({ graphQLErrors: [graphQLError], operation });

        expect(withScopeSpy).toHaveBeenCalledTimes(1);
        expect(mockScope.setLevel).toHaveBeenCalledWith('error');
        expect(mockScope.setTag).toHaveBeenCalledWith('type', 'GraphQL Error');
        expect(mockScope.setTag).toHaveBeenCalledWith(
          'operation.kind',
          'query'
        );
        expect(mockScope.setContext).toHaveBeenCalledWith(
          'GraphQL Error',
          expect.any(Object)
        );
        expect(mockScope.setContext).toHaveBeenCalledWith(
          'Operation',
          expect.any(Object)
        );
        expect(captureExceptionSpy).toHaveBeenCalledTimes(0);
        expect(captureMessageSpy).toHaveBeenCalledWith(graphQLError.message);
      });

      it('should ignore JWT expiration and PERMISSION_DENIED errors', () => {
        const captureExceptionSpy = vi.spyOn(Sentry, 'captureException');
        const captureMessageSpy = vi.spyOn(Sentry, 'captureMessage');
        const graphQLErrors = [
          {
            message: 'Invalid Authorization header. JWT has expired.',
            extensions: {},
          },
          {
            message: 'foobar',
            extensions: {
              code: 'AUTHENTICATION_EXPIRED_ERROR',
            },
          },
          {
            message: '123',
            extensions: {
              code: 'PERMISSION_DENIED_ERROR',
            },
          },
        ];

        handleError({ graphQLErrors, operation });

        expect(captureExceptionSpy).toHaveBeenCalledTimes(0);
        expect(captureMessageSpy).toHaveBeenCalledTimes(0);
      });

      it('should send all errors in development mode', () => {
        vi.spyOn(Config, 'NODE_ENV', 'get').mockReturnValue('development');

        const graphQLErrors = [
          {
            message: 'Invalid Authorization header. JWT has expired.',
            extensions: {},
          },
          {
            message: 'Permission denied',
            extensions: {
              code: 'PERMISSION_DENIED_ERROR',
            },
          },
          {
            message: 'Any error',
          },
        ];

        const consoleErrorSpy = vi
          .spyOn(console, 'error')
          .mockImplementation(() => {
            // pass
          });

        handleError({ graphQLErrors, operation });

        graphQLErrors
          .map(
            (graphQLError) =>
              // eslint-disable-next-line max-len
              `[GraphQL error]: Message: ${graphQLError.message}, Code: ${graphQLError.extensions?.code}, Location: ${graphQLError.locations}, Path: ${graphQLError.path}`
          )
          .forEach((errorMessage) => {
            expect(consoleErrorSpy).toHaveBeenCalledWith(errorMessage);
          });
      });
    });

    describe('network errors', () => {
      it('should not send network errors', () => {
        const error = Error('Test');
        const captureExceptionSpy = vi.spyOn(Sentry, 'captureException');
        const captureMessageSpy = vi.spyOn(Sentry, 'captureMessage');

        handleError({ networkError: error, operation });

        expect(captureExceptionSpy).toHaveBeenCalledTimes(0);
        expect(captureMessageSpy).toHaveBeenCalledTimes(0);
      });
    });
  });
});
